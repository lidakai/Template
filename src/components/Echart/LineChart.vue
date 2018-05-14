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
      default: '260px'
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
  activated(){
    this.initChart();
    this.__resizeHanlder = debounce(() => {

      if (this.chart) {
        this.chart.resize()
      }else{
        console.log("lie-chart",this.chart)
      }
    }, 100);
    window.addEventListener('resize', this.__resizeHanlder)
  },
  mounted() {

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder);
    }
    this.chart.dispose();
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ data, coordinate, name ,title } = {}) {
      let len = coordinate ? coordinate.length-2 :0;
      this.chart.setOption({
        title: {
          text: title,
          left: 'left',
          textStyle:{
            fontWeight:'bold',
            color: '#4b4d56',
            fontSize:16
          }
        },
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
            interval:len
          },
          axisLine:{
            show:false
          }
        },
        grid: {
          left: 10,
          right: 50,
          bottom: 0,
          top: 50,
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
//            if (unit === '%') {
//              params[0].value = params[0].value + '%'
//            }
            const marker0 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#54d5ff;"></span>'
            sHtml += '<br/>' + marker0 + name+"："+ params[0].value
            return sHtml
          }
        },
        legend: {
          show:true,
          data: [name],
          right:"40px"
        },
        yAxis: {
          axisTick: {
            show: false
          },
          nameTextStyle:{
            fontWeight: 'normal',
            fontSize: 20,
            color:'#4b4d56',
            align:'left'
          },
          axisLabel: {
            fontSize:14,
            color: '#8492af',
//            formatter: '{value}' + unit
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
          name:name,
          itemStyle: {
            color:'#448eff',
          },
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
          animationDuration: 1000,
          markLine: {
            data:[{
              type: 'average',
              name: '平均值',
              lineStyle:{
                color:'#ff9d69',
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
