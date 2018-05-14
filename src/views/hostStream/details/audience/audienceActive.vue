<template>
  <div class="audience-active-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <line-chart-component :chart-data="RewardTrend"></line-chart-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <line-chart-component :chart-data="BarrageTrend"></line-chart-component>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="24" class="column_list">
        <div class="chart-wrapper">
          <bar-chart-component :chart-data="BarData"></bar-chart-component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .audience-active-container{
    width:1360px;
    margin:0 auto;
    .chart-wrapper{
      height:315px;
      background-color: #ffffff;
      padding: 10px;
    }
    .column_list:nth-of-type(3){
      padding-top: 50px;
      /*background: #fff;*/
    }
  }
</style>


<script>
  import { mapGetters } from 'vuex'
  import BarChartComponent from '@/components/Echart/barChart'
  import lineChartComponent from '@/components/Echart/lineChart'
  export default {
    components:{
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
        BarrageTrend:null,
        RewardTrend:null,
        param:{
          from:'',
          to:'',
          platform:'',
          uid:'',
        },
      }
    },
    methods: {
      handleBarData(source){
        //  打赏金额时间分布数据处理
        let coordinate = source.map(item=>{
          return item.hours;
        });
        let data = source.map(item=>{
          return item.num;
        });
        this.BarData = {
          title:'打赏金额时间分布',
          name:'打赏金额',
          coordinateType:'timeLong',
          coordinate:coordinate,
          data:data
        };
      },
      handleBarrageTrend(source){
        //  发送弹幕趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.barNum;
        });
        this.BarrageTrend = {
          title:'发送弹幕趋势',
          name:'弹幕数',
          coordinate:coordinate,
          data:data
        };
      },
      handleRewardTrend(source){
        //  打赏趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.price;
        });
        this.RewardTrend = {
          title:'打赏趋势',
          name:'打赏金额',
          coordinate:coordinate,
          data:data
        };
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getDetailActive(this.param);
        if(response === false)return;
        this.handleBarData(response.data.rewardTimeDist);
        this.handleBarrageTrend(response.data.danmuTrend);
        this.handleRewardTrend(response.data.rewardTrend);
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.uid = this.$route.params.uid;
      this.getData();

    },
    destroyed() {}
  }

</script>
