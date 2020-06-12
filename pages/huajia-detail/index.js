// pages/huajia-detail/index.js
const DB = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate: "",
    methodId: "",
    mid1Id: "",
    flowerId: "",
    own: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var time = new Date(); //时间
    wx.showLoading({
      title: 'Loading...',
    })

    //设置时间
    that.setData({
      nowDate: time.getTime(),
      methodId: options.methodId,
      mid1Id: options.mid1Id,
      flowerId: options.flowerId,
      own: options.own
    })

    //获取当前花的数据
    DB.collection('Flower').doc(that.data.flowerId).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          flower: res.data,
          flowerSays: res.data.says
        })

        //设置顶部导航栏标题
        wx.setNavigationBarTitle({
          title: res.data.name,
        })
        wx.hideLoading()
      }
    })

    //获取方案数据
    DB.collection('Method').doc(that.data.methodId).get({
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
    if (that.data.own) {
       DB.collection('Mid1').doc(that.data.mid1Id).get({
        success: function(res) {
          console.log(res.data)
          that.setData({
            mid1: res.data,
            watering: that.data.water - parseInt((that.data.nowDate - res.data.lastWatering)/(1000*60*60*24)),
          })
        }
      })
    }
   
  },

  //浇水事件
  water: function (event) {
    console.log(this.data.nowDate)
    var that = this
    DB.collection('Mid1').doc(that.data.mid1Id).update({
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

  //添加方案
  addMethod: function(event) {
    var that = this

    DB.collection('Mid1').add({
      data: {
        flowerId: that.data.flowerId,
        flowerImg: that.data.flower.img,
        flowerName: that.data.flower.name,
        lastWatering: 0,
        methodId: that.data.methodId,
        openid: app.globalData.openid,
        userName: app.globalData.userInfo.nickName
      },
      success: function(res) {
        console.log(res)
        wx.reLaunch({
          url: '/pages/huajia/huajia',
        })
        //弹窗提示
        wx.showToast({
          title: '添加成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    })
    
  },

  //删除方案
  delMethod: function(event) {
    var that = this
    wx.showModal({
      title: '删除此方案',
      content: '确认删除？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          DB.collection('Mid1').doc(that.data.mid1Id).remove({
            complete: function(res) {
              console.log(res)
              console.log(that.data.mid1Id)
              wx.reLaunch({
                url: '/pages/huajia/huajia',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})