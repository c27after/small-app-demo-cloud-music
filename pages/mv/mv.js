import request from '../../utils/request'
let cookie = "MUSIC_U=3f45bbf84182d23536a26c0832c279938182fe18fe02ee0f7ff297a2f77aeb80519e07624a9f00535fa3ec0f4faec3c719f3cdb7eb0a43001284833e6e1017d66afa8b2ffe57a4d6a89fe7c55eac81f3; Max-Age=1296000; Expires=Tue, 02 Aug 2022 02:03:42 GMT; Path=/;;MUSIC_A_T=1458031811944; Max-Age=2147483647; Expires=Sat, 05 Aug 2090 05:17:49 GMT; Path=/eapi/clientlog;"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // topMvlist:[],
    mvTagsList: [],
    tagsId: "",
    mvList: [],
    isRefresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getMvTop()
    // this.getMvNew()
    // this.getRcmdMv()
    this.getMvTags()
  },
  //获取mv排行榜
  // async getMvTop(){
  //   let {data} =await request("/top/mv",{limit:10})
  //   this.setData({
  //     topMvlist:data.data
  //   })
  // },
  handleTap(e) {
    let tagsId = e.currentTarget.id * 1
    this.setData({
      tagsId
    })
    this.getTagsVideo(tagsId)
  },
  async getMvTags() {
    let { data } = await request("/video/group/list")
    this.setData({
      mvTagsList: data.data.slice(0, 14),
      tagsId: data.data[0].id
    })
    this.getTagsVideo(data.data[0].id)

  },
  async getTagsVideo(id) {
    if (this.mvList !== null) {
      this.setData({
        mvList: []
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    let { data } = await request("/video/group", { id },"GET",{cookie})
    if (data.datas.length <= 0) {
      wx.showToast({
        title: "暂无视频推荐",
        icon: 'error'
      })
      return
    } else {
      this.setData({
        mvList: data.datas,
        isRefresh: false
      })

    }
    wx.hideLoading()
  },
  refreshHandle() {
    console.log("下拉刷新");
    this.getTagsVideo(this.data.tagsId)
  }
  ,lowerHandle(){
    wx.showToast({
      title: '没有更多了',
      icon:"none"
    })
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