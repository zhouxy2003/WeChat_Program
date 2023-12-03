// pages/userAdd/userAdd.js
import {
  areaList
} from "../../areaData/area-data/dist/data";
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    name: "",
    phone: "",
    password: "",
    confirmPwd: "",
    email: "",
    job: "",
    salary: "",
    features: "",
    area: "110110",
    areaString: "",
    isShowNameErr: false,
    isShowPhoneErr: false,
    isShowKeyErr: false,
    isShowEmailErr: false,
    isShowJobErr: false,
    isShowSalaryErr: false,
    isShowFeaturesErr: false,
    isShowAreaErr: false,
    clickArea: false,
    isAddDataBase: false
  },
  //name双向绑定
  nameChange(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //电话
  phoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //密码
  passwordChange(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password);
  },
  //确认密码
  AgainPasswordChange(e) {
    this.setData({
      confirmPwd: e.detail.value
    })

  },

  //邮箱
  emailChange(e) {
    this.setData({
      email: e.detail.value
    })
  },
  //岗位
  jobChange(e) {
    this.setData({
      job: e.detail.value
    })
  },
  //薪资
  salaryChange(e) {
    this.setData({
      salary: e.detail.value
    })
  },
  //技术特点
  featuresChange(e) {
    this.setData({
      features: e.detail.value
    })
  },

  //地区信息
  areacChange(e) {
    console.log(e.detail.values);
    let str = "";
    e.detail.values.forEach((val,index) => {
      if(index!==0){
        str += val.name;
      }
    })
    this.setData({
      areaString: str,
      clickArea: true
    })
  },
  //获取所有信息
  getAllData() {
    //如果没有提交
    if (!this.data.isAddDataBase) {
      let ap = this.data;
      console.log(ap);
      //点击先判断如果之前弹窗警告了，但输入正确后 隐藏弹窗
      let conditions = [
        ap.area,
        ap.name,
        ap.password,
        ap.confirmPwd,
        ap.email,
        ap.job,
        ap.salary,
        ap.features,
        ap.areaString
      ];
      let names = [
        "name",
        "phone",
        "password",
        "confirmPwd",
        "email",
        "job",
        "salary",
        "features",
        "areaString"
      ];
      let nameStr = [];
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].trim() !== "" && names[i]) {
          // console.log(names[i] + "字段为空");
          nameStr.push(names[i])
        }
      }
      console.log(nameStr);
      for (let i = 0; i < nameStr.length; i++) {
        switch (nameStr[i]) {
          case 'name':
            this.setData({
              isShowNameErr: false
            })
            break;
          case 'phone':
            this.setData({
              isShowPhoneErr: false
            })
            break;
          case 'password':
            this.setData({
              isShowKeyErr: false
            })
            break;
          case 'email':
            this.setData({
              isShowEmailErr: false
            })
            break;

          case 'job':
            this.setData({
              isShowJobErr: false
            })
            break;
          case 'salary':
            this.setData({
              isShowSalaryErr: false
            })
            break;
          case 'features':
            this.setData({
              isShowFeaturesErr: false
            })
            break;
        }
      }
      if(ap.features.trim()!==""){
        this.setData({
          isShowFeaturesErr:false
        })
      }
      if(ap.name.trim()!==""){
        this.setData({
          isShowNameErr:false
        })
      }
      if (ap.password === ap.confirmPwd) {
        this.setData({
          isShowKeyErr: false
        })
      }
      if (ap.clickArea) {
        this.setData({
          isShowAreaErr: false
        })
      }
      //判断是否存在空值
      if (ap.name.trim() !== "" && ap.phone.trim() !== "" && ap.password.trim() !== "" && ap.confirmPwd.trim() !== "" && ap.email.trim() != "" && ap.job.trim() !== "" && ap.salary.trim() !== "" && ap.features.trim() !== "" && ap.areaString.trim() !== "" && ap.clickArea && ap.password === ap.confirmPwd) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        //增加数据
        let str=[];
        if(ap.features.includes(',')){
          str=ap.features.split(',')
        }
        else if(ap.features.includes('，')){
          str=ap.features.split('，')
        }
        else if(ap.features.includes(' ')){
          str=ap.features.split(' ')
        }
       
        console.log("str",str);
        const db = wx.cloud.database();
        db.collection('job').add({
          data:{
            area:ap.areaString,
            company:ap.name,
            email:ap.email,
            id:Date.now(),
            job:ap.job,
            order:str,
            password:ap.password,
            phone:ap.phone,
            salary:ap.salary
          }
        }).then(res => {
          this.setData({
            isAddDataBase: true
          })
          console.log('添加成功')
          //更新数据
          app.globalData.isUpdateUser = true;
        })
        console.log("信息正确");
      }
      //这是判断是否空
      else {
        wx.showModal({
          title: '提示',
          content: '信息有误，请重新确认',
        })
        let conditions = [
          ap.area,
          ap.name,
          ap.password,
          ap.confirmPwd,
          ap.email,
          ap.job,
          ap.salary,
          ap.features,
          ap.areaString
        ];
        let names = [
          "name",
          "phone",
          "password",
          "confirmPwd",
          "email",
          "job",
          "salary",
          "features",
          "areaString"
        ];
        let nameStr = [];
        for (let i = 0; i < conditions.length; i++) {
          if (conditions[i].trim() === "" && names[i]) {
            // console.log(names[i] + "字段为空");
            nameStr.push(names[i])
          }
        }
        console.log(nameStr);
        for (let i = 0; i < nameStr.length; i++) {
          switch (nameStr[i]) {
            case 'name':
              this.setData({
                isShowNameErr: true
              })
              break;
            case 'phone':
              this.setData({
                isShowPhoneErr: true
              })
              break;
            case 'password':
              this.setData({
                isShowKeyErr: true
              })
              break;
            case 'email':
              this.setData({
                isShowEmailErr: true
              })
              break;

            case 'job':
              this.setData({
                isShowJobErr: true
              })
              break;
            case 'salary':
              this.setData({
                isShowSalaryErr: true
              })
              break;
            case 'features':
              this.setData({
                isShowFeaturesErr: true
              })
              break;
          }
        }
        if(ap.features.trim()===""){
          this.setData({
            isShowFeaturesErr:true
          })
        }
        if(ap.name.trim()===""){
          this.setData({
            isShowNameErr:true
          })
        }
        if (ap.password !== ap.confirmPwd) {
          this.setData({
            isShowKeyErr: true
          })
        }
        if (!ap.clickArea) {
          this.setData({
            isShowAreaErr: true
          })
        }
      }
    }
    else {
      wx.showModal({
        title: '提示',
        content: '您已成功添加，请勿重复点击',
        complete: (res) => {
          if (res.cancel) {

          }

          if (res.confirm) {

          }
        }
      })
    }
  }
})