<template>
  <v-card elevation="0" class="py-8">
    <app-menu></app-menu>
    <app-view></app-view>
  </v-card>
</template>

<script>
import Menu from '../components/Menu.vue'
import View from './View.vue'

export default {
  components: {
    'app-menu': Menu,
    'app-view': View,
  },
}
</script>