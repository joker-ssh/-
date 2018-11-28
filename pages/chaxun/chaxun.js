var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_:'',
    goods:{},
    goods_fa:false,
    zongjia_:0.00,
    jiazai_f:false,
    shijians:''
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  sousuo_fn: function () {
    var that = this;
    
    that.setData({
      jiazai_f:true
    })
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getOrderinfo',
      data: {
        orderId: that.data.search_,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.data && res.data.data.goods.length>0) {
          var zongjia_a=0;
          that.setData({
            goods: res.data.data,
            goods_fa:true,
            jiazai_f: false
          })
          for (var i = 0; i < res.data.data.goods.length;i++)
          {
            var jia_ = res.data.data.goods[i].payPrice;
            zongjia_a += parseFloat(jia_);
          }
          that.setData({
            zongjia_: zongjia_a
          })
       
        }
        else {
          wx.showToast({
            title: '不符合的订单号',
            image: '../../img/error.png',
            duration: 2000
          })
          that.setData({
            goods: res.data.data,
            goods_fa: false,
            jiazai_f: false
          })
        }

      }
    })
  },
  sousuo_in: function (e) {
    var text_ = e.detail.value;
    this.setData({
      search_: text_
    })
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