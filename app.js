var DB = wx.cloud.database
App({
  globalData: {
    userInfo: null,
    openid: null
  },

  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env: "flower-aypew",
      traceUser: true,
    })

    var that = this;

    that.getOpenid();
  },

  //获取openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res)
      that.globalData.openid = res.result.openid;
     }
    })
   }
})