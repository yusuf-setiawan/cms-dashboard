import queryString from 'query-string'
import { async } from 'q'

// This is your plugin object. It can be exported to be used anywhere.
export default function (Vue, data) {
    const axios = data.axios
    const store = data.store

    var api = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        timeout: 10000
    })

    var apiService = {
        getToken: function () {
            const currentUser = store.getters.currentUser
            if (currentUser && currentUser.api_key) {
                return currentUser.api_key
            } else {
                return process.env.VUE_APP_LOGIN_API_KEY
            }
        },
        getOptions: function (isMultipart = false) {
            const currentUser = store.getters.currentUser
            var options = {
                headers: {
                    'BZ-Token': process.env.VUE_APP_LOGIN_API_KEY
                }
            }

            if (currentUser && currentUser.api_key) {
                options.headers['BZ-Token'] = currentUser.api_key
            }
            if (isMultipart) {
                options.headers['Content-Type'] = 'multipart/form-data'
            }
            return options
        },

        handleError: function (error) {
            if (error.response) {
                return Promise.reject(this.handleResponse(error.response))
            } else return Promise.reject(error)
        },

        handleResponse: function (response) {
            // status: 500, statusText: "Internal Server Error"
            console.log('handleReponse', response)
            var errors = {}
            if (response.status >= 500) {
                if (response.data && Array.isArray(response.data.errors)) {
                    let e = []
                    response.data.errors.forEach(err => {
                        e.push(err)
                    })
                    errors = {
                        message: response.data.message,
                        errors: e,
                        status: response.status,
                        statusText: response.statusText
                    }
                }
                return errors
            } else if (response.status == 401) {
                throw response.data.error
            } else if (response.status >= 400) {
                if (response.data && Array.isArray(response.data.errors)) {
                    response.data.errors.forEach(err => {
                        var e = errors[err.field]
                        if (!e) e = []

                        if (err.message.includes('cannot be null')) {
                            err.message = 'this field is required'
                        }
                        e.push(err.message)
                        errors[err.field] = e
                    })
                }
                return errors
            } else if (response.status >= 300) {
                return response.status + '-' + response.statusText
            } else if (response.status >= 200) {
                return response.data
            } else {
                return response.status + '-' + response.statusText
            }
        },

        toFormData: function (data) {
            var formData = new FormData()
            for (var key in data) {
                formData.append(key, data[key])
            }
            return formData
        },

        get: async function (endpoint, params = {}) {
            for (var key in params) {
                if (!params[key]) delete params[key]
            }
            endpoint = this.formatUrl(endpoint, params)
            var options = this.getOptions()
            return api
                .get(endpoint, options)
                .then(response => {
                    return this.handleResponse(response)
                })
                .catch(err => {
                    return this.handleError(err)
                })
        },

        post: async function (endpoint, data, isMultipart = false) {
            if (isMultipart) data = this.toFormData(data)
            var options = this.getOptions(isMultipart)
            return api
                .post(endpoint, data, options)
                .then(response => {
                    return this.handleResponse(response)
                })
                .catch(err => {
                    return this.handleError(err)
                })
        },

        put: function (endpoint, data, isMultipart = false) {
            if (isMultipart) data = this.toFormData(data)
            var options = this.getOptions(isMultipart)
            return api
                .put(endpoint, data, options)
                .then(response => {
                    return this.handleResponse(response)
                })
                .catch(err => {
                    return this.handleError(err)
                })
        },

        delete: function (endpoint) {
            var options = this.getOptions()
            return api
                .delete(endpoint, options)
                .then(response => {
                    return this.handleResponse(response)
                })
                .catch(err => {
                    return this.handleError(err)
                })
        },

        patch: function (endpoint, data) {
            var options = this.getOptions()
            return api
                .patch(endpoint, data, options)
                .then(response => {
                    return this.handleResponse(response)
                })
                .catch(err => {
                    return this.handleError(err)
                })
        },

        getOne: async function (collection, kv) {
            var params = {
                limit: 1,
                skip: 0,
                populate: 1,
                published: true,
                simple: 1,
                filter: kv
            }

            try {
                var response = await this.post('collections/get/' + collection, params)
                console.log('RESPONSE', response)
                if (response && response.length) {
                    return response[0]
                } else {
                    return null
                }
            } catch (error) {
                console.error(error)
                return null
            }
        },

        list: async function (collection, page = 1, perPage = 10, otherParams = {}) {
            var params = {
                limit: perPage,
                skip: (page - 1) * perPage,
                sort: { _ucreated: -1 },
                populate: 1,
                published: true
            }

            params = Object.assign(params, otherParams)

            try {
                var result = {
                    meta: {},
                    items: []
                }
                var response = await this.post('collections/get/' + collection, params)
                // console.log('RESPONSE', response)
                if (response) {
                    result.items = this.formatEntries(response.entries, response.fields)
                    result.meta = {
                        total: response.total,
                        perPage: perPage,
                        page: page,
                        from: (page - 1) * perPage + 1,
                        to: (page - 1) * perPage + result.items.length,
                        count: result.items.length,
                        lastPage: Math.ceil(response.total / perPage)
                    }
                }
                return result
            } catch (error) {
                console.error(error)
                return null
            }
        },

        listAll: async function (collection) {
            try {
                var response = await this.post('collections/get/' + collection, {})
                // console.log('RESPONSE', response)
                if (response) {
                    return this.formatEntries(response.entries, response.fields)
                }
                return null
            } catch (error) {
                console.error(error)
                return null
            }
        },

        listOptions: async function (collection, filter = null) {
            try {
                var list = await this.list(collection, 1, 1000, { filter: filter })
                if (list.items) {
                    return list.items.map((el) => {
                        el.link = collection
                        return el
                    })
                }
                return []
            } catch (error) {
                console.error(error)
                return []
            }
        },

        save: async function (collection, data) {
            var params = {
                data: data
            }

            try {
                var response = await this.post('collections/save/' + collection, params)
                console.log('RESPONSE', response)
                return response
            } catch (error) {
                console.error(error)
                return null
            }
        },

        remove: async function (collection, id) {
            var params = {
                filter: { _id: id }
            }

            try {
                var response = await this.post('collections/remove/' + collection, params)
                console.log('RESPONSE', response)
                return response
            } catch (error) {
                console.error(error)
                return null
            }
        },

        formatEntries: function (entries, fields) {
            return entries.map(entry => {
                for (const key in fields) {
                    if (entry.hasOwnProperty(key)) {
                        var field = fields[key]
                        var item = entry[key]
                        // console.log(key, entry, field)
                        if (field.type === 'asset') {
                            if (item != null) {
                                if (item.path && item) {
                                    item.url = this.assetUrl(item.path)
                                } else {
                                    item = {
                                        url: '/assets/img/image-placeholder.svg'
                                    }
                                    entry[key] = item
                                }
                            }
                        }
                    }
                }

                return entry
            })
        },

        assetUrl: function (path) {
            return process.env.VUE_APP_BASE_URL + 'storage/uploads' + path
        },

        formatUrl: function (endpoint, params = {}) {
            console.log('FORMAT URL', endpoint, params)
            endpoint += '?' + queryString.stringify(params)
            return endpoint
        },

        listUsers: async function (filter = null) {
            var params = {}
            if (filter) params.filter = filter
            var endpoint = this.formatUrl('cockpit/listUsers')
            var options = this.getOptions()
            options.headers['BZ-Token'] = process.env.VUE_APP_LOGIN_API_KEY
            return api
                .post(endpoint, params, options)
                .then(response => {
                    return this.handleResponse(response)
                })
                .catch(err => {
                    return this.handleError(err)
                })
        }
    }

    Vue.api = apiService
    Vue.prototype.$api = apiService
}
