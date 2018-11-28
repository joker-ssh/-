// pages/wode_dengjidingdan/wode_dengjidingdan.js（废）
Page({
  data: {
    openid:'',
    orderid:'',
    beizhu:''
  },
  zhuye_fn: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  dengji_sure_fn: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/user/setOrder', 
      data: {
        openid: getApp().globalData.openid,
        orderid: this.data.orderid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_code == 1) {
          wx.showToast({
            title: res.data.error_message,
            duration: 2000
          })
          that.setData({
            orderid: '',
            beizhu:""
          })
        }
        else {
          wx.showToast({
            title: '登记失败',
            image: '../../img/error.png',
            duration: 2000,
            success: function () {
              that.setData({
                orderid: '',
                beizhu: res.data.error_message
              })
            }
          })
        }
      }
    })
  },
  dengji_shu: function (e) {
    var text_ = e.detail.value;
    this.setData({
      orderid: text_
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: getApp().globalData.Name,
      path: 'pages/index/index?id=' + getApp().globalData.id,
      imageUrl: getApp().globalData.imgs_fen,
    }
  }
})