<template>
  <div class="recommend-container">
    <div class="recommend-container_header">
      <h3 class="recommend-container_title" style="float: inherit;display: inline-block">推荐优质主播</h3>
      <p style="display: inline-block">近30天直播数据</p>
    </div>
    <div class="recommend-container_content" style="padding: 0;">
      <Host-card-component></Host-card-component>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .recommend-container{
    .recommend-container_header{
      .recommend-container_title{
        font-size: 26px;
        font-weight: normal;
        line-height: 26px;
        color: #464851;
        margin:0 0 40px;
      }
    }
    .recommend-container_content{
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
      padding: 30px 0;
      background: #fff;
    }
  }
</style>
<script>
  //  import { mapGetters } from 'vuex'
  //  import { MapPlat } from '@/utils'
  //  import { isvalidMobile } from '@/utils/validate'
  import HostCardComponent from './components/hostCard.vue'
  //  import { getCheckCode, checkOldMobile, unbindRoom } from '@/api/user'
  //  import { isExperience } from '@/utils/auth'
  export default {
    components: {
      HostCardComponent
    },
    name: 'guide',
    data() {
      return {
        HighList :[]
      }
    },
    methods: {
      async getDetail(){

      }
    },
    created() {
      this.getDetail()
    },
    destroyed() {

    }
  }

</script>
