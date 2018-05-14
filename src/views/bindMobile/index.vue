<template>
  <div class="login-container" id="bg_canvas_id">
    <div class="login_title">
      <div class="default_inner">
        <h3 class="title">
          <a href="">
            <img class="login-logo" :src="img_logo" alt="">
          </a>
          <!--<span>直播宝</span>-->
          <em>公会版</em>
        </h3>
      </div>
      <!--<p></p>-->
    </div>
    <div class="login_content">
      <el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
        <div class="title-container">
          <h3 class="title"><span>绑定手机号</span></h3>
          <p class="title_tips">未注册手机号将自动为您注册</p>
        </div>
        <el-form-item prop="mobile">
          <el-input name="mobile" type="text" v-model="loginForm.mobile" autoComplete="on" placeholder="手机号" maxLength="11" />
        </el-form-item>

        <el-form-item class="login-password">
          <el-input name="checkCode" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.code" placeholder="验证码" />
        </el-form-item>
        <span @click="get_checkCode" class="checkCode">{{checkCode.checkWord}}</span>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleBind">绑定</el-button>
      </el-form>
    </div>


    <div class="login_footer">
      <p class="default_inner">
        <span>© 2017 Zhibobao All Rights Reserved. 浙ICP备17042647号</span>
        <span>联系方式：
          <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=3394045051&amp;site=qq&amp;menu=yes" class="w-footer_qq">（ 直播宝数据 ）</a>
          <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=41f538fa03c47cb96c1ba75300789e8674983f2ce697cf236633d710db864fee" class="w-footer_qq w-footer_qq_tool">（ 直播宝工具 ）</a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  import { isvalidMobile, isvalidCode } from '@/utils/validate'
  import SocialSign from './socialsignin'
  import img_logo from '@/assets/login/logo_text.png'
  import img_qq from '@/assets/login/qq.png'
  import img_wx from '@/assets/login/wx.png'
  import img_weibo from '@/assets/login/weibo.png'
  import { bindMobile } from '@/api/login'
  import { getCheckCode } from '@/api/user'
  import { getOpenId,getCookie } from '@/utils/auth'
  export default {
    components: { SocialSign },
    name: 'login',
    data() {
      return {
        loginForm: {
          mobile: '',
          code: ''
        },
        checkCode: {
          checkWord: '获取验证码',
          isSending: false
        },
        loading: false,
        showDialog: false,
        img_logo,
      }
    },
    methods: {
      async handleBind(){
        if (isvalidMobile(this.loginForm.mobile) && isvalidCode(this.loginForm.code)) {
          const data = Object.assign({},this.loginForm,{openid:getOpenId()});
          const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.bindMobile(data);
          if(response === false)return;
          this.$store.dispatch('set_token', response.data.data.token);
          this.$store.dispatch('set_userInfo', response.data.data.info);
          if(response.data.data.info.room.anchor_id && response.data.data.info.room.plat){
            this.$router.push({ path: '/' });
          }else{
            this.$router.push({ path: '/default' })
          }
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
    },
    created() {},
    mounted() {
    },
    destroyed() {}
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#fff;
  $light_gray:rgba(0,0,0,0.247);
  /* reset element-ui css */
  .login-container {
    .default_inner{
      width:1200px;
      margin:0 auto;
    }
    .login_title{

      /*background-image: linear-gradient(0deg,*/
      /*#0d1649 0%,*/
      /*#0b3084 100%);*/
      height:66px;
      color: #fff;
      /*padding-left: 10px;*/
      position: absolute;
      width: 100%;
      border-bottom: 2px solid;
      border-image: -webkit-linear-gradient( rgba(61,111,255,1), rgba(0,240,255,0)) 0 0;
      /*border-image: -webkit-linear-gradient(to right, rgba(61,111,255,1) 0%, rgba(0,240,255,0) 100%);*/
      /*border-image: linear-gradient(to right, rgba(61,111,255,1) 0%, rgba(0,240,255,0) 100%);*/
      p{
        margin:15px 0 0;
        height:1px;
        background: linear-gradient(to right, rgba(61,111,255,1) 0%, rgba(0,240,255,0) 100%);
      }
      .title{
        display: flex;
        flex-flow: row nowrap;
        justify-content:flex-start;
        margin:0;
        padding-top: 14px;
        .login-logo{
          display: block;
          width:117px;
          margin-right: 12px;
        }
        span{
          height:44px;
          font-size: 24px;
          font-weight: normal;
          line-height:44px ;
          margin: 0 5px;
        }
        em{
          height:46px;
          font-weight: normal;
          line-height:46px ;
          font-style: normal;
          /*color: #e5e9f1;*/
          font-size: 14px;
          font-stretch: normal;
          color: #ffffff;
        }
      }
    }
    .login_content{
      padding: 95px 0 0;
      background: url('./img/login_bg.png') no-repeat 0 0;
      overflow: hidden;
      .login-form {
        width: 400px;
        height:347px;
        padding: 44px 40px 53px 40px;
        margin: 85px auto 233px;
        background: #fff;
        border-radius: 4px;
        .title-container {
          position: relative;
          margin-bottom: 43px;
          .title {
            font-size: 20px;
            font-weight: normal;
            color: #0e1a35;
            margin: 0;
            text-align: center;
            font-style: normal;
            height:22px;
            line-height: 22px;
            display: inline-block;
          }
          .title_tips{
            height:100%;
            line-height: 22px;
            display: inline-block;
            color:#8492af;
            font-size: 14px;
            margin:0;
          }
          .set-language {
            color: #fff;
            position: absolute;
            top: 5px;
            right: 0px;
          }
        }
        .el-input {
          display: inline-block;
          float: right;
          height:46px;
          border-radius: 25px;
          input {
            background: transparent;
            -webkit-appearance: none;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
              -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
              -webkit-text-fill-color: #000 !important;
            }
          }
        }
        .login-password{
          width:206px;
          float: left;
        }
        .checkCode{
          float: right;
          height: 46px;
          line-height: 46px;
          text-align: center;
          cursor: pointer;
          color: #3b77ff;
        }
        .el-button{
          width: 320px;
          height: 46px;
          background-color: #3b77ff;
          border-radius: 23px;
        }
      }
    }
    .login_footer{
      padding-top: 47px;
      span{
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #8492af;
        /*&:hover{*/
        /*color: #fff;*/
        /*}*/
        a{
          display: inline-block;
          height:16px;
          line-height: 18px;
          font-size: 12px;
          background: url("./img/qq_connect.png") no-repeat 0 0;
          -webkit-background-size: auto 16px;
          background-size: auto 16px;
          padding-left: 18px;
          color: #8492af;
          font-weight: normal;
          font-stretch: normal;

        }
        &:first-child{
          float: left;
        }
        &:last-child{
          float: right;
        }
      }
    }

    /*.el-form-item {*/
      /*border: 1px solid rgba(217, 217, 217, 1);*/
      /*background: rgba(255, 255, 255, 1);*/
      /*border-radius: 5px;*/
      /*color: #454545;*/
    /*}*/
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
