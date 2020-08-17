<template>
  <div>
    <p>Your account was created, but your email has not yet been verified. Please verify your email.</p>

    <p>Didn't get an email? Click the button below to resend your verification email.</p>
    
    <b-button @click="resendEmail" variant="primary">Resend verification email</b-button>

    <p>
      {{ this.status }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      status: null
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async resendEmail() {
      try {
        await this.getUser.sendEmailVerification()
        this.status = 'Verification email sent. Please check your inbox.'
      } catch (err) {
        this.status = 'Failed to send verification email. Reason: ' + err.message
      }

      setTimeout(function() {
        this.status = null
      }, 5000)
    }
  }
}
</script>

<style>

</style>