module.exports = {
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          // 新增内容
          require("autoprefixer")({}),
          require("postcss-pxtorem")({
            //配置项，详见官方文档
            remUnit: 75, // 换算的基数
          }),
        ],
      },
    },
    modules: false,
  },
};
