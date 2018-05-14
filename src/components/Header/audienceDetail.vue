<template>
  <div class="audience-detail-container clearfix">
    <div class="audience-detail_inner">
      <div class="audience-detail_info clearfix">
        <p class="fl audience-detail_name">
          <span class="audience_name">{{audienceInfo.audienceNickname}}</span>
          <span>{{audienceInfo.platName}}</span>
        </p>
      </div>
      <div v-if="audienceInfo.origin === '1'">
        <p v-if="audienceInfo.audienceStatus !== 2">
          他是主播<i>{{audienceInfo.currentAnchorName}}</i>的<em>{{audience_status}}</em>土豪，
          <em v-if="audienceInfo.audienceStatus === 1"><i>{{audienceInfo.firstDate}}</i>，第一次给主播送礼物。</em>
        </p>

        <p v-if="audienceInfo.audienceStatus !== 2">打赏礼物价值达到<i>{{audienceInfo.priceSum}}</i>元，最壕的时候一次打赏了<i>{{audienceInfo.maxPrice}}</i>元的礼物。</p>

        <p v-if="audienceInfo.audienceStatus !== 2">
          最活跃的时段是每天<i>{{audienceInfo.favouriteHour}}</i>点，最喜欢的直播类型是<i>{{audienceInfo.favouriteCate}}</i>，
          最喜欢的主播是<i>{{audienceInfo.favouriteAnchor}}</i>。
          <em v-if="audienceInfo.audienceStatus === 1">建议主播多多了解新增土豪，把他留在直播间！</em>
        </p>

        <p  v-if="audienceInfo.audienceStatus === 2">
          他是主播<i>{{audienceInfo.currentAnchorName}}</i>的<em>{{audience_status}}</em>土豪，
          最近30天他一次送礼行为都没有，
          <em>不过小助手发现他在其他直播间有送礼行为，多多观察他喜欢的主播类型，让主播多多找原因把观众/土豪拉回直播间吧！</em>
          <em>小助手发现该土豪这期间都没有任何送礼行为，可能很久没有打开直播应用咯，如果主播和他认识，快快去关心一下吧！</em>
        </p>
      </div>

      <div v-if="audienceInfo.origin === '2'">
          <p>他是{{tuhaoType[audienceInfo.tuhaoType]}}，最近30天累计在平台打赏
            <i>{{audienceInfo.priceSum}}</i>元，日均送出<i>{{(audienceInfo.priceSum / 30).toFixed(2)}}</i>元礼物，
            最壕的时候一次打赏了<i>{{audienceInfo.maxPrice}}</i>元的礼物</p>
        <p>
          他最活跃的时段是每天<i>{{audienceInfo.favouriteHour}}</i>点，
          他最喜欢的直播类型是<i>{{audienceInfo.favouriteCate}}</i>，
          他最喜欢的主播是<i>{{audienceInfo.favouriteAnchor}}</i>。
        </p>
      </div>

    </div>
    <!--<p></p>-->
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .audience-detail-container{
    color: #fff;
    width: 100%;
    .audience-detail_inner{
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
      .audience-detail_info{
        width:350px;
        height:90px;
        display: inline-block;
        @include clearfix;
        float: left;
        .audience-detail_avatar{
          width: 80px;
          height:80px;
          border-radius: 50%;
          overflow: hidden;
          border:4px solid #fff;
          outline: none;
          margin-right: 13px;
        }
        .audience-detail_name{
          padding: 12px 0 12px;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          margin:0;
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
          .audience_name{
            font-size: 20px;
            font-weight: bold;
            border:none;
            line-height: 28px;
            padding: 0;
            position: relative;
            top:2px;
          }
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
        white_logo,
        audience_status:'',
        nameType:{
          1:"新增",
          2:"流失",
          3:"回流",
          4:"活跃",
        },
        tuhaoType:{
          1:'顶级土豪',
          2:'超级土豪',
          3:'大土豪',
          4:'小土豪'
        }
      }
    },
    computed: {
      ...mapGetters([
        'audienceInfo'
      ])
    },
    methods: {},
    created() {
        this.audience_status = this.nameType[this.audienceInfo.audienceStatus] || '';
    },
    destroyed() {}
  }

</script>
