<template>
  <div class="carousel-container">
    <el-carousel indicator-position="none" arrow="never" height="460px" :initial-index="0" :interval="3000" :key="Math.random()">
      <el-carousel-item v-for="item in carousel" :key="item.index">
        <img :src="item.img" alt="">
        <h3 class="carousel_title">{{item.title}}</h3>
        <p class="carousel_description">{{item.description}}</p>
      </el-carousel-item>
    </el-carousel>
    <el-button type="primary" @click="experienceFn" class="experience" >体验演示版</el-button>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .slider_card{
    .carousel_title{
      position: absolute;
      top:388px;
      left:140px;
      height: 30px;
      font-size: 30px;
      line-height: 30px;
      color: #ffffff;
      margin:0;
      font-weight: lighter;
    }
    .carousel_description{
      height: 18px;
      font-size: 16px;
      line-height: 18px;
      color: rgba(255,255,255,0.4);
      margin:0;
      text-align: center;
    }
    .experience{
      display: block;
      margin:30px auto 0;
      width: 182px;
      height: 46px;
      background: none;
      border-radius: 23px;
      border: solid 1px #dfe5ed;
    }
  }
</style>


<script>
  import first_img from '@/assets/login/first_img.png'
  import second_img from '@/assets/login/second_img.png'
  import third_img from '@/assets/login/third_img.png'
  import { mapGetters } from 'vuex'
  export default {
    name: 'carousel',
    props:{},
    computed: {
      ...mapGetters([
        'experience'
      ]),
    },
    data() {
      return {
        carousel:[
          {
            img:first_img,
            title:"主播挖掘",
            description:'全网主播智能筛选 优质主播一键联系'
          },
          {
            img:second_img,
            title:"土豪雷达",
            description:'深入分析土豪偏好 追踪直播间土豪足迹\n'
          },
          {
            img:third_img,
            title:"便捷管理",
            description:'支持分组分类管理 轻松掌握主播动向'
          }
        ]
      }
    },
    methods: {
      async experienceFn(){
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.pwLogin({
          mobile:this.experience.mobile,
          code:this.experience.code
        });
        if( response === false )return;
        this.$store.dispatch('set_userInfo', response.data.data.info);
        this.$store.dispatch('set_token', response.data.data.token).then( value =>{
          this.$router.push({ path: '/' });
        });
      }
    },
    created() {},
    destroyed() {}
  }

</script>
