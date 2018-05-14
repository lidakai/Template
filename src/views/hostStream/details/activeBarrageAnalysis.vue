<template>
  <div class="active-barrage-container">
    <!---->

    <div class="active-barrage_menu">
      <span class="active-barrage_current_tab"><router-link :to="'/analysis/activeBarrage/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">弹幕分析</router-link></span>
      <span><router-link :to="'/analysis/activePerson/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">人气分析</router-link></span>
    </div>
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="active-barrage-detail_title fl">近{{BarrageDetailData.offset}}天日数据情况</p>
          <Time-select-component @on-time-change="changeTime" class="fr"></Time-select-component>

          <div class="active-barrage_current_data">
            <p>
              <span>弹幕总数</span>
              <i>{{BarrageDetailData.total_barrage}}</i>
            </p>
            <p>
              <span>日均弹幕数</span>
              <i>{{BarrageDetailData.average_barrage}}</i>
            </p>
            <p>
              <span>相比上个{{BarrageDetailData.offset}}天</span>
              <i v-if="BarrageDetailData.compareValue >=0">{{BarrageDetailData.compareValue}}</i>
              <i v-else>{{BarrageDetailData.compareValue}}</i>
              <em>%</em>
            </p>
            <p>
              <span>日均弹幕人数</span>
              <i>{{BarrageDetailData.barragePerson}}</i>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <line-chart-component :chart-data="barrageData"></line-chart-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <!--<bar-chart-component :chart-data="formData.active_num_form"></bar-chart-component>-->
          <bar-chart-component :chart-data="BarData"></bar-chart-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <line-chart-component :chart-data="barragePersonData"></line-chart-component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .active-barrage-container{
    width:1360px;
    margin:0 auto;
    .active-barrage_menu{
      height:38px;
      span{
        width:100px;
        text-align: center;
        display: inline-block;
        height:100%;
        border-bottom:2px solid transparent;
        line-height: 36px;
        cursor: pointer;
        position: relative;
        background: #fff;
        box-shadow: 0px 6px 8px 0px
        rgba(0, 0, 0, 0.04);
        border-radius: 4px 4px 0px 0px;
        opacity: 0.6;
        a{
          display: block;
          width:100%;
          height:36px;
          position: absolute;
          top:0;
          left:0;
        }
      }
      .active-barrage_current_tab{
        opacity: 1;
        color: #508ef7;
        font-weight: bold;
      }
    }
    .chart-wrapper{
      height:315px;
      background-color: #ffffff;
      padding: 25px 10px 10px;
      .active-barrage-detail_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        margin:0;
        height:36px;
        line-height: 36px;
      }
      .active-barrage_current_data{
        display: flex;
        flex-flow: nowrap row;
        justify-content: space-around;
        width:100%;
        margin-top: 80px;
        p{
          width:120px;
          height:120px;
          border-radius: 50%;
          overflow: hidden;
          outline:none;
          padding-top: 36px;
          text-align: center;
          margin:0;
          span{
            display: block;
            font-size: 14px;
            color: #ffffff;
            margin-bottom: 11px;
          }
          i{
            font-size: 24px;
            font-weight: bold;
            font-style: normal;
            color: #ffffff;
          }
          em{
            color: #fff;
            font-size: 14px;
            font-style: normal;
            opacity: 0.6;
          }
        }
        p:first-child{
          background: #51cbf7;
        }
        p:nth-of-type(2){
          background: #ff9e79;
        }
        p:nth-of-type(3){
          background-image: linear-gradient(
              #89ce89,
              #89ce89),
          linear-gradient(
              #a8eab8,
              #a8eab8);
          background-blend-mode: normal,
          normal;
        }
        p:last-child{
          background: #ffd74d;
        }
      }
    }
    .column_list:nth-of-type(2n+1){
      .chart-wrapper{
        border-right: 1px solid #f3f6f8;
      }
    }
    .column_list:nth-of-type(1){
      .chart-wrapper{
        border-bottom: 1px solid #f3f6f8;
        padding: 22px 25px 0;
      }
    }
    .column_list:nth-of-type(2){
      .chart-wrapper{
        border-bottom: 1px solid #f3f6f8;
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import TimeSelectComponent from '@/components/timeSelect/index.vue'
  import BarChartComponent from '@/components/Echart/barChart'
  import lineChartComponent from '@/components/Echart/lineChart'
  export default {
    components:{
      TimeSelectComponent,
      BarChartComponent,
      lineChartComponent
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    data() {
      return {
        BarData:{},//{},
        barrageData:null,//{},
        barragePersonData:null,//{},
        BarrageDetailData:{
          offset:30,
          barragePerson:0,
          average_barrage:0,
          total_barrage:0,
          compareValue:0,
          compare:true
        },
        param: {
          from: '',
          to: '',
          platform : '',
          roomId: '',
          hourType:'3'
        }
      }
    },
    methods: {
      changeTime(value){
        this.param = Object.assign({},this.param,value);
        this.getData();
      },
      handleBarrageDetailData(source){
        source.dateNumNowTotal.barPeoSum = source.dateNumNowTotal.barPeoSum || 0;
        source.dateNumNowTotal.barNumSum = source.dateNumNowTotal.barNumSum || 0;
        source.dateNumAgoTotal.barNumSum = source.dateNumAgoTotal.barNumSum || 0;
        this.BarrageDetailData = {
          offset:source.dateNum,
          barragePerson:(source.dateNumNowTotal.barPeoSum /source.dateNum).toFixed(),
          average_barrage:(source.dateNumNowTotal.barNumSum / source.dateNum).toFixed(),
          total_barrage:source.dateNumNowTotal.barNumSum,
        };

        if( source.dateNumAgoTotal.barNumSum ){
          this.BarrageDetailData.compareValue = ((source.dateNumNowTotal.barNumSum- source.dateNumAgoTotal.barNumSum) / source.dateNumAgoTotal.barNumSum).toFixed(1)
        }else{
          this.BarrageDetailData.compareValue = 0;
        }
      },
      handleBarData(source){
        //  弹幕时间分布数据处理
        let coordinate = source.map(item=>{
          return item.hours;
        });
        let data = source.map(item=>{
          return item.num;
        });
        this.BarData = {
          title:'弹幕时间分布',
          name:'单位时间弹幕数',
          coordinateType:'timeLong',
          coordinate:coordinate,
          data:data
        };
      },
      handleBarrageData(source){
        //  弹幕数趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.barNum;
        });
        this.barrageData = {
          title:'弹幕数趋势',
          name:'弹幕数',
          coordinate:coordinate,
          data:data
        };
      },
      handleBarragePersonData(source){
        //  弹幕人数趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.barPeoNum;
        });
        this.barragePersonData = {
          title:'弹幕人数趋势',
          name:'弹幕人数',
          coordinate:coordinate,
          data:data
        };
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.detailAnalyse(this.param);
        if(response === false)return;
        this.handleBarrageDetailData(response.data);
        this.handleBarData(response.data.timeDistribute);
        this.handleBarrageData(response.data.dateNumNowDetail);
        this.handleBarragePersonData(response.data.dateNumNowDetail);
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.roomId = this.$route.params.roomId;
      if( this.$route.params.origin === 'perfect' ){
        this.param.origin = this.$route.params.origin
      }
    },
    destroyed() {}
  }

</script>
