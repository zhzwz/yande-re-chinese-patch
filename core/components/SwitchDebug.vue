<script setup lang="ts">
import { NSwitch } from 'naive-ui'

const { debug, onUpdateDebug } = useGlobalStore()

const loading = ref(false)

function update(value: boolean) {
  onUpdateDebug(value)
  loading.value = true
  location.reload()
}
</script>

<template>
  <NSwitch
    :value="debug"
    :loading="loading"
    @update:value="update"
  >
    <template #checked>
      Debug 开启
    </template>
    <template #unchecked>
      Debug 关闭
    </template>
  </NSwitch>
</template>
