<template>
  <div class="audience-container">
    <div class="audience_menu">
      <span class="audience_current_tab"><router-link :to="'/analysis/audience/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">土豪分析</router-link></span>
      <span><router-link :to="'/analysis/figure/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">观众画像</router-link></span>
      <span><router-link :to="'/analysis/subsistence/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏留存</router-link></span>
      <span><router-link :to="'/analysis/rank/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏榜单</router-link></span>
    </div>
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper" style="position: relative">
          <Popover-component :popover="popover"></Popover-component>
          <div class="audience-detail_title fl">
            土豪打赏留存
            <!--<span style="color: #ccc;cursor:pointer" @mouseout="popoverFn(false)" @mouseover="popoverFn(true)">-->
              <!--<img :src="what_tip" alt="" style="height: 18px;position:relative;top: 3px;">-->
            <!--</span>-->
            <el-popover
              placement="right"
              width="550"
              trigger="hover">
              <p>首次打赏土豪：首次对主播进行打赏的土豪</p>
              <p>活跃打赏土豪：上一个30天打赏过，且最近30天有打赏行为的土豪</p>
              <p>回流打赏土豪：曾经有过打赏，上一个30天无打赏，最近30天重新打赏的土豪</p>
              <p>流失打赏土豪：上一个30天打赏过，最近30天没有打赏行为的土豪</p>
              <img slot="reference" :src="what_tip" alt="" style="width:18px;height: 18px;position:relative;top: 3px;">

            </el-popover>
            <i>（近30天数据）</i>
          </div>
          <horizontal-bar-chart-component :data-horizontal="horizontalData"></horizontal-bar-chart-component>
          <p class="audience-detail_description">{{audience_detail_description}}</p>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <bar-chart-component :chart-data="BarData"></bar-chart-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper" style="width: 100%">
          <p class="richer_menu">
            <span class="current_richer" @click="richer_tab_change" data-key="first" data-type="1">首次打赏土豪</span>
            <span @click="richer_tab_change" data-key="active" data-type="4">活跃打赏土豪</span>
            <span @click="richer_tab_change" data-key="back" data-type="3">回流打赏土豪</span>
            <span @click="richer_tab_change" data-key="leave" data-type="2">流失打赏土豪</span>
          </p>
          <richer-table-component :data-richer="currentRicherData" :richer-type="richerCate"></richer-table-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
         <span class="codeBtn" @mouseout="popoverFn(false,1)" @mouseover="popoverFn(true,1)">
                         <img :src="what_tip" alt="" style="height: 18px">
         </span>
          <Popover-component :popover="popoverTuo"></Popover-component>
          <pie-chart-component :chart-data="pieChartData"></pie-chart-component>
          <Table-Page-Component data="TA的直播间暂时没有土豪互动哦！请多多努力！" style="position: absolute;top: 5%; left: 0;right: 0" v-if="pieChartDataBtn"></Table-Page-Component>
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
      padding: 25px 10px 10px;
      position: relative;
    span.codeBtn{
      color: #cccccc;
      position: absolute;
      left: 12.5%;
      top: 9.5%;
      cursor: pointer;
      z-index: 99;
    }
      .audience-detail_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        height:36px;
        line-height: 36px;
        margin:0 0 26px 0;
        position: relative;
      z-index:99;
        i{
          font-size: 12px;
          font-weight: normal;
          font-style:normal;
          color: #999999;
       }
      }
      .audience-detail_description{
        background: #f1f7fe;
        padding: 12px 23px 15px 18px;
        font-size: 14px;
        line-height: 24px;
        color: #707c97;
        margin-top: 50px;
      }
      .richer_menu{
        font-size: 14px;
        color: #464851;
        padding: 30px 0 17px;
        margin:0;
        span{
          margin-right: 30px;
          cursor: pointer;
        }
        .current_richer{
          color: #3780ff;
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
    .column_list:nth-of-type(3){
      .chart-wrapper{
        padding: 0 25px 0;
      }
    }
  }
</style>


<script>
  import { mapGetters } from 'vuex'
  import BarChartComponent from '@/components/Echart/barChart'
  import horizontalBarChartComponent from '../components/barChart'
  import richerTableComponent from '../components/richerTable.vue'
  import PieChartComponent from '@/components/Echart/pieChart'
  import TablePageComponent from '@/components/NullPages/TablePage'
  import {sort,Arrangement} from "../../../../utils";
  import PopoverComponent from '@/components/Popover/index'
  import what_tip from '@/assets/what.png'
  export default {
    components:{
      BarChartComponent,
      horizontalBarChartComponent,
      richerTableComponent,
      PieChartComponent,
      PopoverComponent,
      TablePageComponent
    },
    computed: {
      ...mapGetters([
        'anchorInfo',
        'category'
      ])
    },
    data() {
      return {
        BarData:{},
        currentRicherData:[],
        richerData:{
          first:[],
          active:[],
          back:[],
          leave:[]
        },
        pieChartData:{},
        horizontalData:{
          horizontal:['首次打赏土豪','活跃打赏土豪','回流打赏土豪','流失打赏土豪'],
          data:[0,0,0,0]
        },
        pieChartDataBtn:false,
        nameType:{
          // 1 首次 2 流失 3 回流 4 活跃
          1:'首次打赏土豪',
          2:'流失打赏土豪',
          3:'回流打赏土豪',
          4:'活跃打赏土豪'
        },
        richerType:{
          // 1 首次 2 流失 3 回流 4 活跃
          1:'顶级土豪',
          2:'超级土豪',
          3:'大土豪',
          4:'小土豪'
        },
        audience_detail_description:'',
        popover:false,
        popoverTuo:false,
        param:{
          platform:"",
          roomId:""
        },
        richerCate:1,
        what_tip
      }
    },
    methods: {
      richer_tab_change(e){
        let className = e.target.className;
        if(!className){
          try{
            document.getElementsByClassName('current_richer')[0].setAttribute('class','')
          }catch(error){}
          e.target.className = 'current_richer';
          let type = Number(e.target.getAttribute('data-type'));
          this.richerCate = type;
          let key = e.target.getAttribute('data-key');
          this.getRicherCost(type,key)
        }
      },
      popoverFn(btn,code){
        if(code === 1){
          this.popoverTuo = btn;
        }else {
          this.popover = btn;
        }
      },
      handlePieData(source){
        this.pieChartData = {
          nameArr: source.map(item => {
            return this.richerType[item.type]
          }),
          data: source.map(item => {
            return {value: item.count, name: this.richerType[item.type],count:item.count}
          }),
          title:"土豪分布"
        }
      },
      async getSubsistence(){
        //土豪打赏留存
        const data = Object.assign({},this.param,{type:2});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getGiftRemain(data);
        if(response === false)return;
        let leave_richer = 0;
        let new_add_richer = 0;
        response.data.giftRemainList = response.data.giftRemainList || []
        response.data.giftRemainList.forEach(giftRemain=>{
          if(giftRemain.type === 2){
            leave_richer = giftRemain.count
          }
          if(giftRemain.type === 1 || giftRemain.type === 3){
            new_add_richer+=giftRemain.count;
          }
        });
        if( (leave_richer - new_add_richer)>0 ){
          this.audience_detail_description = "流失打赏土豪 > 新增打赏土豪，整体打赏土豪人数减少，建议查看流失土豪列表，关注是否有土豪流失，多多观察土豪去向！"
        }else if( (leave_richer - new_add_richer)<0 ){
          this.audience_detail_description = "新增打赏土豪数量 > 流失打赏土豪数量，总打赏土豪人数增多，可多关注新增土豪观众！"
        }else{
          this.audience_detail_description = "流失打赏土豪数量 = 新增打赏土豪数量，总打赏土豪人数没有突破，多多努力吧！"
        }

        this.horizontalData.data = [];
        this.horizontalData.horizontal.forEach(item=>{
          // 补齐操作
          let count = 0;
          response.data.giftRemainList.forEach(giftRemain=>{
            if(this.nameType[giftRemain.type] === item){
              count =giftRemain.count;
            }
          });
          this.horizontalData.data.push(count)
        });
      },
      async getRicherCost(type,key){
        //  获取各类型土豪的打赏数据
        if(this.richerData[key].length){
          this.currentRicherData = this.richerData[key];
          return;
        }
        const data = Object.assign({},this.param,{type:type,userType:2});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getTuhaoCost(data);
        if(response === false)return;
        response.data.tuhaoCostList = response.data.tuhaoCostList ? response.data.tuhaoCostList :[];
        this.richerData[key] = response.data.tuhaoCostList;
        this.currentRicherData = this.richerData[key];
      },
      async getTuhaoDistribution(){
        //  土豪分布
        const data = Object.assign({},this.param,{userType:1});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getTuhaoDistribution(data);
        if (response === false){
          this.handlePieData([]);
          this.pieChartDataBtn = true;
          return;
        }
        this.pieChartDataBtn = false;
        this.handlePieData(response.data.tuhaoDistributionList)
      },
      async getActiveTime(){
        //  土豪打赏的时间分布
        if (this.BarData.name) return;
        const data = Object.assign({}, this.param, {userType: 2,type:2});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getActiveTime(data);
        if (response === false) return;
        this.BarData = {
          title:'土豪打赏时间分布',
          name:'打赏金额',
          coordinateType:'timeLong',
          valueType:'money',
          coordinate: response.data.audienceActiveTimeList.map(item => {
            return item.hours
          }),
          data: response.data.audienceActiveTimeList.map(item => {
            return {value: item.count}
          })
        };
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.roomId = this.$route.params.roomId;
      this.getSubsistence();
      this.getRicherCost(1,'first');
      this.getTuhaoDistribution();
      this.getActiveTime();
    },
    destroyed() {}
  }

</script>
