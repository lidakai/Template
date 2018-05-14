<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<div class="main-content">
      <div class="up_header">
        <img :src="headerBg" alt="">
        <header-components style="position: relative;z-index: 2"></header-components>
        <audience-detail-component style="position: relative;z-index: 2"></audience-detail-component>
      </div>
      <div class="analysis_tab">
        <p class="analysis_tab_inner">
          <span @click="change_current" :class="pageName ==='active'?'current_tab':''">
            <router-link :to="'/audience/active/'+audienceInfo.platform+'/'+audienceInfo.roomId+'/'+audienceInfo.uid+'/richer/'+audienceInfo.origin"></router-link>土豪活跃
          </span>
          <span @click="change_current" :class="pageName ==='preference' ? 'current_tab':''">
            <router-link :to="'/audience/preference/'+audienceInfo.platform+'/'+audienceInfo.roomId+'/'+audienceInfo.uid+'/richer/'+audienceInfo.origin"></router-link>土豪偏好
          </span>
          <!--<span ref="activeBarrage" @click="change_current" :class="pageName ==='spoor'?'current_tab':''"><router-link :to="'/audience/spoor/'+audienceInfo.type+'/'+audienceInfo.audienceId"></router-link>土豪足迹</span>-->
        </p>
      </div>
			<app-main :data-type="'hostDetail'"></app-main>
		</div>
	</div>
</template>

<script>
import { AppMain } from './components'
import HeaderComponents from '@/components/Header/detail_index.vue'
import audienceDetailComponent from '@/components/Header/audienceDetail.vue'
import { mapGetters } from 'vuex'
import store from '@/store'
import headerBg from './img/header_bg.png'
export default {
  name: 'host_layout',
  components: {
    AppMain,
    HeaderComponents,
    audienceDetailComponent
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'userInfo',
      'audienceInfo'
    ])
  },
  data(){
    return {
      experienceUid:0,
      pageName:'profit',
      headerBg
    }
  },
  created(){
    this.experienceUid = store.getters.experience.uid;
    this.pageName = this.$route.meta.name;
  },
  methods:{
    logout() {
//      clearAllCookie();
      this.$store.dispatch('FedLogOut').then((response) => {
        location.reload();
        // 为了重新实例化vue-router对象 避免bug
      })
    },
    change_current(e){
      let className = e.target.parentNode.className;
      if(className)return;
      let ele = document.getElementsByClassName('current_tab');
      if(ele.length){
        ele[0].setAttribute('class','')
      }
      e.target.parentNode.className = 'current_tab'

    }
  },
  activated(){}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
	.app-wrapper {
	  position: relative;
	  height: 100%;
	  width: 100%;
    background: #f7f9fc;
	}
  .main-content{
    background: #f7f9fc;
  }
  .up_header{
    height:154px;
    position: relative;
    /*background: #307fff;*/
    /*background: url("./img/header_bg.png") no-repeat 0 0;*/
    /*-webkit-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
    img{
      width: 100%;
      height:100%;
      position: absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
    }
    @include clearfix
  }
  .analysis_tab{
    background: #fff;
    margin:0;
    height:38px;
    box-shadow: 0px 6px 8px 0px
    rgba(0, 0, 0, 0.04);
    border-radius: 0px 0px 4px 4px;
    .analysis_tab_inner{
      width: 1200px;
      margin:0 auto;
      span{
        width:100px;
        text-align: center;
        display: inline-block;
        height:100%;
        border-bottom:2px solid transparent;
        line-height: 36px;
        cursor: pointer;
        position: relative;
        a{
          display: block;
          width:100%;
          height:36px;
          position: absolute;
          top:0;
          left:0;
        }
      }
      .current_tab{
        border-color: #508ef7;
        color: #508ef7;
        font-weight:bold;

      }
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
