import { defineStore } from 'pinia'

const STORE_ID = 'global'
const DEBUG_KEY = 'global-debug-value'

export const useGlobalStore = defineStore(STORE_ID, {
  state: () => ({

  }),
  getters: {
    debug() {
      return localStorage.getItem(DEBUG_KEY) === 'true'
    },
  },
  actions: {
    onUpdateDebug(value: boolean) {
      localStorage.setItem(DEBUG_KEY, value.toString())
    },
  },
})
