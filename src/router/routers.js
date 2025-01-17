import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/home',
    name: '_home',
    // redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/',
    redirect: '/device',
    name: '设备管理',
    component: Main,
    meta: {
      hideInMenu: false,
      title: '设备管理',
      icon: 'logo-buffer'
    },
    children: [
      {
        path: '/device',
        name: '设备管理',
        meta: {
          hideInMenu: true,
          title: '设备管理',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/device/device-management.vue')
      },
      {
        path: '/device/detail',
        name: '设备详情',
        meta: {
          hideInMenu: true,
          title: '设备详情'
        },
        component: () => import('@/view/device/device-detail.vue'),
        props: true
      },
      {
        path: '/device/history',
        name: '设备历史数据',
        meta: {
          hideInMenu: true,
          title: '设备历史数据'
        },
        component: () => import('@/view/device/device-history-data.vue'),
        props: true
      },
      {
        path: '/device/driver/:id',
        name: '设备控制器管理',
        meta: {
          hideInMenu: true,
          title: '设备控制器管理'
        },
        component: () => import('@/view/driver/command-management.vue'),
        props: true
      },
      {
        path: '/device/driver/:id/history',
        name: '失败历史管理',
        meta: {
          hideInMenu: true,
          title: '失败历史管理'
        },
        component: () => import('@/view/driver/history-management.vue'),
        props: true
      }
    ]
  },
  {
    path: '/task',
    name: '任务管理',
    component: Main,
    meta: {
      title: '任务管理',
      icon: 'logo-buffer'
    },
    children: [
      {
        path: '/task/manage',
        name: '任务管理',
        meta: {
          hideInMenu: false,
          title: '任务管理',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/task/task-management.vue'),
        props: true
      }
    ]
  },
  {
    path: '/process_management',
    name: '工艺管理',
    component: Main,
    meta: {
      title: '工艺管理',
      icon: 'logo-buffer'
    },
    children: [
      {
        path: '',
        name: '工艺管理',
        meta: {
          title: '工艺管理',
          icon: 'ios-albums'
        },
        component: () => import('@/view/process-management/process-management')
      },
      {
        path: 'process-configuration',
        name: '工艺流程配置',
        meta: {
          title: '工艺流程配置',
          hideInMenu: true
        },
        component: () => import('@/view/process-management/process-configuration')
      },
      {
        path: 'process-modification',
        name: '工艺流程编辑',
        meta: {
          title: '工艺流程编辑',
          hideInMenu: true
        },
        component: () => import('@/view/process-management/process-modification')
      }
    ]
  },
  {
    path: '/analyse',
    name: '数据分析',
    component: Main,
    meta: {
      title: '数据分析',
      icon: 'logo-buffer'
    },
    children: [
      {
        path: '/analyse/data',
        name: '采集数据',
        meta: {
          title: '采集数据',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/analyse/analyse-device-data.vue')
      },
      {
        path: '/analyse/status',
        name: '设备状态',
        meta: {
          title: '设备状态',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/analyse/analyse-device-status.vue')
      }
    ]
  },
  {
    path: '/process',
    name: '流程管理',
    component: Main,
    meta: {
      title: '流程管理',
      icon: 'logo-buffer'
    },
    children: [
      {
        path: '/process/manage',
        name: '流程管理',
        meta: {
          hideInMenu: false,
          title: '流程管理',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/process/process-management.vue'),
        props: true
      },
      {
        path: '/process/binding',
        name: '流程配置',
        meta: {
          hideInMenu: true,
          title: '流程配置',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/process/process-view.vue'),
        props: true
      }
    ]
  },
  {
    path: '/edgeLog',
    name: '日志记录',
    component: Main,
    meta: {
      title: '日志记录',
      icon: 'logo-buffer'
    },
    children: [
      {
        path: '/edgeLog/table',
        name: '日志记录',
        meta: {
          hideInMenu: false,
          title: '日志记录',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/Log/LogView.vue'),
        props: true
      }
    ]
  }
]
