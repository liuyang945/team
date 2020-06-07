App({
  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env: "flower-aypew",
      traceUser: true,
    })
  }
})