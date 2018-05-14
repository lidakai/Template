<template>
  <div class="comparison-container">
    <div class="comparison-header clearfix">
      <h3 class="comparison-header_title fl"><router-link to="rank">主播排行</router-link></h3><h3 class="comparison-header_title fl">>主播对比</h3>
    </div>
    <div class="comparison-content">
      <div class="comparison-content_param">
        <span>所选主播最近30天排名数据</span>
        <p class="fr">
          <span @click="changeParam" class="comparison_current" data-type="systemPrice">综合指数</span>
          <span @click="changeParam" data-type="totalPrice">总收益</span>
          <span @click="changeParam" data-type="barNum">弹幕数</span>
          <span @click="changeParam" data-type="averagePerson">平均观看人数</span>
          <span @click="changeParam" data-type="timeLong">直播时长</span>
          <span @click="changeParam" data-type="addFollow">新增订阅</span>
        </p>
      </div>
      <bar-chart-component :chart-data="currentChartData"></bar-chart-component>
      <p class="comparison-detail_des">
        综合指数：对主播的最近30天总收益、弹幕数、新增订阅、直播时长、观看人数进行加权计算，其中收益占40%，弹幕占20%，新增订阅占15%，直播时长占15%，观看占10%。
      </p>
      <compare-table-component :table-data="tableData"></compare-table-component>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .comparison-container{
    width:100%;
    margin:0 auto 0;

    .comparison-header{
      .comparison-header_title{
        font-size: 26px;
        font-weight: normal;
        line-height: 26px;
        color: #464851;
        margin:30px 0 33px 0;
      }
    }
    .comparison-content{
      margin:0;
      padding: 24px 28px 0 25px;
      background: #fff;
      .comparison-content_param{
        padding: 10px 0 0;
        overflow: hidden;
        p{
          margin:0;
          height: 28px;
          line-height: 28px;
          span{
            line-height: 26px;
            font-size: 16px;
            float: left;
            margin-right: 20px;
            color: #464851;
            cursor: pointer;
            border-bottom:2px solid transparent;
          }
          .comparison_current{
            font-weight: bold;
            color: #3083ff;
            border-bottom:2px solid #508ef7;
          }
        }
        &>span{
          font-size: 16px;
          font-weight: bold;
          color: #4b4d56;
        }
      }
      .comparison-detail_des{
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #4b4d56;
        margin:20px 0 30px;
      }
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import BarChartComponent from '@/components/Echart/barChart'
  import compareTableComponent from './components/compareTable.vue'
  export default {
    components:{
      BarChartComponent,
      compareTableComponent,
    },
    computed: {
//      ...mapGetters([
//        'comparison'
//      ])
    },
    data() {
      return {
        tableData:[],
        chartData:{
          systemPrice:[],
          totalPrice:[],
          barNum:[],
          averagePerson:[],
          timeLong:[],
          addFollow:[],
          coordinate:[]
        },
        currentChartData:{},
        chartName:{
          systemPrice:'综合指数',
          totalPrice:'总收益',
          barNum:'弹幕数',
          averagePerson:'平均观看人数',
          timeLong:'直播时长',
          addFollow:'新增订阅',
        },
      comparison:[]
      }
    },
    methods: {
      changeParam(e){
        let className = e.target.className;
        if(className)return;
        try{
          document.getElementsByClassName('comparison_current')[0].setAttribute('class','');
          e.target.className = 'comparison_current';
          let type = e.target.getAttribute('data-type');
          this.currentChartData.name = this.chartName[type];
          this.currentChartData.data = this.chartData[type];
        }catch(error){}
      },
      handleData(source){
        //主播昵称集合
        this.chartData.coordinate = source.map(item=>{
          return item.nickname;
        });
        // 总收益
        this.chartData.totalPrice = source.map(item=>{
          return item.price ;
        });
        // 弹幕数
        this.chartData.barNum = source.map(item=>{
          return item.barNum ;
        });
        // 平均观看人数
        this.chartData.averagePerson = source.map(item=>{
          return item.online ;
        });
        // 平均时长
        this.chartData.timeLong = source.map(item=>{
          return item.timeLong ;
        });
        // 新增订阅
        this.chartData.addFollow = source.map(item=>{
          return item.addFollower ;
        });
        //最大收益
        let maxPrice = Math.max(...this.chartData.totalPrice);
        //最大弹幕
        let maxBar = Math.max(...this.chartData.barNum);
        //最大平均观看人数
        let maxAveragePerson = Math.max(...this.chartData.averagePerson);
        //最大平均播出时长
        let maxTimeLong = Math.max(...this.chartData.timeLong);
        //最大新增订阅
        let maxAddFollow = Math.max(...this.chartData.addFollow);

        // 综合收益
        let systemPrice = source.map(item=>{
          let score = 0;
          if( maxPrice ){
            score+=(item.price /maxPrice).toFixed(2) * 40;
          }

          if( maxBar ){
            score+=(item.barNum /maxBar).toFixed(2) * 20;
          }

          if( maxAveragePerson ){
            score+=(item.online /maxAveragePerson).toFixed(2) * 10;
          }

          if( maxTimeLong ){
            score+=(item.timeLong /maxTimeLong).toFixed(2) * 15;
          }

          if( maxAddFollow ){
            score+=(item.addFollower /maxAddFollow).toFixed(2) * 15;
          }
          return score.toFixed(1);
        });

        //  获取表格数据
        this.tableData = source.map((item,index)=>{
          return {
            averagePerson:item.online,
            price:item.price,
            barNum:item.barNum,
            timeLong:item.timeLong,
            addFollow:item.addFollower,
            systemPrice:Number(systemPrice[index]),
            nickname:item.nickname,
            maxPrice:maxPrice,
            maxBar:maxBar,
            maxAveragePerson:maxAveragePerson,
            maxTimeLong:maxTimeLong,
            maxAddFollow:maxAddFollow,
            maxSystemPrice:Math.max(...systemPrice)
          }
        });
        this.chartData.systemPrice = systemPrice;
        let key = document.getElementsByClassName('comparison_current')[0].getAttribute('data-type');
        this.currentChartData = {
          name:this.chartName[key],
          title:this.chartName[key],
          coordinate:this.chartData.coordinate,
          data:this.chartData.systemPrice.map(item=>{
            return {
              value :typeof item ==="string"?Number(item):item
            }
          })
        };
      },
      async getContrast(){
        const data = this.comparison.map(item=>{
          return {
            platform:item.platform,
            roomId:item.roomId,
            nickname:item.nickname
          }
        });
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getContrast({anchorContrastInfos:data});
        if(response === false)return;
        this.handleData(response.data.anchorContrastInfos)
      }
    },
    activated(){
      this.comparison = JSON.parse(localStorage.getItem('compareArr'));
      if( this.comparison && this.comparison.length ){
        this.getContrast();
      }else{
        this.$message("请先去主播排行榜添加对比主播")
      }
    },
    created() {
    },
    destroyed() {}
  }

</script>
