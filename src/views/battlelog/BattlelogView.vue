<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useBattlelogStore } from '@/stores/battlelogStore'
import { pagination } from '@/stores/common/pagination'
const battlelogStore = useBattlelogStore()

// states
const headers = ['대전 일시', '맵 이름', '승자', '종족', '티어', '패자', '종족', '티어', '시즌']

const { battlelogs } = storeToRefs(battlelogStore)

// methods
const { fetchBattlelogs } = battlelogStore

// pagination
const { currentPage, totalPages, paginatedData: paginatedLogs, goToPage } = pagination(battlelogs.value, 10)

onMounted(async () => {
  await fetchBattlelogs()
})
</script>
<template>
  <div class="overflow-x-auto p-4">
    <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th v-for="header in headers" :key="header" class="px-4 py-2 text-left text-sm font-semibold text-gray-700">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(battlelog, index) in paginatedLogs" :key="index" class="odd:bg-white even:bg-gray-100">
          <td class="px-4 py-2 text-sm text-gray-800">
            {{ battlelog.battleDate.split('T')[0] }} {{ battlelog.battleDate.split('T')[1] }}
          </td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.mapName }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.winnerName }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.winnerRace }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.winnerTier }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.loserName }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.loserRace }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.loserTier }}</td>
          <td class="px-4 py-2 text-sm text-gray-800">{{ battlelog.seasonName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center gap-2 mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-3 py-1 border rounded"
      :class="currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
    >
      이전
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      class="px-3 py-1 border rounded"
      :class="{ 'bg-blue-500 text-white': page === currentPage }"
    >
      {{ page }}
    </button>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-3 py-1 border rounded"
      :class="currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''"
    >
      다음
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
