var util = require('../../utils/util.js');
Page({
  data: {
    width:"",
    height:"",
    dis_d:"none",
    imgUrls:[]
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  imageLoad: function (e) {
    var img_w = e.detail.width;
    var img_h = e.detail.height;
    var ping_w='';
    var ping_h = '';
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        var ping_w = res.windowWidth;
        var ping_h = res.windowHeight;
        console.log()
        that.setData({
          width: ping_w,
          height: (img_w / ping_w) * ping_h,
          dis_d:"block"
        })
        console.log(ping_w)
        console.log((ping_h / ping_w) * img_w)
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getBanner',
      data: {
        type: "6" + options.ty
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          imgUrls: res.data.data
        })
      }
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