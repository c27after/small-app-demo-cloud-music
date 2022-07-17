// pages/person/person.js
let starY = 0;
let moveY = 0;
let moveDistance = 0;
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: `translateY(${moveDistance})`,
    coverTransition: "transform 1s linear",
    islogin: false,
    userInfo: {},
    myLoveSongMenu: {},
    RencentlyPlaySongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //读取用户信息
    let storeInfo = wx.getStorageSync('userInfo')
    console.log(storeInfo === '')
    if (storeInfo === '') {
      wx.showToast({
        title: '请先登录',
        icon: "error"
      })
    } else {
      let userInfo = JSON.parse(storeInfo)
      console.log(userInfo)
      this.setData({
        userInfo,
        islogin: true
      })
    }
    //获取用户的id
    let uid = JSON.parse(wx.getStorageSync('userInfo')).account.id
    this.getUserLoveSongMenu(uid)
    //获取用户最近听歌信息
    // this.getUserRencentlyPlaySongs(uid)
    this.getUserStatus()
  },
  //获取用户喜欢的歌单的函数
  async getUserLoveSongMenu(uid) {
    let { data } = await request("/user/playlist", {
      uid
    })
    this.setData({
      myLoveSongMenu: data
    })
  },
  //获取最近播放记录
  async getUserRencentlyPlaySongs(uid) {
    let { data } = await request("/user/record", {
      uid,
      type: 1
    })
    console.log(data);
  },
  //获取用户登陆状态
  async getUserStatus() {
    let res =await request("/login/status")
    console.log("登陆状态", res);
  },
  //退出登陆
  logout() {
    request("/logout")
    this.setData({
      islogin:false,
      userInfo:{}
    })
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
    wx.showToast({
      title: '退出成功',
    })

  }
  // -----------------------滑块----------------------------
  , handleTouchStart(e) {
    starY = e.touches[0].clientY;
  },
  handleTouchMove(e) {
    this.setData({
      coverTransition: ""
    })
    moveY = e.touches[0].clientY;
    moveDistance = moveY - starY
    if (moveDistance <= 0) {
      return
    }
    if (moveDistance >= 100) {
      moveDistance = 100
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouched() {
    this.setData({
      coverTransform: "translateY(0rpx)",
      coverTransition: "transform 1s linear"
    })
  },
  // -----------------------滑块----------------------------
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})