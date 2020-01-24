export default {
    state: {
        perPage: localStorage.getItem('pagination') != null ? JSON.parse(localStorage.getItem('pagination')) : '5',
        pageSizes: ['5', '10', '20']
    },
    getters: {
        perPage: state => state.perPage,
        pageSizes: state => state.pageSizes
    },
    mutations: {
        setPerPage (state, payload) {
            state.perPage = payload
        }
    },
    actions: {
        async setPageSize ({ commit }, payload) {
            try {
                localStorage.setItem('pagination', JSON.stringify(payload))
                commit('setPerPage', payload)
            } catch (error) {
                console.error(error)
                localStorage.removeItem('pagination')
            }
        }
    }
}
