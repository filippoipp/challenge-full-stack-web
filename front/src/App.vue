<template>
  <v-app>
    <router-view></router-view>
    <router-view name="template"/>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
