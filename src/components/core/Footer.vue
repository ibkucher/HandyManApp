<template>
  <v-footer
    id="core-footer"
    height="82"
  >
    <v-spacer />
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href=" "
        target="_blank"
      >Six Smiles</a>
    </span>
  </v-footer>
</template>

<script>
  export default {

  }
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
