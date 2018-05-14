<template>
  <div class="register-container">
      <Header-components></Header-components>
      <div class="register-content">
        <div class="default_inner">
          <el-row>
        <el-col :xs="8" :sm="8" :lg="8":offset="2" class="slider_card">
          <Carousel-components></Carousel-components>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" :offset="6">
          <div class="register_box">
            <a class="changeStation" href="http://zhubo.zhibobao.com">
              主播系统
              <img :src="changeStation" alt="">
            </a>
            <p class="register_title">
              <span class="register_box_title">注册</span>
              <span class="toLogin" @click="toLogin" style="color:#333333">返回登录</span>
            </p>
            <el-form class="login-form" autoComplete="off" :model="registerForm" ref="loginForm" label-position="left">
              <el-form-item prop="mobile">
                <el-input name="mobile" type="text" v-model="registerForm.mobile" autoComplete="off" placeholder="手机号" maxLength="11" />
              </el-form-item>
              <el-form-item class="register-code" prop="code">
                <span @click="get_checkCode" class="checkCode">{{checkCode.checkWord}}</span>
                <el-input name="" type="text" autoComplete="off" v-model="registerForm.code" placeholder="验证码" />
              </el-form-item>
              <el-form-item class="register-password" prop="password">
                <el-input name="password" type="password" autoComplete="off" v-model="registerForm.password" placeholder="密码长度6-16" />
              </el-form-item>
              <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">确认注册，直接登录</el-button>
            </el-form>
          </div>
        </el-col>
        </el-row>
        </div>
        <img class="bottom_line" :src="bottom_line" alt="">
      </div>
      <Footer-components></Footer-components>
  </div>
</template>

<script>
  import { isvalidMobile, isvalidCode, isvalidPassword } from '@/utils/validate'
  import bottom_line from '@/assets/login/bottom_line.png'
  import { getCheckCode } from '@/api/user'
  import HeaderComponents from '@/components/Header/index.vue'
  import FooterComponents from '@/components/Footer/index.vue'
  import CarouselComponents from './components/carousel.vue'
  import changeStation from './img/changeStation.png'
  export default {
    components: {
      HeaderComponents,
      FooterComponents,
      CarouselComponents
    },
    name: 'register',
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!isvalidMobile(value)) {
          this.$message("请输入正确的手机号")
        } else {
          callback()
        }
      };
      const validateSecret = (rule, value, callback) => {
        if (value.length >= 6 && value.length <=16) {
          callback()
        } else {
          this.$message("请输入合法的密码")
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value.length === 6) {
          callback()
        } else {
          this.$message("请输入正确的验证码")
        }
      };
      return {
        registerForm:{
          mobile:'',
          password:'',
          code:''
        },
        checkCode: {
          checkWord: '获取验证码',
          isSending: false
        },
        codeTimer:null,
        loading:true,
        bottom_line,
        changeStation
      }
    },
    methods: {
//      handleRegister(){
//        //  注册预登陆调用同一个接口，仅多一个密码参数
//        if( !isvalidMobile ){
//          this.$message("请输入正确的手机号");
//          return;
//        }
//
//        if( !isvalidCode ){
//          this.$message("请输入正确的验证码");
//          return;
//        }
//
//        if( !isvalidPassword ){
//          this.$message("请输入正确的6-16位密码");
//          return;
//        }
//        this.$store.dispatch('LoginByUsername', this.registerForm).then((res) => {
//          this.loading = false;
//          if(res.data.code===0){
//            this.registerForm.code='';
//            document.getElementsByName('password')[0].setAttribute('name','text');
//            this.$router.push({ path: '/' });
//          }else{
//            this.$message(res.data.message)
//          }
//        }).catch(() => {
//          this.loading = false
//        })
//      },
      async handleRegister(){
        //  注册预登陆调用同一个接口，仅多一个密码参数
        if( !isvalidMobile ){
          this.$message("请输入正确的手机号");
          return;
        }

        if( !isvalidCode ){
          this.$message("请输入正确的验证码");
          return;
        }

        if( !isvalidPassword ){
          this.$message("请输入正确的6-16位密码");
          return;
        }
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.pwLogin(this.registerForm)
        if(response === false)return;
        this.$store.dispatch('set_token', response.data.data.token);
        this.$store.dispatch('set_userInfo', response.data.data.info);
        document.getElementsByName('password')[0].setAttribute('name','text');
        this.registerForm.code='';
        this.$router.push({ path: '/' });
      },
//      get_checkCode() {
//        if (!isvalidMobile(this.registerForm.mobile)) {
//          this.$message("请输入正确的手机号");
//          return;
//        }
//        let temData = { mobile: this.registerForm.mobile };
//        getCheckCode(temData).then((response) => {
//          if (response.data.code === 0) {
//            if (this.checkCode.isSending) return;
//            this.checkCode.isSending = true;
//            let num = 60;
//            this.checkCode.checkWord = '(60s)重新获取';
//            this.codeTimer = setInterval(() => {
//              if (num <= 1) {
//                this.checkCode.checkWord = '重新获取验证码';
//                this.checkCode.isSending = false;
//                clearInterval(this.codeTimer);
//                return
//              }
//              num--;
//              this.checkCode.checkWord = '(' + num + 's)重新获取'
//            }, 1000)
//          } else {
//          }
//        });
//      },
      async get_checkCode() {
        if (!isvalidMobile(this.registerForm.mobile)) {
          this.$message("请输入正确的手机号");
          return;
        }
        if (this.checkCode.isSending) return;
        let temData = { mobile: this.registerForm.mobile };
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.reqCode(temData);
        if(response === false)return;
        this.checkCode.isSending = true;
        let num = 60;
        this.checkCode.checkWord = '(60s)重新获取';
        this.codeTimer = setInterval(() => {
          if (num <= 1) {
            this.checkCode.checkWord = '重新获取验证码';
            this.checkCode.isSending = false;
            clearInterval(this.codeTimer);
            return
          }
          num--;
          this.checkCode.checkWord = '(' + num + 's)重新获取'
        }, 1000)
      },
      toLogin(){
        this.$router.push({path:'/login'});
      }
    },
    created() {},
    destroyed() {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-input {
    input {
      background: transparent;
      -webkit-appearance: none;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #606266 !important;
      }
    }
  }
  .register-container .el-form-item.is-success .el-input__inner{
    border-color: #dcdfe6;
  }
  .register-container .el-form-item .el-input__inner{
    height: 46px !important;
    border-radius: 46px;
    text-indent:15px;
  }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.register-container{
  min-height: 100%;
  background: #f5f5f5;
  .default_inner{
    width:1200px;
    margin:0 auto;
  }
  .register-content {
    padding: 95px 0 0;
    background: url('./img/login_bg.png') no-repeat 0 0;
    .bottom_line{
      display: block;
      width: 100%;
    }
    .register_box{
      width:400px;
      height:430px;
      background: #fff;
      padding: 44px 40px 0;
      border-radius: 4px;
      margin-top: 80px;
      margin-bottom: 150px;
      position: relative;
      .changeStation{
        width: 135px;
        height: 16px;
        line-height:16px;
        font-size: 16px;
        font-weight: normal;
        color: #f1f7fe;
        margin-bottom: 25px;
        position: absolute;
        right:0;
        top:-40px;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img{
          margin-left: 5px;
        }
      }
      .register_title{
        overflow: hidden;
        margin:0;
      }
      .register_box_title{
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        color: #0e1a35;
        margin:0 0 43px;
        float: left;
      }
      .register-code{
        .el-input{
          float: left;
          width:206px;
          margin-right: 5%;
        }
        .checkCode{
          float: right;
          height:46px;
          line-height: 46px;
          text-align: center;
          cursor: pointer;
          /*padding: 0 5px;*/
          color: #3b77ff;
        }

      }
      .el-button{
        height:46px;
        border-radius: 46px!important;
      }
      .toLogin{
        float: right;
        color: grey!important;
        text-align: center;
        cursor: pointer;
        margin:0;
        height:23px;
        line-height: 23px;
        font-size: 14px;
        background: url("./img/toLogin_icon.png") no-repeat 0 4px;
        -webkit-background-size: 14px;
        background-size: 14px;
        padding-left: 16px;
      }
      .register-code{
        .login_input_code{
          width:206px;
          margin-right: 5%;
          float: left;
        }
        .checkCode{
          /*width: 40%;*/
          float: right;
          height:46px;
          line-height: 46px;
          text-align: center;
          cursor: pointer;
          /*padding: 0 5px;*/
          color: #3b77ff;
        }
      }
    }
  }
}
</style>
