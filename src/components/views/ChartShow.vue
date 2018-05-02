<template>
  <div>
    <div ref="main" class="chart"></div>
    <div ref="main2" class="chart"></div>
  </div>
</template>
<script>
// 引入 echarts 主模块。
import * as echarts from "echarts/lib/echarts";
// 引入折线图。
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
// 引入提示框组件、标题组件、工具箱组件。
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
// echarts\lib\component\dataZoom
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

function listDays(begin, end) {
  var ary = [];
  var tdate = begin;

  while (tdate <= end) {
    ary.push(tdate.format("yyyy-MM-dd"));
    var tdateDay = tdate.getDate();
    tdate = new Date(tdate.getFullYear(), tdate.getMonth(), tdateDay + 1);
  }
  return ary;
}
var days = listDays(new Date(2018, 3, 1), new Date(2018, 4, 30));
var registerList = fetchRegisterList();
function fetchRegisterList() {
  var temp1 = [
    "2018-04-10",
    "2018-04-18",
    "2018-05-08",
    "2018-04-12",
    "2018-04-04",
    "2018-04-01"
  ];
  var temp2 = [50, 100, 150, 70, 200, 80];
  var datas = Array.apply(null, Array(days.length)).map(function(item, i) {
    return 0;
  });
  var i = 0;
  var item = "";
  for (; i < temp1.length; i++) {
    item = temp1[i];
    var dex = days.indexOf(item);
    if (dex != -1) {
      datas[dex] = temp2[i];
    }
  }
  return datas;
  // var temp = [
  //   ["2018-04-10", 20],
  //   ["2018-04-18", 20],
  //   ["2018-05-8", 20],
  //   ["2018-04-12", 20],
  //   ["2018-04-4", 20],
  //   ["2018-04-1", 20]
  // ];
}
var payList = fetchPayList();
function fetchPayList() {
  var temp1 = [
    "2018-04-10",
    "2018-04-18",
    "2018-05-08",
    "2018-04-12",
    "2018-04-04",
    "2018-04-01"
  ];
  var temp2 = [54, 120, 120, 170, 240, 80];
  var datas = Array.apply(null, Array(days.length)).map(function(item, i) {
    return 0;
  });
  var i = 0;
  var item = "";
  for (; i < temp1.length; i++) {
    item = temp1[i];
    var dex = days.indexOf(item);
    if (dex != -1) {
      datas[dex] = temp2[i];
    }
  }
  return datas;
}
// var date1 = new Date("2018",4,1)
// var date2 = new Date("2018",4,3)
// var ary = listDays(date1,date2);
// console.log(ary);
export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main);
    var myChart2 = echarts.init(this.$refs.main2);

    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: "category",
        splitLine: { show: false },
        data: days
      },
      yAxis: {
        type: "value"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        },
        // formatter: function(params) {
        //   console.log(params);
        //   return params;
        //   // var tar;
        //   // if (params[1].value != "-") {
        //   //   tar = params[1];
        //   // } else {
        //   //   tar = params[0];
        //   // }
        //   // return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        // }
      },
      dataZoom: [
        {
          type: "slider",
          startValue: "2014-04-01"
        }
      ],
      legend: {
        data: ["注册", "充值"]
      },
      series: [
        {
          name: "注册",
          type: "bar",
          data: registerList
        },
        {
          name: "充值",
          type: "bar",
          data: payList
        },
        {
            // name: '姓名',
            type: 'pie',
            radius : '55%',
            center: ['80%', '30%'],
            data: [
              {
                name:'充值',
                value:500
              },
              {
                name:'注册',
                value:800
              }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    var option2 = {
      legend: {
        data: ["注册", "充值"]
      },
      xAxis: {
        type: "category",
        data: ["CPC", "CPS", "CPA", "CPV"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "金融投资",
          type: "bar",
          data: [100, 2500, 500, 1500]
        },
        {
          name: "产业园推广",
          type: "bar",
          data: [500, 1000, 2000, 600]
        }
      ]
    };
    myChart2.setOption(option2);
  }
};
</script>
<style lang="less" scoped>
.chart {
  width: 80%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  height: 400px;
  margin: auto;
}
</style>


