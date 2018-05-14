<template>
  <div class="audience-container">
    <div class="audience_menu">
      <span><router-link :to="'/analysis/audience/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">土豪分析</router-link></span>
      <span><router-link :to="'/analysis/figure/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">观众画像</router-link></span>
      <span><router-link :to="'/analysis/subsistence/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏留存</router-link></span>
      <span class="audience_current_tab"><router-link :to="'/analysis/rank/'+anchorInfo.origin+'/'+anchorInfo.platform+'/'+anchorInfo.roomId">打赏榜单</router-link></span>
    </div>
    <el-row>
      <el-col :xs="8" :sm="8" :lg="8" class="rank_list">
          <p>昨日榜单</p>
          <rank-components :rank-list="rankData.yesterday"></rank-components>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8" class="rank_list">
        <p>近7天榜单</p>
        <rank-components :rank-list="rankData.week"></rank-components>
      </el-col>

      <el-col :xs="8" :sm="8" :lg="8" class="rank_list">
        <p>近30天榜单</p>
        <rank-components :rank-list="rankData.month"></rank-components>
      </el-col>
    </el-row>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .audience-container{
    width:1360px;
    margin:0 auto;
    .audience_menu{
      height:38px;
      span{
        width:100px;
        text-align: center;
        display: inline-block;
        height:100%;
        border-bottom:2px solid transparent;
        line-height: 36px;
        cursor: pointer;
        background: #fff;
        box-shadow: 0px 6px 8px 0px
        rgba(0, 0, 0, 0.04);
        border-radius: 4px 4px 0px 0px;
        opacity: 0.6;
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
      .audience_current_tab{
        opacity: 1;
        color: #508ef7;
        font-weight: bold;
      }
    }
    .el-row{
      background: #fff;
      .rank_list{
        padding: 0 60px 0 25px;
        &>p{
          margin: 28px 0 25px;
          font-weight: bold;
        }
      }
      .rank_list+.rank_list{
        border-left: 1px solid #f3f6f8;
      }
    }

  }
</style>


<script>
  import { mapGetters } from 'vuex'
  import rankComponents from '../components/rank.vue'
  export default {
    components:{
      rankComponents
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    data() {
      return {
        rankData:{
          yesterday:[],
          week:[],
          month:[]
        },
        param:{
          platform:"",
          roomId:""
        }
      }
    },
    methods: {
      async getRankData(type){
          //  获取仨榜单数据
        if(this.rankData[type].length)return;
        let dayType = type ==='yesterday'? 1 :
                       type === 'week' ? 7 :30;
        const data =Object.assign({},this.param,{dayType:dayType});
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getRank(data);
        if(response === false)return;
        response.data.rankList = response.data.rankList ? response.data.rankList : [];
        this.rankData[type] = response.data.rankList.reverse();
      }
    },
    created() {
      this.param.platform = Number(this.$route.params.platform);
      this.param.roomId = this.$route.params.roomId;
      this.getRankData('yesterday');
      this.getRankData('week');
      this.getRankData('month');
    },
    destroyed() {}
  }

</script>
