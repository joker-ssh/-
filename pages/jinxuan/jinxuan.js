// pages/xiangqing/xiangqing.js
var util = require('../../utils/util.js');
Page({
  data: {
    id: "",
    goods: {},
    jiazai:false
  },
  zhuye_fn: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  yu_img: function (e) {
    var imgs = [];
    imgs[0] = e.target.dataset.img;
    wx.previewImage({
      current: e.target.dataset.img, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  butieliucheng: function () {
    wx.navigateTo({
      url: '../jinxuan_liuchengshuoming/jinxuan_liuchengshuoming?'
    })
  },
  // ----领券
  lingjuan: function () {
    var that = this;
    wx.navigateToMiniProgram({
      appId: 'wx13e41a437b8a1d2e',
      path: that.data.goods.go_path,
      extraData: {
        id: that.data.id
      },
      envVersion: 'release',
      success(res) {
        console.log(res)
        // 打开成功
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id_ = options.id;
    var that = this;
    that.setData({
      id: id_
    })
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getJdInfo', //仅为示例，并非真实的接口地址
      data: {
        goods_id: id_,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          goods: res.data.data.data[0],
          jiazai:true
        })
        wx.setNavigationBarTitle({
          title: res.data.data.data[0].goods_name
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