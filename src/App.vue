<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() { 
    return {
    } 
  },
  components: { },
  computed: {
    key() {
      return new Date().valueOf();
    }
  }
}
</script>

<style lang="scss">

</style>
