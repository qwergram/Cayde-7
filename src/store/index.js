import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import app from './modules/app'

import * as getters from './getters'

import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode' // eslint-disable-line 
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
  getters,
  modules: {
    app
  },
  state: {
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: process.env.API_ENV + 'api/auth/obtain/',
      refreshJWT: process.env.API_ENV + 'api/auth/refresh/',
      verifyJWT: process.env.API_ENV + 'api/auth/verify/',
      whoami: process.env.API_ENV + 'api/me/'
    },
    loggedIn: false,
    user: null
  },
  mutations: {
    updateToken (state, newToken) {
      state.jwt = newToken
      state.loggedIn = true
    },
    removeToken (state) {
      state.jwt = null
      state.user = null
      state.loggedIn = false
    },
    updateCsrfToken (state, newToken) {
      state.csrf = newToken
    },
    removeCsrfToken (state) {
      state.csrf = null
    },
    updateUser (state, user) {
      state.user = user
      state.loggedIn = true
    }
  },
  actions: {
    defineMe () {
      if (this.state.jwt) {
        axios.defaults.headers.common['Authorization'] = 'JWT ' + this.state.jwt
        axios.get(this.state.endpoints.whoami)
          .then((response) => {
            this.commit('updateUser', response.data)
          })
          .catch((e) => {
            console.log(e.response)
            this.commit('removeToken')
          })
      }
    },
    obtainToken (context, params) {
      const payload = {
        username: params.username,
        password: params.password
      }
      const callback = params._callback
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          axios.defaults.headers.common['Authorization'] = 'JWT ' + this.state.jwt
          this.dispatch('defineMe')
          if (callback) callback()
        })
        .catch(() => {
          this.commit('removeToken')
          if (callback) callback()
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }

      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          axios.defaults.headers.common['Authorization'] = 'JWT ' + this.state.jwt
        })
        .catch((error) => {
          console.log(error)
          this.commit('removeToken')
        })
    },
    verifyToken () {
      const token = this.state.jwt
      const payload = {
        token: token
      }
      if (token) {
        axios.post(this.state.endpoints.verifyJWT, payload)
          .then((response) => {
            this.commit('updateToken', response.data.token)
          })
          .catch(() => {
            this.commit('removeToken')
          })
      }
    },
    inspectToken () {
      const token = this.state.jwt
      if (token) {
        const decoded = jwt_decode(token)
        const exp = decoded.exp
        const origIat = decoded.orig_iat

        if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - origIat < 628200) {
          this.dispatch('refreshToken')
        } else if (exp - (Date.now() / 1000) < 1800) {

        } else {
          this.commit('removeToken')
        }
      }
    }
  }
})

Vue.use(VuexI18n.plugin, store)

export default store
