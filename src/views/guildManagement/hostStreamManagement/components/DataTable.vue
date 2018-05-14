<template>
  <div class="host-list-container">
    <el-table :data="hostData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="right">
      </el-table-column>
      <el-table-column prop="date_time" align="left" label="主播昵称">
        <template slot-scope="scope">
          <span>{{scope.row.anchorNickname}}</span>
          <!--<div>添加人：{{scope.row.operateNickname}}</div>-->
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="直播平台" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.platName}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="分类">
        <template slot-scope="scope">
          <span>{{scope.row.cateName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="房间地址">
        <template slot-scope="scope">
          <a :href="scope.row.anchorUrl" target="_blank" style="color: #3b77ff;">{{scope.row.anchorUrl}}</a>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="分组">
        <template slot-scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width"  width="260px">
        <template slot-scope="scope">
          <!--<a href="javascript:;">查看数据</a>-->
          <router-link :to="'/analysis/profit/detail/'+scope.row.platform+'/'+scope.row.roomId" target="_blank">查看数据</router-link>
          <a href="javascript:;" @click="ModifyGroup(scope.row)">修改分组</a>
          <a href="javascript:;" @click="del_host(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <confirm-component @on-dialog-status="QuickConfirm" :dialog-confirm ='confirmData'></confirm-component>
    <group-component :dialog-group='dialogGroup' @group-change-dialog="$emit('on-host-change')"></group-component>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils'
  import confirmComponent from '@/components/Dialog/confirm.vue'
  import groupComponent from "@/components/Dialog/group.vue"
  export default {
    components:{
      confirmComponent,
      groupComponent
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    props: {
      hostData: {
        type: Array
      }
    },
    data() {
      return {
        dialogDel:{
          isVisible:false
        },
        dialogModify:{
          isVisible:false,
          name:""
        },
        modifyGroupArr:[],
        confirmData:{
          isVisible:false,
          title:'',
          description:'',
        },
        del_host_arr:[],
        dialogGroup:{},
      }
    },
    created() {

    },
    methods: {
      del_host(id){
        if(this.isExperience())return;
        this.del_host_arr = [id];
        this.confirmData = {
          isVisible:true,
          title:'删除确认',
          description:'确定要删除当前的主播吗？删除后不可恢复'
        }
      },
      async QuickConfirm(){
        const oldRooms = this.del_host_arr.map(item=>{
          return {
            platform:item.platform,
            roomId:item.roomId,

            groupIds:item.groupIds
          }
        });
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.del({oldRooms:oldRooms});
        if(response === false) return ;
        this.$message({
          message:'删除成功',
          type:"success"
        });

        this.$emit("on-host-change")
      },
      ModifyGroup(obj){
        if(this.isExperience())return;
        this.dialogGroup = {
          empUid:[obj],
          isVisible:true,
          title:'修改分组',
          description:'选择分组（可多选）：',
          type:'modifyGroup'
        }
      },
      async QuickSetGroup(){
        const data = {transeferUid:this.transeferUid};
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.del(data);
        if(response === false) return ;
        this.$message({
          message:'移除成功',
          type:"success"
        })
      },
      handleSelectionChange(val){
        this.$emit("on-change-group",val)
      },

    }
  }
</script>
