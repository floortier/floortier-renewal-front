<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import DateInput from '@/components/DateComponent.vue'

import { useBattlelogStore } from '@/stores/battlelogStore'
import { pagination } from '@/stores/common/pagination'
const battlelogStore = useBattlelogStore()

// states
const { battlelogs } = storeToRefs(battlelogStore)
const filter = ref('')
const period = ref<string[]>([])

const raceimages = import.meta.glob('@/assets/images/logo_*.png', { eager: true, as: 'url' })
const tierimages = import.meta.glob('@/assets/images/tier_*.png', { eager: true, as: 'url' })

// actions
const { fetchBattlelogs } = battlelogStore

// getters
const filteredLogs = computed(() => {
  return battlelogs.value.filter((log) => {
    const matchText = Object.values(log).some((value) =>
      String(value).toLowerCase().includes(filter.value.toLowerCase())
    )

    const date = new Date(log.battleDate.split('T')[0])

    const start = Array.isArray(period.value) && period.value[0]
    const end = Array.isArray(period.value) && period.value[1]

    const afterStart = start ? new Date(start) <= date : true
    const beforeEnd = end ? date <= new Date(end) : true

    return matchText && afterStart && beforeEnd
  })
})

// methods
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
      <div class="flex items-center gap-2">
        <input
          v-model="filter"
          type="text"
          placeholder="닉네임 또는 맵 검색"
          class="h-[42px] px-4 py-2 border rounded shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <DateInput id="period" v-model="period" format="yyyy-MM-dd" placeholder="기간 선택" range class="h-[100%]" />
      </div>

      <button class="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700">+ 전적 등록</button>
    </div>

    <div class="w-full">
      <!-- 헤더 -->
      <div
        class="grid grid-cols-[110px_200px_minmax(60px,_1fr)_120px_minmax(60px,_1fr)_120px_120px_120px] text-sm font-semibold bg-gray-50 text-gray-700 text-center py-3"
      >
        <div>날짜</div>
        <div>맵</div>
        <div><span class="text-yellow-500">👑</span> 승자</div>
        <div>종족/티어</div>
        <div><span class="text-gray-400">🏳️</span> 패자</div>
        <div>종족/티어</div>
        <div>작성자</div>
        <div>시즌</div>
      </div>

      <!-- 내용 -->
      <div
        v-for="(battlelog, index) in paginatedLogs"
        :key="index"
        class="grid grid-cols-[110px_200px_minmax(60px,_1fr)_120px_minmax(60px,_1fr)_120px_120px_120px] text-sm text-center items-center py-3 even:bg-gray-50"
      >
        <div>{{ battlelog.battleDate.split('T')[0] }}</div>
        <div>{{ battlelog.mapName }}</div>
        <div class="flex justify-center items-center gap-1">
          <span class="text-yellow-500 text-sm">👑</span>
          <span>{{ battlelog.winnerName }}</span>
        </div>
        <div class="flex justify-center gap-2">
          <img class="w-8 h-8" :src="getRaceImage(battlelog.winnerRace)" />
          <img class="w-8 h-8" :src="getTierImage(battlelog.winnerTier)" />
        </div>
        <div class="flex justify-center items-center gap-1">
          <span class="text-gray-400 text-sm">🏳️</span>
          <span>{{ battlelog.loserName }}</span>
        </div>
        <div class="flex justify-center gap-2">
          <img class="w-8 h-8" :src="getRaceImage(battlelog.loserRace)" />
          <img class="w-8 h-8" :src="getTierImage(battlelog.loserTier)" />
        </div>
        <div>{{ battlelog.createdBy }}</div>
        <div>{{ battlelog.seasonName }}</div>
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
