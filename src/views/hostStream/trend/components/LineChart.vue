<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
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
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose();
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if(val===null)return;
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ data, coordinate, name, unit } = {}) {
      this.chart.setOption({
        xAxis: {
          data: coordinate,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize:14,
            color: '#8492af'
          },
          splitLine:{
            show:true,
            lineStyle:{
              type:'dashed',
              color:['rgba(132,146,175,0.55)']
            },
            interval:coordinate.length-2
          },
          axisLine:{
            show:false
          }
        },
        grid: {
          left: 10,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle:{
              width:2,
              color: "#67a3ff",
              opacity:0.6
            },
          },
          formatter: function(params) {
            let sHtml = params[0].name
            if (unit === '%') {
              params[0].value = params[0].value + '%'
            }
            const marker0 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#54d5ff;"></span>'
            sHtml += '<br/>' + marker0 + params[0].value
            return sHtml
          }
        },
        legend: {
          data: [{
            name: name,
          }],
          right: '20px'
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize:14,
            color: '#8492af',
            formatter: '{value}' + unit
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
          }
        },
        series: [{
          name: name,
          itemStyle: {
            color:'#54d5ff',
            normal: {
              lineStyle: {
                color:  {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#54d5ff' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#448eff' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
//                width: 2
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(147,176,255,0.5)'
              }, {
                offset: 1,
                color: 'rgba(147,180,255,0)'
              }])
            }
          },
          type: 'line',
          data: data,
          animationDuration: 2800,
          markLine: {
            data:[{
              type: 'average',
              name: '平均值',
              lineStyle:{
                color:'#ff6d93',
                type:'solid',
              },
            }]
          }
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el);
      if(this.chartData === null) return;
      this.setOptions(this.chartData)
    }
  }
}
</script>
