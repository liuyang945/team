const DB = wx.cloud.database()
Page({
  data: {
    addressId: "",
    flowerId: "",
    methodId: ""
  },

  /**
   * 地址选择
   */
  addressSelecter(e){
    console.log(e)
    this.setData({
      addressId: e.detail[1]
    })
   },
   flowerSelecter(e){
     console.log(e)
     this.setData({
       flowerId: e.detail[1]
     })
   },
   jumpPage:function(){
    var that = this
    var north = parseInt(that.data.addressId)>300000 ? false : true
    DB.collection('Method').where({
      north: north,
      flowerId: that.data.flowerId
    })
    .get({
      success: function(res) {
        console.log(res)
        if (res.data.length != 0) {
          that.setData({
            methodId: res.data[0]._id
          })
          wx.navigateTo({
          url: '/pages/huajia-detail/index?own='+""+'&flowerId='+that.data.flowerId+'&methodId='+that.data.methodId,
          })
        } else {
          console.log('fail')
          //弹窗提示
          wx.showToast({
            title: '抱歉！暂无此方案', // 标题
            icon: 'none',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        }
      }
    })
    
   }
})