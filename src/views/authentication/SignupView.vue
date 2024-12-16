<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue'

import { useAuthStore } from '@/stores/authStore'
import { useCommonStore } from '@/stores/common/commonStore'

const authStore = useAuthStore()
const { moveTo } = useCommonStore()

onBeforeMount(() => {
  authStore.cleanUserInfo()
})

const username = ref('')
const password = ref('')
const passwordcheck = ref('')
const userRealName = ref('')
const birthday = ref('')
const email = ref('')

// getter
const passwordSync = computed(() => {
  return password.value == passwordcheck.value ? true : false
})
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
        <span class="text-xs text-red-400">※ 바닥티어는 클린한 회원관리를 위해 최소한의 개인정보를 확인합니다.</span>
        <input-component
          id="username"
          label="아이디"
          type="text"
          placeholder="아이디를 입력해 주세요"
          v-model="username"
          @input="authStore.duplicateExists(username)"
        />
        <div v-if="username" class="isDuplicate-box">
          <span v-if="authStore.isDuplicate" class="text-red-600">이미 존재하는 아이디 입니다.</span>
          <span v-else class="text-green-600">사용 가능한 아이디 입니다.</span>
        </div>
        <input-component id="password" label="비밀번호" type="password" placeholder="••••••••" v-model="password" />
        <input-component
          id="user-password-check"
          label="비밀번호확인"
          type="password"
          placeholder="••••••••"
          :class="passwordSync ? 'bg-green-200' : 'bg-red-200'"
          v-model="passwordcheck"
        />
        <input-component
          id="user-real-name"
          label="이름"
          type="text"
          placeholder="실명을 작성해주세요"
          v-model="userRealName"
        />
        <date-component
          id="birthday"
          label="생년월일"
          format="yyyy-MM-dd"
          placeholder="생년월일을 작성해주세요"
          explain="예) 2024-12-31"
          v-model="birthday"
        />
        <input-component id="email" label="이메일" type="email" placeholder="이메일을 입력해 주세요" v-model="email" />

        <button-component
          type="submit"
          text="회원가입"
          @click.prevent="authStore.signup(username, password, passwordcheck, userRealName, birthday, email)"
        />
      </template>
    </form-component>
  </div>
</template>

<style lang="scss" scoped>
.isDuplicate-box {
  margin: 10px 0 0 0 !important;
}

.back-btn {
  position: relative;
  top: 35%;
  left: -55%;
}
</style>
