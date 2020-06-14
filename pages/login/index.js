// pages/login/index.js
var DB = wx.cloud.database();
const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    image: "cloud://flower-aypew.666c-flower-aypew-1302211687/image/SynchronousFireflies_ZH-CN6323931412_1920x1080.jpg"
  },

  onLoad: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              console.log("已登录")
              app.globalData.userInfo = res.userInfo

              wx.switchTab({
                url: '/pages/huajia/huajia',
              })
            },
          })
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      var openid = app.globalData.openid;
      console.log(openid)
      app.globalData.userInfo = e.detail.userInfo

      //判断数据库中是否已有用户
      DB.collection('User').where({
          openid: openid
        })
        .get({
          success: function (res) {
            console.log(res)
            if (res.data.length == 0) {
              DB.collection('User').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  openid: app.globalData.openid,
                  name: app.globalData.userInfo.nickName
                }
              })
            } else {
              console.log('success')
            }
          }
        })

      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/huajia/huajia'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
})