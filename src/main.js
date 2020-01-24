import Vue from 'vue'
import App from './App'

// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import { store } from './store'
// Multi Language Add
import en from './locales/en.json'
import es from './locales/es.json'
import VueI18n from 'vue-i18n'
import { defaultLocale, localeOptions, firebaseConfig } from '@/constants/config'
// Notification Component Add
import Notifications from '@/components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from '@/components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from '@/components/Common/RefreshButton'
// Colxx Component Add
import Colxx from '@/components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import lineClamp from 'vue-line-clamp'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueScrollTo from 'vue-scrollto'
import firebase from 'firebase/app'
import 'firebase/auth'
import InputField from '@/components/Form/InputField'
import Switches from 'vue-switches'
import VueDropzone from 'vue2-dropzone'
import BzPagination from '@/components/Bitzania/Pagination'
import BzPagesizeDropdown from '@/components/Bitzania/PageSizeDropdown'
import BzStatusBadge from '@/components/Bitzania/StatusBadge'
import axios from 'axios'
import api from './plugins/api'
import helper from './plugins/helper'

import VueLocalStorage from 'vue-localstorage'
import vueDebounce from 'vue-debounce'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import Vue2Filters from 'vue2-filters'

import money from 'v-money'
Vue.component('v-select', vSelect)
Vue.use(vueDebounce, {
    defaultTime: '200ms'
})
Vue.use(Vue2Filters, {
    currency: {
        symbol: 'Rp',
        decimalDigits: 0,
        thousandsSeparator: '.',
        decimalSeparator: ',',
        symbolOnLeft: true,
        spaceBetweenAmountAndSymbol: true
    }
})

Vue.use(require('vue-moment'))
Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(api, { axios, store })
Vue.use(helper)
Vue.use(VueLocalStorage, {
    name: 'ls',
    bind: true // created computed members from your variable declarations
})

const messages = { en: en, es: es }
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale
const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages
})
Vue.use(money, { precision: 0, decimal: ',', thousands: '.', prefix: 'Rp ' })

Vue.use(Notifications)
Vue.component('piaf-breadcrumb', Breadcrumb)
Vue.component('b-refresh-button', RefreshButton)
Vue.component('b-colxx', Colxx)
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar)
Vue.component('input-field', InputField)
Vue.component('switches', Switches)
Vue.component('vue-dropzone', VueDropzone)
Vue.component('bz-pagination', BzPagination)
Vue.component('bz-pagesize-dropdown', BzPagesizeDropdown)
Vue.component('bz-status-badge', BzStatusBadge)
Vue.use(require('vue-shortkey'))
Vue.use(contentmenu)
Vue.use(lineClamp, { /* plugin options */})
Vue.use(VCalendar, {
    firstDayOfWeek: 2, // ...other defaults,
    formats: {
        title: 'MMM YY',
        weekdays: 'WW',
        navMonths: 'MMMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L'
    },
    datePickerShowDayPopover: false,
    popoverExpanded: true,
    popoverDirection: 'bottom'
})
Vue.use(VueScrollTo)
firebase.initializeApp(firebaseConfig)

export default new Vue({
    el: '#app',
    i18n,
    router,
    store,
    render: h => h(App)
})
