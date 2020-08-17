<template>
  <nav>
    <h1>Job scheduler</h1>
    <div id="links">
      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/login" v-if="!loggedIn">Login</router-link>
      <router-link class="router-link" to="/register" v-if="!loggedIn">Register</router-link>
      <router-link class="router-link" to="/jobs" v-if="loggedIn">Jobs</router-link>
      <b-button v-if="loggedIn" @click.prevent="signOutAction" id="logout" variant="danger">Logout</b-button>
    </div>
  </nav>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUser']),
    loggedIn() {
      return this.getUser !== null;
    }
  },
  methods: {
    ...mapActions(['signOutAction'])
  }
}
</script>

<style lang="scss" scoped>
nav {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;

  h1 {
    font-size: 16pt;
  }

  a {
    color: #42b983;

    &.router-link-exact-active {
      font-weight: bold;
      color: #2c3e50;
    }
  }
}

#links {
  flex-grow: 0;
  flex-basis: 200px;
  display: flex;
  justify-content: right;
  align-items: center;

  .router-link {
    padding-left: 10px;
    padding-right: 10px;
  }

  #logout {
    margin-left: 20px;
  }
}
</style>