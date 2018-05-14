<template>
<div class="login-container">
    <Header-components></Header-components>
    <div class="login-content">
      <div class="default_inner">
        <el-row>
      <el-col :xs="8" :sm="8" :lg="8":offset="2" class="slider_card">
        <Carousel-components></Carousel-components>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8" :offset="6">
        <div class="login_box">
          <a class="changeStation" href="http://zhubo.zhibobao.com">
            主播系统
            <img :src="changeStation" alt="">
          </a>
            <p class="login-container_title">
              <span @click="toLogin">密码登录</span>
              <span class="currentPage">验证码登录</span>
            </p>
            <el-form class="login-form" :model="loginForm" ref="loginForm" label-position="left" autoComplete="on">
              <el-form-item prop="mobile">
                <el-input type="text" v-model="loginForm.mobile" autoComplete="on" placeholder="手机号" maxLength="11" />
              </el-form-item>
              <el-form-item class="login-code"  autoComplete="off">
                <span @click="get_checkCode" class="checkCode">{{checkCode.checkWord}}</span>
                <el-input type="text" @keyup.enter.native="" class="login_input_code" v-model="loginForm.code" placeholder="验证码" />
              </el-form-item>
            </el-form>
            <el-button type="primary"  @click.native.prevent="handleLogin" class="loginSecretBtn">登录</el-button>
            <p class="thirdparty">
              <a @click="bindThird('qq')" href="javascript:;"><img :src="img_qq" alt=""></a>
              <a @click="bindThird('wechat')" href="javascript:;"><img :src="img_wx" alt=""></a>
              <a @click="bindThird('weibo')" href="javascript:;"><img :src="img_weibo" alt=""></a>
              <span class="register_tips">没有账号？<i @click="experienceFn" >点击体验</i>或<i @click="toRegister" >立即注册</i></span>
            </p>
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
  import { isvalidMobile,isvalidCode } from '@/utils/validate'
  import { bindThird } from '@/utils'
  import img_qq from '@/assets/login/btn_login_with_qq.png'
  import img_wx from '@/assets/login/btn_login_with_wechat.png'
  import img_weibo from '@/assets/login/btn_login_with_weibo.png'
  import bottom_line from '@/assets/login/bottom_line.png'
  import { getCheckCode } from '@/api/user'
  import HeaderComponents from '@/components/Header/index.vue'
  import FooterComponents from '@/components/Footer/index.vue'
  import CarouselComponents from './components/carousel.vue'
  import changeStation from './img/changeStation.png'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      HeaderComponents,
      FooterComponents,
      CarouselComponents
    },
    computed: {
      ...mapGetters([
        'experience'
      ]),
    },
    name: 'quickLogin',
    data() {
      return {
        loginForm:{
          mobile:'',
          code:''
        },
        checkCode: {
          checkWord: '获取验证码',
          isSending: false
        },
        codeTimer:null,
        loading:true,
        img_qq,
        img_wx,
        img_weibo,
        bottom_line,
        changeStation,
        login: 'quickLogin'
      }
    },
    methods: {
      async handleLogin() {
        if (isvalidMobile(this.loginForm.mobile) && isvalidCode(this.loginForm.code)) {
          const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.login(this.loginForm);
          if(response === false)return;
          this.$store.dispatch('set_token', response.data.data.token);
          this.$store.dispatch('set_userInfo', response.data.data.info);
          this.$router.push({ path: '/' });
        }else{
          this.$message("请输入正确的手机号或验证码")
        }
      },
      async get_checkCode() {
        let temData = {};
        if (!isvalidMobile(this.loginForm.mobile)) {
          this.$message('请输入正确的手机号');
          return;
        }
        temData = { mobile: this.loginForm.mobile };
        if (this.checkCode.isSending) return;
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
        this.$router.push({path:"/login"})
      },
      toRegister(){
        this.$router.push({path:'/register'})
      },
      async experienceFn(){
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.pwLogin({
          mobile:this.experience.mobile,
          code:this.experience.code
        });
        if( response === false )return;
        this.$store.dispatch('set_userInfo', response.data.data.info);
        this.$store.dispatch('set_token', response.data.data.token).then( value =>{
          this.$router.push({ path: '/' });
        });
      },
      bindThird
    },
    created() {
    },
    destroyed() {

    }
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
  .login-container .el-form-item.is-success .el-input__inner{
    border-color: #dcdfe6;
  }
  .login-container .el-form-item .el-input__inner{
    height: 46px !important;
    border-radius: 46px;
    text-indent:15px;
  }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.login-container{
  min-height: 100%;
  background: #f5f5f5;
  .default_inner{
    width:1200px;
    margin:0 auto;
  }
  .login-content {
    padding: 95px 0 0;
    background: url('./img/login_bg.png') no-repeat 0 0;
    .bottom_line{
      display: block;
      width: 100%;
    }
    .login_box{
      width:400px;
      height:430px;
      /*border:1px solid rgba(24, 144, 255, 1);*/
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
      .login-container_title{
        margin:0 0 43px;
        color: #8492af;
        font-size: 20px;
        span{
          cursor: pointer;
          &:first-child{
            margin-right: 43px;
          }
        }
        .currentPage{
          font-weight: normal;
          font-style: normal;
          font-size: 20px;
          color: #0e1a35;
        }
      }
      /*.el-input{*/
        /*!*width:85%;*!*/
        /*float: right;*/
        /*height:46px;*/
        /*border-radius: 25px;*/
      /*}*/
      .loginSecretBtn{
        /*float: right;*/
        width:100%;
        height:46px;
        border-radius: 46px;
        background-color: #3b77ff;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        color: #ffffff;
        margin-bottom: 43px;
      }
      .thirdparty {
        margin:0 -40px;
        padding: 32px 40px;
        height:94px;
        color: rgba(0, 0, 0, 0.6);
        line-height: 30px;
        background: #f7f9fc;

        a{
          float: left;
          width: 30px;
          height:30px;
          margin-right: 10px;
          img{
            width: 100%;
          }
        }
        .register_tips{
          float: right;
          color: #8492af;
          font-size: 14px;
          i{
            cursor: pointer;
            font-style: normal;
            color: #3b77ff;
          }
        }
      }
      .login-code{
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
