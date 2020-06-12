var util = require("../../utils/util.js")
var address = require('../../utils/city.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
   address:{
     type: String,
     value: '点击选择地址'
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    address: '',
  },

  /**
   * 生命周期函数
   */
  lifetimes:{
    attached: function () {
      let id = address.provinces[0].id
      this.setData({
        provinces: address.provinces,
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 点击地址的种类弹出选择框
   */
    selectDistrict: function (e) {
      var that = this
      if (that.data.addressMenuIsShow) {
        return
      }
      that._startAddressAnimation(true)
    },

    /**
     * 取消按钮
     */
    cityCancel: function (e) {
      this._startAddressAnimation(false)
    },

    /**
     * 确定按钮
     */
    citySure: function (e) {
      var that = this
      let value = that.data.value
      that._startAddressAnimation(false)
      // 所选择的地址信息
      let address_now = that.data.provinces[value[0]].name +
       ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
      console.log(address_now)
      that.setData({
        address: address_now
      })
      that.triggerEvent('select', [address_now, that.data.provinces[value[0]].id,
        that.data.citys[value[1]].name, that.data.areas[value[2]].name])
    },

    /**
     * 执行动画
     */
    _startAddressAnimation: function (isShow) {
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
        addressMenuIsShow: isShow,
      })
    },

    /**
     * 点击蒙版时取消组件的显示
     */
    _hideCitySelected: function (e) {
      this._startAddressAnimation(false)
    },


    
    _cityChange: function (e) {
      let value = e.detail.value
      let provinces = this.data.provinces
      let citys = this.data.citys
      let areas = this.data.areas
      let provinceNum = value[0]
      let cityNum = value[1]
      let countyNum = value[2]
      // 如果省份选择项和之前不一样，表示滑动了省份的种类，此时城市默认是省的第一组数据，
      if (this.data.value[0] != provinceNum) {
        let id = provinces[provinceNum].id
        this.setData({
          value: [provinceNum, 0, 0],
          citys: address.citys[id],
          areas: address.areas[address.citys[id][0].id],
        })
      } else if (this.data.value[1] != cityNum) {
        // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
        let id = citys[cityNum].id
        this.setData({
          value: [provinceNum, cityNum, 0],
          areas: address.areas[citys[cityNum].id],
        })
      } else {
        // 滑动选择了区
        this.setData({
          value: [provinceNum, cityNum, countyNum]
        })
      }
    },

  }
})