<template>
  <div id="app" style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;">
    <router-view></router-view>
  </div>
</template>
<script>
  /* ============
   * Entry Point
   * ============
   *
   * The entry point of the application
   */

  export default {
    /**
     * The name of the application.
     */
    name: 'HVM-Interface',

    /**
     * Fires when the app has been mounted.
     */
    mounted() {
      // If the user is authenticated,
      // fetch the data from the API
      if (this.$store.state.auth.authenticated) {
        this.$store.dispatch('account/find');
      }
      this.$options.sockets.onmessage = data => console.log(data);
    },
  };
</script>
