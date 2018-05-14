<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons'); // echarts theme
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
        default: '128px'
      },
      dataHorizontal: {
        type: Object,
        default:{
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
      this.initChart();
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder);
      this.chart.dispose();
      this.chart = null
    },
    watch: {
      dataHorizontal: {
        deep: true,
        handler(dataHorizontal) {
            this.setOptions(dataHorizontal)
        }
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(this.dataHorizontal)
      },
      setOptions({ data, horizontal } = {}){
        let len = data.length;
        let seriesData = data.map((item,index)=>{
          return {
            value:item,
            itemStyle:{
              color:'rgba(103,163,255,'+(index+1)/len+')'
            },
            label:{
              show:true,
              position: 'right',
              color:'#3780ff',
              fontSize:16
            },
          }
        });
        this.chart.setOption({
          tooltip: {
            trigger: 'none',
          },
          grid: {
            top:0,
            left: '10px',
            right: '5%',
            bottom: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine:{
              show:false
            },
            axisTick: {
              show: false
            },
            show:false,
          },
          yAxis:{
            type: 'category',
            data: horizontal,
            axisLine:{
              show:false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#647188'
              },
              padding:[0,25,0,0]
            },
          },
          series: [{
            name: "",
            type: 'bar',
            data: seriesData,
            animationDuration:500
          }]
        })
      }
    }
  }


</script>
