<template>
  <div class="audience-container">
    <div class="audience_menu">
      <span><router-link :to="'/analysis/audience/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">土豪分析</router-link></span>
      <span class="audience_current_tab"><router-link :to="'/analysis/figure/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">观众画像</router-link></span>
      <span><router-link :to="'/analysis/subsistence/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏留存</router-link></span>
      <span><router-link :to="'/analysis/rank/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏榜单</router-link></span>
    </div>
    <el-row>

      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="audience-figure-detail_title fl">观众画像</p>
          <Time-select-component @on-time-change="changeTime" class="fr"></Time-select-component>
          <div class="audience-figure-detail_description">
            <p>观看主播{{anchorInfo.nickname}}的观众最喜欢的直播类型是：{{portraitData.favouriteLiveTypeList}}</p>
            <p>最喜欢送的礼物是：{{portraitData.favouriteGiftList}}</p>
            <p>这些观众中有{{portraitData.tuhaoCount}}位是土豪观众</p>
            <p>土豪们最喜欢的直播类型是：{{portraitData.tuhaoFavouriteLiveTypeList}}</p>
            <p>掌握观众动态，配合开播策略，能让直播更有把握喔！</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="active-time-title">
            观众活跃时间分布
            <span class="fr" @click="activeMenu" data-type="1">弹幕分布</span>
            <span class="fr current_active_menu"  @click="activeMenu" data-type="2">打赏分布</span>
          </p>
          <bar-chart-component :chart-data="BarData"></bar-chart-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <pie-chart-component :chart-data="pieChartData"></pie-chart-component>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <div class="chart-wrapper">
          <p class="figure_table_title">看过   {{anchorInfo.nickname}}   的观众还喜欢</p>
          <figure-table-component :data-richer="popularData"></figure-table-component>
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
        margin:5px 0 14px;

      }
      .active-time-title{
        margin:0;
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        padding-left: 20px;
        span{
          color: #464851;
          cursor: pointer;
          font-weight: normal;
          margin-right: 20px;
          border-bottom:1px solid transparent;
        }
        .current_active_menu{
          color: #247aff;
          border-bottom:1px solid #247aff;
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
        padding: 30px 25px 0;
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import { parseTime, getStringTime } from '@/utils'
  import TimeSelectComponent from '@/components/timeSelect/index.vue'
  import BarChartComponent from '@/components/Echart/barChart'
  import figureTableComponent from '../components/figureTable.vue'
  import PieChartComponent from '@/components/Echart/pieChart'
  export default {
    components:{
      TimeSelectComponent,
      BarChartComponent,
      figureTableComponent,
      PieChartComponent
    },
    computed: {
      ...mapGetters([
        'anchorInfo',
        'category'
      ])
    },
    data() {
      return {
        figureData:[],
        pieChartData:{},
        popularData:[],
        BarData:{},
        activeData:{
          price:{},
          barrage:{}
        },
        param:{
          from:'',
          to:'',
          platform:'',
          roomId:''
        },
        userType:1,
        portraitData:{
          tuhaoCount:0,
          tuhaoFavouriteLiveTypeList:"",
          favouriteLiveTypeList:"",
          favouriteGiftList:""
        }
      }
    },
    methods: {
      changeTime(value) {
        this.param = Object.assign({}, this.param, value);
        this.getPortrait();
        this.getCatePreference();
        this.getFavouriteOtherAnchor();
        this.getActiveTime(2);
      },
      activeMenu(e){
        let className = e.target.className;
        if(className === 'fr'){
          try{
            document.getElementsByClassName('current_active_menu')[0].setAttribute('class','fr')
          }catch(error){}
          e.target.className = 'current_active_menu fr';
          let type = Number(e.target.getAttribute('data-type'));
          this.getActiveTime(type)
        }
      },
      handlePieData(source) {
        this.pieChartData = {
          nameArr: source.map(item => {
            return item.name
          }),
          data: source.map(item => {
            return {value: item.price, name: this.getCateNameById(item.cateId)}
          }),
          title:"观众偏好"
        }
      },
      async handlePortrait(source){

        if(!this.category.length){
          const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
          if(response === false) return;
          this.$store.dispatch("set_category",response.data.cateInfos);
        }
        source.tuhaoFavouriteLiveTypeList = source.tuhaoFavouriteLiveTypeList || [];
        source.favouriteLiveTypeList = source.favouriteLiveTypeList || [];
        source.favouriteGiftList = source.favouriteGiftList || [];
        this.portraitData.tuhaoCount = source.tuhaoCount || 0;
        if(source.tuhaoFavouriteLiveTypeList.length){
          let tuhaoFavouriteLiveTypeList = source.tuhaoFavouriteLiveTypeList.map(item=>{
            return this.getCateNameById(item.cateId);
          });
          this.portraitData.tuhaoFavouriteLiveTypeList = tuhaoFavouriteLiveTypeList.join("、");
          if(this.portraitData.tuhaoFavouriteLiveTypeList.length - 1 === '、'){
            this.portraitData.tuhaoFavouriteLiveTypeList  = this.portraitData.tuhaoFavouriteLiveTypeList .substring(0, this.portraitData.tuhaoFavouriteLiveTypeList.length - 1);
          }
           }
        if(source.favouriteLiveTypeList.length){
          let favouriteLiveTypeList = source.favouriteLiveTypeList.map(item=>{
            return this.getCateNameById(item.cateId);
          });
          this.portraitData.favouriteLiveTypeList = favouriteLiveTypeList.join("、");
          if(this.portraitData.favouriteLiveTypeList.length - 1 === '、'){
            this.portraitData.favouriteLiveTypeList  = this.portraitData.favouriteLiveTypeList .substring(0, this.portraitData.favouriteLiveTypeList.length - 1);
          }
        }
        if(source.favouriteGiftList.length){
          let favouriteGiftList = source.favouriteGiftList.map(item=>{
            return item.gName;
          });
          this.portraitData.favouriteGiftList = favouriteGiftList.join("、");
        }

      },
      async getActiveTime(type) {
        //  观众活跃的时间分布
        const data = Object.assign({}, this.param, {userType: 1,type:type});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getActiveTime(data);
        if (response === false) return;
        if (type === 2) {
          this.BarData = {
            name: '打赏金额',
            coordinateType:'timeLong',
            valueType:'money',
            coordinate: response.data.audienceActiveTimeList.map(item => {
              return item.hours
            }),
            data: response.data.audienceActiveTimeList.map(item => {
              return {value: item.count}
            })
          };
        } else {
          this.BarData = {
            name: '弹幕数',
            coordinateType: 'timeLong',
            coordinate: response.data.audienceActiveTimeList.map(item => {
              return item.hours
            }),
            data: response.data.audienceActiveTimeList.map(item => {
              return {value: item.count}
            })
          }
        }
      },
      async getPortrait(){
        //观众画像
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getPortrait(this.param);
        if (response === false) return;
        this.handlePortrait(response.data)
      },
      async getCatePreference(){
        //观众偏好
        if(!this.category.length){
          const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
          if(response === false) return;
          this.$store.dispatch("set_category",response.data.cateInfos);
        }
        const data = Object.assign({},this.param,{userType:1});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getCatePreference(data);
        if (response === false) return;
        response.data.catePreferenceList = response.data.catePreferenceList || []
        this.handlePieData(response.data.catePreferenceList)
      },
      async getFavouriteOtherAnchor(){
        // 看过XXX的观众还喜欢
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getFavouriteOtherAnchor(this.param);
        if (response === false) return;
        this.popularData = response.data.favouriteOtherAnchorList
      },
      getCateNameById(cateId){
        let cateName='';
        this.category.forEach(item=>{
          if(cateId === 'all'){
            cateName='全部'
          }else if(item.typeId === Number(cateId)){
              cateName = item.typeName;
          }
        });
        return cateName;
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.roomId = this.$route.params.roomId;

      this.getSubsistence();
      this.getRicherCost(1,'first');
    },
    destroyed() {}
  }

</script>
