## Build Setup

```bash
# 克隆项目
git clone http://10.10.10.188/pd-web/res-web-admin.git

# 进入项目目录
cd res-web-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve/npm start

# 打包dev环境
npm run build:dev

# 打包prod环境
npm run build:prod
```