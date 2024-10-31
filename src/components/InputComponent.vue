<script setup lang="ts">
interface InputProps {
  id: string
  label: string
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
}

const props = defineProps<InputProps>()

const value = defineModel({
  required: true,
})
</script>

<template>
  <div>
    <label :for="props.id" class="block mb-2 text-sm font-medium text-gray-900">
      {{ props.label }}
    </label>
    <input
      :type="props.type || 'text'"
      :id="props.id"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 sm:text-sm"
      :placeholder="props.placeholder"
      v-model="value"
    />
  </div>
</template>

<style lang="scss" scoped></style>
