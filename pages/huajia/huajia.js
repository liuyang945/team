var DB = wx.cloud.database()
var app = getApp()

Page({
  data:{
   myMethod: {}
  },
  onLoad: function(){
    var that = this
    var openid = app.globalData.openid

    //获取用户当前方案数目
    DB.collection('Mid1').where({
      openid: openid
    })
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          myMethod: res.data
        })
      }
    })
  },
})