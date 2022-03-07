module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "singleQuote": true, // 使用单引号
  "jsxSingleQuote": true, // 使用单引号
  "printWidth": 100, // 超过最大值换行
  "tabWidth": 2, //指定了一个缩进的长度。
  "htmlWhitespaceSensitivity": "ignore",
  "semi": false, // 结尾不用分号
  "disableLanguages": ["vue"] // 不格式化vue文件，vue文件的格式化单独设置
}
