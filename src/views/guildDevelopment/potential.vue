<template>
  <div class="guideDep-container">
    <div class="guideDep-container_header">
      <h3 class="guideDep-container_title" style="display: inline-block">潜力新主播</h3>
      <p style="display: inline-block">全网综合表现优秀的新主播最近30天数据（新主播开播不超过一个月）</p>
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
        <el-form-item label="其他条件：" v-if="false">
          <el-checkbox-group v-model="selectedOther" @change="handleCheckedOtherChange">
            <el-checkbox v-for="item in other" :label="item.name" :key="item.id" name="type"></el-checkbox>
            <i>支持多选</i>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div id="tableList">
        <Table-component  :table-data="tableData" @sort-data="sortData"></Table-component>
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
    min-width:1000px;
      .guideDep-container_span{
        font-size: 16px;
        color: #00afff;
        cursor: pointer;
        float: left;
        min-width: 82px;
        padding: 0 8px;
        height: 24px;
        border-radius: 2px;
        border: solid 2px #d6e5ff;
        text-align: center;
        line-height: 22px;
        margin: 6px 25px 20px 0;
      }
    }
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
  //  import { mapGetters } from 'vuex'
  //  import { MapPlat } from '@/utils'
  //  import { isvalidMobile } from '@/utils/validate'
  import CateComponent from './components/cate.vue'
  import PlatComponent from './components/plat.vue'
  import TableComponent from './components/table.vue'
  import PaginationComponent from '@/components/Pagination/index.vue'
  import { mapGetters } from 'vuex'
  import { Loading } from 'element-ui';
  //  import { getCheckCode, checkOldMobile, unbindRoom } from '@/api/user'
  //  import { isExperience } from '@/utils/auth'
  export default {
    components: {
      CateComponent,
      PlatComponent,
      TableComponent,
      PaginationComponent
    },
    computed: {
      ...mapGetters([
        'category',
        'platform'
      ])
    },
    name: 'guide',
    data() {
      return {
        tableData:[],
        paginationData:{total:0,pageSize:10,currentPage:1},
        other:[
         /* {name:'男主播',id:1},
          {name:'女主播',id:2},
          {name:'有土豪给TA送过礼',id:3},*/
          {name:'正在直播',id:1,btn:true,code:'liveStatus'}
        ],
        categoryList:[],
        platformList:[],
        selectedOther:[],
        searchParam:{
          other:[],
          platforms:[],
          cateIds:[],
          pageNum : 1,
          pageSize : 10
    }
      }
    },
    methods: {
      sortData(val){
        let sortKey = '';
        this.searchParam.column = '';
        this.searchParam.sort = '';
        let order = val.order === 'ascending'?'asc':val.order === 'descending'?'desc':''
        if(val.prop === "price"){
          // price
          sortKey  = 'avgPrice';
          //日均收益
          //order == "ascending" //正序
          //order == "descending" //倒序
        }else if(val.prop === "follower"){
          // price
          sortKey  = 'follower';
          //订阅数
          //order == "ascending" //正序
          //order == "descending" //倒序
        }else if(val.prop === 'avgNum'){

          sortKey  = 'avgNum';

        }else if(val.prop === "timeLong"){
          // price
          sortKey  = 'avgTimeLong';
          //直播时长
          //order == "ascending" //正序
          //order == "descending" //倒序
        }
        this.searchParam.column   = sortKey;
        this.searchParam.sort    = order;
        this.getData('start')
      },
      async categoryFn(){
          const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
          if(response === false) return;
          let list  = response.data.cateInfos;
          this.categoryList = list;
      },
      async platformFn(){
          const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
          if(response === false) return;
          let list  = response.data.platInfos;
          this.platformList = list;
      },
      async getData(str){
        this.tableData = [];
        if(str==='start'){
          this.paginationData = {total:0,pageSize:10,pageNum:1};
          this.searchParam.pageSize = 10;
          this.searchParam.pageNum = 1;
        }
        if(this.searchParam.cateIds.length<=0&&this.searchParam.platforms.length<=0){
          return false
        }
        let options = {
          target:'#tableList'
        }
        let loadingInstance = Loading.service(options);
        // getNewAnchor   潜力新主播
        let searchParam = JSON.parse(JSON.stringify(this.searchParam))
        if(searchParam.cateIds.length === 1){
          searchParam.cateIds = searchParam.cateIds[0] === ''?'':searchParam.cateIds;
        }
        if(searchParam.platforms.length === 1){
          searchParam.platforms = searchParam.platforms[0] === ''?'':searchParam.platforms;
        }
         const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getNewAnchor(searchParam);
        if(response === false) {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
            this.tableData = [];
            this.paginationData.total =0;
          });
          return;
        }
        let list = response.data.newAnchorList || [];
        list.forEach(item=>{
          item.avatar = item.ic;
          item.timeLong = item.avgTimeLong*60*60;
          item.typeName = '';
          this.categoryList.forEach(value=>{
            if(item.typeId == value.typeId){
              item.typeName = value.typeName
            }
          })
          this.platformList.forEach(value=>{
            if(item.platform == value.platform){
              item.platName  = value.name
            }
          })
        })
        this.tableData = list;
        this.paginationData.total = response.data.totalCount;
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      },
      paginationChange(pagination){
        this.paginationData.pageSize = pagination.pageSize;
        this.paginationData.total = pagination.total;
        this.paginationData.pageNum = pagination.currentPage;
        this.searchParam.pageSize = pagination.pageSize;
        this.searchParam.pageNum = pagination.currentPage;
        this.getData();
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
      platSelected(value){
        this.paginationData.currentPage = 1;
        this.searchParam.pageNum=1;
        this.searchParam.platforms  = value;
        this.init();
      },
      cateSelected(value){
        this.paginationData.currentPage = 1;
        this.searchParam.pageNum=1;
        this.searchParam.cateIds  = value;
        this.init();
      },
      init(){
        this.categoryList = this.category;
        this.platformList = this.platform;
        if(this.searchParam.platforms.length&&this.searchParam.cateIds.length){
          this.getData();
        }
      }
    },
    created() {

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
      // this.$destroy(); //销毁
    }
  }

</script>
