<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import SwiperClass from 'swiper'

import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { useCommonStore } from '@/stores/common/commonStore'

import { raceImages, tierImages } from '@/assets/images'

const authStore = useAuthStore()
const userStore = useUserStore()
const { moveTo } = useCommonStore()

onBeforeMount(() => {
  if (authStore.userInfo.userSeq == undefined || authStore.userInfo.userSeq == '') {
    moveTo('/')
  }
  userStore.cleanUserInfo()
})

const list = {
  race: ['Terran', 'Protoss', 'Zerg'],
  tier: ['S', 'A', 'B', 'C', 'D', 'E', 'N'],
}

const step = ref(1)
const swiperRef = ref<SwiperClass>()

const nextStep = () => {
  if (step.value === 1 && !userStore.userInfo.userName) {
    alert('닉네임을 입력해주세요.')
  } else if (step.value === 2 && !userStore.userInfo.userRace) {
    alert('종족을 선택해주세요.')
  } else if (step.value === 3 && !userStore.userInfo.userTier) {
    alert('티어를 선택해주세요.')
  } else {
    ++step.value
  }
}

const prevStep = () => {
  --step.value
}

const onSwiper = (swiper: SwiperClass) => {
  swiperRef.value = swiper
}

const selectOption = (type: 'race' | 'tier', value: string) => {
  const field = type == 'race' ? 'userRace' : 'userTier'
  const currentValue = userStore.userInfo[field]

  userStore.userInfo[field] = currentValue == value ? '' : value
}

const getImage = (type: 'race' | 'tier', param: string) => {
  if (type == 'race') return raceImages[param as keyof typeof raceImages] || ''
  if (type == 'tier') return tierImages[param as keyof typeof tierImages] || ''
  return ''
}

const submit = () => {
  if (
    confirm(
      `입력하신 데이터를 확인해주세요.\n닉네임: ${userStore.userInfo.userName}\n종족: ${userStore.userInfo.userRace}\n티어: ${userStore.userInfo.userTier}`
    )
  ) {
    userStore.saveProfile()
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
            v-model="userStore.userInfo.userName"
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
          <swiper-slide v-for="item in list.race"
            ><a href="javascript:void(0)" @click.prevent="selectOption('race', item)"
              ><img
                class="race"
                :class="{ 'race-selected': userStore.userInfo.userRace == item }"
                :src="getImage('race', item)"
                :alt="`${item} Logo`" /></a
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
    <template v-else-if="step == 3">
      <div class="my-3 text-lg"><span class="font-bold">STEP 3.</span> 티어 설정</div>
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
          <swiper-slide v-for="item in list.tier" class="flex flex-col items-center"
            ><a href="javascript:void(0)" @click.prevent="selectOption('tier', item)"
              ><img
                class="tier"
                :class="{ 'tier-selected': userStore.userInfo.userTier == item }"
                :src="getImage('tier', item)"
                :alt="`${item} Tier Logo`" /></a
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
          <button-component class="mx-3" type="submit" text="완료" @click.prevent="submit" />
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

.tier {
  scale: 70%;
  transition: all 0.3s ease;
}

.tier-selected {
  scale: 90%;
}
</style>
