import { computed, ref, watch, Ref } from 'vue'

export const pagination = <T>(data: Ref<T[]>, pageSize = 10) => {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(data.value.length / pageSize))

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return data.value.slice(start, start + pageSize)
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const goToFirst = () => (currentPage.value = 1)
  const goToLast = () => (currentPage.value = totalPages.value)

  watch(
    () => data.value,
    () => {
      currentPage.value = 1
    }
  )

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToFirst,
    goToLast,
  }
}
