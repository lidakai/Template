<template>
  <div class="manage-container">
    <div class="manage-container_header">
      <h3 class="manage-container_title fl">主播管理</h3>
    </div>
    <div class="manage-container_content">
      <p class="top_menu">
        <span @click="change_menu" data-menu="hostStream"  :class="isHost ? 'current_menu':''">主播管理</span>
        <span @click="change_menu" data-menu="group" :class="isHost ? '':'current_menu'">分组管理</span>
      </p>
      <div class="host_content" v-show="isHost">
        <div class="host_time">
          主播有效直播时长：
          <i>{{guildInfo.effectiveDuration}}小时</i>
          <!--<el-button  type="primary" @click="effectiveTime = true">设置有效直播时长</el-button>-->
          <effective-time-component></effective-time-component>
        </div>
        <div style="overflow: hidden">
          <h4 class="fl">主播列表</h4>
          <el-button type="primary" style="display: block"> <router-link to="addHost">添加主播</router-link></el-button>
        </div>
        <Type-select-component ref="typeSelectChild" @on-type-change='typeChange'></Type-select-component>
        <Search-component :search-data="searchData" @on-search-value="searchHost"></Search-component>

        <el-button class="fr delete" @click="quickDelGroup">删除</el-button>
        <el-button class="fr modify_btn" @click="showModifyGroupDialog">修改分组</el-button>
        <data-table @on-change-group="changeGroupArr" :host-data="hostData" class="table_box" @on-host-change="getHostList"></data-table>
        <Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>
      </div>

      <div class="group_content"  v-show="!isHost">
        <div style="overflow: hidden">
          <h4 class="fl">分组列表</h4><el-button type="primary" @click="groupName.isVisible=true;groupName.name=''">添加分组</el-button>
        </div>
        <group-table :group-data="groupData" class="table_box" @on-group-change = 'groupChange' @on-group-modify="typeSelectAxios"></group-table>
      </div>
    </div>
    <confirm-component @on-dialog-status="QuickConfirm" :dialog-confirm ='confirmData'></confirm-component>
    <group-component :dialog-group='dialogGroup' @group-change-dialog="getHostList"></group-component>
    <group-name-component :group-name="groupName" @on-group-name-change="typeSelectAxios"></group-name-component>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .manage-container{
    .manage-container_header{
      height:36px;
      line-height:36px;
      padding:0 20px 0 0;
      margin-bottom: 42px;
      .manage-container_title{
        float: left;
        margin: 0 30px 0 0;
        height: 36px;
        font-size: 26px;
        line-height: 36px;
        color: #464851;
        font-weight: normal;
      }
    }
    .manage-container_content{
      padding: 0 0 20px;
      background: #fff;
      box-shadow: 0px 6px 8px 0px
      rgba(0, 0, 0, 0.04);
      .top_menu{
        width:100%;
        /*display: flex;*/
        /*flex-flow: row nowrap;*/
        margin:0;
        background: #F5F5F5;
        overflow: hidden;
        span{
          float: left;
          width:100px;
          height:44px;
          font-size: 14px;
          line-height:44px;
          color: #0e1a35;
          text-align: center;
          cursor: pointer;
          position: relative;
          background: #fbfbfb;
          border-right:1px solid #f1f1f1;
          /*border-bottom:1px solid #d8dce6;*/
          /*&[data-menu="hostStream"]{*/
            /*border-right:1px solid #d8dce6;*/
          /*}*/
          /*&[data-menu="group"]{*/
            /*border-left:1px solid #d8dce6;*/
          /*}*/
          /*&::before {*/
            /*display: block;*/
            /*content: '';*/
            /*width: 100%;*/
            /*height: 4px;*/
            /*left: 0;*/
            /*top: 0;*/
            /*background-image: none;*/
          /*}*/
        }
        .current_menu{
          /*border-left: none!important;*/
          /*border-right: none!important;*/
          /*border-color: transparent;*/
          /*&::before {*/
            /*display: block;*/
            /*content: '';*/
            /*width: 100%;*/
            /*height: 4px;*/
            /*left: 0;*/
            /*top: 0;*/
            /*background-image: linear-gradient(0deg,*/
              /*#4185ff 0%,*/
              /*#44b2ff 100%);*/
          /*}*/
          background: #fff;
          color: #3b77ff;
        }
      }
      .host_content{
        padding: 0 28px;
        min-height: 600px;
        h4{
          margin:0 27px 40px 0;
          height:30px;
          line-height:30px;
          width: 67px;
          font-size: 16px;
          color: #4b4d56;
        }
        .el-button{
          height: 30px;
          font-size: 16px;
          padding: 5px 10px!important;
          min-width: 90px;
          border-radius: 2px;
          /*background: transparent;*/
          /*color: #3b77ff;*/
        }
        .modify_btn{
          border-color: #3b77ff;
          color: #3b77ff;
          background: #fff;
        }
        .delete{
          margin-left: 33px;
          background: #fff;
          color: #f9647c;
          border-color: #f9647c;
        }
        .table_box{
          margin-top: 35px;
        }
        .host_time{
          padding: 20px 0 36px;
          border-bottom: solid 1px rgba(132,146,175,0.18);
          margin-bottom: 38px;
          font-size: 16px;
          .el-button{
            margin-left: 30px;
          }
          i{
            font-style: normal;
            color: #3b77ff;
          }
        }
      }
      .group_content{
        padding: 0 28px;
        min-height: 600px;
        &>div{
          margin:28px 27px 32px 0;
        }
        h4{
          margin:0;
          height:30px;
          line-height:30px;
          width: 67px;
          font-size: 16px;
          color: #4b4d56;
        }
        .el-button{
          height: 30px;
          font-size: 16px;
          padding: 5px 20px!important;
          margin-left: 30px;
        }
      }
    }
  }
</style>

<style>
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .dialog-group  .el-dialog{
    height:290px;
    top:50%;
    margin-top: -135px!important;
    box-shadow: 0px 0px 38px 0px
    rgba(0, 0, 0, 0.1);
    border-radius: 0;
  }
  .dialog-group  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  .dialog-group  .el-dialog__body{
    padding: 70px 20px;
    font-size: 16px;
    color: #4b4d56;
  }
  .dialog-group .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }
  .dialog-group .dialogQuickModify .el-dialog__body{
    padding: 30px 20px 0;
  }
  .dialog-group .dialogAdd .el-dialog__body{
    padding: 50px 20px 50px;
  }

</style>
<script>
  import { mapGetters } from 'vuex'
  import DataTable from './components/DataTable'
  import groupTable from './components/groupTable'
  import PaginationComponent from '@/components/Pagination/index.vue'
  import TypeSelectComponent from '@/components/TypeSelect/index.vue'
  import SearchComponent from '@/components/Search/index.vue'
  import effectiveTimeComponent from '@/components/Dialog/effectiveTime.vue'
  import confirmComponent from '@/components/Dialog/confirm.vue'
  import groupComponent from "@/components/Dialog/group.vue"
  import groupNameComponent from "@/components/Dialog/groupName.vue"
  import { parseTime, getStringTime } from '@/utils'
  export default {
    components: {
      DataTable,
      groupTable,
      PaginationComponent,
      TypeSelectComponent,
      SearchComponent,
      effectiveTimeComponent,
      confirmComponent,
      groupComponent,
      groupNameComponent
    },
    computed: {
      ...mapGetters([
        'guildInfo',
        'addHostStream',
        'type_select'
      ])
    },
    name: 'HostStream',
    data() {
      return {
        showValue: '新增关注',
        hostData: [],
        groupData:[],
        total: 0,
        currentPage:1,
        pageSize:10,
        downloadLoading: false,
        data_start_time:'',
        dialogVisible:false,
        paginationData:{total:0,pageSize:10,currentPage:1},
        mobile:'',
        role:"1",
        searchData:{
          placeholder:'请输入主播昵称',
          type:"searchHost",
          param:{}
        },
        typeSelect:{},
        isHost:true,
        quickArr:[],
        dialogAdd:{
          isVisible:false,
          name:''
        },
        selectedArr:[],
        effectiveTime:false,
        confirmData:{
          isVisible:false,
          title:'',
          description:'',
          type:'del_group'
        },
        dialogGroup:{
          epmUid:0,
          isVisible:false,
          description:"将选中的主播批量转入，请选择分组（可多选）：",
          title:'修改分组',
          type:'modifyGroup'
        },
        groupName:{
          epmUid:0,
          isVisible:false,
          title:'添加分组',
          type:'addGroup'
        },
        param:{
          groupId:"all", // 'all' or id
          platform:0, // 0 or 1,2,3...
          cateId: 0, // 0 or other 1,2,3...
          searchVar:"",
          pageNum:1,
          pageSize:10,
        },
        isInit:true

      }
    },
    methods: {
      paginationChange(pagination){
        this.paginationData = pagination;
        this.param.pageSize = pagination.pageSize;
        this.param.pageNum = pagination.currentPage;
        this.getHostList();
      },
      handleHostList(source){
        source.anchorInfos = source.anchorInfos || []
        source.anchorInfos.forEach(item=>{
          item.groupIds =item.anchorGroupInfos.map(anchorGroupInfo=>{
              return anchorGroupInfo.groupId
          });
          item.groupName =(item.anchorGroupInfos.map(anchorGroupInfo=>{
            return anchorGroupInfo.groupName
          })).join("、");
          item.operateNickname =(item.anchorGroupInfos.map(anchorGroupInfo=>{
            return anchorGroupInfo.operateNickname
          })).join(";");
        });
        this.paginationData.total = source.totalCount;
        this.hostData = source.anchorInfos;
      },
      async getHostList(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getDetail(this.param);
        if(response === false) return ;
        this.$store.dispatch("set_addHostStream",false);
        this.handleHostList(response.data)
      },
      async getGroupList(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.getDetail();
        if(response === false) return ;
        this.groupData = response.data.groupInfos;
      },
      typeChange(data){
        this.param = Object.assign({},this.param,data);
        this.searchData.param = data;
        if( this.isInit )return;
        this.getHostList()
      },
      searchHost(str){
        this.param.pageNum= 1;
        this.param.searchVar = str;
        this.getHostList()
      },
      change_menu(){
        if(event.target.className === 'current_menu')return;
        this.isHost = !this.isHost;
      },
      changeGroupArr(val){
        this.quickArr = val;
        this.dialogGroup.empUid = val;
      },
      showModifyGroupDialog(){
         // 快速修改
        if(this.isExperience())return;
        if(this.quickArr.length){
            this.dialogGroup.epmUid = this.quickArr;
            this.dialogGroup.isVisible = true;
        }else{
          this.$message('请选择修改项');
        }
      },
      quickDelGroup(){
          // 快速删除对话框展示
        if(this.isExperience())return;
        if(this.quickArr.length){
          this.confirmData = {
            isVisible:true,
            title:'删除确认',
            description:'确定要删除当前选中的主播吗？删除后不可恢复'
          }
        }else{
          this.$message('请选择删除项');
        }
      },
      async QuickConfirm(){
        //快速删除
        const oldRooms = this.quickArr.map(item=>{
          return {
            platform:item.platform,
            roomId:item.roomId,
            groupIds:item.groupIds
          }
        });
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.del ({oldRooms:oldRooms});
        if(response === false) return ;
        this.$message({
          message:'删除成功',
          type:"success"
        });
        this.getHostList();
      },
      groupChange(data){
        this.isHost = true;
        this.typeSelect = data;
        this.typeSelectAxios();
      },
      typeSelectAxios(){
        this.param.groupId = this.typeSelect.groupId;
         this.getGroupList();
        this.$refs.typeSelectChild.getData();
      }
    },
    activated(){
      this.getHostList();
      this.isInit=false;
    },
    created() {
      this.getGroupList();
    },
    destroyed() {}
  }

</script>


