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
          color="green"
          title="Sign up"
          text=" "
        >
          <v-form>
            <v-container class="py-0">
              <v-row justify="center">
                <v-col
                  class="align"
                  cols="6"
                >
                  <v-btn
                    class="ma-2"
                    outlined
                    color="success"
                    @click="signUpHomeOwner"
                  >
                    Home Owner
                  </v-btn>
                </v-col>
                <v-col
                  class="align"
                  cols="6"
                >
                  <v-btn
                    class="ma-2"
                    outlined
                    color="success"
                    @click="signUpHandyman"
                  >
                    Handy Man
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Register'
      }
    },
    methods: {
      /**
      * Transition to sign-up-handyman page
      *
      * @method signUpHandyman
      * @return {void}
      */
      signUpHandyman () {
        this.$router.push('sign-up-handyman')
      },

      /**
      * Transition to sign-up-homeowner page
      *
      * @method signUpHomeOwner
      * @return {void}
      */
      signUpHomeOwner () {
        this.$router.push('sign-up-homeowner')
      }
    }
  }
</script>
