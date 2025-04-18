<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import DateInput from '@/components/DateComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

import { useBattlelogStore } from '@/stores/battlelogStore'
import { useUserStore } from '@/stores/userStore'
import { pagination } from '@/stores/common/pagination'
const battlelogStore = useBattlelogStore()
const userStore = useUserStore()

// states
const { battlelogs, battleInfo } = storeToRefs(battlelogStore)
const filter = ref('')
const period = ref<string[]>([])

const showRegisterModal = ref(false)
const registerStep = ref(1)

const userfilter = ref('')
const mapfilter = ref('')

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
    <!-- 필터 & 버튼 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <input-component type="text" class="w-[200px]" v-model="filter" placeholder="닉네임 또는 맵 검색" />

        <DateInput range id="period" class="w-[250px]" v-model="period" format="yyyy-MM-dd" placeholder="기간 선택" />
      </div>

      <div>
        <button-component
          class="px-4 py-2 bg-blue-500 rounded shadow text-white hover:bg-blue-700"
          text="+ 전적 등록"
          @click.prevent="showRegisterModal = true"
        />
      </div>
    </div>

    <div class="w-full">
      <!-- 헤더 -->
      <div
        class="grid grid-cols-[110px_200px_minmax(60px,_1fr)_120px_minmax(60px,_1fr)_120px_120px_120px] py-3 bg-gray-50 text-sm font-semibold text-gray-700 text-center"
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

      <!-- 바디 -->
      <div
        v-for="(battlelog, index) in paginatedLogs"
        :key="index"
        class="grid grid-cols-[110px_200px_minmax(60px,_1fr)_120px_minmax(60px,_1fr)_120px_120px_120px] items-center py-3 even:bg-gray-50 text-sm text-center"
      >
        <div>{{ battlelog.battleDate.split('T')[0] }}</div>
        <div>{{ battlelog.mapName }}</div>
        <div class="flex justify-center items-center gap-1">
          <span class="text-sm text-yellow-500">👑</span>
          <span>{{ battlelog.winnerName }}</span>
        </div>
        <div class="flex justify-center gap-2">
          <img class="w-8 h-8" :src="getRaceImage(battlelog.winnerRace)" />
          <img class="w-8 h-8" :src="getTierImage(battlelog.winnerTier)" />
        </div>
        <div class="flex justify-center items-center gap-1">
          <span class="text-sm text-gray-400">🏳️</span>
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

    <!-- 페이징 -->
    <pagination-component
      :currentPage="currentPage"
      :totalPages="totalPages"
      :goToPage="goToPage"
      :goToFirst="goToFirst"
      :goToLast="goToLast"
    />
  </div>

  <!-- 모달 -->
  <div v-if="showRegisterModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="w-[600px] p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-4">전적 등록 ({{ registerStep }}/4)</h2>

      <div v-if="registerStep === 1">
        <DateInput
          id="register-date"
          v-model="battleInfo.battleDate"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="대전 일자 선택"
        />
      </div>

      <div v-else-if="registerStep === 2">
        <input-component
          class="w-full px-3 py-3 mb-3 border rounded"
          v-model="userfilter"
          placeholder="상대 닉네임 검색"
        />
        <select v-model="battleInfo.opponentSeq" class="w-full px-3 py-2 border rounded">
          <option
            v-for="user in users.filter((n) => n.includes(userfilter))"
            :key="user.floorUserSeq"
            :value="user.floorUserSeq"
          >
            {{ user.nickname }}
          </option>
        </select>
      </div>

      <div v-else-if="registerStep === 3">
        <div class="flex gap-4">
          <label class="flex items-center gap-1">
            <input-component type="radio" v-model="battleInfo.isWin" :value="true" /> 내가 승자
          </label>
          <label class="flex items-center gap-1">
            <input-component type="radio" v-model="battleInfo.isWin" :value="false" /> 내가 패자
          </label>
        </div>
      </div>

      <div v-else-if="registerStep === 4">
        <input-component class="w-full px-3 py-3 mb-3 border rounded" v-model="mapfilter" placeholder="맵 검색" />
      </div>

      <div class="flex justify-end gap-4 mt-6">
        <button-component
          :text="registerStep === 1 ? '닫기' : '이전'"
          class="px-6 py-2 border rounded hover:bg-gray-100"
          @click="registerStep > 1 ? registerStep-- : (showRegisterModal = false)"
        />
        <button-component
          :text="registerStep === 4 ? '등록' : '다음'"
          class="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          @click="registerStep < 4 ? registerStep++ : (showRegisterModal = false)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
