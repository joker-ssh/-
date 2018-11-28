var util = require('../../utils/util.js');
Page({
  data: {
        goods:{},
        goods_b: {},
        goods_c: {},
        goods_d: {},
        search_:'',
        gngeduo_f_a:false,
        gngeduo_f_b: false,
        gngeduo_f_c: false,
        gngeduo_f_d: false,
        gngeduo_f_e: false,
        imgUrls: {},
        xianshi:[],
        info:"",
        b_id:"",
        tan_view_f:false,
        gonggao_box:''
  },
  // 点击我的，获得formid
  send_mess: function (e) {
    util.testSubmit(e.detail.formId)
  },
  // 轮播图跳转
  lunbo_tap:function (e) {
    var ur_ = e.currentTarget.dataset.url;
    if (ur_)
    {
      wx.navigateTo({
        url: ur_
      })
    }
  },
  // 拼购
  binggou:function(){
    wx.showModal({
      content: '拼购补贴商品请关注购物福利群的实时分享',
      success: function (res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
      }
    })
  },
  // ---------登录
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      getApp().globalData.userInfo = e.detail.userInfo;
      this.setData({
        info: e.detail.userInfo,
        back_bl: 'white'
      })
    wx.login({
      success: res => {
        wx.showLoading({
          title: '获取中',
          mask: true,
        })
        wx.request({
          url: getApp().globalData.url_ +'index.php/index/index/getWxLogin',
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
            if (that.data.b_id)
            {
              that.bang_id_fn();
            }
            wx.request({
              url: getApp().globalData.url_ +'index.php/index/user/setUserInfo',
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
        util.GetShareImg()//获取分享图片
      }
    })
    }
  },
  // -----------搜索输入
  sousuo_in:function(e){
      var text_ = e.detail.value;
      this.setData({
        search_: text_
      })
  },
  // 四区搜索
  fenqu_sousuo: function () {
    if (this.data.search_ != '') {
      wx.navigateTo({
        url: '../fen_sousuo/fen_sousuo?ty=' + this.data.search_
      })
    }
  },
  // 精选搜索
  sousuo_tiao:function(){
    if (this.data.search_!='')
    {
      wx.navigateTo({
        url: '../sousuo/sousuo?ty=' + this.data.search_
      })
    }
     
  },
  // -四区详情
  fenqu: function (options) {
    var thia = this;
    var type_ = options.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../fenqu/fenqu?type=' + type_
    })
  },
  // 跳转精选分区
  jinxuanfenqu: function (e) {
    // var ur_ = e.currentTarget.dataset.url;
    // console.log(ur_)
    // if (ur_)
    // {
    //   wx.navigateTo({
    //     url: '../jinxuanfenqu/jinxuanfenqu'
    //   })
    // }
    wx.navigateTo({
      url: '../jinxuanfenqu/jinxuanfenqu'
    })
  },
  // 精选商品跳京东
  jinxuan: function (options){
    var that=this;
    var id_ = options.currentTarget.dataset.id;
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
// -*------四区商品跳京东
  xiangqing: function (options)
  {
    var that=this;    
    var id = options.currentTarget.dataset.type;
    // wx.navigateTo({
    //   url: '../xiangqing/xiangqing?id=' + id
    // })
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getGoodslink', 
      data: {
        id: id,
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
  onLoad: function (options){
    var that=this;
    this.sousuo_fn();
    var that = this;
    // ------------分享参数
    var op_id = options.id;
    var scene = decodeURIComponent(options.scene);
    if (op_id) {
      that.setData({
        b_id: op_id
      })
    }
    else if (scene) {
      that.setData({
        b_id: scene
      })
    }
    else {
      that.setData({
        b_id: ''
      })
    }
    if (that.data.b_id == 'undefined' || that.data.b_id == '' || that.data.b_id == undefined) {
      that.setData({
        b_id: ''
      })
    }
    // --------绑定分享id
    if (getApp().globalData.openid != "") {
      that.setData({
        info: getApp().globalData.userInfo
      })
      if(that.data.b_id)
      {
        that.bang_id_fn();
      }
      // ------公告获取
      wx.request({
        url: getApp().globalData.url_ + 'index/api2/getadvice',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.data.img) {
            that.setData({
              gonggao_box: res.data.data.img,
              tan_view_f: true
            })
          }
        }
      })
    } else {
      var dingshi_ = setInterval(function () {
        if (getApp().globalData.openid != "") {
          clearInterval(dingshi_);
          that.setData({
            info: getApp().globalData.userInfo    
          })
          if (that.data.b_id)
          {
            that.bang_id_fn();             
          }
          // ------公告获取
          wx.request({
            url: getApp().globalData.url_ + 'index/api2/getadvice',
            data: {},
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.data.img) {
                that.setData({
                  gonggao_box: res.data.data.img,
                  tan_view_f: true
                })
              }
            }
          })
        }
      }, 50)
    }


    // 轮播获取
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getBanner',
      data: {
        type: "0"
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
    // 专区获取
    wx.request({
      url: getApp().globalData.url_ +'index.php/index/index/getZhuanquInfo',
      data: {
        type: "0"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          xianshi: res.data.data
        })
      }
    })
  },
  guan_tan_btn:function(){
    this.setData({
      tan_view_f: false
    })
  },
  // --------绑定id
  bang_id_fn(){
    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/api2/bindingid',
      data: {
        openid: getApp().globalData.openid,
        id: this.data.b_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      }
    })
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
  },
  // 搜索(过时)
  sousuo_fn: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/index/getJdSearch',
      data: {
        page: '1',
        num: '',
        search: that.data.search_,
        rank: 'sift'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.data.length <= 0) {
          that.setData({
            gngeduo_f_e: true
          })
        }
        else {
          that.setData({
            gngeduo_f_e: false
          })
        }
        that.setData({
          goods: res.data.data.data
        })
      }
    })
    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/index/getGoods',
      data: {
        pageIndex: '0',
        pageSize: '4',
        type: "1",
        search: that.data.search_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.info.length <= 0) {
          that.setData({
            gngeduo_f_a: true
          })
        }
        else {
          that.setData({
            gngeduo_f_a: false
          })
        }
        that.setData({
          goods_a: res.data.data.info
        })
      }
    })

    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/index/getGoods',
      data: {
        pageIndex: '0',
        pageSize: '4',
        type: "2",
        search: that.data.search_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.info.length <= 0) {
          that.setData({
            gngeduo_f_b: true
          })
        }
        else {
          that.setData({
            gngeduo_f_b: false
          })
        }
        that.setData({
          goods_b: res.data.data.info
        })
      }
    })
    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/index/getGoods',
      data: {
        pageIndex: '0',
        pageSize: '4',
        type: "3",
        search: that.data.search_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.info.length <= 0) {
          that.setData({
            gngeduo_f_c: true
          })
        }
        else {
          that.setData({
            gngeduo_f_c: false
          })
        }
        that.setData({
          goods_c: res.data.data.info
        })
      }
    })
    wx.request({
      url: getApp().globalData.url_ + 'index.php/index/index/getGoods',
      data: {
        pageIndex: '0',
        pageSize: '4',
        type: "4",
        search: that.data.search_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.data.info.length <= 0) {
          that.setData({
            gngeduo_f_d: true
          })
        }
        else {
          that.setData({
            gngeduo_f_d: false
          })
        }
        that.setData({
          goods_d: res.data.data.info
        })
      }
    })
  }
})