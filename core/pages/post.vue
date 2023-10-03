<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'

const route = useRoute()
const page = ref<number>(Number(route.query.page ?? 1))
const tags = ref<string>(String(route.query.tags ?? ''))
const images = ref<any[]>([])
async function onLoad() {
  const response = await fetch(`https://yande.re/post.json?page=${page.value}&tags=${tags.value}`)
  const data = await response.json()
  if (Array.isArray(data)) {
    const array = data.map(_ => ({
      ..._,
      span2: _.width > _.height,
    }))
    images.value.push(...array)
    page.value += 1
  }
}

const showPostItem = ref<Record<number, boolean>>({})
</script>

<template>
  <Page>
    <div class="grid grid-flow-row-dense grid-cols-4 grid-gap-2 p-2">
      <template v-for="item in images" :key="item.id">
        <div
          v-element-visibility="value => showPostItem[item.id] = value"
          class="group relative overflow-hidden rounded pb-4/3" :class="{ 'col-span-2 !pb-4/6': item.span2 }"
        >
          <template v-if="!!showPostItem[item.id]">
            <!-- <div class="absolute h-full w-full bg-cover bg-center bg-no-repeat blur-4" :style="`background-image: url(${item.preview_url})`" /> -->
            <img class="absolute h-full w-full object-cover blur-4" :src="item.preview_url">
            <!-- transition-padding group-hover:p-0 -->
            <div class="absolute h-full w-full flex items-center justify-center p-2">
              <img
                class="h-full w-full object-contain group-hover:object-cover"
                :src="item.preview_url"
              >
            </div>
          </template>
        </div>
      </template>
      <div v-element-visibility="value => { if (value) onLoad() }" class="col-span-4 pb-4/3" />
    </div>
  </Page>
</template>
