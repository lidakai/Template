<template>
  <el-menu class="navbar" mode="horizontal">
    <!--<div class="left-menu">-->
      <!--&lt;!&ndash;<span>当前直播间：</span>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="avatar-wrapper clearfix" style="width: 300px;">&ndash;&gt;-->
          <!--&lt;!&ndash;<img class="user-avatar" :src="userInfo.room.avatar">&ndash;&gt;-->
          <!--&lt;!&ndash;<p class="up">{{userInfo.room.anchor_nick}}</p>&ndash;&gt;-->
          <!--&lt;!&ndash;<p class="down">{{userInfo.room.plat}}  |  {{userInfo.room.cate}}</p>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->



    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <!--<img :src="userInfo.roleType===3?master:userInfo.roleType===1?manager:broker" alt="">-->
          <img :src="userInfo.roleType===3?master:userInfo.roleType===1?manager:broker" alt="">
          <!--<img src="../img/broker.png" alt="">-->
          <span>{{userInfo.nickname}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { MapPlat } from '@/utils'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import ErrorLog from '@/components/ErrorLog'
import { clearAllCookie } from '@/utils/auth'
import broker from '../img/broker.png'
import manager from '../img/manager.png'
import master from '../img/master.png'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data(){
    return{
      broker,
      manager,
      master
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'errorLogs',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then((response) => {
        location.reload();
        // 为了重新实例化vue-router对象 避免bug
      })
    }
  },
  created() {},
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
.navbar {
  height: 68px;
  line-height: 68px;
  padding: 15px 0;
  border-radius: 0px !important;
  box-shadow: 0px 6px 8px 0px
  rgba(0, 0, 0, 0.04);
  background: #fff;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu{
    float: left;
    height: 100%;
    line-height: 38px;
    margin-left: 36px;
    color: #42444e;
    p{
      font-size: 12px;
      height:18px;
      line-height: 18px;
      margin:0;
    }
    .up{
      font-size: 14px;
    }
    &>span{
      display: inline-block;
      height:100%;
      line-height: 38px;
      float: left;
      color: #43454f;
    }
    .user-avatar {
      float: left;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    .left-menu-item{
      height:50px;
      float: left;
      cursor: pointer;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 38px;
    margin-right: 20px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      height: 100%;
      margin-right: 30px;
      display: inline-block;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        @include clearfix;
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 13px;
          font-size: 12px;
        }
        img{
          position: relative;
          top:6px;
          height:26px;
        }
      }
    }
  }
}
</style>
<style>
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #3083ff;
    background: #fff;
  }
  .el-dropdown-menu{
    border-radius: 3px;
    box-shadow: 0px 6px 8px 0px
    rgba(0, 0, 0, 0.04);
  }
</style>
