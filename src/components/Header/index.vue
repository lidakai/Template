<template>
  <div class="header-container">
    <div class="header-container_inner">
      <h3 class="header-container_title">
        <a href="">
          <img class="header-container_logo" :src="logo_text" alt="">
        </a>
        <!--<span>直播宝</span>-->
        <em>公会版</em>
      </h3>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .header-container{
    height:66px;
    color: #fff;
    position: absolute;
    width: 100%;
    border-bottom: 2px solid;
    border-image: -webkit-linear-gradient( rgba(61,111,255,1), rgba(0,240,255,0)) 0 0;
    .header-container_inner{
      max-width:1200px;
      margin:0 auto;
      .header-container_title{
        display: flex;
        flex-flow: row nowrap;
        justify-content:flex-start;
        margin:0;
        padding-top: 14px;
        .header-container_logo{
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
          }
        }
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import logo_text from '@/assets/login/logo_text.png'
  export default {
    data() {
      return {
        logo_text
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
