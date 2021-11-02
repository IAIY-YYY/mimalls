module.exports = {
  "presets": [//环境预设的一些解码规则
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [//辅助性的一些插件
    [
      "component",
      {//elementUI的配置
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
