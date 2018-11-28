 // 发送模板消息
function testSubmit(formId){
    var that = this;
    var form_id = formId;
    wx.request({
      url: getApp().globalData.url_ +'index/api2/saveformid',
      data: {
        'openid': getApp().globalData.openid,
        'form_id': form_id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        wx.navigateTo({
          url: '../wode/wode'
        })
        // console.log(e.detail.formId);
      },
      fail: function (err) {
        // fail
      },
      complete: function () {
        // complete
      }
    })
}

  // ----获取分享图片
function GetShareImg(){
  wx.request({
    url: getApp().globalData.url_ + 'index.php/index/index/getShareimg', //仅为示例，并非真实的接口地址
    data: {
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data.data.img)
      getApp().globalData.imgs_fen = res.data.data.img;
    }
  })
}
module.exports = {
  testSubmit: testSubmit,
  GetShareImg: GetShareImg
}