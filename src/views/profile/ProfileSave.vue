<script setup lang="ts">
import { ref } from 'vue'

import SwiperClass from 'swiper'

import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const step = ref(1)
const swiperRef = ref<SwiperClass>()

const nextStep = () => {
  ++step.value

  if (step.value == 2) {
    if (authStore.userInfo.userName == '') {
      alert('닉네임을 입력해주세요.')
      --step.value
    }
  }
}

const prevStep = () => {
  --step.value
}

const onSwiper = (swiper: SwiperClass) => {
  swiperRef.value = swiper
}

const selectRace = (race: string) => {
  if (authStore.userInfo.userRace == '') {
    authStore.userInfo.userRace = race
  } else if (authStore.userInfo.userRace != race) {
    authStore.userInfo.userRace = race
  } else {
    authStore.userInfo.userRace = ''
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center mx-auto h-screen w-96">
    <template v-if="step == 1">
      <div class="my-3 text-lg"><span class="font-bold">STEP 1.</span> 닉네임 설정</div>
      <form-component>
        <template #content>
          <input-component
            id="user-name"
            label=""
            type="text"
            placeholder="사용할 닉네임을 입력해주세요."
            v-model="authStore.userInfo.userName"
          />
          <div class="flex">
            <div class="w-full"></div>
            <button-component class="mx-3" type="submit" text="다음" @click.prevent="nextStep" />
          </div>
        </template>
      </form-component>
    </template>
    <template v-else-if="step == 2">
      <div class="my-3 text-lg"><span class="font-bold">STEP 2.</span> 종족 설정</div>
      <div class="w-full">
        <swiper class="my-swiper w-full" :slides-per-view="1" navigation loop @swiper="onSwiper">
          <div
            class="swiper-button-prev"
            @click="
              () => {
                swiperRef?.slidePrev()
              }
            "
          ></div>
          <swiper-slide
            ><a href="javascript:void(0)" @click.prevent="selectRace('terran')"
              ><img
                class="race"
                :class="{ 'race-selected': authStore.userInfo.userRace == 'terran' }"
                src="@/assets/images/logo_terran.png"
                alt="Terran Logo" /></a
          ></swiper-slide>
          <swiper-slide
            ><a href="javascript:void(0)" @click.prevent="selectRace('protoss')"
              ><img
                class="race"
                :class="{ 'race-selected': authStore.userInfo.userRace == 'protoss' }"
                src="@/assets/images/logo_protoss.png"
                alt="Protoss Logo" /></a
          ></swiper-slide>
          <swiper-slide
            ><a href="javascript:void(0)" @click.prevent="selectRace('zerg')"
              ><img
                class="race"
                :class="{ 'race-selected': authStore.userInfo.userRace == 'zerg' }"
                src="@/assets/images/logo_zerg.png"
                alt="Zerg Logo" /></a
          ></swiper-slide>
          <div
            class="swiper-button-next"
            @click="
              () => {
                swiperRef?.slideNext()
              }
            "
          ></div>
        </swiper>
        <div class="flex my-3">
          <button-component class="mx-3" type="submit" text="이전" @click.prevent="prevStep" />
          <button-component class="mx-3" type="submit" text="다음" @click.prevent="nextStep" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.race {
  padding: 3rem;
  filter: invert(0);
  transition: all 0.3s ease;
}

.race-selected {
  padding: 1rem;
  filter: invert(1);
}
</style>
