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
    Degree: "",
    school: "",
    job: "",
    salary: "",
    features: "",
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    time: "",
    area: "110110",
    areaString: "",
    isShowNameErr: false,
    isShowPhoneErr: false,
    isShowKeyErr: false,
    isShowDegreeErr: false,
    isShowSchoolErr: false,
    isShowJobErr: false,
    isShowSalaryErr: false,
    isShowFeaturesErr: false,
    isShowTimeErr: false,
    clickTime: false,
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

  //学历
  DegreeChange(e) {
    this.setData({
      Degree: e.detail.value
    })
  },
  //学校
  schoolChange(e) {
    this.setData({
      school: e.detail.value
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
  //时间
  timeChange(e) {
    console.log(e.detail);
    this.setData({
      time: e.detail,
      clickTime: true
    })
    console.log(this.data.time);

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
    if (!this.data.isAddDataBase) {
      let ap = this.data;

      //点击先判断如果之前弹窗警告了，但输入正确后 隐藏弹窗
      let conditions = [
        ap.name,
        ap.phone,
        ap.password,
        ap.confirmPwd,
        ap.Degree,
        ap.school,
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
        "Degree",
        "school",
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

          case 'Degree':
            this.setData({
              isShowDegreeErr: false
            })
            break;

          case 'school':
            this.setData({
              isShowSchoolErr: false
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
      if (ap.password === ap.confirmPwd) {
        this.setData({
          isShowKeyErr: false
        })
      }
      if (ap.clickTime) {
        this.setData({
          isShowTimeErr: false
        })
      }
      if (ap.clickArea) {
        this.setData({
          isShowAreaErr: false
        })
      }
      //判断是否存在空值
      if (ap.name.trim() !== "" && ap.phone.trim() !== "" && ap.password.trim() !== "" && ap.confirmPwd.trim() !== "" && ap.Degree.trim() !== "" && ap.school.trim() != "" && ap.job.trim() !== "" && ap.salary.trim() !== "" && ap.features.trim() !== "" && ap.areaString.trim() !== "" && ap.clickTime && ap.clickArea && ap.password === ap.confirmPwd) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        //增加数据
        let date = new Date(ap.time);
        let year = date.getFullYear();
        let mon = date.getMonth() + 1;
        let datetime = `${year}年${mon}月`;
        // console.log(datetime);
        const db = wx.cloud.database();
        db.collection('users').add({
          data:{
            areaString: ap.areaString,
            degree: ap.Degree,
            features: ap.features,
            id: Date.now(),
            job: ap.job,
            jobTime: datetime,
            loginKey: ap.password,
            name: ap.name,
            phone: ap.phone,
            salary:ap.salary,
            school: ap.school,
          }
        }).then(res => {
          this.setData({
            isAddDataBase: true
          })
          console.log('添加成功')
           //更新数据
           app.globalData.isUpdateCompany=true;
        })
        console.log("信息正确");
      }
      else {
        wx.showModal({
          title: '提示',
          content: '信息有误，请重新确认',
        })
        let conditions = [
          ap.name,
          ap.phone,
          ap.password,
          ap.confirmPwd,
          ap.Degree,
          ap.school,
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
          "Degree",
          "school",
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

            case 'Degree':
              this.setData({
                isShowDegreeErr: true
              })
              break;

            case 'school':
              this.setData({
                isShowSchoolErr: true
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
        if (ap.password !== ap.confirmPwd) {
          this.setData({
            isShowKeyErr: true
          })
        }
        if (!ap.clickTime) {
          this.setData({
            isShowTimeErr: true
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