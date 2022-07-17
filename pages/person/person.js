// pages/person/person.js
let starY = 0;
let moveY = 0;
let moveDistance = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: `translateY(${moveDistance})`,
    coverTransition: "transform 1s linear",
    islogin:false,
    userInfo: {}
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
    }else{
      let userInfo = JSON.parse(storeInfo)
      console.log(userInfo)
      this.setData({
        userInfo,
        islogin:true
      })
    }
  },
  // -----------------------滑块----------------------------
  handleTouchStart(e) {
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