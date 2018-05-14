<template>
  <div class="active-barrage-container">
    <!---->
    <div class="active-barrage_menu">
      <span><router-link :to="'/analysis/activeBarrage/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">弹幕分析</router-link></span>
      <span class="active-barrage_current_tab"><router-link :to="'/analysis/activePerson/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">人气分析</router-link></span>
    </div>
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="active-barrage-detail_title fl">近{{PersonDetailData.offset}}天日数据情况</p>
          <Time-select-component @on-time-change="changeTime" class="fr"></Time-select-component>
          <div class="active-barrage_current_data">
            <p>
              <span>订阅数</span>
              <i>{{PersonDetailData.follow}}</i>
            </p>
            <p>
              <span>新增订阅数</span>
              <i>{{PersonDetailData.new_follow}}</i>
            </p>
            <p>
              <span>最高在线观看人数</span>
              <i>{{PersonDetailData.online_max}}</i>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <line-chart-component :chart-data="newFollowData"></line-chart-component>
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
          <line-chart-component :chart-data="onLineMaxData"></line-chart-component>
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
        background: #fff;
        box-shadow: 0px 6px 8px 0px
        rgba(0, 0, 0, 0.04);
        border-radius: 4px 4px 0px 0px;
        opacity: 0.6;
        position: relative;
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
        height:36px;
        line-height: 36px;
        margin:0;
      }
      .active-barrage_current_data{
        display: flex;
        flex-flow: nowrap row;
        justify-content: space-around;
        width:100%;
        margin-top: 80px;
        p{
          width:150px;
          height:150px;
          border-radius: 50%;
          overflow: hidden;
          outline:none;
          padding-top: 45px;
          text-align: center;
          margin:0;
          span{
            display: block;
            font-size: 16px;
            color: #ffffff;
            margin-bottom: 21px;
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
          span{
            font-size: 14px;
          }
        }
        /*p:last-child{*/
          /*background: #ffd74d;*/
        /*}*/
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
        BarData:{},
        onLineMaxData:null,
        newFollowData:null,
        PersonDetailData:{
          offset:30,
          follow:0,
          new_follow:0,
          online_max:0
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
      handlePersonDetailData(source){
        source.dateNumNowTotal.addFollowerSum = source.dateNumNowTotal.addFollowerSum || 0;
        source.dateNumNowTotal.maxOnline =source.dateNumNowTotal.maxOnline || 0;
        this.PersonDetailData = {
          follow:0,
          new_follow:source.dateNumNowTotal.addFollowerSum,
          online_max:source.dateNumNowTotal.maxOnline,
          offset:source.dateNum,
        };
        let len = source.dateNumNowDetail.length;
        if(len){
          this.PersonDetailData.follow = source.dateNumNowDetail[len-1]['follower']
        }
      },
      handleBarData(source){
        //  人气时间分布数据处理
        let coordinate = source.map(item=>{
          return item.hours;
        });
        let data = source.map(item=>{
          return item.num;
        });
        this.BarData = {
          title:'人气时间分布',
          name:'观看人数',
          coordinateType:'timeLong',
          coordinate:coordinate,
          data:data
        };
      },
      handleOnLineMaxData(source){
        //  人气峰值趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.online;
        });
        this.onLineMaxData = {
          title:'人气峰值趋势',
          name:'人气峰值',
          coordinate:coordinate,
          data:data
        };
      },
      handleNewFollowData(source){
        //  新增订阅数趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.addFollower ;
        });
        this.newFollowData = {
          title:'新增订阅数趋势',
          name:'新增订阅数',
          coordinate:coordinate,
          data:data
        };
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.detailAnalyse(this.param);
        if(response === false)return;
        this.handlePersonDetailData(response.data);
        this.handleBarData(response.data.timeDistribute);
        this.handleOnLineMaxData(response.data.dateNumNowDetail);
        this.handleNewFollowData(response.data.dateNumNowDetail);
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
