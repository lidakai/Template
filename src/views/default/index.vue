<template>
<div
  v-loading="loading"
  element-loading-text="正在绑定中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)"
  class="default-container">
    <div class="default_title">
      <div class="default_inner">
        <h3 class="title">
          <a href="">
            <img class="login-logo" :src="img_logo" alt="">
          </a>
          <span>直播宝</span>
          <em>公会版</em>
        </h3>
        <p class="userInfo_right">
          <!--<img :src="userInfo.portrait" alt="">-->
          <span class="user_name">{{userInfo.nickname}}</span>
          <span @click="toLogin">注销</span>
        </p>
      </div>

    </div>
    <div class="default-content">
        <div class="default_inner">
        <p class="default-description">欢迎使用直播宝数据助手，在开始之前，需要您先绑定您的直播间</p>
          <p class="step_box">
            <img :src="current_step" alt="">
          </p>

        <div class="default-step_1 default-step" v-if="show_step_1">
          <el-form>
            <el-form-item label="选择平台：" :label-width="dialogRoom.RoomLabelWidth">
              <ul class="plat_group" @click="selectPlat">
                <li data-plat="douyu" class="current">斗鱼</li>
                <li data-plat="huya">虎牙</li>
                <li data-plat="quanmin">全民</li>
                <li data-plat="panda">熊猫</li>
                <li data-plat="zhanqi">战旗</li>
                <li data-plat="longzhu">龙珠</li>
                <li data-plat="chushou">触手</li>
                <a :href="platformUrl" class="toPlat" target="_blank">前往平台</a>
              </ul>
            </el-form-item>
            <el-form-item prop="mobile" label="输入URL：" :label-width="dialogRoom.RoomLabelWidth" class="mobile_input">
              <el-input name="mobile" auto-complete="off" placeholder="请输入你的直播间URL"   v-model="dialogRoom.url"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="URL示例：" :label-width="dialogRoom.RoomLabelWidth">
              <img :src="current_example.first" alt="" style="max-height: 390px">
            </el-form-item>
          </el-form>
          <el-button type="primary" @click.native.prevent="next(1)">下一步</el-button>
        </div>

        <div class="default-step_2 default-step" v-if="show_step_2">
          <p class="default-step_2_tips">请将以下验证码填入您直播间的直播公告中</p>
          <p>验证码：<span class="default-step_code">{{randomNumber}}</span> <el-button class="copy" type="primary" @click.native.prevent="copy">点击复制</el-button></p>
          <p>直播公告请点击下列链接：<a :href="platformUrl" target="_blank">{{platformUrl}}</a> 复制验证码去粘贴 登录您的直播账号，进入 <a href="javascript:;" style="cursor: default">个人中心-直播设置</a>中进行黏贴</p>
          <img :src="current_example.second" alt="" style="max-height: 355px">
          <span class="prev-btn" @click="prev">上一步</span><el-button type="primary" @click.native.prevent="next(2)">下一步</el-button>
        </div>
          <p class="step1_tips" v-if="!show_step_3">由于部分平台系统维护导致无法认证直播间，人工处理请联系直播宝数据助手客服 <span>QQ：3394045051</span></p>
        <div class="default-step_3 default-step" v-if="show_step_3">
          <img :src="success" alt="">
          <p>当前已经完成认证绑定步骤！快去看看你的直播数据吧 ~</p>
          <el-button type="primary" @click.native.prevent="toIndex">{{second}}秒后自动跳转数据首页</el-button>
        </div>
      </div>
    </div>

</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isvalidUrl } from '@/utils/validate'
  import { bindRoom } from '@/api/login'
  import { ShowPlatUrl, MatchPlatUrl, MapPlat } from '@/utils'
  import img_logo from '@/assets/login/logo_white.png'
  import url_example from '@/assets/url_example.png'
  import copy_example from '@/assets/copy_example.png'

  import douyu_example from '@/assets/plat/douyu_example.png'
  import douyu_second_example from '@/assets/plat/douyu_second_example.png'
  import huya_example from '@/assets/plat/huya_example.png'
  import huya_second_example from '@/assets/plat/huya_second_example.png'
  import chushou_example from '@/assets/plat/chushou_example.png'
  import chushou_second_example from '@/assets/plat/chushou_second_example.png'
  import quanmin_example from '@/assets/plat/quanmin_example.png'
  import quanmin_second_example from '@/assets/plat/quanmin_second_example.png'
  import zhanqi_example from '@/assets/plat/zhanqi_example.png'
  import zhanqi_second_example from '@/assets/plat/zhanqi_second_example.png'
  import panda_example from '@/assets/plat/panda_example.png'
  import panda_second_example from '@/assets/plat/panda_second_example.png'
  import longzhu_example from '@/assets/plat/longzhu_example.png'
  import longzhu_second_example from '@/assets/plat/longzhu_second_example.png'
//  import longzhu_second_example from '@/assets/plat/longzhu_second_example.png'
  import success from '@/assets/plat/success.png'

  import step1 from '@/assets/plat/step1.png'
  import step2 from '@/assets/plat/step2.png'
  import step3 from '@/assets/plat/step3.png'

//  import { getToken, setToken, removeToken } from '@/utils/auth'
  export default {
    components: {
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    name: 'data_direction',
    data() {
      return {
        dialogRoom:{
          dialogRoomVisible:true,
          RoomLabelWidth:'92px',
          current_plat:'douyu',
          url:''
        },
        loading:false,
        current_active:0,
        img_logo,
        url_example,
        copy_example,
        success,
        show_step_1:true,
        show_step_2:false,
        show_step_3:false,
        platformUrl:'',
        randomNumber:0,
        current_example:{},
        current_step:step1,
        second:5,
        plat_img_example:{
          douyu:{
            first:douyu_example,
            second:douyu_second_example
          },
          huya:{
            first:huya_example,
            second:huya_second_example
          },
          chushou:{
            first:chushou_example,
            second:chushou_second_example
          },
          quanmin:{
            first:quanmin_example,
            second:quanmin_second_example
          },
          zhanqi:{
            first:zhanqi_example,
            second:zhanqi_second_example
          },
          panda:{
            first:panda_example,
            second:panda_second_example
          },
          longzhu:{
            first:longzhu_example,
            second:longzhu_second_example
          },
        }
      }
    },
    methods: {
      selectPlat(e){
        if(e.target.nodeName!=='LI')return;
        let current = document.querySelectorAll('.current');
        if(current.length){
          document.querySelectorAll('.current')[0].removeAttribute('class')
        }
        e.target.setAttribute('class','current');
        this.dialogRoom.current_plat = e.target.getAttribute('data-plat');
        this.current_example = this.plat_img_example[e.target.getAttribute('data-plat')];
        this.platformUrl = ShowPlatUrl(this.dialogRoom.current_plat)
      },
      async next(num){
        if( num === 1 ){
          let url = this.dialogRoom.url.replace(/\s/g,'');
          if(!this.dialogRoom.current_plat){
            this.$message.error('请选择平台');
          }else if(!isvalidUrl(url)){
            this.$message.error('请输入合法的直播间地址');
          }else if(!MatchPlatUrl(url,this.dialogRoom.current_plat)){
            this.$message.error('您输入的直播间地址不属于'+MapPlat(this.dialogRoom.current_plat));
          }else {
            this.show_step_1 = false;
            this.show_step_2 = true;
            this.current_step = step2;
          }
        }else{
//          this.loading = true;
//          const data = {code:this.randomNumber,url:this.dialogRoom.url,plat:this.dialogRoom.current_plat};
//          this.$store.dispatch('BindRoom', data).then((response) => {
//            this.loading = false;
//            if(response.data.code==0){
//              this.show_step_2 = false;
//              this.show_step_3 = true;
//              this.current_step = step3;
//              this.backIndex();
//            }else{
//              this.$message(response.data.message)
//            }
//          }).catch(() => {
//            this.loading = false
//          })
          this.loading = true;
          const data = {code:this.randomNumber,url:this.dialogRoom.url,plat:this.dialogRoom.current_plat};
          const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.bindRoom(data);
          if( response === false ){
            this.loading = false;
            return false;
          }
          this.$store.dispatch('set_room', response.data);
          this.show_step_2 = false;
          this.show_step_3 = true;
          this.current_step = step3;
          this.backIndex();
          this.loading = false;
        }
      },
      copy(){
        // 创建元素用于复制
        let aux = document.createElement("input");
        // 获取复制内容
        let content = this.randomNumber;
        // 设置元素内容
        aux.setAttribute("value", content);
        // 将元素插入页面进行调用
        document.body.appendChild(aux);
        // 复制内容
        aux.select();
        // 将内容复制到剪贴板
        document.execCommand("copy");
        // 删除创建元素
        document.body.removeChild(aux);

        this.$message("复制成功")
      },
      backIndex(){
        this.codeTimer = setInterval(()=>{
          this.second--;
          if(this.second <=0){
            clearInterval(this.codeTimer);
            this.$router.push({ path: '/' });
          }
        },1000)
      },
      toIndex(){
        this.$router.push({ path: '/' });
      },
      toLogin(){
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      },
      prev(){
        this.show_step_1 = true;
        this.show_step_2 = false;
        this.current_step = 1;
        this.dialogRoom.url = ''
      }
    },
    created() {
      this.randomNumber = (Math.random()*1000000).toFixed();

      this.current_example = this.plat_img_example['douyu'];

      this.platformUrl = ShowPlatUrl(this.dialogRoom.current_plat)
    },
    destroyed() {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.default-container{
  min-height: 100%;
  /*background: #f5f5f5;*/
  background-image: linear-gradient(
      #fafafa,
      #fafafa),
  linear-gradient(
      #f7f9fc,
      #f7f9fc);
  background-blend-mode: normal,normal;
  .default_inner{
    width:1200px;
    margin:0 auto;
  }
  .default_title{
    /*background: rgba(32, 33, 45, 1);*/
    background-image: linear-gradient(90deg,
      #0d1649 0%,
      #0b3084 100%);
    height:90px;
    color: #fff;
    padding-left: 10px;
    .default_inner{
      display: flex;
      flex-flow: row nowrap;
      justify-content:space-between;
    }
    .title{
      display: flex;
      flex-flow: row nowrap;
      justify-content:flex-start;
      margin:0;
      padding-top: 23px;
      .login-logo{
        display: block;
        width:40px;
        margin-right: 14px;
        /*height:44px;*/
      }
      span{
        height:44px;
        font-size: 24px;
        font-weight: normal;
        line-height:44px ;
        margin: 0 5px;
      }
      em{
        font-size: 12px;
        height:44px;
        font-weight: normal;
        line-height:44px ;
        font-style: normal;
        color: #e5e9f1;
      }
    }
    .userInfo_right{
      display: flex;
      flex-flow: row nowrap;
      justify-content:flex-start;
      img{
        width:44px;
        height:44px;
        box-sizing: border-box;
        border:1px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
      }
      span{
        height:44px;
        line-height: 44px;
        position: relative;
        cursor: pointer;
      }
      .user_name{
        padding-right: 10px;
        cursor: default;
        &::after{
          content: '';
          width: 1px ;
          height:22px;
          position: absolute;
          right:5px;
          top:11px;
          background: #fff;
        }
      }

    }
  }
  .default-content{
    padding: 20px 0;
    .default-description{
      color: #7890c6;;
    }
    .step_box{
      width:947px;
      height:71px;
      margin:0 auto;
      img{
        width:100%;
        height:100%;
      }
    }
    .default-step{
      background: #FFF;
      margin: 20px 0;
      /*border-radius: 10px;*/
      padding: 30px 50px;
      box-shadow: 0px 4px 8px 0px
      rgba(0, 0, 0, 0.06);
      .el-input{
        width:600px
      }
      .el-button{
        width: 380px;
        height: 52px;
        background-color: #3b77ff;
        border-radius: 26px;
        margin:0 auto;
        display: block;
      }
    }
    .default-step_2{
      position: relative;
      .default-step_2_tips{
        color: #8492af;
      }
      .prev-btn{
        position: absolute;
        bottom:47px;
        left:50px;
        padding-left: 20px;
        background: url('./img/toLogin_icon.png') no-repeat 0 0;
        -webkit-background-size: auto 16px;
        background-size: auto 16px;
        color: #76767e;
        cursor: pointer;
      }
      .copy{
        width: 144px;
        height: 35px;
        background-color: #3b77ff;
        border-radius:4px;
        display: inline-block;
        margin-left: 10px;
      }
      img{
        display: block;
        margin-bottom: 30px;
      }
      p{
        color: #8492af;
        margin-bottom: 20px;
        &:nth-of-type(1){
          margin-top: 0;
        }
        &:nth-of-type(3){
          margin-bottom: 20px;
        }
        .default-step_code{
          color: #0e1a35;
        }
        a{
          color: #3b77ff;
        }
      }
    }
    .default-step_3{
      color: #169BD5;
      text-align: center;
      height:600px;
      padding: 0;
      overflow: hidden;
      img{
        width: 104px;
        height:104px;
        display: block;
        margin:118px auto 50px;
      }
      h4{
        font-size: 32px;
      }
      p{
        font-size: 20px;
      }
      .el-button{
        /*width: 255px;*/
        margin:200px auto 0;
        display: block;
      }

    }
  }

}
</style>
<style>
  .dialogRoom .el-dialog__body {
    padding: 20px 30px 0;
  }
  .el-dialog__header{
    text-align: center;
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  .el-dialog__title{
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgb(24, 144, 255);
    line-height: 22px;
  }
  .el-icon-close{
    display: none;
  }
  .plat_group{
    margin:0;
    height:30px;
    padding: 0;
  }
  .plat_group li{
    display: inline-block;
    list-style: none;
    width: 82px;
    height:30px;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    border-radius: 2px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    color: #0e1a35;

  }
  .plat_group .toPlat{
    font-size: 16px;
    color: #3b77ff;
  }

  .plat_group li.current{
    background-color: #3b77ff;
    border-radius: 4px;
    color: #fff;
  }
  .el-form-item{
    margin-bottom: 40px;
  }
  .el-form-item__label{
    width: 100%;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    color: #8492af;
    height: 30px;
    line-height: 30px!important;
    font-weight: normal;
    font-stretch: normal;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-button{
    width: 160px;
    height:32px;
    line-height: 0;
  }

  .step1_tips{
    height: 22px;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    color: #7890c6;
    /*padding-bottom: 20px;*/
    margin-bottom: 0;
  }
  .step1_tips span{
    color: #3b77ff;
  }

  .el-steps--simple{
    border-radius: 100px;
    background: #fff;
  }
  .el-icon-loading::before{
    display: block;
    -webkit-transform: scale(5);
    -moz-transform: scale(5);
    -ms-transform: scale(5);
    -o-transform: scale(5);
    transform: scale(5);
  }
  .el-loading-spinner .el-loading-text{
    font-size: 20px;
    margin-top: 30px;
  }
</style>

