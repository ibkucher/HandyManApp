<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="12"
      >
        <material-card
          class="card-tabs"
          color="green"
          title="Your Upcomming Appointments"
        >
          <v-data-table
            :headers="headers"
            :items="cutomersRequests"
            item-key="worklocation"
            :search="search"
          >
            <template v-slot:top>
              <v-container fluid>
                <v-row>
                  <v-col cols="3">
                    <v-row class="pa-3">
                      <!-- Filter for items name-->
                      <v-text-field
                        v-model="search"
                        type="text"
                        label="Search request"
                      />
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </template>
            <template v-slot:item.action="{ item }">
              <div class="my-2">
                <v-btn
                  small
                  color="primary"
                  dark
                  @click="booking(item)"
                >
                  Request
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    /**
    * data object to hold initial data of the component.
    */
    data () {
      return {
        search: '',
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false
        },
        headers: [
          {
            sortable: false,
            text: 'Service',
            value: 'service_name'
          },
          {
            sortable: false,
            text: 'Handyman',
            value: 'first_name'
          },
          {
            sortable: false,
            text: 'Appointment date',
            value: 'expected_work_date'
          },
          {
            sortable: false,
            text: 'Appoinment time',
            value: 'expected_work_time'
          },
          {
            sortable: false,
            text: 'Handyman phone',
            value: 'phone_num'
          }
        ]
      }
    },
     /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Dashboard'
      }
    },

    /**
    * computed properties for the component.
    */
    computed: mapState({
      userProfile: state => state.userProfile.data,
      cutomersRequests: state => state.cutomersRequests.data
    }),

    /**
    *
    */
    created () {
      let headers = {
        headers: {
          'Content-Type': 'application/json',
          'token': this.$store.getters.token
        }
      }
      this.$store.dispatch('fetchUserProfile', headers)
      this.$store.dispatch('fetchCustomersRequests', headers)
    },

    methods: {
      /**
       *
       */
      complete (index) {
        this.list[index] = !this.list[index]
      }
    }
  }
</script>
