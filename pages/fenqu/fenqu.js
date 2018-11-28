var util = require('../../utils/util.js');
Page({
  data: {
    goods:{},
    id:"",
    page:"",
    jiazai_f:false,
    gengduo:false,
    search_:"",
    paixuzhi:'1',
    imgUrls: []
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  paixu: function (e) {
    this.setData({
      page: "0",
      goods: {},
      paixuzhi: e.target.dataset.order,
      jiazai_f: false,
      gengduo: false,
    })
    this.jiazai();
  },
  sousuo_fn:function()
  {
    this.setData({
      page: "0",
      jiazai_f: false,
      gengduo: false,
    })
    this.jiazai();
  },
  sousuo_in: function (e) {
    var text_ = e.detail.value;
    this.setData({
      search_: text_
    })
  },
  xiangqing: function (options) {
    var that = this;
    var type_ = options.currentTarget.dataset.type;
    // wx.navigateTo({
    //   url: '../xiangqing/xiangqing?id=' + type_
    // })
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getGoodslink',
      data: {
        id: type_,
        openid: getApp().globalData.openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data_ = res.data.data.go_path;     
        if (res.data.error_message == "error") {
          wx.showToast({
            title: '商品已售罄',
            image: '../../img/error.png',
            duration: 2000
          })
        }
        else {
          wx.navigateToMiniProgram({
            appId: 'wx13e41a437b8a1d2e',
            path: data_,
            extraData: {
              id: that.data.id
            },
            envVersion: 'release',
            success(res) {
              // 打开成功
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  jiazai: function (){
    var that = this;
    if (that.data.jiazai_f == false && that.data.gengduo!=true)
    {
    
    that.setData({
      jiazai_f:true,
      gengduo:false,
    })
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getGoods',
      data: {
        pageIndex: that.data.page,
        pageSize: '10',
        type: that.data.id,
        search: that.data.search_,
        order: that.data.paixuzhi
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (that.data.page==0)
        {
          that.setData({
            goods: {}
          })
        }
        var goodsd = that.data.goods;
        if (goodsd.length > 0)
        {
          goodsd = goodsd.concat(res.data.data.info);
        }
        else
        {
          goodsd = res.data.data.info
        }
        var page_ = that.data.page;
        page_++;
        that.setData({
          goods: goodsd,
          page: page_,
          jiazai_f:false,
        })
        if (page_ * 10 >= res.data.data.count)
        {
          that.setData({
            gengduo: true,
          })
        }
          
      }
    })
    }
  },
  onLoad: function (options) {
    var id_ = options.type;
    var that = this;
    this.setData({
      id: id_
    })
    if (id_=="1")
    {
      wx.setNavigationBarTitle({
        title: "高返专区"
      })
    }
    else if (id_ == "2")
    {
      wx.setNavigationBarTitle({
        title: "拼购专区"
      })
    }
    else if (id_ == "3") {
      wx.setNavigationBarTitle({
        title: "半价专区"
      })
    }
    else if (id_ == "4") {
      wx.setNavigationBarTitle({
        title: "特惠专区"
      })
    }
  
    this.jiazai();
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getBanner',
      data: {
        type: id_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
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