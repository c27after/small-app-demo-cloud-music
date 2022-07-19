import request from '../../utils/request'
let cookie = "MUSIC_U=3f45bbf84182d23536a26c0832c279938182fe18fe02ee0f7ff297a2f77aeb80519e07624a9f00535fa3ec0f4faec3c719f3cdb7eb0a43001284833e6e1017d66afa8b2ffe57a4d6a89fe7c55eac81f3; Max-Age=1296000; Expires=Tue, 02 Aug 2022 02:03:42 GMT; Path=/;;MUSIC_A_T=1458031811944; Max-Age=2147483647; Expires=Sat, 05 Aug 2090 05:17:49 GMT; Path=/eapi/clientlog;"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    playList: "",
    musicId: "",
    musicName: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSongsDetail(options.ids)
    this.BackgroundAudioManager = wx.getBackgroundAudioManager()
    //自动播放
    //必须开定时器，异步执行，否则一上来做为同步任务首先执行拿不到url的值 
    //不开定时器执行比getSongsDetail早
    setTimeout(() => {
      this.togglePlay()
    }, 500)
  },
  //获取歌曲详情
  async getSongsDetail(ids) {
    let { data } = await request("/song/detail", { ids }, "GET", { cookie })
    wx.setNavigationBarTitle({
      title: data.songs[0].name,
    })
    if (data.songs.length <= 0) {
      wx.showToast({
        title: '暂无版权或需要会员',
        icon: "none"
      })
      return
    } else {
      //添加到播放队列
      this.setData({
        playList: data.songs[0],
        musicId: data.songs[0].id,
        musicName: data.songs[0].name
      })
    }

  },
  //播放音乐
  togglePlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    let { isPlay, musicId, musicName } = this.data
    this.musicControl(isPlay, musicId, musicName)
    this.BackgroundAudioManager.onPlay(() => {
      this.setData({
        isPlay: true
      })
    })
    this.BackgroundAudioManager.onPause(() => {
      this.setData({
        isPlay: false
      })
    })
  },
  //获取音乐播放地址
  async musicControl(isPlay, musicId, musicName) {
    if (isPlay) {
      let { data } = await request("/song/url", { id: musicId }, "GET", { cookie })
      console.log(data);
      this.BackgroundAudioManager.src = data.data[0].url
      this.BackgroundAudioManager.title = musicName
    } else {
      this.BackgroundAudioManager.pause()
    }
  },
  delayPlay() {
    setTimeout(() => {
      this.BackgroundAudioManager.play()
    }, 1500)
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