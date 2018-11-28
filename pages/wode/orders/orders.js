Page({
  data: {
    order_num:'0',
    order_mon: '0',  
    data_time:[],
    data_ii_f:[]  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var data_ii_f_ = this.data.data_ii_f;
    wx.request({
      url: getApp().globalData.url_+'index/api2/getOrderCount',
      data: {
        'openid': getApp().globalData.openid,
      },
      method: 'POST',
      success: function (res) {
        var data_ = res.data.data;
        for (var i = 0; i < data_.length;i++)
        {
          if(i==0)
          {
            data_ii_f_[i]=true;
          }
          else{
            data_ii_f_[i]=false;
          }
        }
        that.setData({
          data_time: data_,
          data_ii_f:data_ii_f_
        })
      }
    })
  },
  // 时间切换
  li_tab_btn:function(e){
    var index_ = e.currentTarget.dataset.index;
    console.log(index_)
    var data_ii_f_ = this.data.data_ii_f;
    for (var i = 0; i < data_ii_f_.length;i++)
    {
      data_ii_f_[i]=false;
    }
    data_ii_f_[index_]=true;
    this.setData({
      data_ii_f: data_ii_f_
    })
    console.log(data_ii_f_)
  },
  // 详情
  xiangqing_fn:function(e){
    var index_ = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../wode_orders/wode_orders?id=' + getApp().globalData.openid + "&periods=" + index_
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