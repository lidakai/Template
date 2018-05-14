<template>
  <div class="group-list-container">
    <el-table :data="groupData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column prop="date_time" align="center" label="组名">
        <template slot-scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" >
        <template slot-scope="scope">
          <router-link :to="'addHost/'+scope.row.groupId">添加成员</router-link>
          <a href="javascript:;" @click="checkHostStream(scope.row)">查看成员</a>
          <a href="javascript:;" @click="editorName(scope.row)" :class="scope.row.groupName==='我的收藏'?'disable':(scope.row.groupName==='未分组'?'disable':'')">编辑名称</a>
          <a href="javascript:;" @click="del_group(scope.row)"  :class="scope.row.groupName==='我的收藏'?'disable':(scope.row.groupName==='未分组'?'disable':'')">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <confirm-component @on-dialog-status="QuickConfirm" :dialog-confirm ='confirmData'></confirm-component>
    <group-name-component :group-name="groupName"  @on-group-name-change="groupNameChange"></group-name-component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils'
  import confirmComponent from '@/components/Dialog/confirm.vue'
  import groupNameComponent from "@/components/Dialog/groupName.vue"
  export default {
    computed: {
      ...mapGetters([
        'userInfo',
        'type_select'
      ])
    },
    components:{
      confirmComponent,
      groupNameComponent
    },
    props: {
      groupData: {
        type: Array
      }
    },
    data() {
      return {
        confirmData : {
          isVisible:false,
          title:'',
          description:''
        },
        dialogEditor:{
          isVisible:false,
          name:''
        },
        groupId:"",
        groupName:{
          epmUid:0,
          isVisible:false,
          title:'修改名称',
          type:'modifyName'
        }
      }
    },
    created() {

    },
    methods: {
      del_group(obj){
        if(this.isExperience())return;
        if(obj.groupName === '我的收藏' ||obj.groupName === '未分组')return;
        this.groupId = obj.groupId;
        this.confirmData = {
          isVisible:true,
          title:'删除确认',
          description:'确定要删除当前的分组吗？删除后不可恢复'
        }
      },
      addHostStream(id){
        this.$router.push({path:'addHost/'+id});
      },
      checkHostStream(data){
        this.type_select.group = data.groupName;
        this.type_select.plat = "";
        this.type_select.category = "";
        this.$store.dispatch('changeType',this.type_select);
        this.$emit('on-group-change',this.type_select);
      },
      async QuickConfirm(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.delById({groupId:this.groupId});
        if(response === false) return ;
        this.$message({
          message:'删除成功',
          type:"success"
        });
        this.$emit('on-group-modify');
      },
      editorName(obj){
        if(this.isExperience())return;
        if(obj.groupName === '我的收藏' || obj.groupName === '未分组')return;
        this.groupName ={
            groupId:obj.groupId,
            isVisible:true,
            title:'编辑名称',
            type:'editorName',
          name:obj.groupName
        };
      },
      groupNameChange(obj){
        this.groupData.forEach(item=>{
          if( item.groupId === this.groupName.groupId ){
            item.groupName = obj.groupName;
            return false;
          }
        });
        this.$emit('on-group-modify');
      }
    }
  }
</script>
