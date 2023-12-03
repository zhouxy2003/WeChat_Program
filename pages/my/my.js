// pages/my/my.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    userName: "点击头像登录",
    userAddVita:true,
    userShowVita:true,
    companyAddVita:false,
    companyShowVita:false,
    islogin:false,
    isCompany:false,
    isUser:false,
    isVisible: false,
    isloginOut:false,
    companyName:"",
    companyKey:"",
    comArr:[],
  },
  gotoAdd(){
    console.log(1);
    if(this.data.islogin){
      wx.navigateTo({
        url: '/pages/userAdd/userAdd',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },
  gotoShow(){
    if(this.data.islogin){
      wx.navigateTo({
        url: '/pages/userData/userData',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },
  gotoAddcCompany(){
    wx.navigateTo({
      url: '/pages/companyAdd/companyAdd',
    })
  },
  gotoShowcCompany(){
    wx.navigateTo({
      url: '/pages/companyData/companyData',
    })
  },
  gotoCompany(){
    this.setData({
      isVisible:true
    })
  },
  gotoCompanyCheck(){
    console.log(this.data.companyName,this.data.companyKey);
    this.data.comArr.forEach(val=>{
      if(val.company===this.data.companyName&&val.password===this.data.companyKey){
        console.log("登录成功");
        app.globalData.showUser=true;
        app.globalData.showCompany=false;
        this.setData({
          isVisible:false,
          companyName:"",
          companyKey:"",
          isUser:true,
          isCompany:false,
          userAddVita:false,
          userShowVita:false,
          companyAddVita:true,
          companyShowVita:true,
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
        return;
      }
      
    })
  },
  gobackMy(){
    this.setData({
      isVisible:false,
      companyName:"",
      companyKey:""
    })
  },
  gotoUsers(){
    console.log(1);
    app.globalData.showUser=false;
    app.globalData.showCompany=true;
    this.setData({
      isCompany:true,
      isUser:false,
      userAddVita:true,
      userShowVita:true,
      companyAddVita:false,
      companyShowVita:false,
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  gotoOut(){
    this.setData({
      islogin:false,
      avatarUrl: defaultAvatarUrl,
      userName: "点击头像登录",
      isCompany:false,
      isUser:false,
      isVisible: false,
      isloginOut:false,
      
    })
    app.globalData.userPhoto = "https://z1.ax1x.com/2023/11/30/pirBUKI.png";
    app.globalData.showUser=false;
    app.globalData.showCompany=true;
  },
  gotoUp(){
    wx.showModal({
      title: '提示',
      content: '已是最新版本',
    })
  },
//登录
  onChooseAvatar(e) {
    if(!this.data.isshow){
      const { avatarUrl } = e.detail;
    app.globalData.userPhoto = avatarUrl;
    // wx.setStorageSync('globalData', app.globalData.userPhoto)
    console.log(app.globalData);
    console.log(e);
    this.setData({
      avatarUrl,
      islogin:!this.data.islogin,
      isloginOut:!this.data.isloginOut,
      isCompany:true
    })
    let name;
    wx.getUserInfo({
      success: (res) => {
        console.log(res);
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        name = nickName;
        this.setData({
          userName: name
        })
      }
    }) 
    }
  },
  nameChange(e){
    this.setData({
      companyName:e.detail.value
    })
  },
  keyChange(e){
    this.setData({
      companyKey:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      comArr:app.globalData.companyDataArr
    })
    console.log(this.data.comArr);
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