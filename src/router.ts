import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
export default router
