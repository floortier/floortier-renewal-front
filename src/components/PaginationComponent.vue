<script setup lang="ts">
interface PaginationProps {
  currentPage: number
  totalPages: number
  goToFirst: () => void
  goToLast: () => void
  goToPage: (page: number) => void
}

const props = defineProps<PaginationProps>()
</script>

<template>
  <div class="flex justify-center gap-1">
    <button
      class="px-3 py-1 border rounded"
      :class="props.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      :disabled="props.currentPage === 1"
      @click.prevent="props.goToFirst"
    >
      &laquo;
    </button>

    <button
      class="px-3 py-1 border rounded"
      :class="props.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      :disabled="props.currentPage === 1"
      @click.prevent="props.goToPage(props.currentPage - 1)"
    >
      이전
    </button>

    <button
      v-for="page in props.totalPages"
      :key="page"
      class="px-3 py-1 border rounded"
      :class="page === props.currentPage ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'"
      @click.prevent="props.goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      class="px-3 py-1 border rounded"
      :class="props.currentPage === props.totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      :disabled="props.currentPage === props.totalPages"
      @click.prevent="props.goToPage(props.currentPage + 1)"
    >
      다음
    </button>

    <button
      class="px-3 py-1 border rounded"
      :class="props.currentPage === props.totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      :disabled="props.currentPage === props.totalPages"
      @click.prevent="props.goToLast"
    >
      &raquo;
    </button>
  </div>
</template>
