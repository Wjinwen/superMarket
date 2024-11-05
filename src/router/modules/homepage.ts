import { DashboardIcon,HomeIcon,ChartBarIcon,DeviceIcon,ChatSettingIcon,MapSettingIcon,SoundIcon,TreeListIcon} from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';
import Home from '@/pages/Home/index.vue';
import DeviceControl from '@/pages/DeviceControl/index.vue';
import QASetting from '@/pages/QASetting/index.vue';
import Speech from '@/pages/Speech/index.vue';
import Audio from '@/pages/Audio/index.vue';
import Classify from '@/pages/Classify/index.vue';

export default [
  {
    path: '/home',
    component: Layout,
    meta: {
      title: {
        zh_CN: '首页',
        en_US: 'Home',
      },
      icon: shallowRef(HomeIcon),
      single:true,
    },
    children: [{path: '',name: 'home',component: Home,}],
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: {
      title: {
        zh_CN: '门店数据',
        en_US: 'Stored Data',
      },
      icon: shallowRef(ChartBarIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'core-data',
        name: 'CoreData',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: {
          title: {
            zh_CN: '核心数据',
            en_US: 'Core Data',
          },
        },
      },
      {
        path: 'qa-data',
        name: 'QAData',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: {
          title: {
            zh_CN: '问答数据',
            en_US: 'Q&A Data',
          },
        },
      },
    ],
  },
  {
    path: '/device-ctrl',
    component: Layout,
    meta: {
      title: {
        zh_CN: '设备控制',
        en_US: 'Device Control',
      },
      icon: shallowRef(DeviceIcon),
      single:true,
    },
    children: [{path: '',name: 'DeviceControl',component: DeviceControl,}],
  },
  {
    path: '/qa-setting',
    component: Layout,
    meta: {
      title: {
        zh_CN: '用户问题设置',
        en_US: 'Q&A Setting',
      },
      icon: shallowRef(ChatSettingIcon),
      single:true,
    },
    children: [{path: '',name: 'QASetting',component: QASetting,}],
  },
  {
    path: '/speech',
    component: Layout,
    meta: {
      title: {
        zh_CN: '场景话语',
        en_US: 'Scene Speech',
      },
      icon: shallowRef(MapSettingIcon),
      single:true,
    },
    children: [{path: '',name: 'Speech',component: Speech,}],
  },
  {
    path: '/audio',
    component: Layout,
    meta: {
      title: {
        zh_CN: 'IP声音试听',
        en_US: 'IP Sound Trial',
      },
      icon: shallowRef(SoundIcon),
      single:true,
    },
    children: [{path: '',name: 'Audio',component: Audio,}],
  },
  {
    path: '/classify',
    component: Layout,
    meta: {
      title: {
        zh_CN: '商品货架分类',
        en_US: 'Product Shelf Classification',
      },
      icon: shallowRef(TreeListIcon),
      single:true,
    },
    children: [{path: '',name: 'Classify',component: Classify,}],
  },
];
