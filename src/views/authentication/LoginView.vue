<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { useAuthStore } from '@/stores/authStore'
import { useCommonStore } from '@/stores/common/commonStore'

const authStore = useAuthStore()
const { moveTo } = useCommonStore()

onBeforeMount(() => {
  authStore.cleanUserInfo()
})

const userId = ref('')
const password = ref('')
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 mx-auto h-screen w-96">
    <a
      class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      href="javascript:void(0)"
      @click.prevent="moveTo('/')"
    >
      <img class="w-8 h-8 mr-2" src="@/assets/logo.png" alt="logo" />
      Floor Tier
    </a>
    <form-component>
      <template #content>
        <input-component id="user-id" label="아이디" placeholder="아이디를 입력해 주세요" v-model="userId" />
        <input-component
          type="password"
          id="user-password"
          label="비밀번호"
          placeholder="••••••••"
          v-model="password"
        />

        <button-component type="submit" text="로그인" @click.prevent="authStore.login(userId, password)" />
      </template>
    </form-component>
    <div class="w-full flex flex-row justify-center justify-items-center">
      <div class="my-4 mx-2 text-xs">
        <a href="javascript:void(0)" @click.prevent="moveTo('search-pw')">비밀번호 찾기</a>
      </div>
      <div class="my-4 mx-2 text-xs">|</div>
      <div class="my-4 mx-2 text-xs">
        <a href="javascript:void(0)" @click.prevent="moveTo('search-id')">아이디 찾기</a>
      </div>
      <div class="my-4 mx-2 text-xs">|</div>
      <div class="my-4 mx-2 text-xs">
        <a href="javascript:void(0)" @click.prevent="moveTo('signin')">회원가입</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
