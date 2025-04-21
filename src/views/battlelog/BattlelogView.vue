<script setup lang="ts">
import { onBeforeMount, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useBattlelogStore } from '@/stores/battlelogStore'
import { useUserStore } from '@/stores/userStore'
import { useMapStore } from '@/stores/mapStore'
import { pagination } from '@/stores/common/pagination'
const battlelogStore = useBattlelogStore()
const userStore = useUserStore()
const mapStore = useMapStore()

// states
const ADM_SERVER = import.meta.env.VITE_ADM_SERVER

const { battlelogs, battleInfo } = storeToRefs(battlelogStore)
const { users } = storeToRefs(userStore)
const { maps } = storeToRefs(mapStore)

const filter = ref('')
const period = ref<string[]>([])

const showRegisterModal = ref(false)
const registerStep = ref(1)

const userfilter = ref('')
const mapfilter = ref('')

const raceimages = import.meta.glob('@/assets/images/logo_*.png', { eager: true, as: 'url' })
const tierimages = import.meta.glob('@/assets/images/tier_*.png', { eager: true, as: 'url' })

// actions
const { fetchBattlelogs, saveBattlelog } = battlelogStore
const { fetchUserList } = userStore
const { fetchMapList } = mapStore

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

const filteredUsers = computed(() => users.value.filter((u) => u.nickname.includes(userfilter.value)))
const filteredMaps = computed(() => {
  const filter = mapfilter.value.toLowerCase()

  return maps.value.filter((map) => {
    const nameMatch = map.name.toLowerCase().includes(filter)

    const keywordsArray = map.keyword ? map.keyword.split(',').map((k) => k.trim().toLowerCase()) : []

    const keywordMatch = keywordsArray.some((keyword) => keyword.includes(filter))

    return nameMatch || keywordMatch
  })
})

watch(showRegisterModal, async () => {
  if (showRegisterModal.value) {
    battleInfo.value = {}
    if (!users.value.length) await fetchUserList()
    if (!maps.value.length) await fetchMapList()
  }
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

const selectOpponent = (seq: number) => {
  battleInfo.value.opponentSeq = seq
}

const selectMap = (seq: number) => {
  battleInfo.value.mapSeq = seq
}

const validate = () => {
  if (!battleInfo.value.battleDate) {
    alert('대전 일자를 선택해주세요.')
    registerStep.value = 1
    return false
  } else if (!battleInfo.value.opponentSeq) {
    alert('상대 닉네임을 선택해주세요.')
    registerStep.value = 2
    return false
  } else if (battleInfo.value.win === undefined) {
    alert('승패를 선택해주세요.')
    registerStep.value = 3
    return false
  } else if (!battleInfo.value.mapSeq) {
    alert('맵을 선택해주세요.')
    registerStep.value = 4
    return false
  }

  return true
}

const confirmBattlelog = async () => {
  if (!validate()) {
    return
  }

  const message = [
    '전적을 등록하시겠습니까?',
    '',
    battleInfo.value.battleDate ? new Date(battleInfo.value.battleDate).toLocaleString() : '',
    `승패 : ${battleInfo.value.win ? '승' : '패'}`,
    `상대 : ${users.value.find((u) => u.floorUserSeq === battleInfo.value.opponentSeq)?.nickname}`,
    `맵 : ${maps.value.find((m) => m.mapSeq === battleInfo.value.mapSeq)?.name}`,
  ].join('\n')

  if (confirm(message)) {
    await saveBattlelog()
    showRegisterModal.value = false
  }
}

// life-cycle
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

        <date-component
          range
          id="period"
          class="w-[250px]"
          v-model="period"
          format="yyyy-MM-dd"
          placeholder="기간 선택"
        />
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
          <span>{{ battlelog.winnerName }}</span>
        </div>
        <div class="flex justify-center gap-2">
          <img class="w-8 h-8" :src="getRaceImage(battlelog.winnerRace)" />
          <img class="w-8 h-8" :src="getTierImage(battlelog.winnerTier)" />
        </div>
        <div class="flex justify-center items-center gap-1">
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
    <div class="relative w-[600px] p-6 bg-white rounded-lg shadow-lg">
      <button-component
        text="&times;"
        class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        @click.prevent="showRegisterModal = false"
      />

      <h2 class="text-lg font-semibold mt-2 mb-4">전적 등록 ({{ registerStep }}/4)</h2>

      <div v-if="registerStep === 1">
        <date-component
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

        <div class="space-y-2">
          <div
            v-for="user in filteredUsers.slice(0, 5)"
            :key="user.floorUserSeq"
            class="flex gap-2 items-center"
            :class="[
              'px-4 py-2 border rounded cursor-pointer',
              battleInfo.opponentSeq === user.floorUserSeq ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100',
            ]"
            @click.prevent="selectOpponent(user.floorUserSeq)"
          >
            <div>
              <img class="w-8 h-8" :src="getRaceImage(user.userRace)" />
            </div>
            <div>
              <img class="w-8 h-8" :src="getTierImage(user.userTier)" />
            </div>
            <div>
              <span>
                {{ user.nickname }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="registerStep === 3">
        <div class="flex justify-center gap-4">
          <div
            class="cursor-pointer border-2 rounded p-1"
            :class="
              battleInfo.win === true ? 'animate-smallBounce' : 'transition-transform duration-300 hover:scale-110'
            "
            @click.prevent="battleInfo.win = true"
          >
            <img src="/src/assets/images/winner.png" alt="내가 승자" class="object-cover" />
          </div>

          <div
            class="cursor-pointer border-2 rounded p-1"
            :class="
              battleInfo.win === false ? 'animate-smallBounce' : 'transition-transform duration-300 hover:scale-110'
            "
            @click.prevent="battleInfo.win = false"
          >
            <img src="/src/assets/images/loser.png" alt="내가 패자" class="object-cover" />
          </div>
        </div>
      </div>

      <div v-else-if="registerStep === 4">
        <input-component
          class="w-full px-3 py-3 mb-3 border rounded"
          v-model="mapfilter"
          placeholder="맵 이름 혹은 맵 키워드 검색"
        />

        <div class="space-y-2">
          <div
            v-for="map in filteredMaps.slice(0, 5)"
            :key="map.mapSeq"
            class="flex gap-2 items-center"
            :class="[
              'px-4 py-2 border rounded cursor-pointer',
              battleInfo.mapSeq === map.mapSeq ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100',
            ]"
            @click.prevent="selectMap(map.mapSeq)"
          >
            <div>
              <img class="w-24 h-24" :src="`${ADM_SERVER}${map.imageUrl}`" />
            </div>
            <div class="flex flex-col">
              <div>
                <span>
                  {{ map.name }}
                </span>
              </div>
              <div class="flex gap-1 mt-1">
                <div
                  class="flex justify-center items-center px-2 p-1 text-xs text-white font-bold bg-indigo-500 rounded-lg"
                  v-for="keyword in map.keyword.split(',')"
                >
                  #{{ keyword }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4 mt-6">
        <button-component
          :text="registerStep === 1 ? '닫기' : '이전'"
          class="px-6 py-2 border rounded hover:bg-gray-100"
          @click.prevent="registerStep > 1 ? registerStep-- : (showRegisterModal = false)"
        />
        <button-component
          v-if="registerStep < 4"
          text="다음"
          class="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          @click.prevent="registerStep++"
        />
        <button-component
          v-if="registerStep === 4"
          text="등록"
          class="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          @click.prevent="confirmBattlelog"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
