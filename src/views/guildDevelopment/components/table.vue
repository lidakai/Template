<template>
  <div class="host-list-container" id="host-list-container_table">
    <el-table :data="tableData" @sort-change="changeSort"  element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="主播" width="280px">
        <template slot-scope="scope">
          <img class="fl" :src="scope.row.avatar" alt="" @error="errorFn">
          <div class="box box_title"><span class="box_span">
             <el-tooltip class="item" effect="light" :content="scope.row.nickname" placement="top">
              <span class="box_span">{{scope.row.nickname}}</span>
            </el-tooltip>
          </span><i :class="!scope.row.liveStatus?'NoOpenBroadcast':''">{{scope.row.liveStatus?'直播中':'未开播'}}</i></div>
          <div class="box_title">{{scope.row.platName}} {{scope.row.typeName ===''?'':'| '+scope.row.typeName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" sortable="custom" align="center" label="日均收益（元）">
        <template slot-scope="scope">
          <div class="fontSize">
            <span>{{scope.row.price}}</span></div>
        </template>
      </el-table-column>
      <el-table-column prop="follower" sortable="custom" align="center" label="订阅数">
        <template slot-scope="scope">
          <div class="fontSize">
            <span>{{scope.row.follower}}</span>
          </div>
        </template>
      </el-table-column>
<!--      <el-table-column prop="start_time" align="center"  label="人气峰值" v-if="!tal">
        <template slot-scope="scope">
          <span>{{scope.row.online}}</span>
        </template>
      </el-table-column>-->

      <el-table-column prop="avgNum" align="center" sortable="custom" label="日均弹幕数" v-if="!tal">
        <template slot-scope="scope">
          <div class="fontSize">
            <span>{{scope.row.avgNum}}</span></div>
        </template>
      </el-table-column>
      <el-table-column prop="timeLong" align="center" sortable="custom"  label="日均直播时长（小时）">
        <template slot-scope="scope">
          <div class="fontSize">
            <span>{{timeToHour(scope.row.timeLong)}}</span></div>
        </template>
      </el-table-column>

      <el-table-column prop="date" align="center" label="首次开播日期-最新开播日期" v-if="!tal">
        <template slot-scope="scope">
          <div class="fontSize">
          <span>{{scope.row.firstTime}} - {{scope.row.startTime}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width"  width="180px">
        <template slot-scope="scope">
          <div class="cell_">
            <a href="javascript:;" v-if="!(scope.row.collectStatus)" @click="addCollection(scope.row)" >添加到收藏</a>
            <a href="javascript:;" style="color: #bcbcbc" @click="addCollection(scope.row)"  v-else>已收藏</a>
            <a target="_blank"   :href="scope.row.url===''?'javascript:;':scope.row.url">查看直播间</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
  /*#host-list-container_table  .el-table .cell{*/
    /*line-height:normal;*/
  /*}*/
  /*#host-list-container_table  .el-table th>.cell{*/
    /*font-size: 14px;*/
  /*}*/
  /*#host-list-container_table .cell img{*/
    /*width: 46px;*/
    /*height: 46px;*/
    /*vertical-align: bottom;*/
  /*}*/
  /*#host-list-container_table .box_title{*/
    /*height: initial;*/
    /*font-size: 12px;*/
    /*color: #4b4d56;*/
  /*}*/
  /*#host-list-container_table .host-list-container{*/
    /*opacity:0.8;*/
  /*}*/
  /*#host-list-container_table  .el-table th{*/
      /*background-color: rgba(244,244,244,0.62);*/
      /*color: #4b4d56;*/
  /*}*/
  /*#host-list-container_table  .el-table th,.host-list-container .el-table td{*/
    /*height:63px;*/
    /*font-size: 16px;*/
  /*}*/
  /*#host-list-container_table  .el-table td span{*/
    /*color: #767676;*/
  /*}*/
  /*#host-list-container_table container .small-padding a{*/
    /*color: #3b77ff;*/
  /*}*/
  /*#host-list-container_table  .small-padding a+a{*/
    /*margin-top: 5px;*/
    /*margin-left: 0;*/
  /*}*/
  #host-list-container_table  img{
    width: 46px;
    height: 46px;
    vertical-align: bottom;
    overflow: hidden;
    border-radius: 50%;
  }
  #host-list-container_table .box_span{
    color: #277dff!important;
    font-size: 14px;
    max-width: 120px;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
  #host-list-container_table .box_title{
    display: flex;
    padding-left: 12px;
    height: initial;
    font-size: 12px;
    color: #4b4d56;
  }
</style>
<style scoped="scoped" rel="stylesheet/scss" lang="scss">
  .fontSize{
    font-size: 14px;
    color: #76767e;
    font-weight: 500;
  }
  .NoOpenBroadcast:after{
    left: -25%;
    top: 50%;
    margin-top: -5px;
  }
  .small-padding .cell_{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      margin-left: 0!important;
    }
  }
</style>
<script>
  import { timeToHour } from "@/utils"
  export default {
    props: {
      tableData: {
        type: Array
      },
      localtion:{
        type:String
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        tal:'',
        listLoading: true
      }
    },
    created() {
     this.tal = this.localtion;
    },
    methods: {
      errorFn(event){
        event.target.src = require('../../../assets/userIcon.png')
      },
      async addCollection(item){
        if(item.collectStatus){
          let data = {
            platform : item.platform,
            rid : item.rid
          }
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.cancelCollect(data);
          if(response === false) return;
        }else {
          let data = {
            platform :item.platform,
            rid:item.rid
          };
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.addCollect(data);
          if(response === false) return;
        }
        let obj = {
          message: item.collectStatus?'主播已经被移除“我的收藏”分组':'主播已经进入“我的收藏”分组，可进入分组查看',
          showClose: true,
          type:'success'
        }
        if(item.collectStatus){
          delete obj.type
        }
        this.$message(obj);
        item.collectStatus = !item.collectStatus;
      },
      changeSort(value){
        this.$emit('sort-data',value)
      },
      timeToHour
//      timeLongFn(item){
//        let num = item;
//        if(typeof num !== "number"){
//          num = Number(num)
//        }
//        num = (num/(60*60)).toFixed(2);
//        return num
//      }
    }
  }
</script>
