<template>
  <div class="tasks">
    <h1>Your jobs</h1>
    <div>
      <b-form @submit.prevent="submitJob">
      <b-form-group
        id="input-group-1"
        label="Bid amount:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="jobForm.bid"
          type="number"
          required
          placeholder="Enter bid"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Job name:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="jobForm.name"
          required
          placeholder="name"
        ></b-form-input>
      </b-form-group>

      <b-button @click.prevent="submitJob" variant="success">
        Add job
      </b-button>
    </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import config from '../constants'

export default {
  data() {
    return {
      jobForm: {
        bid: null,
        name: null
      }
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async submitJob() {
      const token = await this.getUser.getIdToken(true)

      let formData = new FormData()

      formData.set('name', this.jobForm.name)
      formData.set('bid', this.jobForm.bid)
      formData.set('token', token)

      axios.post(`${config.serverURI}/add`, formData)
      .then((resp) => {
        console.log(resp)
        this.jobForm = {
          bid: null,
          name: null
        }
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>