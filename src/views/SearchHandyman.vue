<template>
  <v-container
    class="fill-height"
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="green"
          title="Searching HandyMan"
          text="This is a handyman searching page for homeowner"
        >
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
                        label="Type any data"
                      />
                    </v-row>
                  </v-col>
                  <v-col cols="3">
                    <v-row class="pa-3">
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

    /**
    * data object to hold initial data of the component.
    */
    data: () => ({
      search: '',
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
      ],
      skills: [],
      items: [],
      editedIndex: -1
    }),
    // Vue by default call this method once this component is loaded on page.
    // We are fetching all users from database using /api/v1/json/handyman. This is defined inside server/index
    created () {
      axios.get('/api/v1/json/handymen').then((res) => {
        res.data.data.forEach(
          service => {
            this.items.push({
              firstName: service.first_name,
              lastName: service.last_name,
              worklocation: service.work_location,
              serviceName: service.service_name,
              skillName: service.skill_name,
              skillLicenseNo: service.skill_license_no,
              avaliableArea: service.work_avaliable_area,
              handyman_id: service.handyman_id,
              service_id: service.service_id
            })
          })
      })
      axios.get('/api/v1/json/skills').then((data) => {
        data.data.data.forEach(skill => {
          this.skills.push(skill.skill_name)
        })
      })
    },
    methods: {
      /**
       * Filter for dessert names column.
       * @param value Value to be tested.
       * @returns {boolean}
       */

      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
      worklocationFilter (value) {
        // If this filter has no value we just skip the entire filter.
        if (!this.FilterValue) {
          return true
        }

        // Check if the current loop value (The dessert name)
        // partially contains the searched word.
        return value.toLowerCase().includes(this.dessertFilterValue.toLowerCase())
      },

      /**
       * Transition to booking flow.
       * @param itemToRequest Selected request object.
       * @method booking
       * @returns {void}
       */
      booking (itemToRequest) {
        this.$router.push({
          name: 'Booking',
          params: {
            itemToRequest
          }
        })
      }
    }
  }
</script>
