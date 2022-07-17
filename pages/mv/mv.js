import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvlist:[],
    newMvlist:[],
    wycpMvlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMvTop()
    this.getMvNew()
    this.getRcmdMv()
  },
  //获取mv排行榜
  async getMvTop(){
    let {data} =await request("/top/mv",{limit:10})
    this.setData({
      topMvlist:data.data
    })
    console.log(data.data);
  },
  //最新MV速递
  async getMvNew(){
    let {data}=await request("/mv/first",{limit:10})
    this.setData({
      newMvlist:data.data
    })
  },
  //获取网易mv
  async getRcmdMv(){
    let {data}=await request("/mv/exclusive/rcmd",{limit:10})
    this.setData({
      wycpMvlist:data.data
    })
  }
  //获取网易出品MV
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ,onReady() {

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