// pages/zhifubao_bangding/zhifubao_bangding.js
Page({
  data: {
    zhanghao:'',
    name:'',
    phone:''
  },
  
  shouji_out: function (e) {
    var that = this;
    var phone_ = e.detail.value
    that.setData({
      phone: phone_
    })
  },
  zhanghao_out: function (e) {
    var that = this;
    var zhanghao_ = e.detail.value
    that.setData({
      zhanghao: zhanghao_
    })
  },
  name_out:function(e){
    var that=this;
    var name_ = e.detail.value
    that.setData({
      name: name_
    })
  },
  bangding_fn:function(){
    var that=this;
    if (!that.data.zhanghao)
    {
      wx.showToast({
        title: '账号不能为空',
        image: '../../img/error.png',
        duration: 2000
      })
    }
    else if (!that.data.name)
    {
      wx.showToast({
        title: '姓名不能为空',
        image: '../../img/error.png',
        duration: 2000
      })
    }
    else if (!that.data.phone)
    {
      wx.showToast({
        title: '手机号不能为空',
        image: '../../img/error.png',
        duration: 2000
      })
    }
    else
    {
      wx.request({
        url: getApp().globalData.url_ +'index.php/index/user/setAlipayInfo',
        data: {
          openid: getApp().globalData.openid,
          alipay: that.data.zhanghao,
          alipayname: that.data.name,
          phone: that.data.phone
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.error_code == 1) {
            wx.showToast({
              title: '绑定成功',
              duration: 2000,
              success: function () {
                wx.redirectTo({
                  url: '../wode/wode'
                })
              }
            })
          }

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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