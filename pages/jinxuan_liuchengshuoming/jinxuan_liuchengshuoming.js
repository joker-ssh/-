// pages/jinxuan_liuchengshuoming/jinxuan_liuchengshuoming.js
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo:'{}',
    hasUserInfo: false,
    order_:'',
    zhanghao_: '',
    name_: ''
  },
  butieliucheng: function () {
    // wx.navigateTo({
    //   url: '../jinxuan_liuchengshuoming/jinxuan_liuchengshuoming?'
    // })
    wx.navigateTo({
      url: '../jinxuan_liuchengshuoming/jinxuan_liuchengshuoming?'
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
        wx.navigateTo({
          url: '../wode/wode'
        })
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
  order_in: function (e) {
    var text_ = e.detail.value;
    console.log(text_)
    this.setData({
      order_: text_
    })
  },
  zhanghao_in: function (e) {
    var text_ = e.detail.value;
    this.setData({
      zhanghao_: text_
    })
  },
  name_in: function (e) {
    var text_ = e.detail.value;
    this.setData({
      name_: text_
    })
  },
  tijao_fn:function()
  {
    var that = this;
   var  order = this.data.order_;
    var zhanghao = this.data.zhanghao_;
    var name = this.data.name_;
    
    if (order && zhanghao && name)
    {

    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/inUserinfo', //仅为示例，并非真实的接口地址
      data: {
        orderid: this.data.order_,
        alipay: this.data.zhanghao_,
        alipayname: this.data.name_,
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_code==1)
        {
          wx.showToast({
            title: '提交成功',
            duration: 2000
          })
          that.setData({
            name_: '',
            zhanghao_: '',
            order_: '',            
          })
        }
        else{
          wx.showToast({
            title: '提交失败',
            image: '../../img/error.png',
            duration: 2000
          })
        }
       
      }
    })

    }
    else
    {
      wx.showToast({
        title: '请填写完整',
        image: '../../img/error.png',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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