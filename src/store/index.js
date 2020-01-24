import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import pagination from './modules/pagination'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        accessToken: ''
    },
    getters: {
    },
    mutations: {
        changeLang (state, payload) {
            app.$i18n.locale = payload
            localStorage.setItem('currentLanguage', payload)
        }
    },
    actions: {
        setLang ({ commit }, payload) {
            commit('changeLang', payload)
        }
    },
    modules: {
        menu,
        user,
        pagination
    }
})
