// pages/huajia-detail/index.js
const DB = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var usrId = options.usrId
    var flowerId = '54bac78c5ec736b3000b9b2d4c18aab7' //options.flowrId
    var methodId = options.methodId
  options.flowrId
    DB.collection('Flower').doc(flowerId).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          flower: res.data
        })

        wx.setNavigationBarTitle({
          title: res.data.name,
        })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})