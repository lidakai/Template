<template>
<div class="personal-center">
    <div class="personal-center_header">
        <h3 class="personal-center_title">个人中心</h3>
    </div>
    <div class="personal-center_content">
      <div class="personal-center_userInfo">
        <h4 class="personal-center_platform_title">账号信息</h4>
        <p class="personal-center_userInfo_name">
          <em class="fl">账号名称：</em>
          <span>{{userInfo.nickname}}</span><span class="userInfo_name_editor" @click="showConfirmBox('editorName')">编辑</span>
        </p>
        <p class="personal-center_userInfo_name">
          <em class="fl">账号权限：</em>
          <span>{{userInfo.roleType === 1 ? '管理员':userInfo.roleType === 2 ?'经纪人':'会长'}}</span>
        </p>
        <p class="personal-center_userInfo_name">
          <em class="fl">所在公会：</em>
          <span>{{guildInfo.unionName}}</span>
          <i v-if="userInfo.roleType===3" @click="showConfirmBox('checkMaster')">解散</i>
          <i v-else @click="showConfirmBox('quit')">退出</i>

        </p>
      </div>
      <div class="personal-center_identity">
        <h4 class="personal-center_identity_title">账号安全</h4>
        <div class="personal-center_identity_info">
          <p><em>绑定手机号：</em>{{userInfo.bind.mobile.openid}} <span class="modify_mobile" @click="showConfirmBox('changeMobile')">更换手机号</span></p>
          <p v-if="userInfo.bind.mobile.pw"><em>密码设置：</em>  ********* <span class="modify_mobile" @click="showConfirmBox('modifyPassword')">修改</span></p>
          <p v-else="userInfo.bind.mobile.pw"><em>密码设置：</em>暂无密码，请点击设置 <span class="modify_mobile" @click="showConfirmBox('set_password')">设置</span></p>
          <p class="third_identity">
            <em>第三方账号：</em>
            <!--qq绑定-->
            <span v-if="userInfo.bind.qq.bind" >
              <img :src="img_qq" alt="">
              <a href="javascript:;" class="third_identity_name">{{userInfo.bind.qq.nickName}}</a>
              <a href="javascript:;" @click="showConfirmBox('qq')">解绑</a>
            </span>
            <span v-else>
              <img :src="img_qq_disabled" alt="">
              <a href="javascript:;" @click="bindThird('qq',userInfo.uid)">点击绑定</a>
            </span>
            <!--微信绑定-->
            <span v-if="userInfo.bind.wechat.bind">
              <img :src="img_wx" alt="">
              <a href="javascript:;" class="third_identity_name">{{userInfo.bind.wechat.nickName}}</a>
              <a href="javascript:;" @click="showConfirmBox('wechat')">解绑</a>
            </span>
            <span v-else>
              <img :src="img_wx_disabled" alt="">
              <a href="javascript:;"  @click="bindThird('wechat',userInfo.uid)">点击绑定</a>
            </span>
            <!--微博绑定-->
            <span v-if="userInfo.bind.weibo.bind">
              <img :src="img_weibo" alt="">
              <a class="third_identity_name" href="javascript:;">{{userInfo.bind.weibo.nickName}}</a>
              <a href="javascript:;" @click="showConfirmBox('weibo',)">解绑</a>
            </span>
            <span v-else>
              <img :src="img_weibo_disabled" alt="">
              <a href="javascript:;" @click="bindThird('weibo',userInfo.uid)">点击绑定</a>
            </span>
          </p>
        </div>
      </div>
    </div>

  <!--第三方绑定成功-->
  <el-dialog title="" :visible.sync="dialogThirdTips" class="dialogBindThird">
    <img :src="img_success" alt="">
    <span>解绑成功</span>
  </el-dialog>

  <input-component :dialog-input="dialogInput" @on-input-status-change="inputStatusChange"></input-component>
  <confirm-component @on-dialog-status="QuickConfirm" :dialog-confirm ='confirmData'></confirm-component>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { bindThird } from '@/utils'
  import img_qq from '@/assets/login/btn_login_with_qq.png'
  import img_wx from '@/assets/login/btn_login_with_wechat.png'
  import img_weibo from '@/assets/login/btn_login_with_weibo.png'
  import img_qq_disabled from '@/assets/login/qq_disabled.png'
  import img_wx_disabled from '@/assets/login/wx_disabled.png'
  import img_weibo_disabled from '@/assets/login/weibo_disabled.png'
  import img_success from '@/assets/success.png'
  import inputComponent from './components/input.vue'
  import confirmComponent from '@/components/Dialog/confirm.vue'
  export default {
    components: {
      inputComponent,
      confirmComponent
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'guildInfo'
      ])
    },
    name: 'personal_center',
    data() {
      return {
        dialogInput:{
          isVisible:false,
          title:'修改个人信息',
          label:'昵称',
          labelWidth:'60px',
          placeholder:'请输入昵称'
        },
        confirmData:{},
        img_qq,
        img_wx,
        img_weibo,
        img_qq_disabled,
        img_wx_disabled,
        img_weibo_disabled,
        img_success,
        dialogThirdTips:false
      }
    },
    methods: {
      showConfirmBox(str){
        if(this.isExperience())return;
        switch (str) {
          case 'qq':
            this.confirmData = {
              isVisible:true,
              title:'解除绑定',
              description:'确定要解除与QQ帐号的绑定吗？',
              type:'qq'
            };
            break;
          case 'wechat':
            this.confirmData = {
              isVisible:true,
              title:'解除绑定',
              description:'确定要解除与微信帐号的绑定吗？',
              type:'wechat'
            };
            break;
          case 'weibo':
            this.confirmData = {
              isVisible:true,
              title:'解除绑定',
              description:'确定要解除与微博帐号的绑定吗？',
              type:'weibo'
            };
            break;
          case 'dissolve':
            this.confirmData = {
              isVisible:true,
              title:'解散公会',
              description:'确定解散当前的公会吗？解散后不可恢复',
              type:'dissolve'
            };
            break;
          case 'quit':
            this.confirmData = {
              isVisible:true,
              title:'退出公会',
              description:'确定退出当前的公会吗？退出后不可恢复',
              type:'quit'
            };
            break;
          case 'set_password':
            this.dialogInput = {
              isVisible:true,
              title:'设置密码',
              label:'密码：',
              labelWidth:'100px',
              placeholder:'',
              className:'modifyPassword',
              input:'',
              type:5,//
            }
            break;
          case 'modifyPassword':
            this.dialogInput = {
              isVisible:true,
              title:'修改密码',
              label:'新密码：',
              labelWidth:'100px',
              placeholder:'',
              className:'modifyPassword',
              input:'',
              type:5,//
            };
            break;
          case 'editorName':
            this.dialogInput = {
              isVisible:true,
              title:'修改个人信息',
              label:'昵称',
              labelWidth:'60px',
              placeholder:'请输入昵称',
              input:this.userInfo.nickname,
              type:1,//
            };
            break;
          case 'changeMobile':
            this.dialogInput = {
              isVisible:true,
              title:'修改手机号',
              label:'修改前需要先验证您的身份，请输入您的手机，然后点击“下一步”以接收你的验证码。',
              labelWidth:'',
              placeholder:'请输入手机号',
              input:"",
              className:'changeMobile',
              type:2,//验证手机号
            }
            break;
          case 'checkMaster':
            this.dialogInput = {
              isVisible:true,
              title:'解散公会前需要先验证您的身份',
//              label:'新密码：',
              labelWidth:'100px',
              placeholder:'',
              className:'checkMaster',
              input:'',
              type:6,//解散公会前的身份验证
            };
            break;
          default:
            break;
        }
      },
      async QuickConfirm(type){
        let msg = '';
          if(type === 'dissolve'){
            const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.dissolve();
            if(response === false) return ;
            msg = '公会解散成功！'
          }else if( type === 'quit' ){
            const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.quit();
            if(response === false) return ;
            msg = '退出公会成功！'
          }else if( type === 'qq' || type === 'wechat' || type === 'weibo' ){
            const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.unBindThirdPart({plat:type});
            if(response === false) return ;
            this.dialogThirdTips = true;
            this.userInfo.bind[type].bind = false;
          }
          if(msg != ''){
            this.$message({
              message: msg,
              type: 'success'
            });
            setTimeout(function () {
              location.reload();     //目的：给用户时间看到上面的短提示。
            },1000)
          }
      },
      async getData(){
        if( this.guildInfo.unionPlat.length )return;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.getDetail();
        if(response === false) return;
        this.$store.dispatch('set_guildInfo',response.data.unionInfo);
      },
      inputStatusChange(){
        this.showConfirmBox('dissolve')
      },
      bindThird
    },
    created() {
      this.getData();
      if( this.$route.query.errorCode ){
        this.$message.error(this.$route.query.errorCode)
      }
    },
    destroyed() {

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.personal-center{
  background: #fff;
  padding: 45px 35px 60px;
  .personal-center_header{
    .personal-center_title{
      font-size: 26px;
      font-weight: normal;
      line-height: 26px;
      color: #464851;
      margin:0 0 40px;
    }
  }
  .personal-center_content{
    padding: 50px 40px 78px;
    background: #fff;
    .personal-center_userInfo{
      position: relative;
      overflow: hidden;
      margin-bottom: 68px;
      .personal-center_userInfo_avatar{
        float: left;
        width: 105px;
        height:105px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        img{
          width: 100%;
          height:100%;
        }
      }
      .personal-center_userInfo_name{
        font-size: 16px;
        margin:20px 0 40px;
        height:20px;
        line-height: 20px;
        color: #000;
        em{
          width: 80px;
          height: 18px;
          font-size: 16px;
          font-weight: normal;
          line-height: 18px;
          color: #76767e;
          font-style: normal;
          text-align: right;
        }
        span{
          float: left;
          margin-right: 5px;
        }
        img{
          float: left;
        }
        i{
          font-style:normal;
          color: #3b77ff;
          cursor: pointer;
        }
        .userInfo_name_editor{
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 18px;
          color: #3b77ff;
          margin-left: 20px;
          padding-left: 20px;
          background: url('./img/editor_icon.png') no-repeat 0 3px;
          -webkit-background-size: 15px;
          background-size: 15px;
          cursor: pointer;
        }
      }
      .personal-center_userInfo_adress{
        font-size: 18px;
        color: rgba(153, 153, 153, 0.8);
        margin:0;
        em{
          width: 80px;
          height: 18px;
          font-size: 16px;
          font-weight: normal;
          line-height: 18px;
          color: #76767e;
          font-style: normal;
          text-align: right;
        }
      }
    }
    .personal-center_platform_title{
      /*border-bottom: 1px solid #ccc;*/
      /*padding-bottom: 5px;*/
      height:18px;
      font-size: 16px;
      font-weight: normal;
      line-height: 18px;
      color: #4b4d56;
      margin:0;
      width:70px;
      display: inline-block;
    }
    .personal-center_platform_info{
      margin-top: 17px;
      height:48px;
      margin-bottom: 48px;
      &>span{
        height:48px;
        line-height: 48px;
        color: #76767e;
      }
      p{
        display: inline-block;
        margin:0;
        height:100%;
        i{
          /*display: block;*/
          font-style: normal;
          color: #3b77ff;
          margin-left: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        .platform_info_color{
          font-size: 16px;
          font-weight: normal;
          line-height: 48px;
          color: #42444e;
        }
        img{
          float: left;
          width: 48px;
          height:48px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 10px;
          background: #000;
        }
      }
      .personal-center_platform_right{
        margin-left: 200px;
      }
      .platform_info_download{
        color: #3b77ff;
        text-decoration: underline;
      }
    }
    .personal-center_identity_title{
      height:18px;
      font-size: 16px;
      font-weight: normal;
      line-height: 18px;
      color: #4b4d56;
      margin:0;
      width:70px;
      display: inline-block;
    }
    .personal-center_identity_info{
      &>p{
        margin-top: 40px;
        color: #42444e;
        em{
          width: 100px;
          height: 18px;
          font-size: 16px;
          font-weight: normal;
          line-height: 18px;
          color: #76767e;
          font-style: normal;
          float: left;
          text-align: right;
        }

      }
      .modify_mobile{
        color: #3b77ff;
        cursor: pointer;
        margin-left: 15px;
      }
      .third_identity{
        height:26px;
        line-height: 26px;
        em{
          margin-top: 4px;
        }
        span{
          float: left;
          height:100%;
          margin-right: 43px;
          img{
            float: left;
            width:26px;
            height:26px;
            margin-right: 12px;
          }
          a{
            float: left;
            line-height: 26px;
            font-style: normal;
            cursor: pointer;
            font-size: 16px;
            font-weight: normal;
            color: #3b77ff;
          }
          .third_identity_name{
            text-decoration: none;
            cursor: auto;
          }
        }

      }

    }
  }
  .user_avatar{
    width: 105px;
    height:105px;
    line-height: 105px;
    overflow: hidden;
    border-radius: 50%;
    margin:0 auto 30px;
    position: relative;
    img{
      width: 100%;
      height:100%;
    }
    span{
      width: 100%;
      height:100%;
      position: absolute;
      top:0;
      left:0;
      background: rgba(0,0,0,0.4);
      color: #000;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
<style>
  .dialogBindThird .el-dialog{
    margin-top: 30vh!important;
    width: 300px;
    height:240px;
  }
  .dialogBindThird .el-dialog__body{
    height:240px;
    display: flex;
    flex-flow: nowrap row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
  }
  .dialogBindThird .el-dialog__body img{
      width: 41px;
      height:45px;
    margin-right: 5px;
  }
  .dialogBindThird .el-dialog__header{
    /*display: none;*/
    padding: 0;
  }
</style>
