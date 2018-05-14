<template>
  <div class="profit-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="profit-detail_title fl">近{{ProfitDetailData.offset}}天日数据情况</p>
          <Time-select-component @on-time-change="changeTime" class="fr"></Time-select-component>
          <div class="profit_current_data">
            <p>
              <span>总收益</span>
              <i :class="getFontSize(ProfitDetailData.total_profit)">{{ProfitDetailData.total_profit}}元</i>
            </p>
            <p>
              <span>日均收益</span>
              <i :class="getFontSize(ProfitDetailData.average_profit)">{{ProfitDetailData.average_profit}}元</i>
            </p>
            <p>
              <span>相比上个{{ProfitDetailData.offset}}天</span>
              <img :class="ProfitDetailData.compareValue >= 0?'':'down'" src="./img/up.png" alt="up">
              <i v-if="ProfitDetailData.compareValue >= 0">{{ProfitDetailData.compareValue}}</i>
              <i v-else>{{ProfitDetailData.compareValue}}</i>
              <em>%</em>
            </p>
            <p>
              <span>单笔最大打赏</span>
              <i :class="getFontSize(ProfitDetailData.maxProfit)">{{ProfitDetailData.maxProfit}}元</i>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <line-chart-component :chart-data="ProfitLieData"></line-chart-component>
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
          <line-chart-component :chart-data="MaxProfitLieData"></line-chart-component>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .profit-container{
    width:1360px;
    margin:0 auto;
    .chart-wrapper{
      height:315px;
      background-color: #ffffff;
      padding: 25px 10px 10px;

      .profit-detail_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        height:36px;
        line-height: 36px;
        margin:0;
      }
      .profit_current_data{
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
          img.down{
            transform:rotate(180deg);
            -ms-transform:rotate(180deg); /* Internet Explorer */
            -moz-transform:rotate(180deg); /* Firefox */
            -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
            -o-transform:rotate(180deg); /* Opera */
          }
          i{
            font-size: 24px;
            font-weight: bold;
            font-style: normal;
            color: #ffffff;
          }
          .font22{
            font-size: 22px;
          }
          .font20{
            font-size: 20px;
          }
          .font18{
            font-size: 18px;
          }
          .font16{
            font-size: 16px;
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
  import TimeSelectComponent from '@/components/timeSelect/index.vue'
  import BarChartComponent from '@/components/Echart/barChart'
  import lineChartComponent from '@/components/Echart/lineChart'
  export default {
    components:{
      TimeSelectComponent,
      BarChartComponent,
      lineChartComponent
    },
    data() {
      return {
        BarData: {},
        MaxProfitLieData: null,
        ProfitLieData: null,
        ProfitDetailData: {
          total_profit: 0,
          average_profit: 0,
          offset: 30,
          maxProfit: 0,
          compareValue: 0,
        },
        param: {
          from: '',
          to: '',
          platform : '',
          roomId: '',
          hourType:'2'
        }
      }
    },
    methods: {
      changeTime(value){
        this.param = Object.assign({},this.param,value);
        this.getData();
      },
      handleProfitDetailData(source){
        source.dateNumNowTotal.priceSum = source.dateNumNowTotal.priceSum || 0;
        source.dateNumNowTotal.maxPrice = source.dateNumNowTotal.maxPrice || 0;
        source.dateNumAgoTotal.priceSum = source.dateNumAgoTotal.priceSum || 0;
        this.ProfitDetailData = {
          total_profit:source.dateNumNowTotal.priceSum.toFixed(2),
          average_profit:((source.dateNumNowTotal.priceSum) / source.dateNum ).toFixed(2),
          offset:source.dateNum,
          maxProfit:source.dateNumNowTotal.maxPrice.toFixed(2),
        };

        if( source.dateNumAgoTotal.priceSum ){
          this.ProfitDetailData.compareValue = ((source.dateNumNowTotal.priceSum - source.dateNumAgoTotal.priceSum) / source.dateNumAgoTotal.priceSum).toFixed(1)
        }else{
          this.ProfitDetailData.compareValue = 0;
        }
      },
      handleProfitLieData(source){
        //  收益趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.price;
        });
        this.ProfitLieData = {
          title:'收益趋势',
          name:"收益",
          coordinate:coordinate,
          data:data,
        };
      },
      handleMaxProfitLieData(source){
        //  单笔最大打赏趋势
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.maxPrice;
        });
        this.MaxProfitLieData = {
          title:'单笔最大打赏趋势',
          name:"单笔最大打赏",
          coordinate:coordinate,
          data:data,
        };
      },
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
          name:"打赏金额",
          valueType:'money',
          coordinate:coordinate,
          data:data,
          coordinateType:'timeLong'
        };
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.detailAnalyse(this.param);
        if(response === false)return;
        this.handleProfitDetailData(response.data);
        this.handleBarData(response.data.timeDistribute);
        this.handleProfitLieData(response.data.dateNumNowDetail);
        this.handleMaxProfitLieData(response.data.dateNumNowDetail);
      },
      getFontSize(num){
        if( num > 1000000 ){
          return "font16"
        }else if( num > 100000 ){
          return "font18"
        }else if(num > 10000){
          return "font20"
        }else if( num >1000 ){
          return "font22"
        }
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
