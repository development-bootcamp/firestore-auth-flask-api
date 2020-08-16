<template>
  <div class="login">
    <h1>Login</h1>

    <b-form @submit.prevent="signInAction(form)">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>

    <p class="alertInfo">
      {{ getLoginPageStatus }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getLoginPageStatus'])
  },
  methods: {
    ...mapActions(['signInAction'])
  }
}
</script>

<style scoped>
.alertInfo {
  text-align: center;
  color: red;
}
</style>