<template>
  <v-app>
    <core-app-bar v-if="!isHomeRoute" />

    <core-drawer v-if="!isHomeRoute" />

    <core-view />

    <core-footer />
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View')
    },

    computed: {
      isHomeRoute () {
        if (this.$route.name === 'Home' || this.$route.name === null) {
          return true
        }
        return false
      }
    }
  }
</script>
