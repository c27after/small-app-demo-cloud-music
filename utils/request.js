// 发送ajax请求
//url地址
//data参数
//method请求方法 默认为get请求
export default (url,data,method="GET")=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      // es6模板字符串
      url:`http://localhost:4000${url}`,
      data,
      method,
      success:(res)=>{
        console.log('发送成功',res)
        resolve(res)
      },
      fail:(err)=>{
        console.log('发送失败',res)
        reject(err)
      },
    })
  })
}