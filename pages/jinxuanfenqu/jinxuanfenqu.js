var util = require('../../utils/util.js');
Page({
  data: {
    goods: {},
    id: "",
    page: "1",
    jiazai_f: false,
    gengduo: false,
    search_: "",
    paixuzhi: '1',
    imgUrls: []
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  paixu: function (e) {
    console.log(e)
    this.setData({
      page: "0",
      goods: {},
      paixuzhi: e.target.dataset.order
    })
    this.jiazai();
  },
  sousuo_fn: function () {
    this.setData({
      page: "1"
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
    var id_ = options.currentTarget.dataset.type;
    var url_ = options.currentTarget.dataset.url;
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getJdlink',
      data: {
        goods_id: id_,
        discount_link: url_,
        openid: getApp().globalData.openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var data_ = res.data.data.go_path;
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
    })
  },
  jiazai: function () {
    var that = this;
    var jiazai_f_f = that.data.jiazai_f;
    var gengduo_f = that.data.gengduo;
    console.log(jiazai_f_f)
    console.log(gengduo_f)
    if (jiazai_f_f == false && gengduo_f!=true)
    {
      that.setData({
        jiazai_f: true,
        gengduo: false,
      })
      wx.request({
        url: getApp().globalData.url_ +'index.php/index/index/getJdSearch',
        data: {
          page: that.data.page,
          search: that.data.search_,
          rank:"sift"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (that.data.page == 1) {
            that.setData({
              goods: {}
            })
          }
          var goodsd = that.data.goods;
          if (goodsd.length > 0) {
            goodsd = goodsd.concat(res.data.data.data);
          }
          else {
            goodsd = res.data.data.data
          }
          console.log(goodsd.concat(res.data.data.data))
          var page_ = that.data.page;
          page_++;
          that.setData({
            goods: goodsd,
            page: page_,
            jiazai_f: false,
          })
          if (page_ > res.data.data.total_page) {
            that.setData({
              gengduo: true,
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
    var that = this;

    this.jiazai();
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getBanner',
      data: {
        type: "7"
      },
      header: {
        'content-type': 'application/json' // 默认值
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