<script setup lang="ts">
import { onMounted } from 'vue'
import { NScrollbar } from 'naive-ui'

onMounted(() => {
  document.querySelectorAll('head > script').forEach(_ => _.remove())
  document.querySelectorAll('head > link[rel="stylesheet"]').forEach(_ => _.remove())
  document.querySelectorAll('head > style[type="text/css"]').forEach(_ => _.remove())
  document.querySelectorAll('body > script').forEach(_ => _.remove())
})
</script>

<template>
  <Header />
  <NScrollbar class="h-0 flex-auto">
    <slot />
  </NScrollbar>
</template>
