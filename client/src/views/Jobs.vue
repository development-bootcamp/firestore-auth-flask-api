<template>
  <div class="tasks">
    <b-button @click.prevent="signOutAction" variant="danger">Logout</b-button>

    <h1>Your jobs</h1>

    <div class="card horizontal" style="max-width:400px;margin:0 auto;" v-if="getUser">
      <div class="card-stacked">
        <div class="card-content">
          <p>name: <strong>{{getUser.displayName}}</strong></p>
          <p>email:<strong>{{getUser.email}}</strong></p>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapActions(['signOutAction'])
  }
}
</script>