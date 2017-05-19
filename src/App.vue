<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {}
  }
</script>

<style lang="scss">
  html {
    background: #eee;
  }

  body {
    margin: 0;
    width: 100%;
    overflow-x: hidden;
  }
</style>
