# 快速上手

::: warning 注意
请确保你的 Node.js 版本 >= 10
:::


## 启动项目

以开发模式启动：

::: tip
如果需要连接到其他主机进行调试， 请在 .env.development.local 添加相应地址，
例如： `VUE_APP_API_URL = http://172.16.6.212:8080/gateway/forward/pyla/api`
:::

```shell

# 启动dev 
pnpm run server

# 启动mock-server服务
pnpm run mock:start

```

测试环境构建
::: tip
构建前请先在 .env.stagging 添加测试环境相应配置参数，
例如： `VUE_APP_APP_ID = GLP92468f621d47aba1`
:::

```shell
pnpm run build:stg
```

生产环境构建
::: tip
构建前请先在 .env.production 添加生产环境相应配置参数，
例如： `VUE_APP_APP_ID = GLP92468f621d47aba1`
:::

```shell
pnpm run build:prod
```

