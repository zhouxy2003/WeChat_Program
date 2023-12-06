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
 
Page({
  data: {
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
  },

  onLoad() {
    // your onReady logic here
    // app.globalData.analyesName=this.data.userName;
  }

});
