import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import frontGuard from './front-guard'
import postGuard from './post-guard'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(frontGuard)
router.afterEach(postGuard)

export default router
