<script setup lang="ts">
import { ref } from 'vue'

import FormComponent from '@/components/FormComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const step = ref(1)

const nextStep = () => {
  ++step.value
}

const prevStep = () => {
  --step.value
}
</script>

<template></template>

<style lang="scss" scoped></style>
