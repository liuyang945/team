// pages/huajia-detail/index.js
const DB = wx.cloud.database()
var usrId = ""
var flowerId = ""
var methodId = ""
var mid1Id = ""

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
    usrId = options.usrId //用户ID
    flowerId = '54bac78c5ec736b3000b9b2d4c18aab7' //options.flowrId
    methodId = '54bac78c5ec73958000bc97236711ace'  //方案ID
    mid1Id = '0bdd6b5e5ec739a50009573d434577c5'
    var time = new Date(); //时间
    
    //设置时间
    that.setData({
      nowDate: time.getTime()
    })

    //获取当前花的数据
    DB.collection('Flower').doc(flowerId).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          flower: res.data
        })

        //设置顶部导航栏标题
        wx.setNavigationBarTitle({
          title: res.data.name,
        })
      }
    })

    //获取方案数据
    DB.collection('Method').doc(methodId).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          method: res.data,
          water: res.data.water,
          env: res.data.env,
          attention: res.data.attention
        })
      }
    })
  },

  //监听页面渲染
  onShow: function(options) {
    var that = this
    DB.collection('Mid1').doc(mid1Id).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          mid1: res.data,
          watering: that.data.water - parseInt((that.data.nowDate - res.data.lastWatering)/(1000*60*60*24)),
        })
      }
    })
  },

  //浇水事件
  water: function (event) {
    console.log(this.data.nowDate)
    var that = this
    DB.collection('Mid1').doc(mid1Id).update({
      data: {
        lastWatering: that.data.nowDate
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    this.setData({
      watering: this.data.water
    })

    //弹窗提示
    wx.showToast({
      title: '浇水成功！', // 标题
      icon: 'success',  // 图标类型，默认success
      duration: 1500  // 提示窗停留时间，默认1500ms
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})