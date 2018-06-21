<template>
  <span>
  <span class="fa toggle"
        v-bind:class="{'fa-toggle-on': toggled, 'fa-toggle-off': !toggled, 'text-success': toggled, 'text-muted': !toggled}"
        @click=toggle></span> <span class="toggle-label" v-show="label">{{ label }}</span>
  </span>
</template>

<script>
  /* ============
   * Card Component
   * ============
   *
   * A basic card component.
   *
   * Gives an idea how components work.
   */


  export default {
    /**
     * The name of the component.
     */
    name: 'toggle',

    /**
     * The mixins that the component can use.
     */
    mixins: [],

    methods: {
      toggle() {
        this.$emit('toggled');
      },
    },

    /**
     * The properties that the component accepts.
     */
    props: {
      toggled: false,
      label: '',
    },
  };
</script>
