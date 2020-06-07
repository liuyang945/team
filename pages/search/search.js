Page({
  /**
   * 地址选择
   */
  addressSelecter(e){
    console.log(e)
   },
   flowerSelecter(e){
     console.log(e)
   },
   jumpPage:function(){
     wx.navigateTo({
       url: '/pages/huajia-detail/index',
     })
   }
})