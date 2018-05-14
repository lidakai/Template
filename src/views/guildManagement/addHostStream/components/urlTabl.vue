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
          <span>{{scope.row.groupMaster}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <a href="javascript:;">添加成员</a>
          <a href="javascript:;">查看成员</a>
          <a href="javascript:;" @click="dialogEditor.isVisible=true">编辑名称</a>
          <a href="javascript:;" @click="dialogDel.isVisible=true">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="删除确认" :visible.sync="dialogDel.isVisible"  class="dialogDel dialog" width="454px">
      <span>确定要删除当前的分组吗？删除后不可恢复</span>
      <span slot="footer" class="dialog-footer">
        <el-button round @click="dialogDel.isVisible=false">取 消</el-button>
        <el-button type="primary" round @click.native.prevent="del_content">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑名称" :visible.sync="dialogEditor.isVisible" class="dialog dialogEditor" width="454px">
      <el-form>
        <el-form-item label="分组名称：" label-width="92px">
          <el-input v-model="dialogEditor.name" auto-complete="off" placeholder="十个字以内，不可为空"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="dialogEditor.isVisible = false">取 消</el-button>
        <el-button round type="primary" @click="EditorGroup">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .group-list-container  .el-dialog{
    height:290px;
    top:50%;
    margin-top: -135px!important;
    box-shadow: 0px 0px 38px 0px
    rgba(0, 0, 0, 0.1);
    border-radius: 0;
  }
  .group-list-container  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  .group-list-container  .el-dialog__body{
    padding: 70px 20px;
    font-size: 16px;
    color: #4b4d56;
  }
  .group-list-container .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }
  .group-list-container .el-form-item{
    margin-bottom: 0;
  }
  .group-list-container .dialogEditor .el-dialog__body{
    padding: 70px 20px 50px;
  }
  .group-list-container .el-form-item__label{
    font-size: 16px;
    color: #4b4d56;
    opacity:0.8;
    font-weight: normal;
    padding-right: 5px;
  }
  .group-list-container .el-input{
    width:220px;
  }

</style>

<script>
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils'
  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    props: {
      groupData: {
        type: Array
      }
    },
    data() {
      return {
        dialogDel:{
          isVisible:false
        },
        dialogEditor:{
          isVisible:false,
          name:''
        },
        groupId:""

      }
    },
    created() {

    },
    methods: {
      async del_content(){

        const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.alterInfo({groupId:this.groupId});
        if(response === false) return ;
        this.dialogDel.isVisible=false;

      },
      async EditorGroup(){
        if( this.dialogEditor.name.replace(/\s/g,'').length > 10 || !this.dialogEditor.name.replace(/\s/g,'') ){
          this.$message("分组名称必须小于十个字以内，不可为空")
        }else{
          const tempData = {groupId:this.groupId,groupName:this.dialogEditor.name};
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.alterInfo(tempData);
          if(response === false) return ;
        }
        this.dialogEditor.isVisible = false
      }
    }
  }
</script>
