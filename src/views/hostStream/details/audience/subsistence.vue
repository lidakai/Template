<template>
  <div class="audience-container">
    <div class="audience_menu">
      <span><router-link :to="'/analysis/audience/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">土豪分析</router-link></span>
      <span><router-link :to="'/analysis/figure/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">观众画像</router-link></span>
      <span class="audience_current_tab"><router-link :to="'/analysis/subsistence/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏留存</router-link></span>
      <span><router-link :to="'/analysis/rank/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏榜单</router-link></span>
    </div>
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <div class="audience-detail_title">
            观众打赏留存
            <el-popover
              placement="right"
              width="550"
              trigger="hover">
              <p>首次打赏观众：首次对主播进行打赏的观众</p>
              <p>活跃打赏观众：上一个30天打赏过，且最近30天有打赏行为的观众</p>
              <p>回流打赏观众：曾经有过打赏，上一个30天无打赏，最近30天重新打赏的观众</p>
              <p>流失打赏观众：上一个30天打赏过，最近30天没有打赏行为的观众</p>
              <img slot="reference" :src="what_tip" alt="" style="width:18px;height: 18px;position:relative;top: 3px;">
            </el-popover>

            <i>（近30天数据）</i>
          </div>
          <horizontal-bar-chart-component :data-horizontal="horizontalData" ref="barChild"></horizontal-bar-chart-component>
          <p class="audience-detail_description">{{audience_detail_description}}</p>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="richer_menu">
            <span class="current_richer" @click="richer_tab_change" data-key="first" data-type="1">首次打赏观众</span>
            <span @click="richer_tab_change" data-key="active" data-type="4">活跃打赏观众</span>
            <span @click="richer_tab_change" data-key="back" data-type="3">回流打赏观众</span>
            <span @click="richer_tab_change" data-key="leave" data-type="2">流失打赏观众</span>
          </p>
          <richer-table-component :data-richer="currentRicherData" :richer-type="richerType" :user-type="userType"></richer-table-component>
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
      .audience-detail_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        height:36px;
        line-height: 36px;
        margin:0 0 20px 0;
        display: block;
        width:100%;
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
        margin:0;
      }
      .richer_menu{
        font-size: 14px;
        color: #464851;
        padding: 0 0 17px;
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
  import horizontalBarChartComponent from '../components/barChart'
  import richerTableComponent from '../components/richerTable.vue'
  import what_tip from "@/assets/what.png"

  export default {
    components:{
      horizontalBarChartComponent,
      richerTableComponent
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    data() {
      return {
        richerData:{
          first:[],//1首次
          leave:[],//2流失
          back:[],//3回流
          active:[],//4活跃
        },
        currentRicherData:[],
        horizontalData:{
          horizontal:['首次打赏观众','活跃打赏观众','回流打赏观众','流失打赏观众'],
          data:[]
        },
        nameType:{
          1:"首次打赏观众",
          2:"流失打赏观众",
          3:"回流打赏观众",
          4:"活跃打赏观众",
        },
        richerDescription:"",
        param:{
          platform:"",
          roomId:""
        },
        userType:1,//2富豪、1普通观众,
        audience_detail_description:"",
        richerType:1,
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
            let key = e.target.getAttribute('data-key');
            this.richerType = type;
            this.getRicherCost(type,key)
          }
      },
      async getSubsistence(){
        const data = Object.assign({},this.param,{type:1});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getGiftRemain(data);
        if(response === false)return;
        let leave_richer = 0;
        let new_add_richer = 0;
        response.data.giftRemainList = response.data.giftRemainList || [];
        response.data.giftRemainList.forEach(giftRemain=>{
          if(giftRemain.type === 2){
            leave_richer = giftRemain.count
          }
          if(giftRemain.type === 1 || giftRemain.type === 3){
            new_add_richer+=giftRemain.count;
          }
        });

        if( (leave_richer - new_add_richer)>0 ){
          this.audience_detail_description = "流失打赏观众 > 新增打赏观众，整体打赏观众人数减少，建议查看流失观众列表，关注是否有观众流失，多多观察观众去向！"
        }else if( (leave_richer - new_add_richer)<0 ){
          this.audience_detail_description = "新增打赏观众数量 > 流失打赏观众数量，总打赏观众人数增多，可多关注新增观众观众！"
        }else{
          this.audience_detail_description = "流失打赏观众数量 = 新增打赏观众数量，总打赏观众人数没有突破，多多努力吧！"
        }

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
        //  获取各类型观众的打赏数据
        if(this.richerData[key].length){
          this.currentRicherData = this.richerData[key];
          return;
        }
        const data = Object.assign({},this.param,{type:type,userType:1});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getTuhaoCost(data);
        if(response === false)return;
        response.data.tuhaoCostList = response.data.tuhaoCostList ? response.data.tuhaoCostList :[];

        this.richerData[key] = response.data.tuhaoCostList;
        this.currentRicherData = this.richerData[key];
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.roomId = this.$route.params.roomId;
      this.userType = 1;
      this.getSubsistence();

      this.getRicherCost(1,'first');
    },
    destroyed() {}
  }

</script>
