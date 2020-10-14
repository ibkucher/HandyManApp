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
          v-if="isRegistered"
          color="green"
          title="Confiramtion"
          text="Regristration successful"
        >
          <v-container class="py-0">
            <v-row>
              <v-col
                cols="12"
                class="text-right"
              >
                <v-btn
                  color="success"
                  @click="goToHome"
                >
                  Done
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </material-card>
        <material-card
          v-if="!showLoginInfo && !isRegistered"
          color="green"
          title="Create Profile"
          text="Complete your profile"
        >
          <v-form v-model="valid">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="fname"
                    label="First Name"
                    class="purple-input"
                    :error-messages="fnameErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.fname.$touch()"
                    @blur="$v.fname.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="lname"
                    label="Last Name"
                    class="purple-input"
                    :error-messages="lnameErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.lname.$touch()"
                    @blur="$v.lname.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="address"
                    label="Address"
                    class="purple-input"
                    :error-messages="addressErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.address.$touch()"
                    @blur="$v.address.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="phone"
                    label="Phone"
                    class="purple-input"
                    :error-messages="phoneErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="city"
                    label="City"
                    class="purple-input"
                    :error-messages="cityErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="country"
                    label="Country"
                    class="purple-input"
                    :error-messages="countryErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.country.$touch()"
                    @blur="$v.country.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="pcode"
                    class="purple-input"
                    label="Postal Code"
                    type="text"
                    :error-messages="pcodeErrors"
                    :rules="[v => !!v || '']"
                    @input="$v.pcode.$touch()"
                    @blur="$v.pcode.$touch()"
                  />
                </v-col>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="4"
                >
                  <v-select
                    v-model="availableTime"
                    :items="availabilities"
                    label="Available days"
                    item-text="name"
                  />
                </v-col>
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
                <v-col cols="12">
                  <label class="typo__label">Skills</label>
                  <multiselect
                    v-model="value"
                    :options="skills"
                    :error-messages="skillsErrors"
                    :rules="[v => !!v || '']"
                    multiple="true"
                    placeholder="Select skills"
                    open-direction="bottom"
                    label="name"
                    track-by="name"
                    @input="$v.value.$touch()"
                    @blur="$v.value.$touch()"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="next"
                  >
                    Next
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>

        <material-card
          v-if="showLoginInfo"
          color="green"
          title="Create Profile"
          text="Select your username and password"
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="userName"
                    class="purple-input"
                    label="User Name"
                    :counter="32"
                    :max-length="32"
                    :error-messages="userNameErrors"
                    @input="$v.userName.$touch()"
                    @blur="$v.userName.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    class="purple-input"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    class="purple-input"
                    label="Password"
                    type="password"
                    :counter="32"
                    :max-length="32"
                    :error-messages="passwordErrors"
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
                    @click="createUser"
                  >
                    Submit
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
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, email, numeric, alpha } from 'vuelidate/lib/validators'
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'

  export default {
    components: { Multiselect },
    mixins: [validationMixin],

    /**
    * validation rules for the component.
    */
    validations: {
      userName: { required, minLength: minLength(4), maxLength: maxLength(32) },
      email: { required, email },
      password: { required, minLength: minLength(4), maxLength: maxLength(32) },
      fname: { required, alpha, minLength: minLength(3), maxLength: maxLength(32) },
      lname: { required, alpha, minLength: minLength(3), maxLength: maxLength(32) },
      address: { required },
      phone: { required, numeric },
      city: { required, alpha },
      country: { required, alpha },
      pcode: { required, minLength: minLength(6), maxLength: maxLength(6) },
      value: { required }
    },

    /**
    * data object to hold initial data of the component.
    */
    data () {
      return {
        valid: true,
        value: null,
        skills: [],
        fname: '',
        lname: '',
        address: '',
        city: '',
        country: '',
        pcode: '',
        phone: '',
        showLoginInfo: false,
        userName: '',
        email: '',
        password: '',
        availabilities: [{
                           name: 'All day',
                           value: '3'
                         }, {
                           name: 'Weekday',
                           value: '1'
                         },
                         {
                           name: 'weekend',
                           value: '2'
                         }
        ],
        availableTime: '',
        isRegistered: false,
        startTimeVal: null,
        startTime: false,
        endTimeVal: null,
        endTime: false
      }
    },

     /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Signup Handyman'
      }
    },

    /**
    * computed properties for the component.
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
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      fnameErrors () {
        const errors = []
        if (!this.$v.fname.$dirty) return errors
        !this.$v.fname.alpha && errors.push('First name must be only alphabet characters.')
        !this.$v.fname.minLength && errors.push('First name must be more than 3 characters')
        !this.$v.fname.maxLength && errors.push('First name must be at most 32 characters long')
        !this.$v.fname.required && errors.push('First name is required.')
        return errors
      },
      lnameErrors () {
        const errors = []
        if (!this.$v.lname.$dirty) return errors
        !this.$v.lname.alpha && errors.push('Last name must be only alphabet characters.')
        !this.$v.lname.minLength && errors.push('Last name must be more than 3 characters')
        !this.$v.lname.maxLength && errors.push('Last name must be at most 32 characters long')
        !this.$v.lname.required && errors.push('Last name is required.')
        return errors
      },
      addressErrors () {
        const errors = []
        if (!this.$v.address.$dirty) return errors
        !this.$v.address.required && errors.push('Address is required.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.numeric && errors.push('Phone must be numeric.')
        !this.$v.phone.required && errors.push('Phone is required.')
        return errors
      },
      cityErrors () {
        const errors = []
        if (!this.$v.city.$dirty) return errors
        !this.$v.city.alpha && errors.push('City must be only alphabet characters.')
        !this.$v.city.required && errors.push('City is required.')
        return errors
      },
      countryErrors () {
        const errors = []
        if (!this.$v.country.$dirty) return errors
        !this.$v.country.alpha && errors.push('Country must be only alphabet characters.')
        !this.$v.country.required && errors.push('Country is required.')
        return errors
      },
      pcodeErrors () {
        const errors = []
        if (!this.$v.pcode.$dirty) return errors
        !this.$v.pcode.minLength && errors.push('Postal code must be 6 characters')
        !this.$v.pcode.maxLength && errors.push('Postal code must be 6 characters')
        !this.$v.pcode.required && errors.push('Postal code is required.')
        return errors
      },
      skillsErrors () {
        const errors = []
        if (!this.$v.value.$dirty) return errors
        !this.$v.value.required && errors.push('Skills are required.')
        return errors
      }
    },
    created () {
      axios.get('/api/v1/json/skills').then((data) => {
        data.data.data.forEach(skill => {
          this.skills.push({ 'name': skill.skill_name, 'id': skill.skill_id })
        })
      })
    },

    methods: {
       /** create new user with user type 2(handyman)
      *
      * @method createUser
      * @return {void}
      */
      createUser () {
        this.$v.$touch()
        let reqBody = {
          personalInfo: {
            fname: this.fname,
            lname: this.lname,
            address: this.address,
            city: this.city,
            pcode: this.pcode,
            phone: this.phone,
            userType: 2 // db has 2 assigned for handyman
          },
          abilities: {
            selectedSkills: this.value
          },
          loginInfo: {
            userName: this.userName,
            email: this.email,
            password: this.password
          },
          availabilities: {
            availableTime: this.availableTime,
            startTime: this.startTimeVal,
            endTime: this.endTimeVal
          }
        }
        axios.post('/api/v1/json/users/add', reqBody).then((res) => {
          this.isRegistered = true
          this.showLoginInfo = false
        }).catch((error) => {
          console.log(error.response.data)
        })
      },

      /** Toggle ShowLoginInfo to true
      *
      * @method next
      * @return {void}
      */
      next () {
        this.showLoginInfo = true
      },

      goToHome () {

      }
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
