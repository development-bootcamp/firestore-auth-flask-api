<template>
  <div>
    <h1>Register</h1>
     <b-form @submit.prevent="registerAccount">
      <b-form-group
        id="ig-name"
        label="Name:"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="ig-email"
        label="Email address:"
        label-for="input-email"
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>

    <p>
      {{ getRegisterPageStatus }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
        name: null
      }
    }
  },
  computed: {
    ...mapGetters(['getRegisterPageStatus'])
  },
  methods: {
    ...mapActions(['signUpAction']),
    registerAccount() {
      this.signUpAction(this.form)

      this.form = {
        email: null,
        password: null,
        name: null
      }
    }
  }
}
</script>

<style>

</style>