<template>
  <div class="dialog-confirm-wrapper">
    <el-dialog :title="dialogConfirm.title" :visible.sync="dialogConfirm.isVisible" width="534px">
      <span>{{dialogConfirm.description}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button round @click="dialogConfirm.isVisible=false">取 消</el-button>
        <el-button type="primary" round @click.native.prevent="Confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<style>
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .dialog-confirm-wrapper .el-dialog{
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
  .dialog-confirm-wrapper  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  .dialog-confirm-wrapper  .el-dialog__title{
    color: #4b4d56;
    font-size: 20px;
  }
  .dialog-confirm-wrapper  .el-dialog__body{
    padding: 70px 20px 54px;
    font-size: 16px;
    color: #4b4d56;
  }
  .dialog-confirm-wrapper  .el-dialog__footer{
    padding: 0 20px 26px;
  }
  .dialog-confirm-wrapper .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }
</style>
<script>
  export default {
    components: {
    },
    props:{
      dialogConfirm:{
        type:Object,
        default:function () {
          return{
            isVisible:false,
            description:"",
            title:'温馨提示',
            type:''
          }
        }
      }
    },
    name: 'dialogConfirm',
    data() {
      return{
      }
    },
    watch: {
      dialogConfirm: {
        deep: true,
        handler(option) {
          if(option.isVisible)
            this.dialogConfirm.isVisible = true;
        }
      }
    },
    methods: {
      Confirm(){
        this.$emit('on-dialog-status',this.dialogConfirm.type);
        this.dialogConfirm.isVisible = false;
      }
    },
    created() {
    },
    destroyed() {

    }
  }

</script>


