// pages/userData/userData.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: "",
    ishowData: false,
    isVisible: true,
    username: "",
    userkey: "",
    user: "",
    key: "",
    Phone:"",
    degree:"",
    school:"",
    job:"",
    features:"",
    time:"",
    area:"",
    isRight:false,
    userTable: [],
    arr:[]
  },
  //检查是否一致
  gotoBlock() {
    this.data.userTable.forEach(val=>{
      if(val.name===this.data.username&&val.loginKey===this.data.userkey){
        this.setData({
          ishowData: true,
          isVisible: false,
          isRight:true,
          Phone:val.phone,
          // degree:val.degree,
          // school:val.school,
          // job:val.job,
          // features:val.features,
          // time:val.jobTime,
          // area:val.areaString
        })
        let temp=[];
        this.data.userTable.forEach(val=>{
          if(val.name===this.data.username&&val.loginKey===this.data.userkey){
            temp.push(val);
          }
        })
        this.setData({
          arr:temp
        })
        console.log(this.data.arr);
        return;
      }
    })
    if(!this.data.isRight){
      wx.showToast({
        title: '信息错误',
        icon: "error"
      })
    }
    
    
  },
  nameChange(e) {
    this.setData({
      username: e.detail.value
    })
    console.log(e.detail.value);
  },
  keyChange(e) {
    this.setData({
      userkey: e.detail.value
    })
    console.log(e.detail.value);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let url = app.globalData.userPhoto
    this.setData({
      userImg: url
    })
   this.setData({
     userTable:app.globalData.userArr
   })
   console.log(app.globalData.userArr);
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