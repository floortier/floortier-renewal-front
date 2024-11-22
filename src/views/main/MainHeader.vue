<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()

const { fetchMenus } = menuStore
const { menuList } = storeToRefs(menuStore)

onBeforeMount(() => {
  fetchMenus()
})
</script>
<template>
  <div class="w-full h-24 flex justify-between bg-pastel-green text-white font-bold">
    <div class="header__tab hidden md:flex">
      <div v-for="item in menuList" class="w-25 py-6 px-6 flex justify-center items-center">
        <router-link :to="item.menuPath">
          <span>{{ item.menuName }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
