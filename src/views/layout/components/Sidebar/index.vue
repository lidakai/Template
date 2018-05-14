<template>
  <scroll-bar>
    <h3 class="title">
      <a href="">
        <img class="login-logo" :src="img_logo" alt="">
      </a>
      <span>直播宝</span>
      <em>公会版</em>
    </h3>
    <el-menu mode="vertical" :default-active="$route.path" :default-openeds="opens" text-color="#76767e" active-text-color="#3083ff">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import img_logo from '@/assets/login/logo.png'
export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data(){
    return{
      img_logo,
      opens:['guildManagement','guildDevelopment','richer','hostStream','analysis']

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title{
    display: flex;
    flex-flow: row nowrap;
    justify-content:flex-start;
    color: #fff;
    padding-left: 25px;
    margin:24px 0;
    a{
      width:auto!important;
      cursor: default;
    }
    img{
      width:30px;
      height:32px
    }
    span{
      height:32px;
      font-size: 18px;
      font-weight: normal;
      line-height:32px ;
      margin: 0 5px;
      color: #7991b8;
    }
    em{
      font-size: 12px;
      height:32px;
      font-weight: normal;
      line-height:38px ;
      font-style: normal;
      color: #37619d;
    }
  }

</style>

<style>
  #app .nest-menu .el-submenu > .el-submenu__title,
  #app .el-submenu .el-menu-item{
    background: transparent!important;
  }
  #app .nest-menu .el-submenu > .el-submenu__title:hover, #app .el-submenu .el-menu-item:hover{
    background: #ecf5ff!important;
  }
</style>
