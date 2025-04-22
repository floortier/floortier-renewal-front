<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()

const { fetchMenus } = menuStore
const { menuList } = storeToRefs(menuStore)

onBeforeMount(async () => {
  await fetchMenus()
})
</script>
<template>
  <div class="w-full min-w-[1200px] h-24 flex justify-center bg-pastel-green text-white font-bold">
    <div class="flex">
      <div v-for="item in menuList" class="w-25 py-6 px-6 flex justify-center items-center">
        <router-link :to="item.menuPath">
          <span>{{ item.menuName }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
