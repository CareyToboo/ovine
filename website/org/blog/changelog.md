---
slug: changelog
title: 版本更新日志
---

- [如何升级 Ovine？](/org/docs/advance/cli#ovine-版本升级)
- [Ovine 计划表](/org/blog/plan)

### 0.1.4 ---- 2021.5.5

> 更新此版本后需要执行 `yarn dll` 与 `yarn scss`

- 主要功能
  - `ovine.config.js` 添加 `appKey`标识符，用于区分同域名下,不同`ovineApp`的 `localStorage`
  - 默认设置为 `dll: { useJsdelivr: true }`, 并当 `dll cdn` 配置生效时，不将 `dll` 目录下的文件复制到 `dist` 目录中
- 主要优化
  - 升级 `amis` 到 `1.1.5` 版本
  - 修复 权限面板的展示问题
  - 修复 初始化加载 主题 css 文件，可能会出现，界面抖动的情况
  - 修复 上传文件时 `receiver` 参数传入 `data: {}` 参数无效
  - 修复 文件下载时中文名称乱码

### 0.1.3 ---- 2021.4.13

> 更新此版本后需要执行 `yarn dll` 与 `yarn scss`

- 主要功能

  - 支持 `request`配置 `responseType: "blob"` 下载文件

- 主要优化
  - 升级 `amis` 到 `1.1.5` 版本
  - 升级 `amis-editor` 到 `2.0.14` 版本
  - 修复 字体文件 可能加载不到的情况
  - 修复 `init` 初始化模版的部分 BUG
  - 修复 `request` 模块部分小 BUG

### 0.1.2 ---- 2021.3.23

> 更新此版本后需要执行 `yarn dll` 与 `yarn scss`

- 主要功能
  - dll 文件支持 CDN 文件配置，多个项目同时使用 `ovine` 开发时，可共用 `DLL CDN` 文件，可减小 `dist` 目录 20M 大小。
  - 升级 @ovine/editor 添加 PC/移动端 预览，并将升级依赖 `amis-editor@2.0.11` 最新版
  - cli 添加了 `info` 命令，可通过 `yarn ovine info version` 查看版本信息。

* 主要优化
  - 添加 侧边栏 外链跳转支持
  - 修复 路由标切换时，标签未增加 BUG
  - 修复 请求模块相关的 BUG

### 0.1.1 ---- 2021.3.11

> 更新此版本后需要执行 `yarn dll` 与 `yarn scss`

- 主要优化
  - 升级 Amis 版本至 1.1.4（支持仿 ANTD 主题）
  - 修复 代码编辑器 语法校验失效 BUG
  - 修复 切换标签时查询条件丢失的情况 [issue](https://github.com/CareyToboo/ovine/issues/41)
  - 修复 请求模块 cache 参数异常 [issue](https://github.com/CareyToboo/ovine/issues/44)
  - 支持 非 JSON 返回的 API 请求

### 0.1.0 ---- 2021.1.10

[0.1.x 更新迁移文档](https://ovine.igroupes.com/org/blog/migration_v1)

- 主要新增功能

  - 拆离 `ovine/cli`，`ovine/core` 强依赖，可使用 `React` 完全自定义应用，不受 ovine 配置限制
  - 支持 使用自定义应用入口 `html template` 模版文件
  - 添加 `@ovine/editor` 包接入 `amis-editor` 与 `ovine` 完全兼容，可以实现在线编辑页面功能
  - ovine 配置支持中， 支持 “菜单/路由/权限 ” API 接口动态获取

- 优化

  - 将 `amis` 升级至 `1.1.0`
  - 将 dll 静态资源包，拆分为相对独立的小包，并支持 CDN 部署
  - 添加 微前端（比如 qiankun） 架构支持, 可做为子应用接入
  - `request` 模块
    - 优化该模块获取参数错误问题
    - 添加 `cache`参数，支持数据并发缓存，防止并发同时多次请求接口
    - 添加 `onFakeRequest` 参数，支持前端，使用伪装数据，而不必真实的向后端请求接口
    - `onFakeRequest,onPreRequest,onRequest,onSuccess` hooks 均支持 `async` 方法。
  - 应用编译配置 `ovine.config.js` 支持传入方法，返回配置。
  - 添加 全局 `app.amis.constants` 常量配置,可在应用中，任意地方引用。
  - 添加 侧边栏，子菜单可隐藏、多级菜单权限独立不互相影响

### 0.0.10 ---- 2020.10.15

> 更新此版本后需要执行 `yarn dll` 与 `yarn scss`

- 添加 `路由选项卡`
  - 支持拖拽排序
  - 右键菜单控制
  - 用户可自定义是否显示
- 添加 `快速回到顶部按钮`
- 将 `amis` 更新到 `1.0.17`

### 0.0.7 ---- 2020.8.11

> 更新此版本后需要执行 `yarn dll` 与 `yarn scss`

- 添加 对 App 实例 [`Hooks`](/org/docs/advance/configurations#应用配置) 回调控制，可用于读取 Api 动态控制 App 配置
- 添加 对远程 `JS` 配置文件支持
- 添加 `tsx` 文件对 svg 图标支持
- 支持 `Request` 模块的 [`Hooks`](http://localhost:7052/org/docs/modules/request#reqoption-%E9%80%89%E9%A1%B9) 回调传入字符串，对于 JSON 数据格式支持更加友好
- 修复 Video 渲染器报错
- 修复 Api 请求默认进入 Mock 逻辑 BUG
- 修复部分 UI 细节，按钮图标不垂直剧中等问题

### 0.0.6 ---- 2020.7.14

- 支持 [Amis Definitions](https://baidu.gitee.io/amis/zh-CN/docs/components/Definitions#definitions) 功能使用 `Function` 做 Json 转换
- `aside-layout` 中 `header,footer` 配置支持权限过滤
- 将 `demo` 模版变为初始化项目默认选项
- 修复项目在 `Safari 浏览器` 白屏 BUG

### 0.0.4 ---- 2020.7.6

> 更新此版本后需要执行 `yarn dll`

- 移除 `Amis` 配置中 `env.fetcher` 包裹的 `wrapperFetcher` 方法，所有请求逻辑均由 `Ovine` [请求模块控制](/org/docs/modules/request)
- 修复 `LimitSetting` 组件，在部分权限情况下，依然展示全部权限选项
- 调整 `getActionAddrMap` 返回数据。并在模版项目重新自定义了该部分逻辑
- 模版项目添加了登陆时权限检查功能

### 0.0.3 ---- 2020.6.26

- 修复 `url-loader` 正则文件匹配错误
- 修复 `url-loader` 排除了 `node_modules` 目录，因此会导致第三方包的资源文件引入报错
- 修复权限面板编辑时，弹窗提示报错 `QuckApiSchma is required`
- 修复 Table 分页时，数字与图标没有对齐
- 修复 `GET` 请求参数包含特殊字符，会被 encode 两次的问题

### 0.0.2 ---- 2020.6.20

> 更新此版本后需要执行 `yarn ovine dll`

- 将 lodash 加入 dll 打包文件中
- 修复 dev 开发时，出现异常热更新失效问题
- 修复权限面板选择权限时，选项出现的小抖动问题
- 添加 Demo 模版登陆窗口对移动端兼容

### 0.0.1 ---- 2020.6.17

- 发布 Ovine 正式基础版本

### 0.0.1-alpha.12

- 重构 `request` 模块，尽量与 `amis` 自带的 api 模块兼容
- 去除不必要配置 `constants.actionAddrMap` 需要用此功能需自行实现
- 重新整理了 `init` 项目的结构
- 更新到 `amis 1.0.14` 最新版
- 修复一系列已知道 BUG
  - 修复 windows 系统 使用 `@ovine/init` 初始化项目后 `build` 出现异常的问题
  - actionType 为 `url` 时无法跳转

### 0.0.1-alpha.11

- 暂时锁定 assets-webpack-plugin 为 3.9.12 版，因为 3.10 版本报错

### 0.0.1-alpha.10

- 支持 `amis definitions` 使用 `limits` 进行权限过滤
- `ovine cli` 添加 `--scss` 选项支持，对 `amis scss` 文件实时编译
- 修复权限组件，同步`api`权限 不匹配的 BUG。
- 添加 `demo` 模版
