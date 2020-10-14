<template>
  <v-app-bar
    id="core-app-bar"
    absolute
    app
    color="transparent"
    flat
    height="88"
  >
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn
        v-if="responsive"
        dark
        icon
        @click.stop="onClick"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items v-if="isAuthenticated">
      <v-row
        align="center"
        class="mx-0"
      >
        <v-btn
          to="/user-profile"
          icon
        >
          <div class="my-2">
              <v-btn color="success" fab dark>
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </div>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapMutations } from 'vuex'

  export default {
    data: () => ({
      title: null,
      responsive: false
    }),

    computed: {
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    },

    watch: {
      '$route' (val) {
        this.title = val.name
      }
    },

    mounted () {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      onClick () {
        this.setDrawer(!this.$store.state.app.drawer)
      },
      onResponsiveInverted () {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      }
    }
  }
</script>

<style>
  /* Fix coming in v2.0.8 */
  #core-app-bar {
    width: auto;
  }

  #core-app-bar a {
    text-decoration: none;
  }
</style>
