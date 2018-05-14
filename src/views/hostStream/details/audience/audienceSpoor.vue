<template>
  <div class="spoor-container">
    <el-row>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
          <p class="spoor_title">礼物足迹</p>
          <gift-collapse-component :data-collapse="giftCollapse"></gift-collapse-component>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="column_list">
        <p class="spoor_title">弹幕足迹</p>
        <barrage-collapse-component :data-collapse="barrageCollapse"></barrage-collapse-component>
      </el-col>
    </el-row>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .spoor-container{
    width:1360px;
    margin:0 auto 40px;
    background: #fff;
    .column_list{
      padding: 30px;
      background: #fff;
      .spoor_title{
        font-size: 16px;
        font-weight: bold;
        color: #4b4d56;
        margin:0 0 14px 0;
      }
    }
  }
</style>


<script>
  import barrageCollapseComponent from '../components/barrageCollapse.vue'
  import giftCollapseComponent from '../components/giftCollapse.vue'
  export default {
    components:{
      barrageCollapseComponent,
      giftCollapseComponent
    },
    data() {
      return {
        param:{
          platform:'',
          uid:''
        },
        giftCollapse:[],
        barrageCollapse:[]
      }
    },
    methods: {
      async getData(){
        this.barrageCollapse = [
          {
            dateTime:'2018-04-17',
            roomCount:2,
            barNum:324
          },
          {
            dateTime:'2018-04-18',
            roomCount:2,
            barNum:324
          },
          {
            dateTime:'2018-04-19',
            roomCount:2,
            barNum:324
          },
          {
            dateTime:'2018-04-20',
            roomCount:2,
            barNum:324
          }
        ];
        this.giftCollapse = [
          {
            dateTime:'2018-04-17',
            roomCount:2,
            priceSum:324
          },
          {
            dateTime:'2018-04-18',
            roomCount:2,
            priceSum:324
          },
          {
            dateTime:'2018-04-19',
            roomCount:2,
            priceSum:324
          },
          {
            dateTime:'2018-04-20',
            roomCount:2,
            priceSum:324
          }
        ];
        if(this.giftCollapse.length || this.barrageCollapse.length)return;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getDetailSpoor(this.param);
        if(response === false)return;
        this.giftCollapse = response.data.giftSpoor;
        this.barrageCollapse = response.data.barrageSpoor;
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.uid = this.$route.params.uid;
      this.getData();
    },
    destroyed() {}
  }

</script>
