<template>
  <v-row>
    <v-col
      class="d-flex"
      cols="12"
      md="6"
    >
      <v-menu
        ref="startTime"
        v-model="startTime"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="startTimeVal"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startTimeVal"
            label="Select start time"
            readonly
            v-on="on"
          />
        </template>
        <v-time-picker
          v-if="startTime"
          v-model="startTimeVal"
          full-width
          format="24hr"
          @click:minute="$refs.startTime.save(startTimeVal)"
        />
      </v-menu>
    </v-col>
    <v-col
      class="d-flex"
      cols="12"
      md="6"
    >
      <v-menu
        ref="endTime"
        v-model="endTime"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="endTimeVal"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endTimeVal"
            label="Select end time"
            readonly
            v-on="on"
          />
        </template>
        <v-time-picker
          v-if="endTime"
          v-model="endTimeVal"
          full-width
          format="24hr"
          @click:minute="$refs.endTime.save(endTimeVal)"
        />
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        startTimeVal: null,
        startTime: false,
        endTimeVal: null,
        endTime: false
      }
    }
  }
</script>

<style>

</style>
