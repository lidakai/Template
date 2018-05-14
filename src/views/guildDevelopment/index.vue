<template>
<div class="guideDep-container">
    <div class="guideDep-container_header">
        <h3 class="guideDep-container_title" style="display: inline-block">快速挖主播</h3>
      <p style="display: inline-block">（全网主播近30天直播数据）</p>
    </div>
    <div class="guideDep-container_content">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="直播平台：">
          <div class="position_">(支持多选)</div>
          <Plat-component @on-plat-select="platSelected"></Plat-component>
        </el-form-item>
        <el-form-item label="主要类型：">
          <div class="position_">(支持多选)</div>
          <Cate-component @on-cate-select="cateSelected"></Cate-component>
        </el-form-item>
        <el-form-item label="日均时长：">
          <div class="position_" style="left: -100px">(近30天)</div>
          <span :class="index===0?'selected_live_time guideDep-container_span':'guideDep-container_span'" v-for="(item,index) in live_time" @click="select_live_time" :timeLongAvgFrom="item.Range[0]" :timeLongAvgTo="item.Range[1]" :data-id="item.id">
            {{item.name}}
              <i class="icon">
          <img src="../guildManagement/addHostStream/img/selected.png" alt="icon">
        </i>
          </span>
        </el-form-item>
        <el-form-item label="日均收益：">
          <div class="position_" style="left: -100px">(近30天)</div>
          <span :class="index===0?'selected_profit guideDep-container_span':'guideDep-container_span'" v-for="(item,index) in profit" @click="select_profit" :priceAvgFrom="item.Range[0]" :priceAvgTo="item.Range[1]" :data-id="item.id">
            {{item.name}}
             <i class="icon">
          <img src="../guildManagement/addHostStream/img/selected.png" alt="icon">
        </i>
          </span>
        </el-form-item>
        <el-form-item label="粉丝数量：">
          <span :class="index===0?'selected_fansNum guideDep-container_span':'guideDep-container_span'" v-for="(item,index) in fansNum" @click="select_fansNum" :followerFrom="item.Range[0]" :followerTo="item.Range[1]" :data-id="item.id">
            {{item.name}}
              <i class="icon">
          <img src="../guildManagement/addHostStream/img/selected.png" alt="icon">
        </i>
          </span>
        </el-form-item>
        <el-form-item label="其他条件：" v-if="false">
          <el-checkbox-group v-model="selectedOther" @change="handleCheckedOtherChange">
            <el-checkbox v-for="item in other" :label="item.name" :key="item.id" name="type"></el-checkbox>
            <!--<el-checkbox label="女主播" name="type"></el-checkbox>-->
            <!--<el-checkbox label="有土豪给TA送过礼" name="type"></el-checkbox>-->
            <!--<el-checkbox label="正在直播" name="type"></el-checkbox>-->
            <i>支持多选</i>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div id="tableList">
        <Table-component :table-data="tableData" localtion="true" @sort-data="sortData"></Table-component>
      </div>
      <Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>
    </div>
</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .guideDep-container{
    .guideDep-container_header{
      .guideDep-container_title{
        font-size: 26px;
        font-weight: normal;
        line-height: 26px;
        color: #464851;
        margin:0 0 40px;
      }
    }
    .guideDep-container_content{
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
      padding: 30px 50px;
      background: #fff;
      .guideDep-container_span{
        display: inline-block;
        text-align: center;
        min-width: 82px;
        height: 28px;
        border-radius: 2px;
        border: solid 2px rgba(36, 122, 255, 0.2);
        margin-left: 20px;
        color: #247aff;
        font-size: 14px;
        padding: 0 12px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        line-height: 24px;
      }
      .selected_live_time{
        color: #247aff;
        position: relative;
        border-color: transparent;
        background-color: rgba(36, 122, 255, 0.1);
      }
      .selected_profit{
        color: #247aff;
        position: relative;
        border-color: transparent;
        background-color: rgba(36, 122, 255, 0.1);
      }
      .selected_fansNum{
        color: #247aff;
        position: relative;
        border-color: transparent;
        background-color: rgba(36, 122, 255, 0.1);
      }
      .selected_profit .icon ,.selected_live_time .icon,.selected_fansNum .icon{
        display: block;
        position: absolute;
        top: -9px;
        right: -9px;
      }
    }
  }
  .icon{
    display: none;
    width: 18px;
    height: 18px;
  }
  .icon img{
    width: 100%;
    height: 100%;
  }
</style>
<style>
  .guideDep-container label.el-form-item__label{
    font-size: 16px;
    font-weight: normal;
    color: #76767e;
  }
  .el-form-item{
    margin-bottom: 11px;
    min-height: 46px;
  }
  .el-form-item--medium{
    position: relative;
  }
  .position_{
    position: absolute;
    font-size: 14px;
    color: #3b77ff;
    opacity: 0.7;
    left: -100px;
    top: 20px;
  }
</style>
<script>
import CateComponent from './components/cate.vue'
import PlatComponent from './components/plat.vue'
import TableComponent from './components/table.vue'
import PaginationComponent from '@/components/Pagination/index.vue'
import { Loading } from 'element-ui';
  export default {
    components: {
      CateComponent,
      PlatComponent,
      TableComponent,
      PaginationComponent
    },
    name: 'guide',
    data() {
      return {
        tableData:[],
        paginationData:{total:0,pageSize:10,currentPage:1},
        live_time:[
          {name:'不限',id:0,Range:['','']},
          {name:'2小时以下',id:1,Range:[0,2]},
          {name:'2--4小时',id:2,Range:[2,4]},
          {name:'4--8小时',id:3,Range:[4,8]},
          {name:'8小时以上',id:4,Range:[8,'']},
        ],
        profit:[
          {name:'不限',id:0,Range:['','']},
          {name:'500元以下',id:1,Range:[0,500]},
          {name:'500--1000元',id:2,Range:[500,1000]},
          {name:'1000--5000元',id:3,Range:[1000,5000]},
          {name:'5000--1W元',id:3,Range:[5000,10000]},
          {name:'1W--10W元',id:3,Range:[10000,100000]},
          {name:'10W元以上',id:4,Range:[100000,'']},
        ],
        fansNum:[
          {name:'不限',id:0,Range:['','']},
          {name:'100人以下',id:1,Range:[0,100]},
          {name:'100--1000人',id:2,Range:[100,1000]},
          {name:'1000--1W人',id:3,Range:[1000,10000]},
          {name:'1W-10W人',id:4,Range:[10000,100000]},
          {name:'10W以上',id:5,Range:[100000,'']}
        ],
        other:[
          /*{name:'男主播',id:1},
          {name:'女主播',id:0},
          {name:'有土豪给TA送过礼',id:1},*/
          {name:'正在直播',id:1,btn:true,code:'liveStatus'}
        ],
        selectedOther:[],
        searchParam:{
          currentPage:1,
          pageNum:1,
          pageSize:10,
          platforms :[],  //平台
          cateIds:[], //类型
          timeLongAvgFrom:0, //最低低直播时长
          timeLongAvgTo:0, //最大直播时长
          priceAvgFrom:0, //最少收益
          priceAvgTo:0, //最大收益
          followerFrom:0, //最少关注
          followerTo:0, //最大关注
          liveStatus:0, //是否子啊直播  1直播中 0关闭
          other:[]
        }
      }
    },
    methods: {
      sortData(val){
        let order = val.order === 'ascending'?'asc':val.order === 'descending'?'desc':''
        let sortKey = '';
        this.searchParam.sortKey = '';
        this.searchParam.sortValue = '';
        if(val.prop === "price"){
          // price
          sortKey  = 'price';
          //日均收益
           //order == "ascending" //正序
           //order == "descending" //倒序
        }else if(val.prop === "follow"){
          // price
          sortKey  = 'follower';
          //订阅数
          //order == "ascending" //正序
          //order == "descending" //倒序
        }else if(val.prop === "timeLong"){
          // price
          sortKey  = 'timeLong';
          //直播时长
          //order == "ascending" //正序
          //order == "descending" //倒序
        }
        this.searchParam.sortKey  = sortKey;
        this.searchParam.sortValue   = order;
        this.getData('start')
      },
      async getData(str){
        if(str==='start'){
          this.paginationData = {total:0,pageSize:10,pageNum:1};
          this.searchParam.pageSize = 10;
          this.searchParam.pageNum = 1;
        }
        let options = {    // loading.....节点
          target:'#tableList'
        }
        let loadingInstance = Loading.service(options);
        if(this.searchParam.cateIds.length>0&&this.searchParam.platforms.length>0){
          let searchParam = JSON.parse(JSON.stringify(this.searchParam));
          if(searchParam.cateIds.length === 1){
            searchParam.cateIds = searchParam.cateIds[0] === ''?'':searchParam.cateIds;
          }
          if(searchParam.platforms.length === 1){
            searchParam.platforms = searchParam.platforms[0] === ''?'':searchParam.platforms;
          }
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getAll(searchParam);
          if(response === false){
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close();
            });
            this.tableData = [];
            this.paginationData.total =0;
            return};
          this.tableData = response.data.anchorInfos;
          this.paginationData.total =response.data.totalCount;
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      },
      paginationChange(pagination){
        this.paginationData = pagination;
        this.searchParam.pageSize = pagination.pageSize;
        this.searchParam.pageNum = pagination.currentPage;
        this.getData();
      },
      select_live_time(e){
        if(e.target.tagName === 'SPAN'){
        let timeLongAvgFrom = e.target.getAttribute('timeLongAvgFrom');
        let timeLongAvgTo = e.target.getAttribute('timeLongAvgTo');
        this.searchParam.timeLongAvgFrom = timeLongAvgFrom;
        this.searchParam.timeLongAvgTo = timeLongAvgTo;
        /*
        *
        * timeLongAvgFrom:0, //最低低直播时长
          timeLongAvgTo:0, //最大直播时长
        * */
        document.getElementsByClassName('selected_live_time')[0].className='guideDep-container_span';
        e.target.className='selected_live_time guideDep-container_span';
        this.getData('start');}
      },
      select_profit(e){
        if(e.target.tagName === 'SPAN'){
          let priceAvgFrom = e.target.getAttribute('priceAvgFrom');
          let priceAvgTo = e.target.getAttribute('priceAvgTo');
          this.searchParam.priceAvgFrom = priceAvgFrom;
          this.searchParam.priceAvgTo = priceAvgTo;
          /*
          *
          *  priceAvgFrom = 5; // 可以不存在，存在必须 > 0, 最小收益 元
             priceAvgTo = 6; // 可以不存在，存在必须 > 0, 最大收益 元
          *
          * */
        document.getElementsByClassName('selected_profit')[0].className='guideDep-container_span';
        e.target.className='selected_profit guideDep-container_span';
        this.getData('start');
        }
      },
      select_fansNum(e){
        if(e.target.tagName === 'SPAN') {
          let followerFrom = e.target.getAttribute('followerFrom');
          let followerTo = e.target.getAttribute('followerTo');
          this.searchParam.followerFrom = followerFrom;
          this.searchParam.followerTo = followerTo;
          /*
          *
          * followerFrom = 7; // 可以不存在，存在必须 > 0, 最小关注
           * followerTo = 8; // 可以不存在，存在必须 > 0, 最大关注
          *
          * */

          document.getElementsByClassName('selected_fansNum')[0].className = 'guideDep-container_span';
          e.target.className = 'selected_fansNum guideDep-container_span';
          this.getData('start');
        }
      },
      handleCheckedOtherChange(){
        this.searchParam.other = [];
        for (let i in this.other){
          this.searchParam[this.other[i].code]=0;
        }
        this.other.forEach((item)=>{
          if(this.selectedOther.includes(item.name)){
            this.searchParam.other.push(item.id);
            let item_ = item;
            for (let i in this.searchParam){
              let btn = i;
              if(i == item_.code){
                this.searchParam[i] = 1
              }
            }
          }
        });
        this.getData();
      },
      init(){
        if(this.searchParam.platforms.length&&this.searchParam.cateIds.length){
          this.getData();
        }
      },
      platSelected(value){
        this.searchParam.pageNum = 1;
        this.paginationData.currentPage = 1;
        this.searchParam.platforms = value;
        this.init()
      },
      cateSelected(value){
        this.searchParam.pageNum = 1;
        this.paginationData.currentPage = 1;
        this.searchParam.cateIds = value;
        this.init()
      }

    },
    created() {
      //this.getData();
    },
    watch:{
      "$route":function (to,form) {
        if(to.name === 'potentialNewHostStream'||to.name === 'quickFindHostStream'){
          this.searchParam.cateIds = [];
          this.searchParam.platforms = [];
           // 目的=》》防止组件中 activted 调用 父组件 平台和分类数据重复污染、导致判断不准，重复调用。
        }
      }
    },
    destroyed() {
      this.searchParam.cateIds = [];
      this.searchParam.platforms = []
      // this.$destroy(); //销毁
    }
  }

</script>
