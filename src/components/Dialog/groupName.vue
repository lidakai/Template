<template>
  <div class="group-name-wrapper">
    <el-dialog :title="groupName.title" :visible.sync="groupName.isVisible" width="454px" class="groupName">
      <el-form>
        <el-form-item label="分组名称：" label-width="92px">
          <el-input v-model="groupName.name" auto-complete="off" placeholder="十个字以内，不可为空"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="groupName.isVisible = false">取 消</el-button>
        <el-button round type="primary" @click="addGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .group-name-wrapper  .el-dialog{
    top:50%;
    box-shadow: 0px 0px 38px 0px
    rgba(0, 0, 0, 0.1);
    border-radius: 0;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-top: 0!important;
  }
  .group-name-wrapper  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  .group-name-wrapper  .el-dialog__body{
    padding: 38px 20px 0;
    font-size: 16px;
    color: #4b4d56;
  }
  .group-name-wrapper  .el-dialog__footer{
    padding: 26px 20px;
  }
  .group-name-wrapper .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }

  .group-name-wrapper .definition{
    /*display: block;*/
    margin:24px 0 0 0;
    display: block;
  }


  .group-name-wrapper_tips{
    line-height:18px;
    font-size: 14px;
    font-weight: normal;
    color: #3b77ff;
    background-color: rgba(196,196,196,0.2);
    padding:20px 27px 20px;
    margin:30px -20px 0;
    opacity:0.8;
  }
  .group-name-wrapper_tips p{
    margin:0;
  }
  .group-name-wrapper_tips p:first-child{
    margin-bottom: 18px;
  }
  .group-name-wrapper .el-radio{
    color: #282a32;
  }
  .group-name-wrapper .el-input{
    width:200px;
  }
  .group-name-wrapper .el-input .el-input__inner{
    padding: 0 12px;
  }
</style>
<script>
  export default {
    components: {},
    props:{
      groupName:{
        type:Object
      }
    },
    name: 'groupName',
    data() {
      return{}
    },
    watch: {},
    methods: {
      async addGroup(){
        if( this.groupName.name.replace(/\s/g,'').length > 10 || !this.groupName.name.replace(/\s/g,'') ) {
          this.$message("分组名称必须小于十个字以内，不可为空");
          return ;
        }
        if( this.groupName.type === 'addGroup'){
          // 添加分组
            const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.alterInfo({groupName:this.groupName.name});
            if(response === false) return ;
            this.groupName.isVisible = false;
            this.$message({
              message:'添加成功',
              type:"success"
            });

            this.$emit("on-group-name-change",{
              type:'addGroup',
              groupName:this.groupName.name
            })
        }else{
          // 添加分组
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.alterInfo({groupId:this.groupName.groupId,groupName:this.groupName.name});
          if(response === false) return ;
          this.groupName.isVisible = false;
          this.$message({
            message:'修改成功',
            type:"success"
          });
          this.$emit("on-group-name-change",{
            type:'modifyGroup',
            groupName:this.groupName.name
          })
        }


      }
    },
    created() {},
    destroyed() {}
  }

</script>


