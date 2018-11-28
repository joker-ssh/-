//app.js
var util = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.login_fn();
  },
  globalData: {
    userInfo: null,
    openid:"",
    pid:"",
    level:"",
    imgs_fen:"",
    code:"",
    url_:'',//域名
    Name: '红秀招',  
    id:''  
  },
  login_fn:function()
  {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: '获取中',
            mask: true,
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              getApp().globalData.userInfo = res.userInfo;
              wx.login({
                success: res => {
                  getApp().globalData.code = res.code;
                  if (wx.getStorageSync('openid') && wx.getStorageSync('id'))
                  {
                    getApp().globalData.openid = wx.getStorageSync('openid');
                    getApp().globalData.id = wx.getStorageSync('id');
                    
                    wx.request({
                      url: getApp().globalData.url_ + 'index.php/index/user/setUserInfo', //仅为示例，并非真实的接口地址
                      data: {
                        openid: getApp().globalData.openid,
                        username: getApp().globalData.userInfo.nickName,
                        img: getApp().globalData.userInfo.avatarUrl,
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        getApp().globalData.level = res.data.data.level;
                        wx.hideLoading();
                      }
                    })               
                  }
                  else{
                    wx.request({
                      url: getApp().globalData.url_ +'index.php/index/index/getWxLogin', //仅为示例，并非真实的接口地址
                      data: {
                        code: res.code
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        getApp().globalData.openid = res.data.data.openid;
                        getApp().globalData.id = res.data.data.id;
                        wx.setStorageSync('openid', res.data.data.openid);
                        wx.setStorageSync('id', res.data.data.id);             
                        wx.request({
                          url: getApp().globalData.url_ +'index.php/index/user/setUserInfo', //仅为示例，并非真实的接口地址
                          data: {
                            openid: getApp().globalData.openid,
                            username: getApp().globalData.userInfo.nickName,
                            img: getApp().globalData.userInfo.avatarUrl,
                          },
                          header: {
                            'content-type': 'application/json' // 默认值
                          },
                          success: function (res) {
                            getApp().globalData.level = res.data.data.level;
                            wx.hideLoading();
                          }
                        })
                      }
                    })
                  }
                  // --分享图片获取
                  util.GetShareImg()
                }
              })

            }
          })
        }
      }
    })

  },

})