App({
  onLaunch() {
   wx.cloud.init({
       env:"wxprogram-3g75c27k07e64dfb",//配置环境ID，在云服务控制台右上角可获取
      //  traceUser:true//是否将用户访问记录到用户管理中，在云开发控制台可见
   })
 
  },
  globalData: {
    userPhoto:"",
    companyDataArr:[],
    userArr:[],
    showUser:false,
    showCompany:true,
    isUpdateUser:false,
    isUpdateCompany:false,
    analyesName:"",
    percentage:0,
    exponentialArr:[],
  }
})

