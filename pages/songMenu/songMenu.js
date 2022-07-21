import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlistDetail:{},
    playlistTrackAll:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    this.getPlaylistDetail(options.id)
    this.getPlaylistTrackAll(options.id)
  },
  async getPlaylistDetail(id){
    let {data} = await request("/playlist/detail",{id})
    this.setData({
      playlistDetail:data
    })
  },
  ///playlist/track/all
  async getPlaylistTrackAll(id){
    let {data} = await request("/playlist/track/all",{id,limit:15})
    console.log(data.songs);
    this.setData({
      playlistTrackAll:data.songs
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