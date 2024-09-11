<script setup lang="ts"></script>

<template>
  <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="space-y-4 md:space-y-6" action="#">
        <slot name="content"></slot>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
