# vue-px-rem-cli3

```
自动补全浏览器厂商前缀兼容
"autoprefixer": "^8.0.0",

px 转 rem 
"postcss-px2rem": "^0.3.0",
"amfe-flexible": "^2.2.1",

package.json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8",
  "iOS >= 8",
  "Firefox >= 20",
  "Android >= 4.4"
]

vue.config.js
// CSS配置
css: {
  // 将组件内css提取到一个单独的css文件
  extract: true,
  sourceMap: false,
  loaderOptions: {
    postcss: {
      plugins: [
        // 新增内容
        require('autoprefixer')({}),
        require('postcss-px2rem')({ // 配置项，详见官方文档
          remUnit: 75, // 换算的基数
        }),
      ],
    },
  },
  modules: false,
},

```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
