<template>
  <div class="employee-container">
    <div class="employee-container_header">
      <h3 class="employee-container_title fl">员工管理</h3>
      <!--<el-button class="download_excel" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading" type="primary" round>下载Excel文件</el-button>-->
    </div>

    <div class="employee-container_invite">
      <h4 class="employee-container_title">邀请员工</h4>
      <p>
        员工账号：
        <el-input placeholder="请输入手机号" v-model="mobile"></el-input>
      </p>
      <p>角色：
        <el-radio-group v-model="role">
        <el-radio label="1">管理员</el-radio>
        <el-radio label="2">经纪人</el-radio>
      </el-radio-group>
      </p>
      <el-button type="primary" @click="invite">确认邀请</el-button>
      <span class="invite_tips">注：被邀请对象需要先注册直播宝数据平台</span>
    </div>

    <div class="employee-container_content">
      <h4 class="fl">员工列表</h4>
      <span class="employee_type">
        <i data-id="0" class="type_selected" @click="change_employee_type">全部</i>
        <i data-id="1" @click="change_employee_type">管理员</i>
        <i data-id="2" @click="change_employee_type">经纪人</i>
      </span>
      <Search-component :search-param="searchParam" :search-data="searchData" @on-search-value="searchHost"></Search-component>
      <Download-component :file-name="fileName" :download-data="downloadData" class="fr" @on-download-click="getDownloadData"></Download-component>
      <data-table :table-data="tableData" class="table_box" @on-employee-del="getData"></data-table>
      <Pagination-component :pagination-data="paginationData" @on-pagination-change="paginationChange"></Pagination-component>
    </div>

    <Type-select-component style="display: none"></Type-select-component>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .employee-container{
    .employee-container_header{
      height:36px;
      line-height:36px;
      padding:0 20px 0 0;
      margin-bottom: 42px;
      .employee-container_title{
        float: left;
        margin: 0 33px 0 0;
        height: 36px;
        font-size: 26px;
        line-height: 36px;
        color: #464851;
        font-weight: normal;
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
    .employee-container_invite{
      padding: 38px 48px 28px;
      background: #fff;
      box-shadow: 0px 6px 8px 0px
      rgba(0, 0, 0, 0.04);
      margin-bottom: 30px;
      h4{
        margin:0 0 30px 0;
        font-size: 18px;
        height:20px;
        line-height: 20px;
        color: #4b4d56;
        opacity:0.8;
      }
      p{
        margin:0 0 30px;
        font-size: 16px;
        font-weight: normal;
        color: #76767e;
      }

      .el-input{
        display: inline-block;
        width: 220px;
        margin-left: 12px;
      }
      .invite_tips{
        font-size: 16px;
        font-weight: normal;
        color: #3b77ff;
        opacity:0.7;
        margin-left: 15px;
      }
    }
    .employee-container_content{
      padding: 34px 30px;
      background: #fff;
      box-shadow: 0px 6px 8px 0px
      rgba(0, 0, 0, 0.04);
      .employee_type{
        float: left;
        height:28px;
        i{
          display: inline-block;
          height:28px;
          line-height: 28px;
          font-size: 16px;
          color: #464851;
          font-style: normal;
          margin-right: 24px;
          cursor: pointer;
        }
        .type_selected{
          color: #3083ff;
        }
      }
      h4{
        margin:0 24px 34px 0;
        height:28px;
        line-height: 28px;
        font-size: 18px;
        font-weight: normal;
        color: #4b4d56;
      }
    }
  }
</style>

<style>
  .employee-container .el-radio__label{
    font-size: 16px;
    color: #282a32;

  }
  .employee-container .el-radio-group{
    margin-left: 12px;
  }
  .employee-container .employee-container_content .el-input__inner{
    height:28px;
  }

</style>

<script>
  import TypeSelectComponent from '@/components/TypeSelect/index.vue'
  import DataTable from './components/DataTable'
  import PaginationComponent from '@/components/Pagination/index.vue'
  import SearchComponent from '@/components/Search/index.vue'
  import DownloadComponent from '@/components/Download/index.vue'
  import { isvalidMobile } from '@/utils/validate'
  import { mapGetters } from "vuex"
  export default {
    components: {
      DataTable,
      PaginationComponent,
      SearchComponent,
      DownloadComponent,
      TypeSelectComponent
    },
    computed:{
      ...mapGetters([
        'ExperienceEmployInfos'
      ])
    },
    name: 'employeeManage',
    data() {
      return {
        showValue: '新增关注',
        tableData: [],
        dialogVisible:false,
        paginationData:{total:0,pageSize:10,currentPage:1},
        mobile:'',
        role:"1",
        searchData:{
          placeholder:'请输入员工昵称',
          type:"seachEmployee",
          param:{
            roleType:0
          }
        },
        fileName:'导出员工列表',
        downloadData:null,
        searchParam:{
          roleType:0,
          searchVar:'',
          pageNum:1,
          pageSize:10,
          searchType:0
        }
      }
    },
    methods: {
      paginationChange(pagination){
        this.searchParam.pageNum = pagination.currentPage;
        this.searchParam.pageSize = pagination.pageSize;
        this.paginationData.pageSize = pagination.pageSize;
        this.paginationData.currentPage = pagination.currentPage;
        this.getData();
      },
      async getDownloadData(){
        this.searchParam.searchType = 1;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.getEmployeerDetail(this.searchParam);
        this.downloadData = {
          isloading:false
        };
        this.searchParam.searchType = 0;
        if(response === false) return ;
        this.downloadData = {
          isloading:true,
          tHeader:['用户昵称', '账号', '角色', '本月活跃天数', '上次登录时间'],
          filterVal:['nickname', 'openid', 'roleType', 'activeDays', 'lastLoginTime'],
          data:response.data.employInfos,
          xlms_name:'员工列表',
        }

      },
      handleemployInfos(source){
        source.employInfos.forEach(item=>{
          item.groupIds =item.groupInfos.map(anchorGroupInfo=>{
            return anchorGroupInfo.groupId
          });
          item.groupName =(item.groupInfos.map(anchorGroupInfo=>{
            return anchorGroupInfo.groupName
          })).join("、");
        });
        this.paginationData.total = source.totalCount;
        this.tableData = source.employInfos;
      },
      handleExperienceEmployInfos(){
        //测试账号数据处理
        let source = [];
        if( this.searchParam.searchVar !== ''){
          if( this.searchParam.roleType === 0 ){
            source = this.ExperienceEmployInfos.employInfos.filter(item=>{
              return item.nickname === this.searchParam.searchVar
            });
          }else{
            source = this.ExperienceEmployInfos.employInfos.filter(item=>{
              return (item.nickname === this.searchParam.searchVar && item.roleType === this.searchParam.roleType)
            });
          }
        }else{
          if( this.searchParam.roleType === 0 ){
            source = this.ExperienceEmployInfos.employInfos
          }else{
            source = this.ExperienceEmployInfos.employInfos.filter(item=>{
              return item.roleType === this.searchParam.roleType
            });
          }
        }
        if(source.length){
          source.forEach(item=>{
            item.groupIds =item.groupInfos.map(anchorGroupInfo=>{
              return anchorGroupInfo.groupId
            });
            item.groupName =(item.groupInfos.map(anchorGroupInfo=>{
              return anchorGroupInfo.groupName
            })).join("、");
          });
        }
        this.paginationData.total = this.ExperienceEmployInfos.totalCount;
        this.tableData = source;
      },
      async getData(){
        if( this.isExperience(true) ){
          this.handleExperienceEmployInfos();
          return;
        }
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.getEmployeerDetail(this.searchParam);
        if(response === false) return ;
        this.handleemployInfos( response.data )
      },
      async invite(){
        if(this.isExperience())return;
        if( !isvalidMobile(this.mobile) ){
          this.$message("请输入合法的手机号");
          return;
        }
        const data = {
          phoneNum:this.mobile,
          roleType:Number(this.role)
        };
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.inviteEmployeer(data);
        if(response === false) return ;
        this.$message({
          message:"邀请成功",
          type:"success"
        });
        this.mobile = ''
        this.getData();
      },
      searchHost(data){
        this.searchParam.currentPage = 1;
        this.searchParam.searchVar = data;
        this.getData();
      },
      change_employee_type(e){
        if(e.target.className)return;
        document.getElementsByClassName('type_selected')[0].setAttribute('class','');
        e.target.setAttribute('class','type_selected');
        this.searchParam.currentPage = 1;
        this.searchParam.roleType = Number(e.target.getAttribute('data-id'));
        this.searchData.param.roleType =  Number(e.target.getAttribute('data-id'))
        this.getData();
      }
    },
    created() {
        this.getData();
    },
    destroyed() {

    }
  }

</script>


