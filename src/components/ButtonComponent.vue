<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  class?: string
  text: string
}

const props = defineProps<ButtonProps>()

const defaultClass =
  'w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'

const mergedClass = computed(() => {
  return props.class ?? defaultClass
})
</script>

<template>
  <button :type="props.type || 'button'" :class="mergedClass">
    {{ props.text }}
  </button>
</template>

<style lang="scss" scoped></style>
