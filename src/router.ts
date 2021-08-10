import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home'
import Index from './views/index'
import makingYourFirstChart from './views/making-your-first-chart'
import Paint from './views/Paint'
import Scatter from './views/Scatter'
import scatterplot from './views/scatterplot'
import Svg from './views/Svg'
import TimeChart from './views/TimeChart'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Index },
  { path: '/home', component: Home },
  { path: '/paint', component: Paint },
  { path: '/svg', component: Svg },
  { path: '/scatter', component: Scatter },
  { path: '/time-chart', component: TimeChart },
  { path: '/making-your-first-chart', component: makingYourFirstChart },
  { path: '/scatterplot', component: scatterplot }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
export default router
