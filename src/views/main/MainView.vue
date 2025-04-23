<script setup lang="ts">
import MainHeader from '@/views/main/MainHeader.vue'
import MainHeaderMobile from '@/views/main/MainHeaderMobile.vue'
</script>

<template>
  <main-header class="hidden md:flex" />
  <main-header-mobile class="flex md:hidden" />
  <router-view />
</template>

<style lang="scss" scoped></style>
