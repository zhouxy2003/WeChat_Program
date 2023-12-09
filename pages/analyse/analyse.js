import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

// radar chart init function
//雷达
function initRadarChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  getApp().globalData.onexponentialArrChange = function (val) {
    radarOption.series[0].data[0].value = val;
    chart.setOption(radarOption);
  }

  var radarOption = {
    backgroundColor: "#ffffff",
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [
        {
          name: '学历',
          max: 1000
        },
        {
          name: '入职时间',
          max: 1000
        },
        {
          name: '技能',
          max: 1000
        },
        {
          name: '年龄',
          max: 1000
        },
        {
          name: '薪资',
          max: 1000
        }
      ]
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: app.globalData.exponentialArr,
          name: '指数'
        }
      ]
    }]

  };
  chart.setOption(radarOption);




  return chart;
}

// gauge chart init function
//简历得分
function initGaugeChart(canvas, width, height, dpr) {
  // console.log(app.globalData);
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  // 在 app.js 中定义一个事件监听器
  getApp().globalData.onPercentageChange = function (value) {
    // 更新 gaugeOption 中的 value
    gaugeOption.series[0].data[0].value = value;
    // 重新设置图表的配置项
    chart.setOption(gaugeOption);
  };
  //请求测试
  var gaugeOption = {
    backgroundColor: "#ffffff",
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return ' A';
            } else if (value === 0.625) {
              return ' B';
            } else if (value === 0.375) {
              return ' C';
            } else if (value === 0.125) {
              return ' D';
            }
            return '';
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '';
          },
          color: 'inherit'
        },
        data: [
          {
            value: (app.globalData.percentage),
            name: '简历得分'
          }
        ]
      }
    ]
  };





  chart.setOption(gaugeOption);
  return chart;
}

Page(
  {
    data: {
      standard: {
        agestandard: [22, 23, 26, 32]
      },
      isShow:false,
      isChart1:true,
      isAi:false,
      username:"",
      userkey:"",
      name:"",
      userImg: app.globalData.userPhoto,
      aiAnswer:"",
      // 用户id，单人
      userid: "",
      // 用户得分列表
      userscorelist: [],
      // 储存用户数据的对象
      dataOBJ: [{

      }],
      // userName:"简历分析",
      ec: {
        onInit: function (canvas, width, height, dpr) {
          // const radarChart = initRadarChart(canvas, width, height, dpr);
          const gaugeChart = initGaugeChart(canvas, width, height, dpr);
          // now you have two charts in one canvas
          return {
            // radarChart,
            gaugeChart
          };
        }
      },
      ec1: {
        onInit: function (canvas, width, height, dpr) {
          const radarChart = initRadarChart(canvas, width, height, dpr);
          // const gaugeChart = initGaugeChart(canvas, width, height, dpr);
          // now you have two charts in one canvas
          return {
            radarChart,
            // gaugeChart
          };
        }
      }
      //简历数据存放区
      ,
    },
    nameChange(e){
      this.setData({
        username:e.detail.value
      })
    },
    keyChange(e){
      this.setData({
        userkey:e.detail.value
      })
    },
    view(){
      this.setData({
        isShow:true,
        isChart1:false
      })
    },
    no(){
      this.setData({
        isShow:false,
        isChart1:true,
        isAi:false,
      })
    },
    yes(){
      app.globalData.userArr.forEach(val=>{
        if(val.name===this.data.username&&val.loginKey===this.data.userkey){
          this.setData({
            aiAnswer:""
          })
          const url_token = "https://aip.baidubce.com/oauth/2.0/token?client_id=hi0uWUpMrlpQ4UxnyX5PmKXu&client_secret=HParNc0D1AvzAKY2sqbvCjIKuvhqOpmY&grant_type=client_credentials";

          wx.request({
            url: url_token,
            method: "POST",
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            success: res => {
              const access_token = res.data.access_token
              const url_chat = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=" + access_token
      
              const payload = {
                "messages": [
                  {
                    "role": "user",
                    "content": `我的简历竞争力分数为${app.globalData.percentage*100},给我建议，100个汉字以内`
                  }
                ]
              };
              wx.request({
                url: url_chat,
                method: "POST",
                data: payload,
                header: {
                  'Content-Type': 'application/json'
                },
                // 请求成功将收到的数据压入遍历数组
                success: (res) => {
                  this.setData({
                    aiAnswer:res.data.result,
                  })
                  console.log(res.data);
                }
              });
            },
          });
           this.setData({
            userid:val.id,
            isShow:false,
            isChart1:true,
            name:val.name,
            isAi:true
           })
           console.log(this.data.userid);
           this.gettest();
          
        }   
      })
    },


    onShow() {
      let str=app.globalData.userPhoto===""?"https://img.yzcdn.cn/vant/cat.jpeg":app.globalData.userPhoto
      this.setData({
        userImg:str
      })

    },






    analyes(education, salary, age, skill, timeDiff) {

      // 学历权重
      const educationWeights = {
        "专科": 5,
        "本科": 10,
        "硕士": 15,
        "博士": 20
      };

      // 薪资得分
      const salaryScore = 10;

      // 年龄划分和权重
      const ageRanges = {
        "专科": 22,
        "本科": 23,
        "硕士": 26,
        "博士": 32
      };



      // 技能得分
      const skillScore = 10;

      // 预计入职时间与当前时间差划分和权重


      // 计算各部分得分
      const educationScore = educationWeights[education];
      const ageScore = this.calculateAgeScore(ageRanges[education], age);
      const timeScore = this.calculateTimeScore(timeDiff);

      // 计算综合得分
      const totalScore = parseFloat((educationScore + salaryScore + ageScore + skillScore + timeScore)) / 5.0;
      // console.log("学历得分" +educationScore)
      // console.log("薪酬得分" +salaryScore)
      // console.log("年龄得分" +ageScore)
      // console.log("技能得分" +skillScore)
      // console.log("时间得分" +timeScore)
      // console.log(totalScore)

      return totalScore;
    },

    // 根据年龄范围计算年龄得分
    calculateAgeScore(baseAge, age) {
      const ageDiff = age - baseAge;
      const ageWeights = {
        "x及x以下": 5,
        "x—x+3": 10,
        "x+3—x+6": 20,
        "x+6以上": 15
      };

      if (ageDiff <= 0) {
        return ageWeights["x及x以下"];
      } else if (ageDiff <= 3) {
        return ageWeights["x—x+3"];
      } else if (ageDiff <= 6) {
        return ageWeights["x+3—x+6"];
      } else {
        return ageWeights["x+6以上"];
      }
    },
    // 计算技能得分
    calculateSkillScore(skillarr) {
    
      let skill1 = skillarr; 
      // console.log('skill',skill1);
      // 使用 split 方法按逗号分割字符串并存储为数组
      const resultArray = skill1.split(',');
      // console.log('几个技能：',resultArray.length);
      // 获取数组的长度
      const arrayLength = resultArray.length;

      // 根据数组长度进行不同的计分
      let score2 = 0;

      if (arrayLength >= 1 && arrayLength <= 3) {
        score2 = 3;
      } else if (arrayLength > 3 && arrayLength <= 5) {
        score2 = 7;
      } else if (arrayLength > 5 && arrayLength <= 8) {
        score2 = 10;
      } else if (arrayLength > 8 && arrayLength <= 10) {
        score2 = 13;
      } else if (arrayLength > 10) {
        score2 = 20;
      }
      // console.log(score2);
      return score2
    
  },
  // 计算薪资得分
  calculateSalaryScore(salary){
    const salary1 = salary.match(/\d+/);
    let score1 = 0;

      if (salary1 < 10) {
        score1 = 8;
      } else if (salary1 >= 10 && salary1 <= 30) {
        score1 = 20;
      } else if (salary1 > 30) {
        score1 = 7;
      }
      // console.log(score1);
      return score1;
  },
    // 根据时间差划分计算时间得分
    calculateTimeScore(timeDiff) {
      const timeRanges = {
        "1个月": 20,
        "1-3个月": 8,
        "3个月以上": 1
      };
      if (timeDiff <= 30) {
        return timeRanges["1个月"];
      } else if (timeDiff <= 90) {
        return timeRanges["1-3个月"];
      } else {
        return timeRanges["3个月以上"];
      }
    },

    // // 示例使用
    // const education = "本科";
    // const salary = 10;
    // const age = 25;
    // const skill = 10;
    // const timeDiff = 45; // 假设时间差为45天

    userInputAction: function (options) {
      //获取输入框输入的内容
      // console.log("获取文本框内容")
      let value = options.detail.value;
      // console.log(value);
      // 将userid修改为传入的数据
      this.setData({
        userid: value
      })
      // console.log("数据修改了~"+this.data.userid)
    },
    gettest() {
      var n = app.globalData.userArr
      // console.log(n)   
      var resumeScore = null
      var templist = [] // 零时列表用来存储所有用户的得分
      //循环获取所有用户的得分
      for (let i = 0; i < n.length; i += 1) {
        var timeDiff = this.dateNum(n[i].jobTime);
        resumeScore = this.analyes(n[i].degree, n[i].salary, n[i].age, n[i].features, timeDiff);
        templist.push(resumeScore);
        // console.log(templist)
      }
      this.setData({
        userscorelist: templist.sort() //将所有用户的得分存入本页data中
      })
      // 获取单个用户的得分
      var id = this.data.userid;
      console.log(n);
      var timeDiff = this.dateNum(n[id - 1].jobTime);
      resumeScore = this.analyes(n[id - 1].degree, n[id - 1].salary, n[id - 1].age, n[id - 1].features, timeDiff);
      var location = this.data.userscorelist.indexOf(resumeScore) //得分在列表中的位置
      var length = this.data.userscorelist.length //列表总长度
      var postion = (parseFloat(location) / parseFloat(length)).toFixed(2);
      // console.log(postion)
      //单个用户的具体数据
      const educationWeights = {
        "专科": 5,
        "本科": 10,
        "硕士": 15,
        "博士": 20
      };
      const timeRanges = {
        "1个月": 20,
        "1-3个月": 8,
        "3个月以上": 1
      };
      const ageRanges = {
        "专科": 22,
        "本科": 23,
        "硕士": 26,
        "博士": 32
      };

    //    // 计算各部分得分
    //    // 学历得分
    // const educationScore = educationWeights[education];
    //     // 技能得分
    //   const skillScore = this.calculateSkillScore(skill);
    //     // 薪资得分
    //   const salaryScore = this.calculateSalaryScore(salary);
    //      // 年龄得分
    //   const ageScore = this.calculateAgeScore(ageRanges[education], age);
    //      // 入职时间得分
      // const timeScore = this.calculateTimeScore(timeDiff);
      var degreeScore = educationWeights[n[id - 1].degree];
      var timeScore = this.calculateTimeScore(timeDiff);
      var featuresScore = this.calculateSkillScore(n[id-1].features);
      var ageScore = this.calculateAgeScore(ageRanges[n[id - 1].degree], n[id - 1].age);
      var salaryScore = this.calculateSalaryScore(n[id-1].salary);
      timeDiff = this.dateNum(n[id - 1].jobTime);
      console.log(n[id-1])
      console.log([degreeScore * 50, timeScore * 50, featuresScore * 50, ageScore * 50, salaryScore * 50] + "    " + postion)
      app.globalData.percentage = postion;

      getApp().globalData.onPercentageChange(app.globalData.percentage);

      app.globalData.exponentialArr = [degreeScore * 50, timeScore * 50, featuresScore * 50, ageScore * 50, salaryScore * 50];
      getApp().globalData.onexponentialArrChange(app.globalData.exponentialArr)
      // console.log(app.globalData);
      // 输出综合得分
      // return postion, [degreeScore*50,timeScore*50,featuresScore*50,ageScore*50,salaryScore*50]
      // return {
      //   baifenshu : postion,
      //   arr : [degreeScore*50,timeScore*50,featuresScore*50,ageScore*50,salaryScore*50]
      // } 
    },
    dateNum(dateStr) {
      const year = dateStr.slice(0, dateStr.indexOf("年"));
      const month = dateStr.slice(dateStr.indexOf("年") + 1, dateStr.indexOf("月"));
      // 使用 Date 对象获取当前年、月和日期
      const currentDate = new Date();
      const nowyear = currentDate.getFullYear();
      const nowmonth = currentDate.getMonth() + 1;  // 月份从 0 开始，所以需要加 1


      // console.log(year-nowyear);  // 输出当前年份
      // console.log(month-nowmonth);  // 输出当前月份
      // 输出当前日期
      return month - nowmonth;
    },

  
  });
