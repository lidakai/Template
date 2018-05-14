<template>
<div class="trend-direction">
    <div class="trend-direction_header">
      <h3 class="trend-direction_title fl">数据趋势</h3>
      <Type-select-component  @on-type-change='typeChange'></Type-select-component>

      <!--<div class="sort_"></div>-->

      <!--<Search-component :search-data="searchData" @on-search-value="searchHost" style="margin-left: 20px"></Search-component>-->
      <Time-select-component @on-time-change="changeTime" class="fr"></Time-select-component>
    </div>
    <div class="trend-direction-content">
      <ul class="trend-direction-total" @click="select_current_total">
        <li class="trend-direction-current" data-type="price">
          <el-popover
            ref="popover_priceSum"
            placement="top"
            title=""
            width="220"
            trigger="hover"
            content="直播收益总额">
          </el-popover>
          <p v-popover:popover_priceSum>总收益(元)：<span>{{dateNumNowTotal.priceSum.toFixed(2)}}</span></p>

          <img :src="img_shadow" alt="">
        </li>
        <li data-type="rewardPerson">
          <el-popover
            ref="popover_gratuity_num"
            placement="top"
            title=""
            width="220"
            trigger="hover"
            content="所选时间范围内给主播打赏的总人数累计">
          </el-popover>
          <p v-popover:popover_gratuity_num>总打赏人数：<span>{{dateNumNowTotal.rewardPersonSum}}</span></p>

          <img :src="img_shadow" alt="">
        </li>
        <li data-type="follower">
          <el-popover
            ref="popover_total_follow"
            placement="top"
            title=""
            width="220"
            trigger="hover"
            content="所选时间范围内最后一日订阅总数">
          </el-popover>
          <p v-popover:popover_total_follow>总订阅数：<span>{{AnchorTotal.totalFollower}}</span></p>

          <img :src="img_shadow" alt="">
        </li>
        <li data-type="anchorCount">
          <el-popover
            ref="popover_average_living_host"
            placement="top"
            title=""
            width="220"
            trigger="hover"
            content="所选时间范围内平均每日开播主播数量">
          </el-popover>
          <p v-popover:popover_average_living_host>日均开播主播数量：<span>{{Number(AnchorTotal.average_living_host).toFixed(0)}}</span></p>
          <img :src="img_shadow" alt="">
        </li>
        <li data-type="pricePerHour">
          <el-popover
            ref="popover_average_price"
            placement="top"
            title=""
            width="220"
            popper-class="center"
            trigger="hover"
            content="所选时间范围内平均开播每小时收益">
          </el-popover>
          <p v-popover:popover_average_price>平均开播每小时收益(元)：<span>{{AnchorTotal.average_price}}</span></p>

          <img :src="img_shadow" alt="">
        </li>
      </ul>
      <line-chart :chart-data="currentLieData"></line-chart>
      <p class="word_des" v-if="showDescription">
        在这{{AnchorTotal.dateNum}}天里，
        您旗下{{!filterFn(type_select.plat)?'': type_select.plat+'平台'}}{{!filterFn(type_select.group)?'':type_select.group+'组'}}{{!filterFn(type_select.category)?'':type_select.category+'分类'}}主播{{AnchorTotal.hostRange}}一共获得收益<span>{{dateNumNowTotal.priceSum.toFixed(2)}}元</span>，相比上一个{{AnchorTotal.dateNum}}天，
        总收益
        <span v-if="AnchorTotal.compareValue > 0">上升{{AnchorTotal.percent}}</span>
        <span v-if="AnchorTotal.compareValue < 0">下降{{AnchorTotal.percent}}</span>
        <span v-if="AnchorTotal.compareValue === 0">持平</span>。
      </p>
      <p class="word_des" v-if="showDescription">
        <i v-if="AnchorTotal.dateNum * AnchorTotal.average_living_host >1">平均每天有<span>{{Number(AnchorTotal.average_living_host).toFixed(0)}}</span>个主播开播，</i>
        <i>他<i v-if="AnchorTotal.dateNum * AnchorTotal.average_living_host >1">们</i>开播1小时能够为公会带来<span>{{AnchorTotal.average_price}}</span>元收益</i>，
        收益能力比上一个{{AnchorTotal.dateNum}}天
        <span v-if="changePerHour.compareValue > 0">上升{{changePerHour.percent}}</span>
        <span  v-if="changePerHour.compareValue < 0">下降{{changePerHour.percent}}</span>
        <span v-if="changePerHour.compareValue === 0">持平</span>。
        其中，平均每天有<span>{{AnchorTotal.rewardPersonSumPerDay}}</span>人对主播打赏，新增<span>{{AnchorTotal.addFollowerSumPerDay}}</span>个订阅人数。
      </p>
    </div>
</div>
</template>

<script>
  import LineChart from './components/LineChart'
  import TypeSelectComponent from '@/components/TypeSelect/index.vue'
  import SearchComponent from '@/components/Search/index.vue'
  import { parseTime, getStringTime } from '@/utils'
  import { trend } from '@/api/data'
  import img_shadow from '@/assets/shadow.png'
  import { mapGetters } from 'vuex'
  import TimeSelectComponent from '@/components/timeSelect/index.vue'
  export default {
    components: {
      TimeSelectComponent,
      LineChart,
      TypeSelectComponent,
      SearchComponent
    },
    computed: {
      ...mapGetters([
        'type_select'
      ])
    },
    name: 'trend_direction',
    data() {
      return {
        currentLieData: {
          data: [],
          coordinate: [],
          name: '',
          unit: ''
        },
        lineChartData:{
          follower:{
            data:[]
          }
        },
        AnchorTotal:{
          dateNum:30,//时间栏所选时间段长度
          total_follow:0,//总订阅数
          average_price:0,// 平均每小时开播收益
          average_living_host:0,// 日均开播主播数量
          compareValue:0,//同比变化值
          percent:'0%',//同比变化率,
          hostRange:'',//主播所在范围
          addFollowerSumPerDay:0,//单日新增关注人数
          rewardPersonSumPerDay:0//单日打赏人数
        },
        changePerHour:{
          compareValue:0,//同比每小时变化值
          percent:'0%',//同比每小时变化率,
        },
        dateNumAgoTotal:{
          priceSum : 0,// 总收益
          maxPrice:0,//单次最大打赏
          barNumSum:0,//弹幕数量
          barPeoSum:0,//弹幕人数
          addFollowerSum:0,//新增关注人数
          timeLongSum:1,//总时长（分钟）
          maxOnline:0,// 最大人气， 多人时为多人最大人气， 适用于单人
          rewardPersonSum:0,//打赏人数
        },
        dateNumNowTotal :{
          priceSum : 0,// 总收益
          maxPrice:0,//单次最大打赏
          barNumSum:0,//弹幕数量
          barPeoSum:0,//弹幕人数
          addFollowerSum:0,//新增关注人数
          timeLongSum:1,//总时长（分钟）
          maxOnline:0,// 最大人气， 多人时为多人最大人气， 适用于单人
          rewardPersonSum:0,//打赏人数
          totalFollower:0,//关注总数
        },
        img_shadow,
        searchData:{
          placeholder:"请输入主播昵称",
          type:'searchHost',
          param:{}
        },
        searchParams:{
          from:'',
          to:'',
          groupId:'',
          platform:0,
          category:0,
          searchVar:''
        },
        isInit:true,
        showDescription:false
      }
    },
    methods: {
      filterFn(val){
        let btn = '';
        if(val === ''||val === '全部分类'||val === '全部平台'||val === '全部分组'){
          btn = false
        }else {
          btn = true
        }
        return btn
      },
      changeTime(value){
        this.searchParams = Object.assign({},this.searchParams,value);
        if(this.isInit)return;
        this.getData();
      },
      typeChange(data){
        this.searchParams = Object.assign({},this.searchParams,data);
        this.searchData.param = Object.assign({},this.searchData.param,data);
        this.getData();
      },
      searchHost(str){
        this.searchParams.searchVar = str;
        if(this.isInit)return;
        this.getData();
      },
      handleTotal(source){
          //  获取当日开播数
        this.dateNumNowTotal.priceSum = source.dateNumNowTotal.priceSum || 0;
        this.dateNumNowTotal.rewardPersonSum = source.dateNumNowTotal.rewardPersonSum || 0;
        this.dateNumAgoTotal.priceSum = source.dateNumAgoTotal.priceSum || 0;
        this.dateNumAgoTotal.rewardPersonSum = source.dateNumAgoTotal.rewardPersonSum || 0;
        this.AnchorTotal.dateNum = source.dateNum || 0;
        let LivingHost = 0,total_follow =0,total_rewardPerson  = 0,agoPriceSumPerHour = 0, nowPriceSumPerHour = 0;
        source.dateNumNowDetail.forEach(item=>{
          LivingHost+=item.anchorCount;
          total_follow+=item.addFollower;
          total_rewardPerson+=item.rewardPerson;
        });
//        this.AnchorTotal.average_living_host = (LivingHost/ this.AnchorTotal.dateNum).toFixed(1);

        this.AnchorTotal.average_living_host = source.dateNumNowTotal.avgAnchorCount || 0;
        this.AnchorTotal.total_follow = total_follow;

        this.AnchorTotal.compareValue = this.dateNumNowTotal.priceSum - this.dateNumAgoTotal.priceSum;

        if(source.dateNumNowTotal.timeLongSum){
          this.AnchorTotal.average_price = nowPriceSumPerHour = (source.dateNumNowTotal.priceSum / source.dateNumNowTotal.timeLongSum * 3600).toFixed(2);
        }else{
          this.AnchorTotal.average_price = 0;
        }

        if( source.dateNumAgoTotal.timeLongSum ){
          agoPriceSumPerHour = source.dateNumAgoTotal.priceSum.priceSum / source.dateNumAgoTotal.timeLongSum * 3600 || 0
        }

        this.changePerHour.compareValue = nowPriceSumPerHour - agoPriceSumPerHour || 0;
        if( agoPriceSumPerHour ){
          this.changePerHour.percent = (this.changePerHour.compareValue / agoPriceSumPerHour *100).toFixed() +'%'
        }else if( nowPriceSumPerHour ){
          this.changePerHour.percent = "100%";
        }else{
          this.changePerHour.percent = "0%";
        }

        this.AnchorTotal.compareValue = this.dateNumNowTotal.priceSum - this.dateNumAgoTotal.priceSum || 0;
        if( this.dateNumNowTotal.priceSum && this.dateNumAgoTotal.priceSum ){
          this.AnchorTotal.percent = (this.AnchorTotal.compareValue / this.dateNumAgoTotal.priceSum *100).toFixed(2) +'%'
        }else{
          this.AnchorTotal.percent = '100%';
        }

        this.AnchorTotal.addFollowerSumPerDay =  (total_follow / this.AnchorTotal.dateNum).toFixed() || 0;

        this.AnchorTotal.rewardPersonSumPerDay = (total_rewardPerson / this.AnchorTotal.dateNum).toFixed() || 0;


        this.AnchorTotal.totalFollower = source.dateNumNowDetail[this.AnchorTotal.dateNum -1].follower
      },
      handleLieData(source){
        this.lineChartData = {
          price:{
            data: [],
              coordinate: [],
              name: '日收益',
              unit: '元'
          },
          rewardPerson:{
            data: [],
              coordinate: [],
              name: '打赏人数',
              unit: '人'
          },
          follower:{
            data: [],
              coordinate: [],
              name: '新增关注',
              unit: '人'
          },
          anchorCount:{
            data: [],
              coordinate: [],
              name: '开播数',
              unit: '人'
          },
          pricePerHour:{
            data: [],
              coordinate: [],
              name: '单日每小时收益',
              unit: '元'
          }
        };
        source.forEach(item=>{
          this.lineChartData.price.data.push( item.price );
          this.lineChartData.price.coordinate.push( item.dateTime );

          this.lineChartData.rewardPerson.data.push( item.rewardPerson );
          this.lineChartData.rewardPerson.coordinate.push( item.dateTime );

          this.lineChartData.follower.data.push( item.addFollower );
          this.lineChartData.follower.coordinate.push( item.dateTime );

          this.lineChartData.anchorCount.data.push( item.anchorCount );
          this.lineChartData.anchorCount.coordinate.push( item.dateTime );

          if( item.timeLong === 0){
            this.lineChartData.pricePerHour.data.push( 0.00 );
            this.lineChartData.pricePerHour.coordinate.push( item.dateTime );
          }else{
            this.lineChartData.pricePerHour.data.push( (item.price / item.timeLong * 60).toFixed(2) );
            this.lineChartData.pricePerHour.coordinate.push( item.dateTime );
          }
        });
        let type = document.getElementsByClassName('trend-direction-current')[0].getAttribute('data-type');
        this.currentLieData = this.lineChartData[type];
      },
      select_current_total(e){
        // 切换当前的图例数据
        document.querySelectorAll('.trend-direction-current')[0].removeAttribute('class');
        let type = 'profits';
        if(e.target.nodeName == 'LI'){
          e.target.setAttribute('class','trend-direction-current');
          type = e.target.getAttribute('data-type')
        }else if(e.target.parentNode.nodeName == 'LI'){
          e.target.parentNode.setAttribute('class','trend-direction-current');
          type = e.target.parentNode.getAttribute('data-type')
        }else if(e.target.parentNode.parentNode.nodeName == 'LI'){
          e.target.parentNode.parentNode.setAttribute('class','trend-direction-current');
          type = e.target.parentNode.parentNode.getAttribute('data-type');
        }
        this.currentLieData = this.lineChartData[type]
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getDataTrend(this.searchParams);
        if(response === false)return;
        if(!response.data.dateNumNowDetail){
          response.data.dateNumNowDetail = [];
          for (let i = 0 ;i < response.data.dateNum;i++){
            response.data.dateNumNowDetail.push({
              addFollower:0,
              anchorCount:0,
              barNum:0,
              barPeoNum:0,
              dateTime:"2018/03/27",
              follower:0,
              maxPrice:0,
              online:0,
              price:0,
              rewardPerson:0,
              timeLong:0,
            });
          }
          this.showDescription = false;
        }else{
          this.showDescription = true;
        }

        this.handleTotal(response.data);
        this.handleLieData(response.data.dateNumNowDetail);

        this.isInit = false;
      }
    },
    created() {},
    mounted(){},
    destroyed() {

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.trend-direction{
  .trend-direction_header{
    margin-bottom: 20px;
    .trend-direction_title{
      margin: 0 0 30px 0;
      height: 36px;
      font-size: 26px;
      line-height: 36px;
      color: #464851;
      font-weight: normal;
      width:100%;
    }
    span{
     display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      color: #464851;
      vertical-align: middle;
    }
    .currentSelect{
      color: #3083ff;
    }
  }
  .trend-direction-content{
    padding: 28px 33px 35px 20px;
    background: #fff;
    .el-pagination{
      text-align: center;
    }
    .download_excel{
      margin:10px 0;
      float: right;
    }
    .chart_title{
      margin:0;
      .el-dropdown-link {
        cursor: pointer;
        color: rgba(0,0,0,1);
      }
    }
    .trend-direction-total{
      display: flex;
      flex-flow: nowrap row;
      margin:0 0 20px 0;
      padding: 0;
      font-size: 18px;
      text-align: center;
      li{
        width: 20%;
        list-style: none;
        cursor: pointer;
        /*padding-bottom: 20px;*/
        position: relative;
        text-align: center;
        p{
          margin:0 0 16px 0;
          outline: none;
          font-size: 16px;
          font-weight: normal;
          color: #8492af;
        }
        span{
          font-size: 22px;
          font-stretch: normal;
          color: #3b77ff;
        }
        img{
          width: 100%;
          display: none;
          position: absolute;
          bottom: 0;
          left:0;
        }
      }
      .trend-direction-current{
        color: #1890FF;
        position: relative;
        &::after{
          display: block;
          content:'';
          position: absolute;
          bottom:0;
          height:4px;
          width:70%;
          left:15%;
          background: #3385ff;
        }
      }
    }

  }
}



</style>

<style>
  .el-popover{
    text-align: center;
  }
  .word_des{
    color: #4b4d56;
    font-size: 18px;
    font-weight: normal;
    line-height: 26px;
    margin:20px 0 10px 0;
  }
  .word_des span{
    color: #448bff;
  }
  .word_des i{
    font-style: normal;
  }
  .sort_{
    width: 100%;
    height: 1px;
    background-color: #e9e9e9;
    margin: 20px 0;
  }
  .TimeStyle{
    display: inline-block;
  }
</style>
