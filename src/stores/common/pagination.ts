import { computed, ref } from 'vue'

export const pagination = <T>(data: T[], pageSize = 10) => {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(data.length / pageSize))

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return data.slice(start, start + pageSize)
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  }
}
