import { app } from '@rtadmin/core/lib/app'
import { coreStatic, storage } from '@rtadmin/core/lib/constants'
import { setAppLimits } from '@rtadmin/core/lib/routes/limit/exports'
import { getStore } from '@rtadmin/core/lib/utils/store'

import { mockSource as loginMock } from './pages/login/mock'

app.create({
  env: {
    // 默认配置
    default: {
      domains: {
        api: 'https://test-api.com',
      },
    },
    // 本地开发
    localhost: {
      domains: {
        api: 'https://test-api.com',
      },
    },
    // 测试环境
    staging: {
      domains: {
        api: 'https://test-api.com',
      },
    },
    // 生产环境
    production: {
      domains: {
        api: 'https://prod-api.com',
      },
    },
  },
  entry: [
    {
      type: 'preset-route', // 路由组件
      path: '/login',
      pathToComponent: true,
    },
    {
      type: 'private-route', // 私有路由
      path: '/',
      redirect: '/login',
      onAuth: async () => {
        const userInfo = await app.request<{ limit: string }>({
          url: 'GET api/v1/user_info',
          mockSource: loginMock,
        })
        setAppLimits(userInfo.data.limit || getStore(storage.dev.limit) || '')
        return true
      },
      children: {
        type: 'aside-layout',
        header: {
          showDevItem: false,
          brand: {
            // 公司品牌
            logo: `${coreStatic}/favicon.ico`,
            title: 'RT-ADMIN',
            link: {
              title: 'dashboard',
              href: '/',
            },
          },
          items: [
            {
              type: 'item-setting',
              align: 'right',
            },
          ],
        },
        routes: [
          // 应用内路由
          {
            nodePath: '/',
            label: '侧边栏目录',
            children: [
              {
                path: '/',
                label: 'Dashboard',
                nodePath: 'dashboard',
                exact: true,
                pathToComponent: 'dashboard',
                sideVisible: false,
              },
              {
                label: '快速开始',
                icon: 'fa fa-coffee',
                nodePath: 'start',
              },
              {
                label: '系统管理',
                icon: 'fa fa-wrench',
                nodePath: 'system',
                children: [
                  {
                    label: '管理员用户',
                    nodePath: 'user_list',
                  },
                  {
                    label: '管理员权限',
                    nodePath: 'user_limit',
                    pathToComponent: 'system/user_limit',
                  },
                  {
                    label: '系统操作日志',
                    nodePath: 'user_log',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ],
})
