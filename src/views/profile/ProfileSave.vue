<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import SwiperClass from 'swiper'

import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { useCommonStore } from '@/stores/common/commonStore'

import LOGO_TERRAN from '@/assets/images/logo_terran.png'
import LOGO_PROTOSS from '@/assets/images/logo_protoss.png'
import LOGO_ZERG from '@/assets/images/logo_zerg.png'

import TIER_S from '@/assets/images/tier_s.png'
import TIER_A from '@/assets/images/tier_a.png'
import TIER_B from '@/assets/images/tier_b.png'
import TIER_C from '@/assets/images/tier_c.png'
import TIER_D from '@/assets/images/tier_d.png'
import TIER_E from '@/assets/images/tier_e.png'
import TIER_N from '@/assets/images/tier_n.png'

const authStore = useAuthStore()
const userStore = useUserStore()
const { moveTo } = useCommonStore()

onBeforeMount(() => {
  // if (authStore.userInfo.userSeq == undefined || authStore.userInfo.userSeq == '') {
  //   moveTo('/')
  // }
  userStore.cleanUserInfo()
})

const list = {
  race: ['Terran', 'Protoss', 'Zerg'],
  tier: ['S', 'A', 'B', 'C', 'D', 'E', 'N'],
}

const step = ref(1)
const swiperRef = ref<SwiperClass>()

const nextStep = () => {
  ++step.value

  // 닉네임 확인
  if (step.value == 2) {
    if (userStore.userInfo.userName == '') {
      alert('닉네임을 입력해주세요.')
      --step.value
    }
  }

  // 종족 확인
  if (step.value == 3) {
    if (userStore.userInfo.userRace == '') {
      alert('종족을 선택해주세요.')
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
  if (userStore.userInfo.userRace == '') {
    userStore.userInfo.userRace = race
  } else if (userStore.userInfo.userRace != race) {
    userStore.userInfo.userRace = race
  } else {
    userStore.userInfo.userRace = ''
  }
}

const selectTier = (tier: string) => {
  if (userStore.userInfo.userTier == '') {
    userStore.userInfo.userTier = tier
  } else if (userStore.userInfo.userTier != tier) {
    userStore.userInfo.userTier = tier
  } else {
    userStore.userInfo.userTier = ''
  }
}

const submit = () => {
  if (userStore.userInfo.userTier == '') {
    alert('티어을 선택해주세요.')
    return
  }

  if (
    confirm(
      '입력하신 데이터를 확인해주세요.\n' +
        '닉네임 : ' +
        userStore.userInfo.userName +
        '\n' +
        '종족 : ' +
        userStore.userInfo.userRace +
        '\n' +
        '티어 : ' +
        userStore.userInfo.userTier
    )
  ) {
    userStore.saveProfile()
  }
}

const getImage = (param: string) => {
  switch (param) {
    case 'Terran':
      return LOGO_TERRAN
    case 'Protoss':
      return LOGO_PROTOSS
    case 'Zerg':
      return LOGO_ZERG

    case 'S':
      return TIER_S
    case 'A':
      return TIER_A
    case 'B':
      return TIER_B
    case 'C':
      return TIER_C
    case 'D':
      return TIER_D
    case 'E':
      return TIER_E
    case 'N':
      return TIER_N
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
            ><a href="javascript:void(0)" @click.prevent="selectRace(item)"
              ><img
                class="race"
                :class="{ 'race-selected': userStore.userInfo.userRace == item }"
                :src="getImage(item)"
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
            ><a href="javascript:void(0)" @click.prevent="selectTier(item)"
              ><img
                class="tier"
                :class="{ 'tier-selected': userStore.userInfo.userTier == item }"
                :src="getImage(item)"
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
