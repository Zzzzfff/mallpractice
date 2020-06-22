module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,   // 视窗的宽度，对应的是我们设计稿的宽度(retina 高清屏1点2个像素 设计稿：iPhone6(750x1334))
      viewportHeight: 667,  // 视窗的高度，对应的是我们设计稿的高度,(可以不配置)
      unitPrecision: 5,     // 指定需要转换成的视窗单位，建议使用vw，vw是宽度，vh是高度
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],   // 指定不需要转换的类
      minPixelValue: 1,     // 小于或等于1px不转换为视窗单位
      mediaQuery: false,    // 允许在媒体查询中转换px
      exclude: [/TabBar/]   // 指定不需要转换的文件，文件匹配必须是正则，含有TabBar字符的文件不转换
    }
  }
}