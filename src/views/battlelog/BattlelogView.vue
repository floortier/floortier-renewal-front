<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useBattlelogStore } from '@/stores/battlelogStore'
import { pagination } from '@/stores/common/pagination'
const battlelogStore = useBattlelogStore()

const { battlelogs } = storeToRefs(battlelogStore)
const filter = ref('')

const { fetchBattlelogs } = battlelogStore

const filteredLogs = computed(() => {
  return battlelogs.value.filter((log) =>
    Object.values(log).some((value) => String(value).toLowerCase().includes(filter.value.toLowerCase()))
  )
})

const raceimages = import.meta.glob('@/assets/images/logo_*.png', { eager: true, as: 'url' })
const tierimages = import.meta.glob('@/assets/images/tier_*.png', { eager: true, as: 'url' })

const getRaceImage = (race: string) => {
  return raceimages[`/src/assets/images/logo_${race.toLowerCase()}.png`] as string
}

const getTierImage = (tier: string) => {
  return tierimages[`/src/assets/images/tier_${tier.toLowerCase()}.png`] as string
}

const {
  currentPage,
  totalPages,
  paginatedData: paginatedLogs,
  goToPage,
  goToFirst,
  goToLast,
} = pagination(filteredLogs, 10)

onBeforeMount(async () => {
  await fetchBattlelogs()
})
</script>

<template>
  <div class="space-y-4 min-w-[1200px] py-20">
    <div class="flex justify-between items-center">
      <input
        v-model="filter"
        type="text"
        placeholder="닉네임 또는 맵 검색"
        class="px-4 py-2 border rounded shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button class="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700" @click="onRegisterBattlelog">
        + 전적 등록
      </button>
    </div>

    <div class="w-full">
      <div class="flex text-sm text-gray-700 bg-gray-50 text-center font-semibold py-3">
        <div class="w-2/12">날짜</div>
        <div class="w-3/12">맵</div>
        <div class="w-1/12">승자</div>
        <div class="w-1/12">종족/티어</div>
        <div class="w-1/12">패자</div>
        <div class="w-1/12">종족/티어</div>
        <div class="w-1/12">작성자</div>
        <div class="w-2/12">시즌</div>
      </div>

      <div v-for="(battlelog, index) in paginatedLogs" :key="index" class="flex items-center text-center text-sm py-3">
        <div class="w-2/12">{{ battlelog.battleDate.split('T')[0] }}</div>
        <div class="w-3/12">{{ battlelog.mapName }}</div>
        <div class="w-1/12">{{ battlelog.winnerName }}</div>
        <div class="w-1/12 flex justify-center gap-2">
          <img class="w-8 h-8" :src="getRaceImage(battlelog.winnerRace)" />
          <img class="w-8 h-8" :src="getTierImage(battlelog.winnerTier)" />
        </div>
        <div class="w-1/12">{{ battlelog.loserName }}</div>
        <div class="w-1/12 flex justify-center gap-2">
          <img class="w-8 h-8" :src="getRaceImage(battlelog.loserRace)" />
          <img class="w-8 h-8" :src="getTierImage(battlelog.loserTier)" />
        </div>
        <div class="w-1/12">{{ battlelog.createdBy }}</div>
        <div class="w-2/12">{{ battlelog.seasonName }}</div>
      </div>
    </div>

    <div class="flex justify-center gap-1">
      <button
        @click="goToFirst"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded"
        :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        &laquo;
      </button>

      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded"
        :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        이전
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-1 border rounded"
        :class="page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'"
      >
        {{ page }}
      </button>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded"
        :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        다음
      </button>

      <button
        @click="goToLast"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded"
        :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        &raquo;
      </button>
    </div>
  </div>
</template>

<style scoped></style>
