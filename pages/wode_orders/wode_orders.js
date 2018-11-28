// pages/wode_orders/wode_orders.js
Page({
  data: {
    orders:[],
    wu_f:false,
    page:"0",
    all:"",
    jiazai_f:false,
    zongjia_:[],
    more_f:false,
    periods:'',
    state:"0",
    data_ii_f:[true,false,false,false],
    data_tab: [{ name: '全部', type: '0' }, { name: '待审核', type: '1' }, { name: '待结算', type: '2' }, { name: '已结算', type: '3' }]
  },
  jiazai:function()
  {
    var that = this;
    if (that.data.jiazai_f==false)
    {
      that.setData({
        jiazai_f: true
      })
      wx.request({
        url: getApp().globalData.url_+'index/api2/getOrder',
        data: {
          openid: getApp().globalData.openid,
          page: that.data.page,
          periods: that.data.periods,
          state: that.data.state
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var page_ = that.data.page;
          var orders_ = that.data.orders;
          var all = res.data.data.count;
          var zong = that.data.zongjia_;
          var jia = [];
          if (!res.data.data.list.length && page_ == 1) {
            that.setData({
              wu_f: true,
            })
          }
          else {
            for (var j = 0; j < res.data.data.list.length; j++) {
              var jiage = 0;
              for (var i = 0; i < res.data.data.list[j].goods.length; i++) {
                var jia_ = res.data.data.list[j].goods[i].payPrice;
                jiage += parseFloat(jia_);
              }
              jia[j] = jiage;
            }
            that.setData({
              orders: orders_.concat(res.data.data.list),
              zongjia_: zong.concat(jia),
            })
          }
          page_++;
          that.setData({
            all: all,
            jiazai_f: false,
            page: page_
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    this.setData({
      periods: options.periods,
    })
    this.jiazai();
  },
  // 切换
  li_tab_btn: function (e) {
    console.log(e)

    var index_ = e.currentTarget.dataset.index;
    var type_ = e.currentTarget.dataset.type;
    console.log(index_)
    var data_ii_f_ = this.data.data_ii_f;
    for (var i = 0; i < data_ii_f_.length; i++) {
      data_ii_f_[i] = false;
    }
    data_ii_f_[index_] = true;
    this.setData({
      data_ii_f: data_ii_f_,
      state: type_,
      orders:[],
      page:'0'
    })
    this.jiazai();
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