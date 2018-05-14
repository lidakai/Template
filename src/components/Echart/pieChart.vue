<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  const chartColorsOutside = [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#ffd74d' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#ffd74d' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#51cbf7' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#51cbf7' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#a8eab8' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#a8eab8' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#ff9e79' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#ff9e79' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#3d9be2' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#3d9be2' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#70e4ea' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#70e4ea' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#0ec7f5' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#26f0c3' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
      offset: 0,
      color: '#16cf69' // 0% 处的颜色
    }, {
      offset: 1,
      color: '#6ef3bc' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
  }];
  const chartColorsOutsideLength = chartColorsOutside.length;
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
        default: '295px'
      },
      chartData: {
        type: Object,
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {

    },
    activated(){
      this.initChart();
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }else{
          console.log("pie-chart",this.chart)
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder);
      this.chart.dispose()
      this.chart = null
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
        let data = JSON.parse(JSON.stringify(val));
        if(data.nameArr !== undefined){
          if(data.nameArr[0] === null||data.nameArr[0] == undefined||data.nameArr[0] === ''){
            if(data.data.length){
              data.data.forEach(item=>{
                data.nameArr.push(item.name)
              })
            }
          }
          this.setOptions(data)
        }
      },
      numAll(data){
        let num = 0;
        if(typeof data === 'object'){
          data.map(item=>{
            num += item.value;
          })
        }
        return num;
      },
      setOptions({data,nameArr,title} = {}){
        let Total = this.numAll(data);
        let fontSize = 14;
        let array_ = [30,110];
        let chartWrapper = document.getElementsByClassName('chart-wrapper')
        if(chartWrapper.length>0){
          let width_= chartWrapper[chartWrapper.length-1].offsetWidth;
          if(width_>600){
            fontSize = 14;
            array_ = [30,90]
          }else {
            fontSize = 12;
            array_ = [30, 70];
          }
        }
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              let sHtml = params.name;
              let marker0 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params.color + ';"></span>';
              sHtml += '<br/>' + marker0 + params.value.toLocaleString()+'('+ Number(params.percent).toFixed(1)+'%)';
              return sHtml;
            }
          },
          title: {
            text:title,
            left: 'left',
            textStyle:{
              fontWeight:'bold',
              color: '#4b4d56',
              fontSize:16
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            itemGap: 20,
            itemWidth: 15,
            itemHeight: 15,
            textStyle: {
              color: '#808080',
              fontSize:fontSize,
            },
            align:'left',
            icon: 'circle',
            data: nameArr,
            formatter: function (val) {
              var array = '';
              {
                data.forEach((item,k)=>{
                  if(item.name ===val){
                    if(Total === 0){
                      Total = Total === 0?1:Total;
                      item.value = 1;
                    }
                    if(item.count !== undefined){
                      let codeMsg = '';
                      if(item.code === 'enjoyData'){
                        codeMsg = '打赏'
                      }
                      let name = (item.name+' '+item.count+'人'+ codeMsg +'，占'+((item.value/Total)*100).toFixed(1)+'%');
                      array = (name.length > 28 ? (name.slice(0,28)+"...") : name );
                    } else {
                      let name = (item.name+' '+item.value+'元，占'+((item.value/Total)*100).toFixed(1)+'%')
                      array = (name.length > 28 ? (name.slice(0,28)+"...") : name );
                    }
                  }
                })
              }
              return array;
            }
          },
          calculable: true,
          series: [
            {
              name: '',
              type: 'pie',
              radius: array_,
              center: ['30%', '50%'],
              legendHoverLink: true,
              data: data,
              label: {
                normal: {
                  position: 'outside',
                  textStyle: {
                    color:''
                  },
                  fontSize: 16
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    // color: ''
                  },
                  length: 20,
                  length2: 10
                }
              },
              color:['#ffd74d','#51cbf7','#a8eab8','#ff9e79','#3d9be2','#70e4ea','#0ec7f5','#16cf69'],
              /* itemStyle: {
                 normal: {
                   color: function(params) {
                     let color_ = chartColorsOutside[params.dataIndex % chartColorsOutsideLength];
                     return color_
                   }
                 },
                 emphasis: {
                   shadowBlur: 10,
                   shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
               },*/
              animationEasing: 'cubicInOut',
              animationDuration: 500
            }
          ]
        });
      }
    }
  }

</script>
