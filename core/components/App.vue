<script setup lang="ts">
import { type GlobalThemeOverrides, NConfigProvider, darkTheme } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor,
    primaryColorHover,
  },
  Scrollbar: {
    color: primaryColor,
    colorHover: primaryColorHover,
  },
  // Menu: {
  //   itemTextColor: 'rgb(251, 113, 133)', // color-rose-400
  //   // itemTextColorHorizontal: 'rgb(251, 113, 133)', // color-rose-400
  //   itemTextColorHoverHorizontal: 'rgb(244, 63, 94)', // color-rose-500
  // },
}
</script>

<template>
  <NConfigProvider
    :theme="darkTheme"
    :theme-overrides="themeOverrides"
    :abstract="true"
    class="bg-stone-800"
  >
    <RouterView />
  </NConfigProvider>
</template>

<style>
@import "@zhzwz/normalize.css";

html {
  --uno: overflow-hidden;
}

body {
  --uno: p-0;
}

body > #app {
  --uno: flex flex-col w-screen h-screen bg-stone-800 overflow-hidden;
}

.n-scrollbar > .n-scrollbar-rail.n-scrollbar-rail--vertical {
  right: 1px;
}
</style>
