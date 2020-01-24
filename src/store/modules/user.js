import firebase from 'firebase/app'
import { currentUser } from '@/constants/config'
import Vue from 'vue'

export default {
    state: {
        currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
        loginError: null,
        processing: false
    },
    getters: {
        currentUser: state => state.currentUser,
        processing: state => state.processing,
        loginError: state => state.loginError
    },
    mutations: {
        setUser (state, payload) {
            state.currentUser = payload
            state.processing = false
            state.loginError = null
        },
        setLogout (state) {
            state.currentUser = null
            state.processing = false
            state.loginError = null
        },
        setProcessing (state, payload) {
            state.processing = payload
            state.loginError = null
        },
        setError (state, payload) {
            state.loginError = payload
            state.currentUser = null
            state.processing = false
        },
        clearError (state) {
            state.loginError = null
        }
    },
    actions: {

        async login ({ commit }, payload) {
            try {
                console.log('Login', payload)
                commit('clearError')
                commit('setProcessing', true)
                var data = await Vue.api.post('cockpit/authUser', { user: payload.email, password: payload.password })
                localStorage.setItem('user', JSON.stringify(data))
                commit('setUser', data)
            } catch (error) {
                console.error(error)
                localStorage.removeItem('user')
                commit('setError', error)
            }

            // firebase
            //     .auth()
            //     .signInWithEmailAndPassword(payload.email, payload.password)
            //     .then(
            //         user => {
            //             const item = { uid: user.user.uid, ...currentUser }
            //             localStorage.setItem('user', JSON.stringify(item))
            //             commit('setUser', { uid: user.user.uid, ...currentUser })
            //         },
            //         err => {
            //             localStorage.removeItem('user')
            //             commit('setError', err.message)
            //         }
            //     )
        },
        signOut ({ commit }) {
            // firebase
            //     .auth()
            //     .signOut()
            //     .then(() => {
            localStorage.removeItem('user')
            commit('setLogout')
            // }, _error => {})
        }
    }
}
