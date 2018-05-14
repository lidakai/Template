<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题
import { debounce } from '@/utils'
const animationDuration = 600;

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '60%'
    },
    height: {
      type: String,
      default: '180px'
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(this.chartData)
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData)

    },
    setOptions({ data, coordinate, name } = {}){
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0, 192, 255, 0.2)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(0, 192, 255, 0.05)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        },
        grid: {
          top: 5,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: coordinate,
          splitLine:{
            show:true,
            lineStyle:{
              type:'dashed',
              color:['rgba(132,146,175,0.55)']
            },
            interval:( coordinate.length -1 )
          },
          axisLine:{
            show:false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show:false,
            textStyle: {
              color: '#8492af'
            }
          }
        },
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          splitArea:{show: false},
          splitLine:{
            show:true,
            lineStyle:{
              type:'dashed',
              color:['rgba(132,146,175,0.55)']
            }
          },
          axisLine:{
            show:false,
          },
          axisLabel: {
            textStyle: {
              color: '#8492af'
            }
          }
        }],
        series: [{
          name: name,
          type: 'bar',
//          stack: 'vistors',
          barWidth: '50%',
          data: data,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#79f1f8' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#4cb7fa' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          animationDuration
        }]
      })
    }
  }
}
</script>
