module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "ant-design-vue",
        "styleLibraryName": "theme-chalk",
        "style": true
      }
    ]
  ]
}
