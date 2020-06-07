// pages/huajia-detail/index.js
const DB = wx.cloud.database()
<<<<<<< Updated upstream

=======
<<<<<<< HEAD
>>>>>>> Stashed changes
var usrId = ""
var flowerId = ""
var methodId = ""
var mid1Id = ""
=======
>>>>>>> team

Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< Updated upstream

=======
<<<<<<< HEAD
    
=======

>>>>>>> team
>>>>>>> Stashed changes
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
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
=======
    var that = this
    var usrId = options.usrId
    var flowerId = '54bac78c5ec736b3000b9b2d4c18aab7' //options.flowrId
    var methodId = options.methodId
  options.flowrId
>>>>>>> team
    DB.collection('Flower').doc(flowerId).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
<<<<<<< HEAD
          flower: res.data,
          flowerSays: res.data.says
        })

        //设置顶部导航栏标题
=======
          flower: res.data
        })

>>>>>>> team
        wx.setNavigationBarTitle({
          title: res.data.name,
        })
      }
    })
<<<<<<< HEAD

    //获取方案数据
    DB.collection('Method').doc(methodId).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          method: res.data,
          methodName: res.data.name,
          water: res.data.water,
          env: res.data.env,
          attention: res.data.attention
        })
      }
    })

    //获取页面高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-177
        });
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
=======
>>>>>>> team
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})