
// This is your plugin object. It can be exported to be used anywhere.
const moment = require('moment')

export default function (Vue) {
    var helper = {
        isRequired: function (value) {
            if (typeof value === 'undefined') {
                return false
            } else if (typeof value === 'string' && !value.trim().length) {
                return false
            }
            return true
        },
        validate: function (data, errors) {

        },

        todayDate: function () {
            return this.getDateOnly()
        },
        getDateOnly: function (tgl) {
            if (!tgl) tgl = new Date()
            console.log('GETDATEONLY', typeof tgl)
            if (typeof tgl === 'string') {
                tgl = new Date(tgl)
            }
            return new Date(tgl.getFullYear(), tgl.getMonth(), tgl.getDate())
        }
    }

    Vue.helper = helper
    Vue.prototype.$helper = helper

    // add filter
    Vue.filter('dateDuration', (tgl) => {
        var todate = helper.todayDate()
        return moment.duration(moment(helper.getDateOnly(tgl)).diff(todate)).asDays()
    })
}
