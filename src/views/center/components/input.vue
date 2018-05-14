<template>
  <div class="input-dialog-wrapper">
    <el-dialog :title="dialogInput.title" @close="isVisibleFalse" :visible.sync="dialogInput.isVisible" width="480px" :class="dialogInput.className">
      <el-form>

        <el-form-item v-if="dialogInput.type===1||dialogInput.type===2||dialogInput.type===3"  :label="dialogInput.label" :label-width="dialogInput.labelWidth">
          <el-input v-model="dialogInput.input" auto-complete="off" :placeholder="dialogInput.placeholder"></el-input>
          <span v-if=" dialogInput.className === 'dialogCode'" class="get_code" @click="getCode" :class="CodeIsSending?'disable':''">{{codeWord}}</span>
        </el-form-item>

        <!--修改手机号-->
        <el-form-item v-if="dialogInput.className === 'dialogModifyMobile'" prop="mobile" label="手机号码："  :label-width="dialogInput.labelWidth" class="mobile_input">
          <el-input auto-complete="off" placeholder="请输入新手机号"   v-model="dialogInput.input"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogInput.className === 'dialogModifyMobile'" label="验证码："  :label-width="dialogInput.labelWidth" class="code_input">
          <el-input auto-complete="off" placeholder="请输入短信验证码"   v-model="checkCode"></el-input>
          <span class="get_code" @click="getCode" :class="CodeIsSending?'disable':''">{{codeWord}}</span>
        </el-form-item>

        <!--修改密码-->
        <el-form-item v-if="dialogInput.className === 'modifyPassword'" label="手机号：" :label-width="dialogInput.labelWidth">
          <el-input name="mobile" auto-complete="off" placeholder="请输入手机号"   v-model="dialogInput.input"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogInput.className === 'modifyPassword'" label="验证码："  :label-width="dialogInput.labelWidth" class="password_input">
          <el-input name="mobileCode" auto-complete="off" placeholder="请输入短信验证码"   v-model="checkCode"></el-input>
          <span class="get_code" @click="getCode" :class="CodeIsSending?'disable':''">{{codeWord}}</span>
        </el-form-item>
        <el-form-item v-if="dialogInput.className === 'modifyPassword'" :label="dialogInput.label" :label-width="dialogInput.labelWidth">
          <el-input :type="isFocus?'password':'text'"  auto-complete="off" placeholder="请输入密码"   v-model="password"></el-input>
          <i class="watch-icon" @click="isFocus = !isFocus">
            <svg-icon icon-class="watch"  v-if="!isFocus"></svg-icon>
            <svg-icon icon-class="no_watch" v-if="isFocus"></svg-icon>
          </i>
        </el-form-item>

        <!--解散公会-->
        <el-form-item v-if="dialogInput.className === 'checkMaster'" label="手机号：" :label-width="dialogInput.labelWidth">
          <el-input name="mobile" auto-complete="off" placeholder="请输入手机号"   v-model="dialogInput.input"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogInput.className === 'checkMaster'" label="验证码："  :label-width="dialogInput.labelWidth" class="password_input">
          <el-input name="mobileCode" auto-complete="off" placeholder="请输入短信验证码"   v-model="checkCode"></el-input>
          <span class="get_code" @click="getCode" :class="CodeIsSending?'disable':''">{{codeWord}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isVisibleFalse">取 消</el-button>
        <el-button type="primary" @click="dialogInputBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<style>
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .input-dialog-wrapper  .el-dialog{
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
  .input-dialog-wrapper  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  .input-dialog-wrapper  .el-dialog__body{
    padding: 38px 20px 0;
    font-size: 16px;
    color: #4b4d56;
  }
  .input-dialog-wrapper  .el-dialog__footer{
    padding: 26px 20px;
  }
  .input-dialog-wrapper .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }

  .input-dialog-wrapper .definition{
    /*display: block;*/
    margin:24px 0 0 0;
    display: block;
  }

  .input-dialog-wrapper .el-dialog__header{
    border-bottom:1px solid rgba(235, 235, 235, 1);
    padding: 20px 30px 0 30px;
    font-size: 14px;
    color: rgba(0,0,0,0.8);
  }

  .input-dialog-wrapper .el-dialog__title{
    font-size:14px;
    color: rgba(0,0,0,0.8);
  }
  .input-dialog-wrapper .el-input--medium{
    width: 300px;
  }

</style>

<style>
  .input-dialog-wrapper .changeMobile  .el-dialog__body{
    padding-top: 10px;
  }
  .changeMobile .el-form-item__label{
    display: block;
    width: 320px;
    margin:0 auto;
    text-align: center;
    float: none;
    color: rgba(102,102,102,1);
  }
  .changeMobile .el-form-item__content{
    display: block;
    width:100%;
    text-align: center;
  }
  .input-dialog-wrapper .el-dialog__footer{
    text-align: center;
    padding-top: 0px;
  }

  .input-dialog-wrapper .get_code{
    min-width: 110px;
    text-align: center;
    display: inline-block;
    border:1px solid #dcdfe6;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
  }
  .input-dialog-wrapper .get_code.disable{
    cursor: default;
    opacity: 0.4;
  }

  .dialogCode .el-form-item__label{
    display: block;
    width: 320px;
    margin:0 auto;
    text-align: center;
    float: none;
    color: rgba(102,102,102,1);
  }
  .dialogCode .el-form-item__content{
    display: block;
    width:100%;
    text-align: center;
  }
  .dialogCode .el-input--medium{
    width: 200px;
  }

  .dialogModifyMobile .code_input .el-input--medium{
    width:200px;
  }
  .modifyPassword  .password_input  .el-input--medium{
    width:180px;
  }

  .checkMaster  .password_input  .el-input--medium{
    width:180px;
  }
  .watch-icon{
    height:36px;
    width:30px;
    position: absolute;
    right:40px;
    cursor: pointer;
  }
  .watch-icon .svg-icon{
    width: 22px !important;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import { isvalidMobile } from '@/utils/validate'
  export default {
    components: {
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    props:{
      dialogInput:{
        type:Object,
        default:function () {
          return {
            isVisible:true,
            title:'修改个人信息',
            label:'昵称',
            labelWidth:'60px',
            placeholder:'请输入昵称',
            type:1,//1-----修改昵称,
            input:'',
            isDissolve:false,
          }
        }
      }
    },
    name: 'dialogInput',
    data() {
      return{
        oldMobile:'',
        checkCode:'',
        codeWord:'获取验证码',
        codeTimer:null,
        CodeIsSending:false,
        password:'',
        isFocus:true
      }
    },
    watch: {
      dialogInput: {
        deep: true,
        handler(option) {
          if(option.isVisible)
            this.dialogInput.isVisible = true;
        }
      }
    },
    methods: {
      isVisibleFalse(){
        //模态窗口取消按钮
        this.dialogInput.isVisible = false;
        this.initData();
      },
      dialogInputBtn(){
        switch (this.dialogInput.type){
          case 1://修改用户信息
            this.modify_info();
            break;
          case 2://无验证码检测手机号
            this.checkMobile();
            break;
          case 3://携带验证码验证码检测手机号
            this.checkMobileWidthCode();
            break;
          case 4://修改绑定手机号
            this.modifyMobile();
            break;
          case 5://修改密码
            this.modifyPassword();
            break;
          case 6://解散公会前的身份验证
            this.checkMaster();
            break;
          default:
            break;
        }
      },
      async getCode(){
        let Mobile = this.dialogInput.input||this.oldMobile;
        if (!Mobile || !isvalidMobile(Mobile)) {
          this.$message('请输入合法的手机号');
          return;
        }
        if(this.CodeIsSending)return;
        this.CodeIsSending = true;
        let response = null;
        if( this.dialogInput.type === 5 || this.dialogInput.type === 6 ){
          response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.reqCodeByCheck({mobile:Mobile});
        }else{
          response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.reqCode({mobile:Mobile});
        }

        if( response === false ){
          this.CodeIsSending = false;
          return;
        }
        let num = 60;
        this.codeTimer = setInterval(() => {
          if (num <= 1) {
            this.codeWord = '重新获取验证码';
            this.CodeIsSending = false;
            clearInterval(this.codeTimer);
            return
          }
          num--;
          this.codeWord = "("+num+"s)重新获取";
        },1000)
      },
      async modify_info() {
        //修改用户昵称
        if(!this.dialogInput.input.replace(/\s/g, '')){
          this.$message('请输入用户昵称');
          return
        }
        this.userInfo.province = this.userInfo.province || '-';
        this.userInfo.city = this.userInfo.city || '-';
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.modifyInfo({
          nickname:this.dialogInput.input,
          province:this.userInfo.province,
          city:this.userInfo.city ,
          gender :this.userInfo.gender,
          avatar :this.userInfo.portrait,

        });
        if( response === false )return;
        this.dialogInput.isVisible=false;
        this.userInfo.nickname = this.dialogInput.input;
        this.$store.dispatch('set_userInfo',this.userInfo);
        this.$message({
          type:'success',
          message:'修改成功'
        });
      },
      async checkMobile() {
//        无验证码验证手机号
        let mobile = this.dialogInput.input.replace(/\s/g, '');
        if (mobile && isvalidMobile(mobile)) {
          const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.checkOldMobile({mobile:mobile,code:''});
          if( response === false )return;
          this.oldMobile = mobile;
          this.dialogInput.label='已向现有手机号发送了一条验证码';
          this.dialogInput.placeholder='请输入短信验证码';
          this.dialogInput.input='';
          this.dialogInput.className = 'dialogCode';
          this.dialogInput.type = 3;
          this.getCode();
        }else{
          this.$message('请输入合法的手机号');
        }
      },
      async checkMobileWidthCode(){
        //        携带证码验证手机号
        if ( this.dialogInput.input.length === 6 ) {
          const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.checkOldMobile({mobile:this.oldMobile,code:this.dialogInput.input})
          if( response === false )return;
          this.dialogInput.input='';
          this.dialogInput.labelWidth="100px";
          this.dialogInput.className = 'dialogModifyMobile';
          this.dialogInput.type = 4;
          this.initData();
        }else{
          this.$message('请输入合法的验证码');
        }
      },
      async modifyMobile(){
        //修改手机号
        let mobile = this.dialogInput.input.replace(/\s/g, '');
        if (!mobile || !isvalidMobile(mobile)) {
          this.$message('请输入合法的手机号');
          return;
        }

        if ( this.checkCode.length !== 6 ) {
          this.$message('请输入合法的验证码');
          return;
        }
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.modifyMobile({mobile:mobile,code:this.checkCode});
        if( response === false )return;
        this.$store.dispatch('set_userInfo', response.data.data.info);
        this.dialogInput.isVisible = false;
        this.$message({
          type:'success',
          message:"修改成功"
        });
        this.initData();
      },
      async modifyPassword(){
        let mobile = this.dialogInput.input.replace(/\s/g, '');
        let code = this.checkCode.replace(/\s/g, '');
        let password = this.password.replace(/\s/g, '');
        if (!mobile || !isvalidMobile(mobile)) {
          this.$message('请输入合法的手机号');
          return;
        }
        if ( this.checkCode.length !== 6 ) {
          this.$message('请输入合法的验证码');
          return;
        }
        if ( password.length <6 || password.length > 16 ) {
          this.$message('请输入合法的密码');
          return;
        }
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.pwModify({mobile:mobile,code:code,password:password});
        if( response === false )return;
        this.userInfo.bind.mobile.pw = true;
        this.$store.dispatch('set_userInfo', this.userInfo);
        this.$message({
          type:'success',
          message:'修改成功'
        });
        this.dialogInput.isVisible = false;
        this.isFocus = false;
        this.initData();
      },
      async checkMaster(){
        let mobile = this.dialogInput.input.replace(/\s/g, '');
        let code = this.checkCode.replace(/\s/g, '');
        if (!mobile || !isvalidMobile(mobile)) {
          this.$message('请输入合法的手机号');
          return;
        }
        if ( this.checkCode.length !== 6 ) {
          this.$message('请输入合法的验证码');
          return;
        }
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.checkOldMobile({mobile:mobile,code:code});
        if( response === false )return;
        this.dialogInput.isVisible = false;
        this.$emit("on-input-status-change",'checkMaster');
        this.initData();
      },
      initData(){
        //初始化各种值
        this.codeWord = '获取验证码';
        this.dialogInput.input = '';
        this.password="";
        this.CodeIsSending = false;
        this.checkCode = '';
        clearInterval(this.codeTimer);
      }
    },
    created() {
    },
    destroyed() {

    }
  }

</script>


