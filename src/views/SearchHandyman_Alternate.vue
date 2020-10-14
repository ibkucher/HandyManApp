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
          title="Search Handyman"
          text=" "
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-text-field
                  v-model="keyword"
                  label="Search"
                  class="purple-input"
                />
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-row>
                    <v-text-field
                      v-model="pcode"
                      label="Postal Code"
                      class="purple-input"
                    />
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
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
                        v-model="timeAvaibility"
                        label="Time Avaibility"
                        prepend-icon=""
                        readonly
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu2 = false"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <label class="typo__label">Skills</label>
                  <multiselect
                    v-model="selectedSkills"
                    :options="skills"
                    multiple="true"
                    placeholder="Select skills"
                    open-direction="bottom"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-btn
                      color="success"
                      @click="searchHandyman"
                    >
                      Search
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
              <v-row v-if="items.length > 0">
                <v-data-table
                  :headers="headers"
                  :items="items"
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
                              label="Filter results"
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
                        @click="request(item)"
                      >
                        Request
                      </v-btn>
                    </div>
                  </template>
                </v-data-table>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'

  export default {
     /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Search Handyman'
      }
    },

    components: { Multiselect },

    /**
    * data object to hold initial data of the component.
    */
    data () {
      return {
        pcode: '',
        selectedSkills: null,
        skills: [],
        timeAvaibility: new Date().toISOString().substr(0, 10),
        menu2: false,
        items: [],
        headers: [
          {
            sortable: false,
            text: 'First Name',
            value: 'firstName'
          },
          {
            sortable: false,
            text: 'Last Name',
            value: 'lastName'
          },
          {
            sortable: false,
            text: 'Work Location',
            value: 'worklocation'
          },
          {
            sortable: false,
            text: 'Service Name',
            value: 'serviceName'
          },
          {
            sortable: false,
            text: 'Skill Name',
            value: 'skillName'
          },
          {
            sortable: false,
            text: 'Skill License No',
            value: 'skillLicenseNo'
          },
          {
            sortable: false,
            text: 'Avaliable Area',
            value: 'avaliableArea'
          }, {
            sortable: false,
            text: 'Actions',
            value: 'action'
          }
        ]
      }
    },

    // On page create, get list of skills for dropdown
    created () {
      axios.get('/api/v1/json/skills').then((data) => {
        data.data.data.forEach(skill => {
          this.skills.push(skill.skill_name)
        })
      })
    },

    methods: {
      // OnClick search button
      searchHandyman () {
        // Gather user input into object
        // TODO: Use more filters
        let reqBody = {
          workLocation: this.pcode,
          skill: this.selectedSkills[0],
          requestDate: new Date().toISOString().substr(0, 10)
          // searchFilters: {
          //   pcode: this.pcode
          // },
          // abilities: {
          //   selectedSkills: this.selectedSkills
          // }
        }

        let headers = {
          headers: {
            'Content-Type': 'application/json',
            'token': this.$store.getters.token
          }
        }

        // Send data to API
        axios.post('/api/v1/json/handymen/search/list', reqBody, headers).then((res) => {
          // TODO: Display these results on page instead of console
          // Display all results
          res.data.data.forEach(user => {
            this.items.push({
              firstName: user.first_name,
              lastName: user.last_name,
              worklocation: user.work_location,
              serviceName: user.service_name,
              skillName: user.skill_name,
              skillLicenseNo: user.skill_license_no,
              avaliableArea: user.work_avaliable_area
            })
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
