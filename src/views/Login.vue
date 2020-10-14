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
          title="Login"
          text=" "
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="userName"
                    class="purple-input"
                    label="User Name"
                    :error-messages="userNameErrors"
                    :counter="32"
                    :max-length="32"
                    @input="$v.userName.$touch()"
                    @blur="$v.userName.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    class="purple-input"
                    label="Password"
                    type="password"
                    :error-messages="passwordErrors"
                    :counter="32"
                    :max-length="32"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    @click="login"
                  >
                    Sign In
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
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Login'
      }
    },

    validations: {
      userName: { required, minLength: minLength(4), maxLength: maxLength(32) },
      password: { required, minLength: minLength(4), maxLength: maxLength(32) }
    },

    /**
    * data object to hold initial data of the component.
    */
    data () {
      return {
        userName: '',
        email: '',
        password: '',
        userType: ''
      }
    },

    /**
    * computed properties for component.
    */
    computed: {
      userNameErrors () {
        const errors = []
        if (!this.$v.userName.$dirty) return errors
        !this.$v.userName.minLength && errors.push('Name must be more than 4 characters')
        !this.$v.userName.maxLength && errors.push('Name must be at most 32 characters long')
        !this.$v.userName.required && errors.push('Name is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password be more than 4 characters')
        !this.$v.password.maxLength && errors.push('Password be at most 32 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      }
    },

    methods: {
      /**
      * Transition to login page
      *
      * @method login
      * @return {void}
      */
      login () {
        // We are using axios to communicate with server. It has get, pust, post, delete function
        axios.post('/api/v1/json/users/finduser', {
          userName: this.userName,
          password: this.password
        })
          .then((response) => {
            this.$store.dispatch('storeToekn', response.data.token)
            let headers = {
                headers: {
                  'Content-Type': 'application/json',
                  'token': this.$store.getters.token
                }
            }
            this.$store.dispatch('fetchUserProfile', headers).then(()=>{
              this.$router.push({path: 'dashboard'})
            })
          })
          .catch((error) => {
            console.error(error)
            this.$store.dispatch('storeToekn', null)
          })
        this.$v.$touch()
      }
    }
  }

</script>
