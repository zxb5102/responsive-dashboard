<template>
    <div>
        <div ref="main" class="chart"></div>
        <div ref="main2" class="chart"></div>
    </div>
</template>
<script>
// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
// echarts\lib\component\dataZoom
export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main);
    var myChart2 = echarts.init(this.$refs.main2);

    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: "time"
      },
      yAxis: {
        type: "value"
      },
      tooltip: {
        trigger: "axis"
      },
      dataZoom: [
        {
          type: "slider",
          startValue: "2014-04-01"
        }
      ],
      legend: {
        data: ["产业园推广", "金融投资"]
      },
      series: [
        {
          name: "产业园推广",
          type: "line",
          data: [
            ["2014-04-04", 500],
            ["2014-08-01", 850],
            ["2014-10-01", 2000],
            ["2015-05-05", 1500]
          ]
        },
        {
          name: "金融投资",
          type: "line",
          data: [
            ["2014-08-04", 800],
            ["2015-10-01", 550],
            ["2016-10-01", 1000],
            ["2017-05-05", 2500]
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    var option2 = {
      legend: {
        data: ["产业园推广", "金融投资"]
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


