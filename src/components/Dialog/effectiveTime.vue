<template>
  <div class="effective-time-change-wrapper">
    <el-button  type="primary" class="set_time_btn" @click="show_set_time">设置有效直播时长</el-button>
    <el-dialog title="设置直播时长" :visible.sync="dialogLiveTime.isVisible" class="dialogLiveTime" width="534px" :close="$emit('on-effective-duration','')">
      <el-radio v-model="dialogLiveTime.radio" :label="1">1小时</el-radio>
      <el-radio v-model="dialogLiveTime.radio" :label="2">2小时</el-radio>
      <el-radio v-model="dialogLiveTime.radio" :label="6">6小时</el-radio>
      <el-radio v-model="dialogLiveTime.radio" :label="4" class="definition">
        自定义 <el-input v-model="dialogLiveTime.input" placeholder="1-24" @input="changeValue"></el-input>小时
      </el-radio>
      <div class="effective-time-change-wrapper_tips">
        <p>1. 主播当天直播时间大于有效时长，才算作有效直播天数。如：有效直播时长设置为2小时，则直播超过2小时计为有效直播一天，小于2小时则不算做有效开播。（最小单位为1小时）</p>
        <p>2. 设置后隔天将影响统计结果，请慎重操作！</p>

      </div>
      <div slot="footer" class="effective-time-change-wrapper_footer">
        <el-button round @click="dialogLiveTime.isVisible = false">取 消</el-button>
        <el-button round type="primary" @click="setLiveTime">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<style>
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .effective-time-change-wrapper{
    display: inline-block;
  }
  .effective-time-change-wrapper  .el-dialog{
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
  .effective-time-change-wrapper  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  .effective-time-change-wrapper  .el-dialog__body{
    padding: 38px 20px 0;
    font-size: 16px;
    color: #4b4d56;
  }
  .effective-time-change-wrapper  .el-dialog__footer{
    padding: 26px 20px;
  }
  .effective-time-change-wrapper .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }

  .effective-time-change-wrapper .definition{
    /*display: block;*/
    margin:24px 0 0 0;
    display: block;
  }


  .effective-time-change-wrapper_tips{
    line-height:18px;
    font-size: 14px;
    font-weight: normal;
    color: #3b77ff;
    background-color: rgba(196,196,196,0.2);
    padding:20px 27px 20px;
    margin:30px -20px 0;
    opacity:0.8;
  }
  .effective-time-change-wrapper_tips p{
    margin:0;
  }
  .effective-time-change-wrapper_tips p:first-child{
    margin-bottom: 18px;
  }
  .effective-time-change-wrapper .el-radio{
    color: #282a32;
  }
  .effective-time-change-wrapper .el-input{
    width:60px;
    margin:0 2px;
  }
  .effective-time-change-wrapper .el-input .el-input__inner{
    padding: 0 12px;
  }
  .set_time_btn{
    height: 36px;
    font-size: 16px;
    padding: 5px 20px!important;
    margin-left: 30px;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {
    },
    computed: {
      ...mapGetters([
        'guildInfo'
      ])
    },
    props:{
      effectiveTime:{
        type:Boolean,
        default:false
      }
    },
    name: 'effectiveTime',
    data() {
      return{
        dialogLiveTime:{
          isVisible:false,
          radio:'2',
          input:''
        }
      }
    },
    watch: {
      effectiveTime: {
        deep: true,
        handler(status) {
          if(status){
            this.dialogLiveTime.isVisible = true;
          }
        }
      }
    },
    methods: {
      async setLiveTime(){
        let effectiveDuration  = 0;
        if( this.dialogLiveTime.radio === 4 ){
          effectiveDuration  = Number(this.dialogLiveTime.input)
        }else{
          effectiveDuration  = Number(this.dialogLiveTime.radio)
        }
        const data = {effectiveDuration :effectiveDuration };
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.setEffectiveDuration(data);
        this.$emit('on-effective-duration','');
        if(response === false){
          this.dialogLiveTime.isVisible = false;
          return ;
        }
        this.guildInfo.effectiveDuration = effectiveDuration;
        this.$store.dispatch('set_guildInfo',this.guildInfo);
        this.$message({
          message:'设置成功',
          type:"success"
        });
        this.dialogLiveTime.isVisible = false;
      },
      changeValue(){
//        此处有bug
        let value = parseInt(this.dialogLiveTime.input);
        if( !value ){
          this.dialogLiveTime.input = '';
        }else if( value > 24 ){
          this.dialogLiveTime.input = 24;
        }
      },
      handleEffectiveTime(){
        if(this.guildInfo.effectiveDuration === 1 || this.guildInfo.effectiveDuration === 2 || this.guildInfo.effectiveDuration === 6){
          this.dialogLiveTime.radio = this.guildInfo.effectiveDuration;
        }else{
          this.dialogLiveTime.radio = 4;
          this.dialogLiveTime.input = this.guildInfo.effectiveDuration;
        }
      },
      async getEffectiveTime(){
        if(this.guildInfo.effectiveDuration){
          this.handleEffectiveTime();
        }else{
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.getDetail();
          if(response === false) return ;
          this.$store.dispatch('set_guildInfo',response.data.unionInfo);
          this.handleEffectiveTime();
        }
      },
      show_set_time(){
        if(this.isExperience())return;
        this.dialogLiveTime.isVisible = !this.dialogLiveTime.isVisible
      }
    },
    created() {
      this.getEffectiveTime();
    },
    destroyed() {

    }
  }

</script>


