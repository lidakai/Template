<template>
  <el-collapse v-model="activeNames" @change="handleChange" class="collapse-list-container">
    <el-collapse-item v-for="item in dataCollapse"  :key="item.dateTime" :name="item.dateTime">
      <template slot="title">
        {{item.dateTime}} <span class="fr collapse-item-title">给<i>{{item.roomCount}}</i>个直播间送出<i>{{item.priceSum}}</i>元的礼物</span>
      </template>
      <gift-collapse-content :ref="item.dateTime" :data-content = 'contentList[item.dateTime]'></gift-collapse-content>
    </el-collapse-item>
  </el-collapse>
</template>

<style>
  .collapse-list-container{
    border:1px solid #ebeef5;
  }
  .collapse-list-container .el-collapse-item__header{
    height:38px;
    line-height:38px;
    background-image: linear-gradient(0deg,
    #f3f6f8 1%,
    #ffffff 100%);
    padding-left: 20px;
    padding-right: 20px;
    font-weight: bold;
  }
  .collapse-list-container .el-collapse-item__arrow{
    height:38px;
    line-height:38px;
  }
  .collapse-list-container .el-collapse-item__content{
    padding: 0 30px 0 20px;
    background-image: linear-gradient(0deg, #ffffff 0%, #f3f6f8 99%);
  }
  .collapse-list-container .el-collapse-item__content div p{
    border-bottom: 1px solid #e2e7ec;
    line-height:36px;
    text-align: center;
    font-weight: bold;
    opacity:0.8;

  }
  .collapse-list-container .el-collapse-item__content div span{
    margin-right: 40px;
  }
  .collapse-list-container .el-collapse-item__content div i{
    margin: 0 5px;
    width:120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-style: normal;
  }
  .collapse-list-container .el-collapse-item__content div p:last-child{
    border:none;
  }
  .collapse-item-title{
    font-size: 12px;
    color: #4b4d56;
    margin-right: 43px;
    font-weight: bold;
  }
  .collapse-item-title i{
    font-style: normal;
    color: #508ef7;
    margin:0 5px;
    font-weight: bold;
  }
  .collapse-list-container .collapse{
    max-height:180px;
    overflow-y: scroll;
  }
</style>
<script>
  import giftCollapseContent from './giftCollapseContent.vue'
  export default {
    components:{
      giftCollapseContent
    },
    props: {
      dataCollapse: {
        type: Array
      }
    },
    data() {
      return {
        activeNames: [],
        contentList:{},
        param:{
          platform:'',
          uid:'',
          dateTime:'',
        }
      }
    },
    created() {

    },
    methods: {
      async handleChange(){
        let key = this.activeNames[this.activeNames.length - 1];
        if(!key || this.contentList[key])return;
        const response = await this.$api_zbb.service.ZhibobaoPersonalAccount.Account.pwLogin();
//        if(response === false)return;
        this.contentList[key] = [
          {
            time:"22:03:09",
            nickname:"小明",
            content:"滚出去"
          },
          {
            time:"22:04:09",
            nickname:"小明",
            content:"滚出去"
          },
          {
            time:"22:05:09",
            nickname:"小明",
            content:"滚出去"
          },
          {
            time:"22:06:09",
            nickname:"小明",
            content:"滚出去"
          }
        ];
        this.$refs[key][0].updateData(this.contentList[key]);
      },
    }
  }
</script>
