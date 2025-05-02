<script setup lang="ts">
import { onBeforeMount, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/userStore'
import { useBugreportStore } from '@/stores/bugreportStore'
import { pagination } from '@/stores/common/pagination'
const userStore = useUserStore()
const bugreportStore = useBugreportStore()

const { fetchBugreports } = bugreportStore
</script>
<template>
  <div class="space-y-4 min-w-[1200px] py-20">
    <!-- 필터 & 버튼 -->
    <div class="flex justify-end items-center">
      <div>
        <button-component
          class="px-4 py-2 bg-blue-500 rounded shadow text-white hover:bg-blue-700"
          text="+ 이슈사항 등록"
          @click.prevent="showRegisterModal = true"
        />
      </div>
    </div>

    <div class="w-full">
      <!-- 헤더 -->
      <div class="grid grid-cols-[150px_1fr_2fr_150px] py-3 bg-gray-50 text-sm font-semibold text-gray-700 text-center">
        <div>날짜</div>
        <div>제목</div>
        <div>내용</div>
        <div>작성일</div>
      </div>

      <!-- 바디 -->
      <div
        v-for="(battlelog, index) in paginatedLogs"
        :key="index"
        class="grid grid-cols-[150px_1fr_2fr_150px] items-center py-3 even:bg-gray-50 text-sm text-center"
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
</template>
<style scoped></style>
