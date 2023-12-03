// pages/sty/sty.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyArr: [],
    usersArr:[],
    dataColor: "background-color: rgb(246, 246, 246);",
    boxColor: "background-color: white",
    jobColor: "color: black",
    blockColor: " background-color: rgb(246, 246, 246),color: rgb(105, 105, 105);;",
    topColor: "background-color: black",
    isDark: false,
    showLayer: false,
    showDia: false,
    hrPhoneNum: "",
    hrEmail: "",
    userImg: "https://z1.ax1x.com/2023/11/30/pirBUKI.png",
    list: [],
    userArr: [],
    showUser:false,
    showCompany:true,
    isUpdateUser:false,
    isUpdateCompany:false,
  },
  darkWeb() {
    if (!this.data.isDark) {
      this.setData({
        dataColor: "background-color: rgb(19,19,20);",
        boxColor: "background-color: rgb(75,80,80);",
        jobColor: "color:#f1f1f1",
        blockColor: " background-color: rgb(38, 38, 41),color:#f1f1f1;",
        topColor: "background-color:rgb(19,19,20)"
      })


      wx.setTabBarStyle({
        backgroundColor: '#193133', // 设置背景颜色为红色
        color: '#f1f1f1', // 设置未选中图标和文字的颜色为白色
        selectedColor: '#f1f1f1' // 设置选中图标和文字的颜色为黑色
      });
      this.setData({
        isDark: !this.data.isDark
      })
    }
    else {
      this.setData({
        dataColor: "background-color: rgb(246, 246, 246);",
        boxColor: "background-color: white",
        jobColor: "color: black",
        blockColor: " background-color: rgb(246, 246, 246),color: rgb(105, 105, 105);;",
        topColor: "background-color: black",
      })

      wx.setTabBarStyle({
        backgroundColor: '#ffffff', // 设置背景颜色为红色
        color: '#000000', // 设置未选中图标和文字的颜色为白色
        selectedColor: '#000000' // 设置选中图标和文字的颜色为黑色
      });
      this.setData({
        isDark: !this.data.isDark
      })
    }
    console.log(app.globalData.showUser);
  }
  ,
  // 搜索 11/28新增加
  selectData(e) {
    // console.log(e.detail.value.trim()==="");
    console.log(this.data.showCompany,this.data.showUser);
    //输入不为空 显示包含搜索条件值
    if(this.data.showCompany){
      if (e.detail.value.trim() !== "") {
        console.log(e.detail.value.trim());
        this.setData({
          companyArr: this.data.companyArr.filter(val => val.job.includes(e.detail.value.trim()))
        })
        console.log(this.data.companyArr);
      }
      //输入为空 显示所有
      else {
        console.log(true);
        this.setData({
          companyArr: this.data.list
        })
      }
    }
    else{
      if (e.detail.value.trim() !== "") {
        console.log(e.detail.value.trim());
        this.setData({
          usersArr: this.data.usersArr.filter(val => val.job.includes(e.detail.value.trim()))
        })
        console.log(this.data.companyArr);
      }
      //输入为空 显示所有
      else {
        console.log(true);
        this.setData({
          usersArr: this.data.userArr
        })
      }
    }

  },
  getblock(e) {
    // console.log(e.currentTarget.dataset.id);
    // console.log(this.data.companyArr[this.data.companyArr.length - 1]);
    let temp = this.data.showCompany===true?this.data.list.filter(val => val.id === e.currentTarget.dataset.id):this.data.userArr.filter(val => val.id === e.currentTarget.dataset.id);
    // console.log(temp[0]);
    this.setData({
      showDia: true,
      showLayer: true,
      hrPhoneNum: temp[0].phone,
      hrEmail:  this.data.showCompany===true?temp[0].email:temp[0].areaString
    })
  },
  btnHR() {
    this.setData({
      showDia: false,
      showLayer: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const db = wx.cloud.database();
    // console.log(db);
    let that = this;
    //公司数据
    db.collection('job').get({
      success: function (res) {
        let comData = [];
        for (let i = 0; i < res.data.length; i++) {
          comData.push(res.data[i]);
        }
        that.setData({
          companyArr: comData,
          list: comData
        });
        app.globalData.companyDataArr = comData;
        console.log(comData[0]._id);
      }
    });
    //用户数据
    db.collection('users').get({
      success: function (res) {
        let comData = [];
        for (let i = 0; i < res.data.length; i++) {
          comData.push(res.data[i]);
        }
        that.setData({
          userArr:comData,
          usersArr:comData
        });
        app.globalData.userArr = comData;
        console.log(comData);
      }
    })

    
  },
  onShow() {
    this.setData({
      isUpdateUser:app.globalData.isUpdateUser,
      isUpdateCompany:app.globalData.isUpdateCompany,
    })
    if(app.globalData.isUpdateUser){
    const db = wx.cloud.database();
    // console.log(db);
    let that = this;
    //公司数据
    db.collection('job').get({
      success: function (res) {
        let comData = [];
        for (let i = 0; i < res.data.length; i++) {
          comData.push(res.data[i]);
        }
        that.setData({
          companyArr: comData,
          list: comData
        });
        app.globalData.companyDataArr = comData;
        console.log(comData[0]._id);
      }
    });
    app.globalData.isUpdateUser=false;
    }
    if(app.globalData.isUpdateCompany){
      const db = wx.cloud.database();
      // console.log(db);
      let that = this;
      //用户数据
      db.collection('users').get({
        success: function (res) {
          let comData = [];
          for (let i = 0; i < res.data.length; i++) {
            comData.push(res.data[i]);
          }
          that.setData({
            userArr:comData,
            usersArr:comData
          });
          app.globalData.userArr = comData;
          console.log(comData);
        }
      })
      app.globalData.isUpdateCompany=false;
    }
    let temp = app.globalData.userPhoto;
    
    if (temp !== '') {
      console.log(temp);
      this.setData({
        userImg: temp
      })
    }
    this.setData({
      showUser: app.globalData.showUser,
      showCompany: app.globalData.showCompany,
    
    })
  },
  


})