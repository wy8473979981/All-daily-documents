# 宝龙地产营销数据H5

## 关于企业微信API使用说明

```api
1、获取userId，企业微信后台配置转码链接地址
Demo：demo.powerlong.com
http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4f202d72f0e6c198&redirect_uri=http%3A%2F%2Fdemo.powerlong.com%2Fmarket_data_h5%2Findex.html&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
生产：pd.powerlong.com
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4f202d72f0e6c198&redirect_uri=https%3a%2f%2fpd.powerlong.com%2fmarket_data_h5%2findex.html&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
```


## 组件引用

```js
import pageHeader from "@/components/page-header/page-header.vue"
```

## 组件注入

```js
components: {
	pageHeader
}
```

## 组件使用

```html
<page-header></page-header>
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
// 请求封装
this.$http('get','index',{})
this.$http('post','index',{})
```

### 页面跳转

```js
// query 自动拼接到 url
app.page.go(url: string, query: object) 

 // 返回
app.page.back(delta: number = 0)
```
