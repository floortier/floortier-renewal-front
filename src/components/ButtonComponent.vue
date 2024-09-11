<script setup lang="ts">
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  text: string
}

const props = defineProps<ButtonProps>()
</script>

<template>
  <button
    :type="props.type || 'button'"
    class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    {{ props.text }}
  </button>
</template>

<style lang="scss" scoped></style>
