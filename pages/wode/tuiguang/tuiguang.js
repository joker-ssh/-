
Page({
  data: {
   order_lis:[],
   dan_num:"0",
   ren_num:"0"        
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (getApp().globalData.openid != "") {
      that.jiazai()
    } else {
      var dingshi_ = setInterval(function () {
        if (getApp().globalData.openid != "") {
          clearInterval(dingshi_);
          that.jiazai()
        }
      }, 50)
    }
  },
jiazai:function()
{
  var that=this;
  wx.showLoading({
    title: '正在加载',
  })
  wx.request({
    url: getApp().globalData.url_ +'index.php/index/user/getMyExtension',
    data: {
      openid: getApp().globalData.openid
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res)
      that.setData({
        order_lis: res.data.data.userlist,
        dan_num: res.data.data.ordercount,
        ren_num: res.data.data.usercount,              
      })
      wx.hideLoading()
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