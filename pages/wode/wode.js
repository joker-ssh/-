var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    info:"",
    back_bl:"#f3f3f3",
    tan_f:false,
    openid:"",
    zhifu_info:'',
    dengji_f:false,
    tixina_f:false,
    orderid:'',
    tian_shu_in:'',
    cuowu_:'',
    lev:"",
    erwei_box_f: false,
    erweimg: '',
    erwei_url: getApp().globalData.url_ +'index/web/qrcode?id=',
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  // 小程序码
  erweima_btn: function () {
    var that=this;
    wx.showLoading({
      title: '生成中',
    })
    wx.request({
      url: getApp().globalData.url_ + 'index/api2/createqrcode',
      data: {
        id: getApp().globalData.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          erwei_box_f: true,
          erweimg: res.data.data.img
        })
      }
    })
  },
  // naocunerweima_fn:function(){
  //   var that=this;
  //   console.log(that.data.erweimg)
  //   wx.saveImageToPhotosAlbum({
  //     filePath: "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
  //     success: (res) => {
  //       wx.showToast({
  //         title: '保存成功',
  //         icon: 'success',
  //         duration: 2000
  //       })
  //     },
  //     fail: (err) => {
  //       console.log(err)
  //     }
  //   })
  // },
  // 二维码关闭
  guanbi_ma_box: function () {
    this.setData({
      erwei_box_f: false
    })
  },
  // 预览二维码
  img_yulan: function () {
    var imgs = [];
    imgs[0] = this.data.erweimg;
    var img_ = this.data.erweimg;
    wx.previewImage({
      current: img_, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  // 我的推广跳转
  wode_tuiguang_fn:function()
  {
    wx.navigateTo({
      url: 'tuiguang/tuiguang'
    })
  },
  // 我的订单跳转
  chakan_fn:function()
  {
    wx.navigateTo({
      url: 'orders/orders?id=' + getApp().globalData.openid
    })
    // wx.navigateTo({
    //   url: '../wode_orders/wode_orders?id=' + getApp().globalData.openid
    // })
  },
  // ---------------------------废
  tian_shu_in:function(e)
  {
    var text_ = e.detail.value;
    this.setData({
      tian_shu_in: text_
    })
  },
  dengji_shu:function(e)
  {
    var text_ = e.detail.value;
    this.setData({
      orderid: text_
    })
  },
  dengli_fn:function()
  {
    wx.navigateTo({
      url: '../wode_dengjidingdan/wode_dengjidingdan?id=' + getApp().globalData.openid
    })
  },
  tian_sure_btn: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/user/putForward',
      data: {
        openid: getApp().globalData.openid,
        money: this.data.tian_shu_in
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.error_code == 1) {
          wx.showToast({
            title:"体现成功",
            duration: 2000
          })
          that.setData({
            tian_shu_in: ''
          })

        }
        else {
          wx.showToast({
            title: res.data.error_message,
            image: '../../img/error.png',
            duration: 2000,
            success: function () {
              that.setData({
                tian_shu_in: ''
              })
            }
          })

        }
      }
    })
  },
  dengji_sure_fn:function()
  {
    var that=this;
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
        if (res.data.error_code==1) {
          wx.showToast({
            title: res.data.error_message,
            duration: 2000
          })
          that.setData({
            orderid: '',
            tan_f:false
          })
          wx.request({
            url: getApp().globalData.url_ +'index.php/index/user/getUserInfo',
            data: {
              openid: getApp().globalData.openid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              that.setData({
                zhifu_info: res.data.data
              })
            }
          })
        }
        else
        {
          wx.showToast({
            title: '登记失败',
            image: '../../img/error.png',
            duration: 2000,
            success:function()
            {
              that.setData({
                  orderid:'',
                  cuowu_: res.data.error_message
              })
            }
          })
        
        }
      }
    })
  },
  tixian_fn:function()
  {
    this.setData({
      dengji_f: false,
      tan_f: true,
      tixina_f:true
    })
  },
  quxiao_tan_fn:function()
  {
    this.setData({
      tan_f: false
    })
  },
  // -------------------
  //修改信息
  xiugai_fn:function(){
    wx.navigateTo({
      url: '../zhifubao_bangding/zhifubao_bangding?id=' + getApp().globalData.openid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      info: getApp().globalData.userInfo,
      back_bl: 'white',
      lev: getApp().globalData.level
    })

    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/user/getUserInfo',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          zhifu_info: res.data.data
        })

        if (!res.data.data.alipay) {
          wx.showToast({
            title: '请先绑定支付宝',
            image: '../../img/error.png',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '../zhifubao_bangding/zhifubao_bangding?id=' + getApp().globalData.openid
              })
            }
          })
        }
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