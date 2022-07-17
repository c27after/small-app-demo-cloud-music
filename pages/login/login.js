// 登陆流程
// 1.收集表单项数据
// 2.前端验证 
//   2.1 验证输入信息是否合法
// 3.后端验证
//   3.1 验证用户是否存在
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  handleInput(e) {
    let type = e.currentTarget.id
    this.setData({
      [type]: e.detail.value
    })
  },
  //登陆验证

  async login() {
    let { phone, pwd } = this.data

    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "error"
      })
      return
    }
    //正则
    let reg = /^1[3-9]\d{9}$/
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: "error"
      })
    }
    if (!pwd) {
      wx.showToast({
        title: '密码不能为空',
        icon: "error"
      })
      return
    }
    let { data } = await request("/login/cellphone", { phone, password: pwd })
    console.log("咩",data)
    if (data.code === 200) {
      wx.showToast({
        title: '登陆成功',
        icon: "success"
      })
     wx.reLaunch({
      url: "../person/person",
      success(){
        wx.showToast({
          title: '登陆成功',
        })
      }
     })
      wx.setStorageSync('userInfo', JSON.stringify(data))
      wx.setStorageSync('token', data.token)
    } else if (data.code === 400) {
      wx.showToast({
        title: '手机号不存在',
        icon: "error"
      })
    } else if (data.code === 500) {
      wx.showToast({
        title: '密码错误',
        icon: "error"
      })
    } else {
      wx.showToast({
        title: '登陆失败',
        icon: "error"
      })
    }
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