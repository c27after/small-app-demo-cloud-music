import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    bannerList:[],
    recommendList:[],
    hotHySong:[],//华语热搜歌单
    //歌单数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //结构赋值 获取轮播图数据
   let {data} =await request("/banner",{type:2})
   //获取推荐歌单
   let res =await request("/personalized",{limit:10})
   let songs =await request("/top/playlist",{
     cat:"华语",
     limit:5,
     order:"hot"
   })
   this.setData({
     bannerList:data.banners,
    recommendList:res.data.result,
    hotHySong:songs.data.playlists
   })
  },
  goToRec(){
    wx.navigateTo({
      url: '../recommendSongs/recommendSongs',
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
  onShareAppMessage: function () {
    
  }
})