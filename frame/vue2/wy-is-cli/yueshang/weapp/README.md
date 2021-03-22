# 宝龙驾驶舱小程序

## 通用方法

```js
const app = getApp();
```

### 缓存

```js
// 设置缓存数据，存入 localStorage
app.cache.set(key: string, value: any) 

// 根据关键字获取缓存数据（可配置默认值）
app.cache.get(key: string, defaultValue: any = null)

// 清除缓存
app.cache.clear(key: string)
```

### 请求

```js
// 请求封装，返回 Promise
app.request[method](url: string, payload: object)

// 请求参数配置 options() => 返回 request 本体
// 后续请求及联使用
// loading: 是否开启加载
// caching: 缓存（分钟）
app.options({ loading: true, caching: 2 })
```

### 页面跳转

```js
// query 自动拼接到 url
app.page.go(url: string, query: object) 

 // 返回
app.page.back(delta: number = 0)
```


## 组件

### <app-header />

```js
{
  "usingComponents": {
    "app-section": "../../../components/container/section",
  }
}
```

```html
<app-header>
  左侧内容
  <view slot="right">右侧区域内容</view>
  <view slot="bottom">底部区域内容</view>
</app-header>
```

### <app-section />

```js
{
  "usingComponents": {
    "app-section": "../../../components/container/section",
  }
}
```

```html
<app-section title="标题" collapseable="{{ true }}">
  <view slot="head-title">尾随标题内容</view>
  <view slot="head-actions">标题右侧内容</view>
  默认内容
</app-section>
```