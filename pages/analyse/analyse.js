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
            value: [800,890,1000,700,810],
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
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
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
                value: 0.7,
                name:'简历得分'
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
    standard:{
      agestandard:[22,23,26,32]
    },
    // 用户id，单人
    userid : "",
    // 用户得分列表
    userscorelist :[],
    // 储存用户数据的对象
    dataOBJ:[{

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
    const totalScore = parseFloat((educationScore + salaryScore + ageScore + skillScore + timeScore))/ 5.0;
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
      userid : value
    })
    // console.log("数据修改了~"+this.data.userid)
  },
  gettest(){
    var n = app.globalData.userArr
    // console.log(n)   
    var resumeScore = null
    var templist = [] // 零时列表用来存储所有用户的得分
    //循环获取所有用户的得分
    for (let i = 0 ; i < n.length;i+=1){
      var timeDiff = this.dateNum(n[i].jobTime);
      resumeScore = this.analyes(n[i].degree, n[i].salary, n[i].age, n[i].features, timeDiff);
      templist.push(resumeScore);
      // console.log(templist)
    }
    this.setData({
      userscorelist : templist.sort() //将所有用户的得分存入本页data中
    })
    // 获取单个用户的得分
    var id = this.data.userid;
    var timeDiff = this.dateNum(n[id].jobTime);
    resumeScore = this.analyes(n[id].degree, n[id].salary, n[id].age, n[id].features, timeDiff);
    var location = this.data.userscorelist.indexOf(resumeScore) //得分在列表中的位置
    var length = this.data.userscorelist.length //列表总长度
    var postion = (parseFloat(location)/parseFloat(length)).toFixed(2);
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
 
    var degreeScore = educationWeights[n[id].degree];
    var timeScore = this.calculateTimeScore(timeDiff);
    var featuresScore = 10
    var ageScore = this.calculateAgeScore(ageRanges[n[id].degree], n[id].age)
    var salaryScore = 10
    timeDiff = this.dateNum(n[id].jobTime);
    
    console.log([degreeScore*50,timeScore*50,featuresScore*50,ageScore*50,salaryScore*50]+"    " + postion)
    // 输出综合得分
    // return postion, [degreeScore*50,timeScore*50,featuresScore*50,ageScore*50,salaryScore*50]
    return {
      baifenshu : postion,
      arr : [degreeScore*50,timeScore*50,featuresScore*50,ageScore*50,salaryScore*50]
    } 
  },

  dateNum(dateStr){
    const year = dateStr.slice(0, dateStr.indexOf("年"));
    const month = dateStr.slice(dateStr.indexOf("年") + 1, dateStr.indexOf("月"));
    // 使用 Date 对象获取当前年、月和日期
  const currentDate = new Date();
  const nowyear = currentDate.getFullYear();
  const nowmonth = currentDate.getMonth() + 1;  // 月份从 0 开始，所以需要加 1


  // console.log(year-nowyear);  // 输出当前年份
  // console.log(month-nowmonth);  // 输出当前月份
    // 输出当前日期
  return month-nowmonth;
  },

  onLoad() {
  
    // your onReady logic here
    // app.globalData.analyesName=this.data.userName;
    
  }

});
