<template>
  <div class="audience-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <pie-chart-component :chart-data="pieChartData"></pie-chart-component>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="figure_table_title">TA打赏过的主播
            <el-popover
              placement="right"
              width="550"
              trigger="hover">
          <p>TA近30天内打赏过的主播</p>
          <img slot="reference" :src="what_tip" alt="" style="width:18px;height: 18px;position:relative;top: 3px;">
          </el-popover></p>
          <prefer-host-table-component :data-richer="preferData"></prefer-host-table-component>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .audience-container{
    width:1360px;
    margin:0 auto;
    .audience_menu{
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
      .audience_current_tab{
        opacity: 1;
        color: #508ef7;
        font-weight: bold;
      }
    }
    .chart-wrapper{
      height:315px;
      background-color: #ffffff;
      padding: 10px;
      .audience-figure-detail_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        height:36px;
        line-height: 36px;
        margin:0 0 26px 0;
      }
      .audience-figure-detail_description{
        display: block;
        background-color: #f1f7fe;
        border-radius: 2px;
        margin-top: 55px;
        padding: 20px 25px;
        p{
          margin:0;
          font-size: 16px;
          font-weight: normal;
          line-height: 36px;
          color: #707c97;
        }
      }
      .figure_table_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
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
    .column_list:nth-of-type(3){
      .chart-wrapper{
        padding: 0 25px 0;
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import preferHostTableComponent from '../components/preferHostTable.vue'
  import PieChartComponent from '@/components/Echart/pieChart'
  import what_tip from "@/assets/what.png"
  export default {
    components:{
      preferHostTableComponent,
      PieChartComponent
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    data() {
      return {
        what_tip:what_tip,
        pieChartData: {},
        preferData: [],
        param:{
          platform:'',
          uid:''
        }
      }
    },
    methods: {
      async getDetailPreferCate(){
          //  获取用户偏爱的直播类型
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getDetailPreferCate(this.param);
        if(response === false)return;
        let nameArr = [] ,data =[],TotalNum=0;
       response.data.preferCates.map(item=>{
         TotalNum += item.allPrice
        })
        response.data.preferCates.forEach(item=>{
          let cateName = (item.cateName === ''||item.cateName === undefined||item.cateName === null)?'未知':item.cateName;
          nameArr.push(cateName);
          data.push({value:Number(item.allPrice.toFixed(2)),name:cateName});
        });
        this.pieChartData = {
          nameArr:nameArr,
          data:data,
          title:'喜爱偏好'
        };
      },
     async getDetailPreferOnceReward(){
        //   用户曾今打赏过的主播
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getDetailPreferOnceReward(this.param);
        if(response === false)return;
        response.data.rewardAnchorDetail.map((item,index)=>{
          item.index = index+1;
          return item;
        });
        this.preferData = response.data.rewardAnchorDetail;
      }

    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.uid = this.$route.params.uid;
      if( !this.pieChartData.nameArr ||  !this.preferData.length ){
        this.getDetailPreferOnceReward();
        this.getDetailPreferCate();
      }
    },
    destroyed() {}
  }

</script>
