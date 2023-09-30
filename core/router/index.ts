import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => {
    console.groupCollapsed('[router] routes')
    console.debug(routes)
    console.groupEnd()
    return routes
  },
})

export default router
