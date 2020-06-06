var util = require("../../utils/util.js")
var flower = require('../../utils/flower.js')


Component({
  /**
   * 组件的属性列表
   */
  properties: {
   flower:{
     type: String,
     value: '点击选择花种'
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: {},
    animationFlowerMenu: {},
    flowerMenuIsShow: false,
    value: [0],
    flowertype: [],
    flower: '',
  },

  /**
   * 生命周期函数
   */
  lifetimes:{
    attached: function () {
      this.setData({
        flowertype: flower.flowertype,}
    )
  }},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 点击花的种类弹出选择框
   */
    selectDistrict: function (e) {
      var that = this
      if (that.data.flowerMenuIsShow) {
        return
      }
      that._startFlowerAnimation(true)
    },

    /**
     * 取消按钮
     */
    flowerCancel: function (a) {
      this._startFlowerAnimation(false)
    },

    /**
     * 确定按钮
     */
    flowerSure: function (e) {
      var that = this
      let value = that.data.value
      that._startFlowerAnimation(false)
      // 所选择的花种信息
      let flower_now = that.data.flowertype[value[0]].name
      console.log(flower_now)
      that.setData({
        flower: flower_now
      })
      that.triggerEvent('select', [flower_now, that.data.flowertype[value[0]].name])
    },

    /**
     * 执行动画
     */
    _startFlowerAnimation: function (isShow) {
      var that = this
      if (isShow) {
        that.animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        }),
        that.animation.translateY(0 + 'vh').step()
      } else {
        that.animation.translateY(40 + 'vh').step()
      }
      that.setData({
        animationAddressMenu: that.animation.export(),
        flowerMenuIsShow: isShow,
      })
    },

    /**
     * 点击蒙版时取消组件的显示
     */
    _hideFlowerSelected: function (a) {
      this._startFlowerAnimation(false)
    },


    _flowerChange: function (e) {
      let value = e.detail.value
      let flowertype = this.data.flowertype
      let flowertypeNum = value[0]
      // 如果花的种类选择项和之前不一样，表示滑动了花种，此时花的种类默认是花种的第一组数据，
      if (this.data.value[0] != flowertypeNum) {
        this.setData({
          value: [flowertypeNum]
        })
      } 
    }

  }
})