export default [
  {
    path: '/detail',
    component: () => import('./detail.vue'),
  },
  {
    path: '/allflows',
    component: () => import('./allflows.vue'),
  },
  {
    path: '/approvalHistory',
    name: '审批历史',
    component: () => import('./approvalHistory')
  },
  {
    path: '/rejectHistory',
    name: '驳回历史',
    component: () => import('./rejectHistory')
  },
  {
    path: '/shared',
    name: '共享',
    component: () => import('./shared')
  },
  {
    path: '/push',
    name: '推送',
    component: () => import('./push')
  },
  {
    path: '/delay',
    name: '申请延期',
    component: () => import('./delay')
  },
  {
    path: '/delayHistory',
    name: '申请延期历史',
    component: () => import('./delayHistory')
  }
]