<template>
  <div class="header-container">
    <div class="header-container_inner">
      <h3 class="header-container_title">
        <a href="">
          <img class="header-container_logo" :src="white_logo" alt="">
        </a>
        <span>直播宝</span>
        <!--<em>个人版</em>-->
        <svg-icon icon-class="guide_logo"></svg-icon>
      </h3>
      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item">
          <div class="avatar-wrapper">
            <span>{{userInfo.nickname}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/"><el-dropdown-item>首页</el-dropdown-item></router-link>
            <el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--<p></p>-->
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .header-container{
    height:36px;
    color: #fff;
    width: 100%;
    /*background: rgba(0,0,0,0.1);*/
    .header-container_inner{
      width:1360px;
      margin:0 auto;
      .header-container_title{
        margin:0;
        padding-top: 5px;
        position: relative;
        float: left;
        width:500px;
        .header-container_logo{
          float: left;
          height:26px;
        }
        span{
          height:26px;
          font-size: 14px;
          font-weight: normal;
          line-height:26px ;
          margin: 0 5px;
          color: #fff;
          float: left;
        }
        em{
          height:26px;
          font-weight: normal;
          line-height:30px ;
          font-style: normal;
          font-size: 12px;
          font-stretch: normal;
          color: #ffffff;
          opacity:0.4;
          -webkit-transform: scale(0.7);
          -moz-transform: scale(0.7);
          -ms-transform: scale(0.7);
          -o-transform: scale(0.7);
          transform: scale(0.7);
          float: left;
        }
        .svg-icon{
          margin-top: 6px;
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
          color: #fff;
          .avatar-wrapper {
            cursor: pointer;
            position: relative;
            @include clearfix;
            .el-icon-caret-bottom {
              position: absolute;
              right: -20px;
              top: 13px;
              font-size: 12px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import white_logo from '@/assets/login/logo_white.png'
  export default {
    data() {
      return {
        white_logo
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch('FedLogOut').then((response) => {
          location.reload();
          // 为了重新实例化vue-router对象 避免bug
        })
      }
    },
    created() {},
    destroyed() {}
  }

</script>
