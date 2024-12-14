<script setup lang="ts">
import { watch } from 'vue'
import { format } from '@/stores/common/formatter'

interface DateProps {
  id: string
  label: string
  format: string
  placeholder?: string
  explain?: string
  class?: string
}

const props = defineProps<DateProps>()

const value = defineModel({
  required: true,
})

watch(value, (newValue) => {
  const date = new Date(`${newValue}`)
  value.value = format(date, props.format)
})
</script>

<template>
  <div>
    <label :for="props.id" class="block mb-2 text-sm font-medium text-gray-900">
      {{ props.label }}
    </label>
    <vue-date-picker
      :id="props.id"
      :placeholder="props.placeholder"
      :format="props.format"
      week-start="0"
      locale="ko"
      v-model="value"
    />
    <div>
      <span class="text-xs text-red-400">{{ props.explain }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
