<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const moveTo = (to: string) => {
  router.push(to)
}

const signin = () => {}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center px-6 mx-auto h-screen w-96"
  >
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
        <input-component
          id="user-id"
          label="아이디"
          placeholder="아이디를 입력해 주세요"
        />
        <input-component
          type="password"
          id="user-password"
          label="비밀번호"
          placeholder="••••••••"
        />
        <input-component
          type="password"
          id="user-password-check"
          label="비밀번호확인"
          placeholder="••••••••"
        />
        <button-component
          type="submit"
          text="회원가입"
          @click.prevent="signin"
        />
      </template>
    </form-component>
  </div>
</template>

<style lang="scss" scoped></style>
