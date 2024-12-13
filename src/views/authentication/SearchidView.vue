<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import { useCommonStore } from '@/stores/common/commonStore'

const { moveTo } = useCommonStore()

const userRealName = ref('')
const birthday = ref('')
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
        <input-component id="user-real-name" label="이름" placeholder="이름을 입력해 주세요" v-model="userRealName" />
        <input-component id="birthday" label="생년월일" placeholder="생년월일을 선택해 주세요" v-model="birthday" />
        <button-component type="submit" text="아이디 찾기" />
      </template>
    </form-component>
  </div>
</template>
<style lang="scss" scoped></style>
