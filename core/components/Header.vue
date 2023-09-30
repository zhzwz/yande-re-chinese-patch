<script setup lang="ts">
import { type MenuOption, NMenu } from 'naive-ui'

const options: MenuOption[] = [
  {
    key: 'site',
    label: location.host,
    children: [
      { key: 'yande.re', label: 'yande.re' },
      { key: 'konachan.com', label: 'konachan.com' },
    ],
  },
  {
    key: 'forum',
    label: () => h('a', { href: 'https://yande.re/forum', target: '_blank', rel: 'noopenner noreferrer' }, '论坛'),
  },
  // {
  //   key: 'more',
  //   label: '更多',
  // },
]

const value = ref<string | null>(null)
</script>

<template>
  <div class="h-fit flex-shrink-0 bg-stone-900 p-2">
    <NMenu v-model:value="value" mode="horizontal" :options="options" />
  </div>
</template>
