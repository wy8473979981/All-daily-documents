## Build Setup
### 交互总台 - 前端工程

```bash
# 克隆项目
git clone ssh://git@10.10.10.188:2222/pd-web/ys-eip-adminweb.git

# 进入项目目录
cd ys-eip-adminweb

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
