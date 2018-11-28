// pages/gongbox/gong.js
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
  
  },
  zhuye_fn:function()
  {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  zhuanglian: function () {
    wx.navigateTo({
      url: '../zhuanlian/zhuanlian'
    })
  },
  // 发送模板消息
  testSubmit: function (e) {
    var that = this;
    console.log(getApp().globalData.code)
    console.log(e)
    wx.request({
      url: getApp().globalData.url_ +'index/api2/saveformid',
      data: {
        'openid': getApp().globalData.openid,
        'form_id': e.detail.formId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        // wx.navigateTo({
        //   url: '../wode/wode'
        // })
        console.log('成功' + res);
        // console.log(e.detail.formId);
      },
      fail: function (err) {
        // fail
        console.log('失败' + err);
      },
      complete: function () {
        // complete
      }
    })
  },
  shuomin: function () {
    wx.navigateTo({
      url: '../guice/guice?ty=1'
    })
  },
  chaxun: function () {
    wx.navigateTo({
      url: '../chaxun/chaxun'
    })
  },
  wy_fn: function () {
    wx.navigateTo({
      url: '../wode/wode'
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
  }
})