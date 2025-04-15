<script setup lang="ts">
import { ref } from 'vue'

import { useAuthStore } from '@/stores/authStore'
import { useCommonStore } from '@/stores/common/commonStore'

const authStore = useAuthStore()
const commonStore = useCommonStore()

// states
const userRealName = ref('')
const birthday = ref('')

// methods
const { searchid } = authStore
const { moveTo } = commonStore
</script>
<template>
  <div class="flex flex-col items-center justify-center px-6 mx-auto h-screen w-96">
    <div>
      <div class="back-btn w-5">
        <a href="javascript:void(0)" @click.prevent="moveTo('/')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </a>
      </div>
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
        <input-component id="user-real-name" label="이름" placeholder="이름을 입력해 주세요" v-model="userRealName" />
        <date-component
          id="birthday"
          label="생년월일"
          format="yyyy-MM-dd"
          placeholder="생년월일을 작성해주세요"
          explain="예) 2024-12-31"
          v-model="birthday"
        />
        <button-component type="submit" text="아이디 찾기" @click.prevent="searchid(userRealName, birthday)" />
      </template>
    </form-component>
  </div>
</template>
<style lang="scss" scoped>
.back-btn {
  position: relative;
  top: 35%;
  left: -55%;
}
</style>
