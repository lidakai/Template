<template>
  <div class="host-detail-container clearfix">
    <div class="host-detail_inner">
      <div class="host-detail_info clearfix">
        <a :href="anchorInfo.url" target="_blank"><img class="host-detail_avatar fl" :src="anchorInfo.avatar" alt=""></a>
        <p class="fl host-detail_name"><a :href="anchorInfo.url" target="_blank">{{anchorInfo.nickname}}</a></p>
        <p class="fl">
          <span>{{anchorInfo.platName}}</span>
          <span>{{anchorInfo.cateName}}</span>
        </p>
      </div>
      <p>最近30天，共直播<i>{{anchorInfo.nowThirty.days}}</i>天，
        <!--<em v-if="anchorInfo.origin === 'detail'">有效直播<i>{{anchorInfo.nowThirty.effectiveDays}}</i>天，</em>-->
        日均直播时长<i>{{Number(anchorInfo.nowThirty.timeLong  / 3600).toFixed(2)}}</i>小时。</p>
      <p>
        共获得收益<i>{{anchorInfo.nowThirty.price.toFixed(2)}}</i>元，
        日均<i>{{(anchorInfo.nowThirty.price / 30).toFixed(2)}}</i>元，
        相比上一个30天 <em v-if="anchorInfo.compare > 0">上升<i>{{Number(anchorInfo.percent).toFixed(2)}}%</i></em>
        <em v-if="anchorInfo.compare < 0">下降<i>{{Number(anchorInfo.percent).toFixed(2)}}%</i></em>
        <em v-if="anchorInfo.compare === 0">保持持平</em>
        <!--<em  v-if="anchorInfo.origin === 'detail'">，排在全公会主播第<i>{{anchorInfo.nowThirty.rank}}</i>名</em>-->
        。
      </p>
      <p>
        日均<i>{{anchorInfo.nowThirty.online}}</i>人来到他的直播间，<i>{{anchorInfo.nowThirty.barPeoNum}}</i>人发弹幕、<i>{{anchorInfo.nowThirty.rewardPerson}}</i>人打赏，
        <i>{{anchorInfo.nowThirty.addFollower}}</i>人新增订阅。
      </p>
    </div>
    <!--<p></p>-->
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .host-detail-container{
    color: #fff;
    width: 100%;
    /*background: url("./img/header_bg.png") no-repeat 0 0;*/
    /*-webkit-background-size: 100% 100%;*/
    /*background-size: 100% 100%;*/
    .host-detail_inner{
      width:1360px;
      margin:0 auto;
      padding:20px 0;
      p{
        margin:0 0 12px 0;
        font-size: 14px;
        line-height: 18px;
        color: rgba(255,255,255,0.8);
        i{
          font-style: normal;
          font-weight: bold;
          color: #fff;
          font-size:18px;
          margin:0 5px;
          vertical-align: -8%;
        }
        em{
          font-style: normal;
        }
      }
      .host-detail_info{
        width:420px;
        display: inline-block;
        @include clearfix;
        float: left;
        .host-detail_avatar{
          width: 80px;
          height:80px;
          border-radius: 50%;
          overflow: hidden;
          border:4px solid #fff;
          outline: none;
          margin-right: 13px;
        }
        .host-detail_name{
          width:300px;
          padding: 12px 0 12px;
          height: 44px;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          margin:0;

        }
        span{
          display: inline-block;
          /*height:22px;*/
          padding: 4px 10px;
          border-radius: 2px;
          border: solid 1px #ffffff;
          font-size: 14px;
          font-weight: normal;
          color: #fff;
          margin-right: 5px;
        }
      }



    }
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  import white_logo from '@/assets/login/logo_white.png'
  export default {
    data() {
      return {
        white_logo
      }
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    methods: {},
    created() {},
    destroyed() {}
  }

</script>
