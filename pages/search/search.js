// pages/search/search.js
import request from '../../utils/request'
let isTrottle = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDefault: "",
    searchHotDetai: [],
    searchContent: '',
    actualTimeContent: [],
    resSongs: [],
    hisSearchList: []   //历史记录数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    isTrottle = true
    this.getSearchDefault()
    this.getSearchHotDetail()
    this.setData({
      hisSearchList: wx.getStorageSync('hisSearch') ? wx.getStorageSync('hisSearch') : []
    })

  },
  searchInputChange(e) {
    this.setData({
      searchContent: e.detail.value.trim()
    })
    this.getDimSearch()
  },
  getDimSearch() {
    if (this.data.searchContent === "") return
    if (this.data.searchContent.length >= 20) {
      wx.showToast({
        title: '超出最大搜索长度',
      })
      return
    }
    if (!isTrottle) return //false执行定时器
    setTimeout(async () => {
      let { data } = await request("/search", {
        keywords: this.data.searchContent,
        limit: 10
      })
      isTrottle = true
      if (JSON.stringify(data.result) === "{}") {
        wx.showToast({
          title: '暂无搜索内容',
          icon: "none"
        })
        return
      }
      this.setData({
        actualTimeContent: data.result.songs
      })
    }, 300)
    isTrottle = false
  },
  clearContent() {
    console.log("点了");
    this.setData({
      searchContent: '',
      resSongs: []
    })

  },
  async searchSongsHandle(e) {
    let { data } = await request("/search", { keywords: e.currentTarget.dataset.name, limit: 15 })
    let hisSearchList = this.data.hisSearchList
    hisSearchList.unshift(e.currentTarget.dataset.name.trim())
    hisSearchList = [...new Set(hisSearchList)]   // 数组去重
    if (hisSearchList.length > 8) {
      hisSearchList.splice(7, 1)
    }
    this.setData({
      resSongs: data.result.songs,
      hisSearchList
    })
    console.log(hisSearchList);
    wx.setStorageSync('hisSearch', hisSearchList)
  },
  delHis() {
    wx.showModal({
      content: "确定删除搜索记录",
      showCancel: true,
      cancelColor: "#000",
      confirmColor: "#d43c33"
      , success: () => {
        wx.removeStorageSync('hisSearch')
        this.setData({
          hisSearchList: []
        })
      }
    })
  },
  // trottle(fn, wait) {
  //   let timer = null
  //   return (...args) => {
  //     if (!timer) {
  //       timer = setTimeout(() => {
  //         fn.apply(this, args)
  //         timer = null
  //       }, wait)
  //     }
  //   }
  // },
  async getSearchDefault() {
    let { data } = await request("/search/default")
    this.setData({
      searchDefault: data.data.realkeyword
    })
  },

  async getSearchHotDetail() {
    let { data } = await request("/search/hot/detail")
    this.setData({
      searchHotDetai: data.data
    })
    console.log(data.data);
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