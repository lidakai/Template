<template>
  <div class="richerRank-container">
    <div class="richerRank-header">
      <h3 class="richerRank-header_title" style="display:inline-block;margin-right: 0">土豪榜单</h3>
      <p style="display: inline-block">（近30天数据，被打赏金额进行排序，直播宝数据助手建议您多关注土豪的行为状态，让对应类型主播多多捕捉土豪）</p>
    </div>
    <div class="richerRank-content">
      <div style="margin-bottom: 20px">
        <!--<plat-component @on-platform-change="platformChange"></plat-component>-->
        <!--<cate-component @on-category-change="categoryChange"></cate-component>-->
        <Cloumn-List-Component @on-Cloumn-change="platformChange"></Cloumn-List-Component>
      </div>
      <div style="padding: 20px 50px;">
        <table-component :table-data="tableData" :currentPage="searchParam.pageNum" :pageSize="searchParam.pageSize"></table-component>
        <Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .richerRank-container{
    .richerRank-header{
      margin-bottom: 40px;
      .richerRank-header_title{
        font-size: 26px;
        font-weight: normal;
        line-height: 26px;
        color: #464851;
        margin:0 30px 0 0;
      }
    }
    .richerRank-content{
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
      background: #fff;

    }
  }
</style>
<script>

  import tableComponent from './components/table.vue'
  import PaginationComponent from '@/components/Pagination/index.vue'
  import CloumnListComponent from '@/components/CloumnList/index.vue'
  import platComponent from './components/plat.vue'
  import cateComponent from './components/cate.vue'
  import { MapPlat } from "@/utils"
  export default {
    components: {
      tableComponent,
      PaginationComponent,
      platComponent,
      cateComponent,
      CloumnListComponent
    },
    name: 'richerRank',
    data() {
      return {
        tableData:[],
        paginationData:{total:0,pageSize:10,currentPage:1},
        searchParam:{
          pageSize:10,
          pageNum :1,
          platform:'',
          category:""
        }

      }
    },
    methods: {
      platformChange(value){
        this.searchParam.platform =(typeof value.platform )=== "string"?Number(value.platform):value.platform;
        this.getRank('star');
      },
      categoryChange(value){
        this.getRank();
      },
      paginationChange(pagination){
        this.searchParam.pageNum  = pagination.currentPage;
        this.searchParam.pageSize = pagination.pageSize;
        this.paginationData.pageSize = pagination.pageSize;
        this.paginationData.currentPage = pagination.currentPage;
        this.getRank();
      },
      async getRank(int){
        if(int === 'star'){
          this.searchParam.pageNum  =1;
          this.searchParam.pageSize = 10;
          this.paginationData.pageSize = 10;
          this.paginationData.currentPage = 1;
        }
        if(this.searchParam.platform === ''){
          return false
        }
         const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getTuhaoRadar(this.searchParam);
         if(response === false)return;
         if(response.code === 0){
          let data = response.data;
          const list = data.tuhaoRadarList||[];
          if(list.length>0){
            list.forEach(item=>{
            item.platform = MapPlat(item.platform);
            item.icon  = item.icon === undefined?'':'';
          });
          }
          this.tableData  = list;
          this.paginationData.total = data.totalCount;
         }else{

          this.tableData = [];
          this.paginationData.total = 0;
         }

      }
    },
    created() {

    },
    destroyed() {

    }
  }

</script>
