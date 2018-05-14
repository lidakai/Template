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
      chartData: {
        type: Object,
        default:{
          name:'',
          coordinate:[],
          data:[]
        }

      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {

    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder);
      this.chart.dispose();
      this.chart = null
    },
    activated(){
      this.initChart();
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }else{
          console.log("bar-chart",this.chart)
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHanlder)
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.initChart(val)
        }
      }
    },
    methods: {
      initChart(val) {
        if(val === undefined)return;
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(val);
      },
      setOptions({ data, coordinate, name, title ,coordinateType,valueType } = {}){
        let len = coordinate ? coordinate.length -1 : 0;
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
            },
            formatter: function(params) {
              if(coordinateType === "timeLong"){

                let value = params[0].axisValue;
                let sHtml =""
                if( parseInt(value) <= 10 ){
                  sHtml =  "0"+(parseInt(value)-1)+":00-"+value+":00";
                }else{
                  sHtml =  (parseInt(value)-1)+":00-"+value+":00";
                }

                if( valueType && valueType === 'money' ){
                  params[0].value = Number(params[0].value).toFixed(2)
                }

                let marker0 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[0].color.colorStops[0].color + ';"></span>';
                sHtml += '<br/>' + marker0 +name+"："+params[0].value;
                return sHtml;

              }else if(coordinateType === "ActiveTime"){

                let num = Number(params[0].name);
                const marker0 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#54d5ff;"></span>'
                return (num-1) + ':00-'+ num +':00'+'<br/>'+marker0  +'打赏金额：'+ (params[0].value.toFixed(2)) +'元'

              }else {
                if( valueType && valueType === 'money' ){
                  params[0].value = Number(params[0].value).toFixed(2)
                }
                let sHtml = params[0].name;
                const marker0 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#54d5ff;"></span>'
                sHtml += '<br/>' + marker0 + name+"："+ params[0].value
                return sHtml

              }

            }
          },
          grid: {
            top: title?50:20,
            left: '3%',
            right: '3%',
            bottom: 0,
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: coordinate,
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
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#8492af'
              }
            }
          }],
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
            type: 'bar',
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
            animationDuration:500
          }]
        })
      }
    }
  }
</script>
