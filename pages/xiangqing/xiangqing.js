// pages/xiangqing/xiangqing.js（废）
Page({
  data: {
   id:"",
   goods:{}
  },
  yu_img:function(e)
  {
    var imgs=[];
    imgs[0] = e.target.dataset.img;
    wx.previewImage({
      current: e.target.dataset.img, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
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
   // ----领券

  // ----领券
  lingjuan:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getGoodsinfo', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var data_= res.data.data.go_path2;
        wx.navigateToMiniProgram({
          appId: 'wx13e41a437b8a1d2e',
          path: data_,
          extraData: {
            id: that.data.id
          },
          envVersion: 'release',
          success(res) {
            console.log("*************")
            console.log(res)
            // 打开成功
          }
        })
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
      url: getApp().globalData.url_ +'index.php/index/index/getGoodsinfo', //仅为示例，并非真实的接口地址
      data: {
        id: id_,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("111111111111111")
        console.log(res)
        var goods = res.data.data.go_path1;
        wx.setNavigationBarTitle({
          title: res.data.data.goodsName
        })
        that.setData({
          goods: res.data.data
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