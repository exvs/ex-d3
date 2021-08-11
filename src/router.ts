import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/from-book/Home'
import Paint from './views/from-book/Paint'
import Scatter from './views/from-book/Scatter'
import Svg from './views/from-book/Svg'
import TimeChart from './views/from-book/TimeChart'
import Index from './views/index'
import MakingYourFirstChart from './views/making-your-first-chart'
import Scatterplot from './views/scatterplot'
import SvgAnimate from './views/animations-and-transitions/svg-animate'
import CssTransitionPlayGround from './views/animations-and-transitions/css-transition-playground'
import AnimationsAndTransitions from './views/animations-and-transitions'
import DrawBarsWithCssTransition from './views/animations-and-transitions/draw-bars-with-css-transition'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Index },
  { path: '/home', component: Home },
  { path: '/paint', component: Paint },
  { path: '/svg', component: Svg },
  { path: '/scatter', component: Scatter },
  { path: '/time-chart', component: TimeChart },
  { path: '/making-your-first-chart', component: MakingYourFirstChart },
  { path: '/scatterplot', component: Scatterplot },
  // { path: '/bar-chart', component: BarChart },
  {
    path: '/animations-and-transitions',
    component: AnimationsAndTransitions,
    children: [
      { path: '', component: AnimationsAndTransitions },
      { path: 'svg-animate', component: SvgAnimate },
      { path: 'css-transition-playground', component: CssTransitionPlayGround },
      { path: 'draw-bars-with-css-transition', component: DrawBarsWithCssTransition }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
export default router
