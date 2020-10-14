<template>
  <v-container
    class="fill-height"
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">
        <material-card
          color="blue"
          title="HandyMan Skill Table"
          text="This table is for Handyman's skills"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
          />
          <v-btn @click="CreateHandymanSkill()">
            Create
          </v-btn>
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
    data: () => ({
      headers: [
        {
          sortable: false,
          text: 'Service ID',
          value: 'serviceid'
        },
        {
          sortable: false,
          text: 'Skill ID',
          value: 'skillid'
        },
        {
          sortable: false,
          text: 'Skill Name',
          value: 'skillname'
        },
        {
          sortable: false,
          text: 'Skill Description',
          value: 'skilldesc'
        }
      ],
      items: []
    }),

    /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Handyman Skill'
      }
    },
    // Vue by default call this method once this component is loaded on page.
    // We are fetching all users from database using /api/v1/json/users. This is defined inside server/index
    created () {
      axios.get('/api/v1/json/skills').then((res) => {
        res.data.data.forEach(skill => {
          this.items.push({
            serviceid: skill.service_id,
            skillid: skill.skill_id,
            skillname: skill.skill_name,
            skilldesc: skill.skill_desc
          })
        })
      })
    },

    methods: {
      /**
      * Transition to Create-Handyman-Skills page
      *
      * @method CreateHandymanSkill
      * @return {void}
      */
      CreateHandymanSkill () {
        this.$router.push('Create-Handyman-Skills')
      }
    }
  }
</script>
