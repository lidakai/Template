<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
      <navbar></navbar>
      <div class="experience_bar" v-if="userInfo.uid==experienceUid">
        当前为演示账号，点击 <a @click="logout" href="javascript:;">登录</a> 查看你的直播数据
      </div>
			<app-main></app-main>
		</div>
    <kefu-components></kefu-components>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { mapGetters } from 'vuex'
import store from '@/store'
import kefuComponents from '@/components/Kefu'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    kefuComponents
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  data(){
    return {
      experienceUid:0
    }
  },
  created(){
    this.experienceUid = store.getters.experience.uid
  },
  methods:{
    logout() {
      this.$store.dispatch('FedLogOut').then((response) => {
        location.reload();
        // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
    .main-container{
      background: #f7f9fc;
    }
	}
  .experience_bar{
    height:40px;
    background: rgba(16, 142, 233, 1);
    color: #fff;
    line-height: 40px;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    padding-left: 30px;
    a{
      font-weight: 700;
      font-size: 20px;
      /*text-decoration: underline;*/
    }
  }
</style>
