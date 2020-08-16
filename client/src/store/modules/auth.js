import * as firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router/index'

const state = {
  user: null,
  loginPageStatus: null,
  error: null,
  registerPageStatus: null
}

const getters = {
  getRegisterPageStatus: (state) => state.registerPageStatus,
  getLoginPageStatus: (state) => state.loginPageStatus,
  getUser: (state) => state.user
}

const actions = {
  updateUserState({ commit }, user) {
    commit('setUser', user)
  },
  signUpAction({ commit }, { name, email, password }) {
    commit('setRegisterPageStatus', 'Signing you up...')
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(resp => {
        commit('setRegisterPageStatus', 'Sign up successful. Please login now.')
        commit('setUser', resp.user)

        router.push('/verify')

        return resp.user
      })
      .then((user) => {
        user.updateProfile({
          displayName: name
        })
        user.sendEmailVerification()
      })
      .catch(err => {
        let message = 'Registration failed. Please try again.'
        if (err.code === 'auth/email-already-in-use') {
          message = 'This email account is already in use; please try another.'
        }
        commit('setRegisterPageStatus', message)
        console.error(err)
      })
  },
  signInAction({ commit }, { email, password }) {
    commit('setLoginPageStatus', 'Logging in...')
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(resp => {
        commit('setUser', resp.user)
        commit('setLoginPageStatus', null)
        commit('setError', null)
        router.push('/jobs')
      })
      .catch(err => {
        let message = 'Error: try again.'
        if (err.code === 'auth/network-request-failed') {
          message = 'Error: network connection failed.'
        } else if (err.code === 'auth/user-not-found') {
          message = 'Error: user does not exist.'
        } else if (err.code === 'auth/wrong-password') {
          message = 'Error: bad credentials.'
        } else {
          console.log(err.code)
        }
        commit('setLoginPageStatus', message)
      })

  },
  signOutAction({ commit }) {
    firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
        commit('setLoginPageStatus', null)
        commit('setError', null)
        router.push('/login')
      })
      .catch(err => {
        console.error('sign out fail')
        console.error(err)
      })
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  removeUser(state) {
    state.user = null
  },
  setLoginPageStatus(state, payload) {
    state.loginPageStatus = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setRegisterPageStatus(state, payload) {
    state.registerPageStatus = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}