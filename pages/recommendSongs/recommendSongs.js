// pages/recommendSongs/recommendSongs.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dailySongs: [],
    day: "",
    month: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        success:()=>{
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      })
      return
    }
    this.getRecSongs()
  },
  toDetail(e){
    let ids = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/songDetail/songdetail?ids='+ids,
    })
  },
  async getRecSongs() {
    wx.showLoading({
      title: '加载中',
    })
    let { data } = await request("/recommend/songs", null, "GET", {
      cookie: "MUSIC_U=3f45bbf84182d23536a26c0832c279938182fe18fe02ee0f7ff297a2f77aeb80519e07624a9f00535fa3ec0f4faec3c719f3cdb7eb0a43001284833e6e1017d66afa8b2ffe57a4d6a89fe7c55eac81f3; Max-Age=1296000; Expires=Tue, 02 Aug 2022 02:03:42 GMT; Path=/;;MUSIC_A_T=1458031811944; Max-Age=2147483647; Expires=Sat, 05 Aug 2090 05:17:49 GMT; Path=/eapi/clientlog;"
    })
    this.setData({
      dailySongs: data.data.dailySongs
    })
    wx.hideLoading()
  }
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  , onReady() {

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