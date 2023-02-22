<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    userInfo: {
      type: Array,
      default: () => {
        return []
      },
      require: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      const xData = [], Ydata = []
      for (let i = 30; i > 0; i--) {
        xData.push(this.userInfo[this.userInfo.length - i].day)
        Ydata.push(this.userInfo[this.userInfo.length - i].total)
      }
      this.chart.setOption({
        title: {
          text: "近30天单日用户注册数变化趋势",
          top: "0",
        },
        legend: {
          top: "20",
          data: ["当日用户注册数"],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: "15%",
          left: "1%",
          right: "2%",
          bottom: "1%",
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '当日用户注册数',
          type: 'line',
          stack: 'vistors',
          label: {
            show: true,
          },
          data: Ydata,
          animationDuration
        }]
      })
    }
  }
}
</script>
