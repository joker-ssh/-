// pages/zhuanlian/zhuanlian.js
var util = require('../../utils/util.js');
Page({
  data: {
    search_:'',
    search_jie:'',
    imgUrls: [],
    butie:""
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  // 复制
  fuzhi_fn:function(){
    wx.setClipboardData({
      data: this.data.search_jie,
      success: function (res) {
        console.log(res)
      }
    })
  },
  sousuo_in: function (e) {
    var text_ = e.detail.value;
    this.setData({
      search_: text_
    })
  },
  // 搜索
  sousuo_fn: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getLink2',
      data: {
        search: that.data.search_,
        openid: getApp().globalData.openid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.data.spreadUrl != '') {
          that.setData({
            search_jie: res.data.data.spreadUrl,
            butie: res.data.data.butie
          })
        }
        else
        {
          wx.showToast({
            title: '不符合的链接',
            image: '../../img/error.png',
            duration: 2000
          })
          that.setData({
            search_: ''
          })
        }
    
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getClipboardData({
      success: function (res) {
        var txt_ = res.data;
        if (txt_)
        {
          wx.showModal({
            title: '是否直接填入剪贴板内容',
            content: txt_,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  search_: txt_
                })
                that.sousuo_fn();
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        
      }
    })
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getBanner',
      data: {
        type: "5"
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