<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center px-6 mx-auto h-screen w-96"
  >
    <a
      href="#"
      class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
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

        <button-component type="submit" text="로그인" />
      </template>
    </form-component>
  </div>
</template>

<style lang="scss" scoped></style>
