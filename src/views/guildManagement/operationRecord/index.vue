<template>
  <div class="operation-container">
    <div class="operation-container_header">
      <h3 class="operation-container_title fl">操作记录</h3>
      <!--<div>-->
        <el-date-picker
          v-model="operation_time"
          type="daterange"
          align="left"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          format="yyyy/MM/dd">
        </el-date-picker>

        <el-select v-model="group" placeholder="所有员工" @change="getData">
          <el-option v-for="(item , index) in group_arr" :value="item.name" :key="index">{{item.name}}</el-option>
        </el-select>
      <!--</div>-->
    </div>
    <div class="data-direction-content">
      <data-table :table-data="tableData" class="table_box"></data-table>
      <Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>
    </div>
  </div>
</template>

<script>
  let tableData = [
    {
      time:'2018-02-08 10:52:32',
      identity:'第二夏',
      role:'管理员',
      content:'添加主播大司马'
    },
    {
      time:'2018-02-08 10:52:32',
      identity:'第二夏',
      role:'管理员',
      content:'添加主播大司马'
    },
    {
      time:'2018-02-08 10:52:32',
      identity:'第二夏',
      role:'管理员',
      content:'添加主播大司马'
    },
    {
      time:'2018-02-08 10:52:32',
      identity:'第二夏',
      role:'管理员',
      content:'添加主播大司马'
    },
    {
      time:'2018-02-08 10:52:32',
      identity:'第二夏',
      role:'管理员',
      content:'添加主播大司马'
    },
    {
      time:'2018-02-08 10:52:32',
      identity:'第二夏',
      role:'管理员',
      content:'添加主播大司马'
    }
  ];
  import { mapGetters } from 'vuex'
  import DataTable from './components/DataTable'
  import PaginationComponent from '@/components/Pagination/index.vue'
  import { parseTime, getStringTime } from '@/utils'
  export default {
    components: {
      DataTable,
      PaginationComponent
    },
    computed: {
      ...mapGetters([])
    },
    name: 'data_direction',
    data() {
      return {
        operation_time: [getStringTime(7), getStringTime(1)],
        pickerOptions: {
          disabledDate: function(time) {
            if (time.getTime() > new Date().getTime() - 3600 * 1000 * 24) return true;
            if (time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 90) return true
          },
          onPick: ({minDate,maxDate}) => {
            if( minDate && maxDate){
              this.operation_time = [minDate,maxDate];
              this.getData();
            }
          }
        },
        showValue: '新增关注',
        group:'所有员工',
        group_arr:[
          {id:1,name:"所有员工"},
          {id:2,name:'管理员'},
          {id:3,name:'经纪人'}
          ],
        tableData: tableData,
        total: 0,
        currentPage:1,
        pageSize:10,
        downloadLoading: false,
        data_start_time:'',
        dialogVisible:false,
        paginationData:{total:0,pageSize:10,currentPage:1},
      }
    },
    methods: {
      paginationChange(pagination){
        this.paginationData = pagination
      },
      async getData(){
        if(!this.operation_time)return;
        const data = {
          from:parseTime(this.operation_time[0],'{y}/{m}/{d}'),
          to:parseTime(this.operation_time[1],'{y}/{m}/{d}'),
          group:this.groupId(),
          pageNum:this.paginationData.currentPage,
          pageSize:this.paginationData.pageSize
        };
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Operation.getDetail(data);
        if(response === false) return;
        this.total = tableData.length;
        this.tableData = tableData.slice(0,this.pageSize-1);
      },
      groupId(){
        let group_id = 0;
        this.group_arr.forEach((item)=>{
          if(item.name === this.group){
            group_id = item.id;
            return false;
          }
        });
        return group_id;
      }
    },
    created() {
        this.getData();
    },
    destroyed() {

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .operation-container{
    .operation-container_header{
      height:36px;
      line-height:36px;
      padding:0 20px 0 0;
      margin-bottom: 42px;
      .operation-container_title{
        float: left;
        margin: 0 33px 0 0;
        height: 36px;
        font-size: 26px;
        line-height: 36px;
        color: #464851;
        font-weight: normal;
      }
      .el-date-editor{
        margin-right: 30px;
      }
      span{
        float: left;
        margin-right: 20px;
        cursor: pointer;
        color: #464851;
      }
      .currentSelect{
        color: #3083ff;
      }
      .download_excel{
        /*margin:10px 0;*/
        float: right;
        background: #3b77ff;
      }
    }
    .data-direction-content{
      padding: 60px 30px;
      background: #fff;
      box-shadow: 0px 6px 8px 0px
      rgba(0, 0, 0, 0.04);
    }
  }


</style>
<style>
  .el-range-editor--medium.el-input__inner{
    width:200px;
    text-align: center;
    padding: 3px 0;
  }
  .el-range-editor--medium .el-range__close-icon, .el-range-editor--medium .el-range__icon{
    display: none;
  }
</style>
