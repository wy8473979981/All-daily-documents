# 目录结构

GlpWeb 推荐目录如下:

```text
.
├─ docs   (文档)
├─ mock   (模拟数据服务)
│  ├─ index.js
│  ├─ controllers
│  └─ inits
├─ public   (静态资源)
├─ src
│  ├─ api   (api目录)
│  ├─ assets   (资源)
│  ├─ components   (全局组件)
│  ├─ config   (配置文件)
│  │   ├─ dictionary
│  │   ├─ home-page
│  │   └─ page
│  ├─ plugins   (插件)
│  │  ├─ auth
│  │  ├─ element-ui
│  │  ├─ glp-ui
│  │  ├─ http
│  │  └─ svg
│  ├─ router   (路由)
│  ├─ store (vuex)
│  │  ├─ index.ts
│  │  └─ modules
│  │     └─ app
│  ├─ styles   (样式)
│  │  ├─ utilities
│  │  ├─ element-ui-theme.scss
│  │  ├─ index.scss
│  │  ├─ reboot.sccs
│  │  └─ vars.scss
│  ├─ types   (类型)
│  ├─ utils   (辅助工具)
│  ├─ views   (视图)
│  │  ├─ error
│  │  ├─ layout
│  │  ├─ login
│  │  └─ pages
│  ├─ App.vue
│  ├─ main.ts
├─ .env
├─ .env.development
├─ .env.development.local
├─ .env.production
├─ .env.stagging
├─ .eslintrc.js
├─ .gitignore
├─ .npmrc
└─ .vue.config.js

```

::: tip 命名规范
  一般的模块都是使用文件夹来导入， 模块入口(index.vue, index.js, index.ts, index.scss);
  局部组件都是放在相应层级的 `components` 文件夹中。
:::

- `docs` : 文档目录， 此文档的储存目录

- `mock` : 模拟数据相关， 储存路由， 初始化数据等

- `public` : 静态资源， 不经过 webpack 打包

- `src` : 源代码目录

  - `api` ： api 声明集合， 所以的 http 请求都应使用 $http 插件

  - `assets` : 资源目录， 经 webpack 打包

  - `components` : 项目内公用全局组件

  - `config` : 项目配置文件

    - `dictionary` : 字典配置， 目前全部为本地字典

    - `home-page` : 不同角色主页配置

    - `page` : 页面配置， 配置页面、菜单以及路由
  
  - `plugins` : vue 插件

    - `auth` : 认证及授权插件, 支持统一登录以及普通登录模式

    - `element-ui` : 引入 element-ui 插件

    - `glp-ui` : glp UI组件

    - `http` : http 插件

    - `svg` : svg 图片插件

  - `router` : 路由相关

  - `store` : vuex 相关，请按模块添加

  - `styles` : 样式目录

    - `utilities` : 工具样式集合

    - `element-ui-theme.scss` : element-ui 主题定制

    - `reboot.scss` : 浏览器一致性处理

    - `vars.scss` : 样式变量

  - `types` : 类型引入

  - `utils` ： 工具函数集合

  - `views` : 视图页面

    - `error` : 错误页面 404 403

    - `layout` : 布局页面， 包含侧边栏、头部、以及主题内容， pages 的所有页面都嵌套在主题内容中

    - `login` : 登录页面， 只有普通认证过模式下用到

    - `pages` : 页面，与 /config/page 中配置对应 

  - `App.vue` : 页面根节点

  - `main.ts` : 入口

  - `env.**` : 多环境配置文件

  - `vue.config.js` : vue/cli 脚手架相关配置



