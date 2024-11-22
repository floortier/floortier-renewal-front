<script setup lang="ts">
import DashboardTap from '@/views/dashboard/DashboardTap.vue'

import { useDashboardStore } from '@/stores/dashboardStore'
const dashboardStore = useDashboardStore()
</script>
<template>
  <dashboard-tap />
</template>
<style scoped></style>
