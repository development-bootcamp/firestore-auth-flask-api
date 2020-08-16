<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-if="!loggedIn">Login</router-link>
      <router-link to="/register" v-if="!loggedIn">Register</router-link>
      <router-link to="/jobs" v-if="loggedIn">Jobs</router-link>
    </div>
    <p>
      {{ getUser && getUser.email }}
    </p>
    <router-view/>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

import { mapGetters, mapActions } from 'vuex'

export default {
  created() {
    firebase.auth().onAuthStateChanged((resp) => {
      this.updateUserState(resp.user)

      if (resp.user) {
        this.$router.push('/jobs')
      } else {
        this.$router.push('/login')
      }
    })
  },
  computed: {
    ...mapGetters(['getUser']),
    loggedIn() {
      return this.getUser !== null;
    }
  },
  methods: {
    ...mapActions(['updateUserState'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;

  padding: 30px;

  a {
    color: #42b983;

    &.router-link-exact-active {
      font-weight: bold;
      color: #2c3e50;
    }
  }
}
</style>
