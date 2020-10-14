
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
          title="Handyman Skill"
          text=" "
        >
          <v-form @submit="handyman-skill">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="skillId"
                    class="purple-input"
                    label="Skill ID"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="skillName"
                    class="purple-input"
                    label="Skill Name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="skillDesc"
                    class="purple-input"
                    label="Skill Desc"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    @click="submit"
                  >
                    Create Skill
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

  export default {
    /**
    * data object to hold initial data of the component.
    */
    data () {
      return {
        skillId: '',
        skillName: '',
        skillDesc: ''
      }
    },

     /**
    * metaInfo object to hold page metadata.
    */
    metaInfo () {
      return {
        title: 'Handyman Skill'
      }
    },
    methods: {
      submit () {
        console.log(this.skillId, this.skillName, this.skillDesc)
        axios.post('/api/v1/json/skills/add', {
          skillId: this.skillId,
          skillName: this.skillName,
          skillDesc: this.skillDesc
        })

          .then(function (response) {
            console.log(response)
            // this.$router.push('handyman-skill')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
