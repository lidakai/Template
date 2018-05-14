<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<div class="main-content">
      <div class="up_header">
        <img :src="headerBg" alt="">
        <header-components style="position: relative;z-index: 2"></header-components>
        <host-detail-component style="position: relative;z-index: 2"></host-detail-component>
      </div>
      <div class="analysis_tab">
        <p class="analysis_tab_inner">
          <span @click="change_current" :class="pageName ==='profit'?'current_tab':''">
            <router-link :to="'/analysis/profit/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId"></router-link>收益分析
          </span>
          <span @click="change_current" :class="(pageName ==='activeBarrage'|| pageName ==='activePerson')?'current_tab':''">
            <router-link :to="'/analysis/activeBarrage/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId"></router-link>互动分析
          </span>
          <span ref="activeBarrage" @click="change_current" :class="(pageName !=='profit'&& pageName !=='record'&&pageName !=='activeBarrage'&& pageName!=='activePerson')?'current_tab':''">
            <router-link :to="'/analysis/audience/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId"></router-link>观众分析
          </span>
          <span @click="change_current" :class="pageName ==='record'?'current_tab':''">
            <router-link :to="'/analysis/record/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId"></router-link>直播记录
          </span>
        </p>
      </div>
			<app-main :data-type="'hostDeail'"></app-main>
		</div>
	</div>
</template>

<script>
import { AppMain } from './components'
import HeaderComponents from '@/components/Header/detail_index.vue'
import HostDetailComponent from '@/components/Header/authorDetail.vue'
import { mapGetters } from 'vuex'
import store from '@/store'
import headerBg from './img/header_bg.png'
export default {
  name: 'host_layout',
  components: {
    AppMain,
    HeaderComponents,
    HostDetailComponent
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'userInfo',
      'anchorInfo'
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
      this.$store.dispatch('FedLogOut').then((response) => {
        location.reload();
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
    /*background: #307fff;*/
    /*background: url("./img/header_bg.png") no-repeat 0 0;*/
    /*-webkit-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
    height:154px;
    position: relative;
    @include clearfix;
    img{
      width: 100%;
      height:100%;
      position: absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
    }
  }
  .analysis_tab{
    background: #fff;
    margin:0;
    height:38px;
    box-shadow: 0px 6px 8px 0px
    rgba(0, 0, 0, 0.04);
    border-radius: 0px 0px 4px 4px;
    .analysis_tab_inner{
      width: 1360px;
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
