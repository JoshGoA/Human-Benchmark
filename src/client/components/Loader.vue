// TODO: FIX REPEATED v-col
<template>
  <v-dialog v-model="loading" :transition="false" fullscreen persistent>
    <v-container fill-height>
      <v-row>
        <v-col class="d-flex justify-center" cols="12">
          <v-progress-circular size="50" width="5" indeterminate />
        </v-col>
        <v-col class="d-flex justify-center" cols="12">
          <h2 v-text="message" />
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  }
})
</script>
