<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDashboardStore } from '@/stores/dashboardStore'
const dashboardStore = useDashboardStore()

const { activeTap } = dashboardStore
const { activedTap, tapList } = storeToRefs(dashboardStore)
</script>
<template>
  <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 my-6">
    <li class="me-2" v-for="item in tapList">
      <a
        href="#"
        class="tab inline-block px-4 py-3 rounded-lg"
        :class="{
          'text-white bg-blue-600': activedTap === item.value,
          'hover:text-gray-900 hover:bg-gray-100': activedTap !== item.value,
        }"
        @click.prevent="activeTap(item.value)"
        >{{ item.name }}
      </a>
    </li>
  </ul>
</template>
<style scoped></style>
