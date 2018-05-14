<template>
<div class="host-rank-list_container">
    <div class="host-rank-container_header clearfix">
      <h3 class="host-rank-container_title fl">主播排行</h3>
    </div>
    <div class="host-rank-container-content">
      <Type-select-component  @on-type-change='typeChange'></Type-select-component>
      <!--<span class="set_live_time" @click="effectiveTime=true">设置有效直播时长</span>-->
      <effective-time-component></effective-time-component>
      <div class="timeSelect">
        <p class="fr">
          <span @click="changeOffset" :class="param.dayType===0 ? 'host-rank-container_offset_current':''" data-type="0">今日排行</span>
          <span @click="changeOffset" :class="param.dayType===3 ? 'host-rank-container_offset_current':''" data-type="3">昨日排行</span>
          <span @click="changeOffset" :class="param.dayType===1 ? 'host-rank-container_offset_current':''" data-type="1">7日排行</span>
          <span @click="changeOffset" :class="param.dayType===2 ? 'host-rank-container_offset_current':''" data-type="2">30日排行</span>
        </p>
        <p class="fl">你所选的主播今日排名如下（默认按收益排序，如需按照其他维度排名，可点击进行切换）</p>
      </div>
      <Table-component @on-host-compare="compareHost" @on-change-sort="sortChange" :table-data="tableData" :tableTime = 'isToday ' :compare-id-arr="emptyArr" class="table_box" @on-status-change="changeStatus"></Table-component>
      <!--<Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>-->
      <el-button v-if="haveMore" class="getMoreBtn" @click="getData">查看更多</el-button>
      <p class="white-board" v-if="compareArr.length"></p>
    </div>

    <ul class="host-rank-comparison" v-if="compareArr.length">
      <el-col :sm="2"  :md="2" :lg="2" v-for ='(item,index) in compareArr' :key="index">
      <li>
        <img :src="item.avatar" alt="">
        <p class="host_name">{{item.nickname}}</p>
        <p class="host_plat">{{item.platName}} | {{item.cateName}}</p>
        <span @click="del_compareId(item.roomId)">移除</span>
      </li>
      </el-col>
      <el-col :sm="4"  :md="4"  :lg="4">

      <button type="primary" class="enter_comparison" @click="toCompare">进入对比</button>
      <i>一次最多选择10位进行对比</i>
      </el-col>
      <el-col :sm="18"  :md="18"  :lg="18" v-if="compareArr.length < 2">
        <p class="comparison_tips">请选择两位以上主播后进行对比喔！</p>
      </el-col>

      <em class="close_compare" @click="close_compare"><img :src="close" alt=""></em>
    </ul>
</div>
</template>

<script>

import TableComponent from './components/table.vue'
import PaginationComponent from '@/components/Pagination/index.vue'
import TypeSelectComponent from '@/components/TypeSelect/index.vue'
import effectiveTimeComponent from '@/components/Dialog/effectiveTime.vue'
import close from "./img/close.png"
  export default {
    components: {
      TableComponent,
      PaginationComponent,
      TypeSelectComponent,
      effectiveTimeComponent
    },
    name: 'data_direction',
    data() {
      return {
        param:{
          dayType:0,
          groupId:'all',
          cateId:0,
          platform:0,
          status:0,
          pageNum:1,
          pageSize:10,
          sortKey:'profit',
          sortValue:'desc'
        },
        tableData:[],
        isToday:true,
        compareArr:[],
        haveMore:true,
        isInit:true,
        effectiveTime:false,
        emptyArr:[],
        close
      }
    },
    methods: {
      typeChange(data){
        this.param = Object.assign({},this.param,data);
        this.getData('init');
      },
      changeOffset(e){
        let className = e.target.className;
        if(className)return;
        try{
          document.getElementsByClassName('host-rank-container_offset_current')[0].setAttribute('class','');
          e.target.className = 'host-rank-container_offset_current';
          this.param.dayType = Number(e.target.getAttribute('data-type'));
          if( this.param.dayType === 0 ){
            this.isToday = true
          }else{
            this.isToday = false
          }
          this.getData("init");
        }catch(error){}
      },
      async getData(init){
        if(init === 'init'){
          this.tableData = [];
          this.param.pageNum = 1;
        }
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getRank(this.param);
        if(response === false)return;
        this.param.pageNum++;
        response.data.anchorRankInfos = (response.data.anchorRankInfos && response.data.anchorRankInfos.length) ? response.data.anchorRankInfos : [];
        if( response.data.anchorRankInfos.length < this.param.pageSize ){
          this.haveMore = false;
        }else{
          this.haveMore = true;
        }
        let list = response.data.anchorRankInfos;
        list.forEach(item=>{
          item.nickname = item.nickname||'未知';
          item.cateName = item.cateName||'未知';
          item.platName = item.platName||'未知';
        });
        this.tableData=[...this.tableData,...list];

        this.isInit = false;
      },
      sortChange(value){
        //排序搜索
        this.param.sortKey = value.order_by;
        this.param.sortValue = value.order === 'descending'? 'desc':'asc';
        if(this.isInit)return;
        this.getData('init');
      },
      compareHost(value){
        this.compareArr = value;
      },
      del_compareId(id){
//        移出主播对比
        this.compareArr.forEach((item,index)=>{
          if(item.roomId === id){
            this.compareArr.splice(index,1);
            return false;
          }
        })
      },
      toCompare(){
        if(this.compareArr.length < 2){
          this.$message("请选择两位以上主播后进行对比")
        }else{
          let compareArr = JSON.stringify(this.compareArr);
          localStorage.setItem('compareArr',compareArr);
          this.compareArr = [];
          this.emptyArr = [];
          this.$router.push({path:'compare'})
        }
      },
      close_compare(){
        this.compareArr = [];
        this.emptyArr = [];
      },
      changeStatus(status){
        this.param.status = status;
        this.getData('init');
      }
    },
    created() {

    },
    mounted(){

    },
    destroyed() {
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.host-rank-list_container{
  .host-rank-container_header{
    .host-rank-container_title{
      font-size: 26px;
      font-weight: normal;
      line-height: 26px;
      color: #464851;
      margin:0px 30px 33px 0;
    }
  }
  .host-rank-container-content{
    /*margin: 20px 20px 0 20px;*/
    padding: 20px;
    background: #fff;
    .set_live_time{
      display: inline-block;
      cursor: pointer;
      width: 174px;
      height: 36px;
      line-height:36px;
      color: #fff;
      background-color: #508ef7;
      border-radius: 2px;
      text-align: center;
      position: relative;
      top:-1px;
      margin-left:40px;
    }
    .timeSelect{
      overflow: hidden;
      margin:30px 0 14px;
      p{
        margin:0;
        height: 28px;
        line-height: 28px;
      }
      span{
        font-weight: bold;
        line-height: 26px;
        font-size: 16px;
        float: left;
        margin-right: 20px;
        color: #464851;
        cursor: pointer;
        border-bottom:2px solid transparent;
      }
      .host-rank-container_offset_current{
        color: #3083ff;
        border-bottom:2px solid #3083ff;
      }
    }

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
    .getMoreBtn{
      display: block;
      margin:16px auto 40px;
      width: 146px;
      height: 32px;
      line-height: 32px;
      background-color: #fefefe;
      border-radius: 2px;
      border: solid 1px #d4dae9;
      padding: 0;
    }

  }
  .host-rank-comparison{
    height:162px;
    position: fixed;
    bottom:0;
    left:216px;
    right:36px;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px
    rgba(0, 0, 0, 0.2);
    border-radius: 10px 10px 0px 0px;
    padding-top: 20px;
    padding-left: 30px;
    margin:0;
    li{
      list-style: none;
      float: left;
      /*width:140px;*/
      width:100%;
      text-align: center;
      img{
        height:46px;
        width:46px;
        border-radius: 50%;
        outline:none;
        overflow: hidden;
        display: block;
        margin:0 auto;
      }
      .host_name{
        margin:10px 0;
        text-align: center;
        color: #277dff;
        font-size:14px;
        line-height:14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .host_plat{
        font-size: 12px;
        font-weight: normal;
        color: #4b4d56;
      }
      span{
        display: block;
        width: 48px;
        height: 20px;
        line-height: 18px;
        border-radius: 10px;
        border: solid 1px rgba(39, 125, 255, 0.84);
        margin:0 auto;
        font-size: 12px;
        font-weight: normal;
        color: #277dff;
        cursor: pointer;

      }
    }
    .enter_comparison{
      display: block;
      width: 120px;
      height: 38px;
      background-color: #508ef7;
      border-radius: 19px;
      font-size: 14px;
      font-weight: normal;
      line-height: 38px;
      color: #ffffff;
      border:none;
      margin: 45px auto 0;
      cursor: pointer;
      outline: none;
    }
    i{
      display: block;
      height:12px;
      line-height: 12px;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      color: #4b4d56;
      text-align: center;
      margin-top: 10px;
      opacity:0.4;
    }
    .comparison_tips{
      width: 346px;
      height: 48px;
      background-color: rgba(80,142,247,0.1);
      border-radius: 5px;
      font-size: 14px;
      font-weight: normal;
      line-height: 48px;
      color: #76767e;
      text-align: center;
      margin:40px auto 0;
    }
    .close_compare{
      padding: 20px;
      position: absolute;
      top:0;
      right:0;
      width:54px;
      height:54px;
      cursor: pointer;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .white-board{
    height:65px;
    margin:0;
  }
}
.what_tips{
  width: 16px;
  margin-top: 23px;
  cursor: pointer;
  margin-right: 30px;
}
</style>

