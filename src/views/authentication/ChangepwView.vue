<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/authStore'
import { useCommonStore } from '@/stores/common/commonStore'

const authStore = useAuthStore()
const commonStore = useCommonStore()

// states
const { changepw } = authStore
const { moveTo } = commonStore

const password = ref('')
const passwordcheck = ref('')

// getter
const passwordSync = computed(() => {
  return password.value == passwordcheck.value ? true : false
})

// methods
const { userInfo } = storeToRefs(authStore)

// lifecycle
onBeforeMount(() => {
  if (!userInfo.value) {
    moveTo('/')
  }
})
</script>
<template>
  <div class="flex flex-col items-center justify-center px-6 mx-auto h-screen w-96">
    <div>
      <a
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        href="javascript:void(0)"
        @click.prevent="moveTo('/')"
      >
        <img class="w-8 h-8 mr-2" src="@/assets/logo.png" alt="logo" />
        Floor Tier
      </a>
    </div>
    <form-component>
      <template #content>
        <input-component type="password" id="password" label="비밀번호" placeholder="••••••••" v-model="password" />
        <input-component
          type="password"
          id="passwordcheck"
          label="비밀번호 확인"
          placeholder="••••••••"
          :class="passwordSync ? 'bg-green-200' : 'bg-red-200'"
          v-model="passwordcheck"
        />
        <button-component type="submit" text="비밀번호 변경" @click.prevent="changepw(password, passwordcheck)" />
      </template>
    </form-component>
  </div>
</template>
<style lang="scss" scoped></style>
