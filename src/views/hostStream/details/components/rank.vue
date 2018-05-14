<template>
  <ul class="rank-list-container">
      <li class="rank-list_item"  v-for="(item,index) in rankList" :class="index<3?'top_three':''">
        <i class="fl">{{item.top}}</i>
        <span class="rank-list_item_name fl">{{(item.nickname === ''||item.nickname === undefined)?'未获取昵称':item.nickname}}</span>
        <img class="fl" v-if="item.richerType === 1" :src="level_1" alt="">
        <img class="fl" v-if="item.richerType === 2" :src="level_2" alt="">
        <img class="fl" v-if="item.richerType === 3" :src="level_3" alt="">
        <img class="fl" v-if="item.richerType === 4" :src="level_4" alt="">
        <em class="fr">元</em>
        <span class="fr">{{item.price}}</span>
      </li>
  </ul>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .rank-list-container{
    padding:0;
    .rank-list_item{
      list-style: none;
      height:42px;

      @include clearfix;
      i{
        width:24px;
        height:24px;
        text-align: center;
        line-height:24px;
        font-size: 14px;
        color: #4b4d56;
        font-style: normal;
      }
      .rank-list_item_name{
        font-size: 16px;
        min-height: 24px;
        line-height: 24px;
        font-weight: normal;
        color: #4b4d56;
        margin:0 10px;
      }
      span.fr{
        font-size: 16px;
        font-weight: normal;
        color: #508ef7;
      }
      em.fr{
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        color: #508ef7;
        position: relative;
        top:3px;
        margin-left: 3px;
      }
    }
    .top_three{
      i{
        background: #508ef7;
        opacity:0.8;
        border-radius: 50%;
        overflow: hidden;
        outline: none;
        color: #fff;
      }
    }
  }

</style>
<script>
  import level_1 from '../img/level_1.png'
  import level_2 from '../img/level_2.png'
  import level_3 from '../img/level_3.png'
  import level_4 from '../img/level_4.png'

  export default {
    props: {
      rankList: {
        type: Array,
        default:[]
      }
    },
    data() {
      return {
        level_1,
        level_2,
        level_3,
        level_4
      }
    },
    created() {},
    methods: {}
  }
</script>
