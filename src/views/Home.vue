<template>
  <v-app light>
    <v-content>
      <v-toolbar class="white">
        <v-img
          src="@/assets/logo.jpg"
          height="95"
          contain
          aspect-ratio="1"
          position="left"
        />
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            class="ma-1 signup"
            @click="signup"
          >
            Sign up
            <v-icon class="pa-1">mdi-account-plus</v-icon>
          </v-btn>
          <v-btn text class="ma-1" @click="login">
            Sign in
            <v-icon>mdi-login</v-icon>
           </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-parallax
          dark
          src="https://s3-eu-west-1.amazonaws.com/businessautomation/Template_BG_Images/Zakk-Templates_handymanheader_7134.jpg"
        >
        <v-layout
            column
            align-center
            justify-center
            class=""
          >
            <h1 class=" mb-2 display-2 text-center heroHeading">
              One stop to find all your home services.
            </h1>
            <div class=" subheading mb-3 text-center">
              Be worry free
            </div>
            <v-btn
              class="success mt-5"
              dark
              large
              @click="signup"
            >
              Get Started
            </v-btn>
          </v-layout>
      </v-parallax>
      <v-container>
        <v-row
          align="center"
          justify="center"
          class="service-row"
        >
          <div class="text-center">
            <h2 class="headline">
              Services
            </h2>
          </div>
        </v-row>
        <v-row
          align="center"
          justify="center"
          wrap
          align-center>
          <!-- Iterate each services using for loop with v-for directive -->
          <v-col
            v-for="service in services"
            :key="service.service_id"
            cols="12"
            md="6" >
            <v-card class="elevation-4 transparent text-center pa-5">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="service.service_name"
                  ></v-card-title>
                  <v-card-text class="text-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </v-card-text>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile>
                  <v-img :src="serviceImage[service.service_name] || 'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon7.png'"></v-img>
                </v-avatar>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="login()">
                  Hire now
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Home',
    /**
    * data object to hold initial data of the component.
    */
    data: function () {
      return {
        title: 'Handy Man',
        services: [],
        serviceImage:{
          'Electronics': 'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon2.png',
          'Plumbing':'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon1.png',
          'Carpentry':'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon6.png',
          'Painter':'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon4.png',
          'Civil Construction':'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon7.png',
          'Heating and Cooling':'https://tottenham-handyman.co.uk/wp-content/uploads/2016/05/icon5.png'
        }
      }
    },
    /**
    * Created hook.
    *
    * @lifecycle created
    * @return {void}
    */
    created () {
      axios.get('/api/v1/json/services').then((data) => {
        this.services = data.data.data
      })
    },

    /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Home'
      }
    },
    methods: {
      /**
      * Transition to sign-up page
      *
      * @method signup
      * @return {void}
      */
      signup () {
        this.$router.push('sign-up')
      },

      /**
      * Transition to login page
      *
      * @method login
      * @return {void}
      */
      login () {
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped>
.heroHeading, .subheading{
  font-family: 'Work Sans', sans-serif !important;
  font-size: 2.4em !important;
  font-weight: 300 !important;
  letter-spacing: -0.02em !important;
  line-height: 1.1em !important;
  color:black;
}
.service-row{
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
