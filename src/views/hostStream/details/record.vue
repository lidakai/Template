<template>
  <div class="record-container">
    <p class="record-chart-title">
      <span>每日直播时长图</span>
      <time-select-component @on-time-change="changeTime" class="fr"></time-select-component>
    </p>
    <bar-chart-component :chart-data="chartData"></bar-chart-component>
    <p class="record-detail_des">
      在这<i>{{validLiveInfo.days}}</i>天里，主播<i>{{anchorInfo.nickname}}</i>一共直播了<i>{{validLiveInfo.totalDay}}</i>天，
      <!--有效直播<i>{{validLiveInfo.validDay}}</i>天，有效开播率达到<i>{{(validLiveInfo.validPercent*100).toFixed(1)}}%</i>，-->
      日均开播<i>{{validLiveInfo.averageTime.toFixed(1)}}</i>小时。
      <!--，勤奋度在公会排第<i>2</i>名-->
    </p>
    <p class="record-table_title">
      <span>直播记录</span>
      <Download-component :download-data="downloadData" class="fr"  @on-download-click="getDownloadData"></Download-component>
    </p>
    <Table-component :table-data="tableData"></Table-component>
    <Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .record-container{
    width:1360px;
    margin:0 auto 43px;
    padding-bottom: 30px;
    background: #fff;
    .record-chart-title{
      margin:0;
      height:60px;
      padding: 24px 28px 0 25px;
      line-height: 36px;
      span{
        color: #4b4d56;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .record-detail_des{
      margin:25px 25px 0 25px;
      height: 46px;
      line-height: 46px;
      background-color: #f1f7fe;
      font-size: 16px;
      font-weight: normal;
      color: #707c97;
      padding-left: 18px;
      i{
        font-style: normal;
        font-size: 16px;
        font-weight: bold;
        color: #707c97;
        margin:0 2px;
      }
    }
    .record-table_title{
      margin:30px 0 0;
      height:65px;
      padding: 20px 28px 11px 25px;
      line-height: 36px;
      border-top:1px solid #f3f6f8;
      span{
        color: #4b4d56;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'
  import TimeSelectComponent from '@/components/timeSelect/index.vue'
  import BarChartComponent from '@/components/Echart/barChart'
  import TableComponent from './components/table'
  import PaginationComponent from '@/components/Pagination/index.vue'
  import DownloadComponent from '@/components/Download/index.vue'
  export default {
    components:{
      TimeSelectComponent,
      BarChartComponent,
      TableComponent,
      PaginationComponent,
      DownloadComponent
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    data() {
      return {
        tableData:[],
        chartData:{},
        paginationData:{total:0,pageSize:10,currentPage:1},
        downloadData:null,
        param:{
          from:'2018-02-03',
          to:'2018-03-02',
          roomId:'',
          platform:'',
        },
        validLiveInfo:{
          days:0,
          totalDay:0,
          validDay:0,
          validPercent:0,
          averageTime:0
        }
      }
    },
    methods: {
      changeTime(value){
        this.param = Object.assign({},this.param,value);
        this.getRecord();
        this.getLiveTime();
        this.getValidLiveInfo();
      },
      paginationChange(pagination){
        this.paginationData = Object.assign({},this.paginationData,pagination);
        this.getRecord();
      },
      async getDownloadData(){
        const data = Object.assign({},this.param,{isExport:true});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getLiveRecord(data);
        this.downloadData = {
          isloading:false
        };
        if(response === false) return ;
        this.downloadData = {
          isloading:true,
          tHeader:['日期', '开播时间', '下播时间', '直播时长（小时）', '收益（元）'],
          filterVal:['dateTime', 'startTime', 'endTime', 'timeLong', 'price'],
          data:response.data.liveRecordList || [],
          xlms_name:this.param.from+"至"+this.param.to,
        }
      },
      handleChartData(source){
        let coordinate = source.map(item=>{
          return item.dateTime;
        });
        let data = source.map(item=>{
          return item.timeLong ;
        });
        this.chartData = {
          name:'直播时长',
          coordinate:coordinate,
          data:data,
          NoTitle:true
        };
      },
      async getRecord(){
        const data = Object.assign({},this.param,{pageNum:this.paginationData.currentPage,pageSize:this.paginationData.pageSize});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getLiveRecord(data);
        if(response === false)return;
        this.paginationData.total = Number(response.data.totalCount);
        this.tableData = response.data.liveRecordList;
      },
      async getLiveTime(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getLiveDuration(this.param);
        if(response === false)return;
        this.validLiveInfo.days = response.data.liveDurationList.length;
        this.handleChartData(response.data.liveDurationList)
      },
      async getValidLiveInfo(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getValidLiveInfo(this.param);
        if(response === false)return;
        this.validLiveInfo = Object.assign({},this.validLiveInfo,response.data)
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.roomId = this.$route.params.roomId;
    },
    destroyed() {}
  }

</script>
