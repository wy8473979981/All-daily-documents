直接用npm update 方法更新，但是更新后发现package.json中对应的版本号并没有改变，于是查阅了一些资料和文章，借助npm-check-updates工具可以很方便的将package.json中的依赖包版本号更新为最新版本，下面介绍下该工具的使用，


```
1：安装

npm install npm-check-updates -g

npm install npm-check -g

2：1检查depedencies中的最新版本 npm-check-updates 或者 ncu

3： 更新dependencies到最新版本 ncu -u

```