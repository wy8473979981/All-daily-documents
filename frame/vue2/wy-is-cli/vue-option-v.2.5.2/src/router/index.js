import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/home/index'
import health from '@/pages/health/health'
import precisionInspection from '@/pages/precisionInspection/precisionInspection'
import treatments from '@/pages/treatments/treatments'
import famousDoctor from '@/pages/famousDoctor/famousDoctor'
import famousHospital from '@/pages/famousHospital/famousHospital'
import therapy from '@/pages/therapy/therapy'
import cases from '@/pages/cases/cases'
import service from '@/pages/service/service'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: '首页',
      component: index
    },
    {
      path: '/health',
      name: '多睦健康',
      component: health
    }, {
      path: '/precisionInspection',
      name: '精密检测',
      component: precisionInspection
    }, {
      path: '/treatments',
      name: '重疾治疗',
      component: treatments
    }, {
      path: '/famousDoctor',
      name: '名医',
      component: famousDoctor
    }, {
      path: '/famousHospital',
      name: '名院',
      component: famousHospital
    }, {
      path: '/therapy',
      name: '再生疗法',
      component: therapy
    }, {
      path: '/cases',
      name: '案例',
      component: cases
    }, {
      path: '/service',
      name: '服务指南',
      component: service
    }
  ]
})
router.beforeEach((to, form, next) => {
  /*路由变化修改title*/
  console.log(to);
  next();
})

export default router
