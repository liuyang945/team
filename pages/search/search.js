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
    var north = true
    DB.collection('Method').where({
      north: true,
      flowerId: that.data.flowerId
    })
    .get({
      success: function(res) {
        console.log(res)
        that.setData({
          methodId: res.data[0]._id
        })
        wx.navigateTo({
        url: '/pages/huajia-detail/index?own='+""+'&flowerId='+that.data.flowerId+'&methodId='+that.data.methodId,
        })
      }
    })
    
   }
})