<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <material-card
          v-if="!bookingConfirmed"
          color="green"
          title="Verify booking details"
          text=" "
        >
          <v-form>
            <v-container class="py-0">
              <v-row justify="center">
                <v-col
                  class="align"
                  cols="12"
                >
                  <h2>Handyman Details</h2>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    :value="itemToRequest.firstName"
                    label="First name"
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    :value="itemToRequest.lastName"
                    label="Last name"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    :value="itemToRequest.serviceName"
                    label="Service"
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row justify="left">
                <v-col
                  class="align"
                  cols="12"
                >
                  <h2>Address</h2>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    :value="address"
                    label="Address"
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  class="align"
                  cols="12"
                >
                  <h2>Date and time</h2>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="appointmentDate"
                        label="Please select date"
                        readonly
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="appointmentDate"
                      @input="menu2 = false"
                    />
                  </v-menu>
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  md="6"
                >
                  <v-menu
                    ref="bookingTime"
                    v-model="bookingTime"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="bookingTimeVal"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="bookingTimeVal"
                        label="Select time"
                        readonly
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="bookingTime"
                      v-model="bookingTimeVal"
                      full-width
                      @click:minute="$refs.bookingTime.save(bookingTimeVal)"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    small
                    color="primary"
                    dark
                    @click="confrimBooking()"
                  >
                    Confirm
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
        <material-card
          v-if="bookingConfirmed"
          color="green"
          title="Booking confimed"
          text=" "
        >
          <v-row>
            <v-col cols="12">
              <h2>Your booking has been confirmed!</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                small
                color="primary"
                dark
                @click="goToDashboard()"
              >
                Dashboard
              </v-btn>
            </v-col>
          </v-row>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    /**
    * data object to hold initial data of the component.
    */
    data () {
      return {
        bookingConfirmed: false,
        bookingTimeVal: null,
        bookingTime: false,
        menu2: false,
        appointmentDate: new Date().toISOString().substr(0, 10),
        userProfile: null
      }
    },
     /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Booking'
      }
    },

    /**
    * computed properties for the component.
    */
    computed: {
      itemToRequest () {
        return this.$route.params.itemToRequest
      },

      handymanId () {
        return this.$route.params.itemToRequest.handymanId
      },

      address () {
        if (this.userProfile) {
          return this.userProfile.street + ' ' + this.userProfile.city + ' ' + this.userProfile.province + ' ' + this.userProfile.postal_code
        } else {
          return ''
        }
      }
    },

    created () {
      let headers = {
        headers: {
          'Content-Type': 'application/json',
          'token': this.$store.getters.token
        }
      }
      axios.get('/api/v1/json/users/profile', headers).then((res) => {
        this.userProfile = res.data.data[0]
      })
    },
    methods: {
      confrimBooking () {
        let reqBody = {
          requestDate: Date.now(),
          appointmentDate: this.appointmentDate,
          appointmentTime: this.bookingTimeVal,
          handymanId: this.itemToRequest.handyman_id,
          serviceId: this.itemToRequest.service_id,
          addressID: this.userProfile.address_id,
          customerID: this.userProfile.customer_id,
          totalCost: null,
          requestStatus: 'R'
        }

        let headers = {
          headers: {
            'Content-Type': 'application/json',
            'token': this.$store.getters.token
          }
        }

        axios.post('/api/v1/json/requests/add', reqBody, headers).then((res) => {
          this.bookingConfirmed = true
        })
      },
      goToDashboard () {
        this.$router.push('Dashboard')
      }
    }
  }
</script>
