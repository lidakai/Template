<template>
  <div class="employee-list-container">
    <el-table :data="tableData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column prop="date_time" align="center" label="用户昵称">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="账号" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.openid}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="end_time" align="center" label="角色"  width="80px">
        <template slot-scope="scope">
          <span>{{scope.row.roleType === 3?'会长':scope.row.roleType === 1?'管理员':'经纪人'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分组">
        <template slot-scope="scope">
          <span class="">{{scope.row.roleType === 2 ?scope.row.groupName :"全部分组"}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="本月活跃天数" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.activeDays}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近登录时间">
        <template slot-scope="scope">
          <span class="">{{scope.row.lastLoginTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300px" class-name="small-padding fixed-width" v-if="userInfo.roleType === 3">
        <template slot-scope="scope">
          <a href="javascript:;" :class="scope.row.roleType === 3?'disable':''" @click="change_master(scope.row)">转让公会</a>
          <a href="javascript:;" :class="scope.row.roleType === 3?'disable':''" @click="del_employee(scope.row)">移除</a>
          <a href="javascript:;" :class="scope.row.roleType !== 2?'disable':''" @click="setPermission(scope.row)">设置权限</a>

        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px" class-name="small-padding fixed-width" v-if="userInfo.roleType === 1">
        <template slot-scope="scope">
          <a href="javascript:;" class="disable" @click="change_master(scope.row)">转让公会</a>
          <a href="javascript:;" :class="scope.row.roleType === 3?'disable':''"  @click="del_employee(scope.row)">移除</a>
          <a href="javascript:;" :class="scope.row.roleType === 2?'':'disable'" @click="setPermission(scope.row)">设置权限</a>
        </template>
      </el-table-column>
    </el-table>
    <confirm-component @on-dialog-status="QuickConfirm" :dialog-confirm ='confirmData'></confirm-component>
    <group-component :dialog-group='groupData' @group-change-dialog="$emit('on-employee-del')"></group-component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils'
  import confirmComponent from '@/components/Dialog/confirm.vue'
  import groupComponent from "@/components/Dialog/group.vue"
  export default {
    components: {
      confirmComponent,
      groupComponent
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    props: {
      tableData: {
        type: Array
      }
    },
    data() {
      return {
        confirmData:{
          isVisible:false,
          title:'移除确认',
          description:'确定要删除经纪人胡彦斌吗？删除后不可恢复',
          type:'del_manage'
        },
        groupData:{
          epmUid:0,
          isVisible:false,
          description:"给胡彦斌设置权限,选择TA可查看数据的分组：",
          title:'设置权限',
          type:'set_permission'
        },
        transeferUid:""
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {

    },
    methods: {
      del_employee(obj){
        if(obj.roleType ===3)return;
        if(this.isExperience())return;
        this.transeferUid = obj.uid;
        let role = obj.roleType === 3?'会长':obj.roleType === 1?'管理员':'经纪人';
        this.confirmData = {
          isVisible:true,
          title:'移除确认',
          description:'确定要删除'+role+obj.nickname+'吗？删除后不可恢复',
          type:'del_manage'
        }
      },
      change_master(obj){
        if(obj.roleType ===3 || this.userInfo.roleType ===1)return;
        if(this.isExperience())return;
        this.transeferUid = obj.uid;
        let role = obj.roleType === 3?'会长':obj.roleType === 1?'管理员':'经纪人';
        this.confirmData = {
          isVisible:true,
          title:'公会转让确认',
          description:'确定要将公会转让给'+role+obj.nickname+'吗？转让后不可恢复',
          type:'change_master'
        }
      },
      async QuickConfirm(value){
        if(value === 'change_master'){
          const data = {transeferUid:this.transeferUid};
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.transfer(data);
          if(response === false) return ;
          this.$message({
            message:'转让成功',
            type:"success"
          });
          setTimeout(function () {
            location.reload();    //目的：给用户时间看到上面的短提示。
          },1000)
        }else{
          const data = {empUid:this.transeferUid};
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.discharge(data);
          if(response === false) return ;
          this.$message({
            message:'移除成功',
            type:"success"
          });
          this.$emit('on-employee-del',"del")
        }
      },
      setPermission(obj){
        if(obj.roleType ===3 || obj.roleType ===1)return;
        if(this.isExperience())return;
        this.groupData = {
          groupIds:obj.groupIds,
          empUid:obj.uid+"",
          isVisible:true,
          title:'设置权限',
          description:'给'+obj.nickname+'设置查看数据权限,选择TA可查看的分组（可多选）：',
          type:'set_permission'
        }
      },
    }
  }
</script>
