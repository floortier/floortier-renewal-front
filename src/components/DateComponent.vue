<script setup lang="ts">
import { watch } from 'vue'
import { format } from '@/stores/common/formatter'

interface DateProps {
  id: string
  label?: string
  format: string
  placeholder?: string
  explain?: string
  class?: string
  range?: boolean
}

const props = defineProps<DateProps>()

const value = defineModel({
  required: true,
})

watch(value, (newValue) => {
  if (Array.isArray(newValue)) {
    const formatted = newValue.map((v) => format(new Date(v), props.format))
    if (JSON.stringify(formatted) !== JSON.stringify(newValue)) {
      value.value = formatted
    }
  } else if (typeof newValue === 'string' && newValue) {
    const formatted = format(new Date(newValue), props.format)
    if (formatted !== newValue) {
      value.value = formatted
    }
  }
})
</script>

<template>
  <div class="flex h-[100%] justify-center items-center">
    <label :for="props.id" class="block mb-2 text-sm font-medium text-gray-900">
      {{ props.label }}
    </label>
    <vue-date-picker
      :id="props.id"
      :class="props.class"
      :placeholder="props.placeholder"
      :format="props.format"
      :model-type="'yyyy-MM-dd'"
      :range="props.range"
      week-start="0"
      locale="ko"
      auto-apply
      v-model="value"
    />
    <div>
      <span class="text-xs text-red-400">{{ props.explain }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
