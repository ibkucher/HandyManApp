<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item
      two-line
      to="/home"
    >
      <v-list-item-avatar color="white">
        <v-img
          src="@/assets/logo.jpg"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        Handy Man
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
      <v-list-item
        v-if="this.$store.getters.isAuthenticated === true"
        active-class="primary white--text"
        @click.stop=""
        @click="logout()"
      >
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      authenticatedLinks: [
        {
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        {
          to: '/search-handyman',
          icon: 'mdi-account-search-outline',
          text: 'Search Handyman'
        }
      ],
      unauthenticatedLinks: [
        {
          to: '/login',
          icon: 'mdi-login',
          text: 'Login'
        },
        {
          to: '/sign-up',
          icon: 'mdi-account',
          text: 'Sign up'
        }]
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      },
      links () {
        if (this.$store.getters.isAuthenticated === true) {
          return this.authenticatedLinks
        } else {
          return this.unauthenticatedLinks
        }
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

      logout () {
        this.$store.dispatch('destroyToken')
        this.$router.push({ path: 'home' })
      }
    }
  }
</script>
