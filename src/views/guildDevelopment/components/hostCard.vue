<template>
  <div class="host-card-list-container clearfix">
    <div v-if="HighList.length>0">
      <template  v-for = "item in HighList">
        <div class="host-card-content" shadow="hover">
          <i class="host-card-content_status" v-if="false">未签约</i>
          <div class="bagImg">
            <div class="banground-i" :style="{backgroundImage:'url('+ item.avatar +')'}"></div>
            <div class="host-card-content_portrait">
              <img  :src="item.avatar" alt="userAvatar" @error="errorFn(item)">  <!--    require('../../../assets/timg.jpg')         -->
            </div>
            <p class="host-card-content_nickname">
              <span >{{item.nickname}} <i class="host-card-content_live_status living" v-if="item.liveStatus">直播中</i></span>
            </p>
            <p class="host-card-content_plat_cate">
              {{item.platName}} {{(item.cateName === ''||item.cateName === undefined)?'':'| '+item.cateName}}
            </p>
          </div>
          <div class="footer-box">
            <p class="host-card-content_feature">
              <!-- 如果只有一个标签的话需要分别给span、div.Label添加一个class = 'center_' 做兼容处理-->
              <span :class="item.characteristicList.length===1?'center_':''">
               <div :class="item.characteristicList.length===1?'center_ Label':'Label'" v-for="value of item.characteristicList">
                  <i>{{value}}</i>
               </div>
        </span>

            </p>
            <p class="host-card-content_result">
              <el-tooltip class="item" effect="light" :disabled="!(filter_(item.price).length>5)" :content="'日均收益：'+ filter_(item.price) +'元'" placement="top">
                <span>日均收益：<i>{{filter_(item.price)}}元</i></span>
              </el-tooltip>
              <el-tooltip class="item" effect="light" :disabled="!(filter_(item.follower).length>5)" :content="'粉丝数量：'+filter_(item.follower)" placement="top">
                <span>粉丝数量：<i>{{filter_(item.follower)}}</i></span>
              </el-tooltip>
              <el-tooltip class="item" effect="light" :disabled="!(filter_(item.timeLong,'time').length>5)" :content="'日均直播：'+filter_(item.timeLong,'time')+'小时'" placement="top">
                <span>日均直播：<i>{{filter_(item.timeLong,'time')}}小时</i></span>
              </el-tooltip>
              <el-tooltip class="item" effect="light" :disabled="!(filter_(item.barNum).length>5)" :content="('日均弹幕：'+ filter_(item.barNum) +'条')" placement="top">
                <span>日均弹幕：<i>{{filter_(item.barNum)}}条</i></span>
              </el-tooltip>
            </p>
            <p class="host-card-content_btn">
              <span><a :href="item.url" target="_blank">查看直播间</a></span>
              <span> <a :href="'#/analysis/profit/perfect/'+item.platform+'/'+item.rid" target="_blank">直播数据</a> </span>
              <span @click="addCollection(item)" :class="item.currentCollectStatus?'Collection':''">{{item.currentCollectStatus?'已收藏':'添加至收藏'}}</span>
            </p>
            <el-button class="host-card-content_connect" @click="contact">联系主播</el-button>
          </div>
        </div>
      </template>
    </div>
    <host-Card-Null-Page  v-else></host-Card-Null-Page>
    <el-dialog
      title="短信编辑"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
      <el-row class="demo-autocomplete">
      <div class="dialog">
              <span>
        小智主播，你好！<br/>
                我是PDD公会的会长，我公会目前招募直播主播，主要在
        <el-col :span="6"   style="display: inline-block;float: none">
          <el-autocomplete
            class="inline-input"
            v-model="form.state1"
            :fetch-suggestions="querySearch1"
            placeholder="请输入平台"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
       直播平台
        <el-col :span="6" style="display: inline-block;float: none">
          <el-autocomplete
            class="inline-input"
            v-model="form.state2"
            :fetch-suggestions="querySearch"
            placeholder="请输入分类"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      分类下直播。我公会的薪资结算方式为
        <el-col :span="6" style="display: inline-block;float: none">
                <template>
                <el-select v-model="form.state3"  placeholder="请选择">
                  <el-option
                    label="对公"
                    value="1">
                  </el-option>
                   <el-option
                     label="对私"
                     value="2">
                  </el-option>
                </el-select>
              </template>
          </el-col>
                ，结算周期为
                <el-col :span="6" style="display: inline-block;float: none">
                <template>
                <el-select v-model="form.state4"  placeholder="请选择">
                  <el-option
                    label="日结"
                    value="1">
                  </el-option>
                   <el-option
                     label="周结"
                     value="2">
                  </el-option>
                  <el-option
                    label="月结"
                    value="3">
                  </el-option>
                </el-select>
              </template>
          </el-col>
          ，播出时长要求
        <el-col :span="6"   style="display: inline-block;float: none">
          <el-input placeholder="请输入时常"></el-input>
        </el-col>
                ，保底
        <el-col :span="6"   style="display: inline-block;float: none">
          <el-input placeholder="请输入薪资"></el-input>
        </el-col>
                ，待遇及福利为
        <el-col :span="6"   style="display: inline-block;float: none">
          <el-input placeholder="请输入福利待遇"></el-input>
        </el-col><br/>
                。诚意邀请您加入我公会！
                <br/>
                详情可联系微信
                 <el-col :span="6"   style="display: inline-block;float: none">
          <el-input placeholder="请输入微信号"></el-input>
        </el-col>
                或手机号
                 <el-col :span="6"   style="display: inline-block;float: none">
          <el-input placeholder="请输入手机号"></el-input>
        </el-col>
</span>
      </div>
      </el-row>
      <p class="Prompt">（按模板填充信息，点击确认系统将发送短信给主播）</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .host-card-list-container .el-table .cell{
    line-height:normal;
  }
  .Collection{
    color: rgb(188, 188, 188);
  }
  a{
    position: relative;
  }
  .clearfix{
    padding: 45px 100px;
  }
  .footer-box{
    padding: 0 10px;
  }
  .host-card-content{
    border: 1px solid #ebeef5;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #303133;
    border-radius: 4px;
    overflow: hidden;
  }
  .bagImg *{
    position: inherit;
    opacity: 1;
  }
  .bagImg{
    width: 100%;
    height: 148px;
    overflow: hidden;
    position: relative;
    .banground-i{
      background-image:url('../../../assets/timg.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-filter: blur(5px); /* Chrome, Opera */
      -moz-filter: blur(5px);
      -ms-filter: blur(5px);
      filter: blur(5px);
      position: absolute;
      width: 100%;
      height: 148px;
      top: 0;
      opacity: 0.8;
    }
    .banground-i:after{
      width: 100%;
      height: 100%;
      content: '';
      position: absolute;
      background-color: black;
      left: 0;
      opacity: 0.2;
    }
  .host-card-content_portrait{
    display: block;
    width: 60px;
    height:60px;
    overflow: hidden;
    border: solid 2px rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    z-index: 999;
    opacity: 1;
    margin: 15px auto;
  img{
    width: 100%;
    height: 100%;
    display: block;
    vertical-align: bottom;
  }
  }
  }
  .Prompt{
    font-size: 14px;
    color: rgba(75, 77, 86, 0.8);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  p{
    display: inline-block;
  }
  .dialog{
    line-height: 50px;
  }
  .host-card-content{
    width: 248px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 40px;
    display: inline-block;
    position: relative;
    .host-card-content_status{
      position: absolute;
      top:10px;
      right:10px;
      font-style: normal;
      width: 48px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      height: 22px;
      background-color: rgba(255, 255, 255, 0.88);
      border-radius: 11px;
      opacity: 0.88;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p{
      margin:0;
      display: block;
    }
    .host-card-content_nickname{
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      margin:10px 0;
      span{
        position: relative;
      }
      i{
        width:40px;
        position: absolute;
        top:3px;
        right: -55px;
        font-style: normal;
        font-size: 12px;
        height:14px;
        line-height: 14px;
        border-radius: 2px;
        color: #fff;
      }
      i:after{
        content: '';
        background-color: #51cbf7;
        width: 8px;
        height: 8px;
        display: inline-block;
        left: -8px;
        top: 3px;
        border-radius: 50%;
        position: absolute;
      }
    }
    .host-card-content_plat_cate{
      text-align: center;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
    }
    .host-card-content_feature{
      margin:10px auto;
      font-size: 14px;
      display: flex;
      flex-flow: nowrap row;
      align-items: center;
      justify-content: center;
       min-height:62px;
      span{
        display: block;
        width: 100%;
        height: 100%;
        .Label{
          display: inline-block;
          width: 50%;
          float: left;
        }
        .center_{
          float: inherit;
        }
      }
  span.center_{
    text-align: center;
  }
      .host-card-content_feature_title{
        width: 130px;
        display: flex;
        align-items:center;
      }
      i{
        display: inline-block;
        font-style: normal;
        font-size: 12px;
        color: rgba(255, 134, 88, 0.9);
        background-color: rgba(255, 158, 121, 0.1);
        border-radius: 12px;
        padding: 5px 15px;
        margin-bottom: 8px;
      }
    }
    .host-card-content_result{
      font-size: 12px;
      margin:10px 0;
      i{
        font-style: normal;
      }
      span{
        display: inline-block;
        width:48%;
        margin-bottom: 10px;
        color: rgba(75, 77, 86, 0.7);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .host-card-content_btn{
      display: flex;
      justify-content: center;
      color: #3b77ff;
      font-size: 12px;
      span{
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
        &+span{
          border-left: 1px solid #277dff;
        }
      }
    }
    .host-card-content_connect{
      display: block;
      margin:10px auto;
      border-radius: 20px;
      background-color: #579cff;
      box-shadow: 0px 1px 5px #579cff;
      font-size: 14px;
      color: #FFFFFF;
      border:none;
    }
  }
</style>

<script type="es6">
  import { mapGetters } from 'vuex'
  import hostCardNullPage from '@/components/NullPages/hostCardNullPage.vue'
  export default {
    components: {
      hostCardNullPage
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'platform',
        'category'
      ])
    },
    props: {
     /* HighList_: {
        type: Array
      }*/
    },
    data() {
      return {
        cateData: [],
        dialogVisible:false,
        restaurants: [],
        HighList:[], //优质主播
        form: {},
        msg:'暂无优质主播'
      }
    },
    watch:{

    },
     created() {
       if(!this.platform.length||!this.category.length){
         this.getData();
       }else{
         this.restaurants = this.platform;
         this.cateData = this.category;
       }
       this.init()
     },
    methods: {
      characteristic(item){
        /**
         *
         *   ①吸金能力强：日均收益在所推荐的20个主播中排前5
             ②播出稳定：日均直播时长>4小时
             ③多家公会关注：有公会账号将该主播添加至收藏
             ④粉丝量可观：粉丝数量>5000
             ⑤成长空间大：该主播同时在潜力新主播板块
             ⑥观众互动热烈：日均弹幕条数>1000
         *
         * */

        /**
         *
         *    topFive = 13; // 前五 0 1, 根据综合评分得来  吸金能力强
         *    allCollectStatus = 10; // 全公会收藏状态 0 1   多家公会关注
         *    potentialStatus = 11; // 潜在状态 0 1   成长空间大
         *
         * **/
        let array = [];

        if(item.topFive){
          //吸金能力是否强
         array.push('吸金能力强')
        }
        if((item.timeLong/60)>4){
          // 播出稳定
          array.push('播出稳定')
        }
        if(item.allCollectStatus){
          //全公会收藏状态
          array.push('多家公会关注')
        }
        if(item.follower>5000){
          //全公会收藏状态
          array.push('粉丝量可观')
        } if(item.potentialStatus){
          //全公会收藏状态
          array.push('成长空间大')
        }if(item.barNum>1000){
          //全公会收藏状态
          array.push('观众互动热烈')
        }

        if(array.length>4){
          array = array.splice(0,4)
        }
        return array
      },
      filter_(num,time){
        let msg = '',timeLong;
        if(typeof num !== 'number'){
          num = Number(num)
        }
        timeLong = time === 'time'?60*60:10000
        let numWan =0;
        if(time !== 'time'){
          numWan = (num/timeLong).toFixed(1);
          if(numWan>=100) {
            msg = parseInt(numWan) + '万';
          } else if(numWan>1){
            msg = numWan + '万';
          } else {
            msg = num;
          }
        }else {
          numWan = (num/timeLong).toFixed(1);
          msg = numWan;
        }
        return msg
      },
      async addCollection(item){
        if(this.isExperience())return;
        if(item.currentCollectStatus){
          let data = {
            platform : item.platform,
            rid : item.rid
          };
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.cancelCollect(data);
          if(response === false) return;
        }else {
          let data = {
            platform :item.platform,
            rid:item.rid
          };
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.addCollect(data);
          if(response === false) return;
        }
        let obj={
          message: '',
          showClose: true
        };
        if(item.currentCollectStatus){
          //当前是收藏中
          obj.message = '主播已经被移除“我的收藏”分组';
        }else {
          //当前是未收藏
          obj.message = '主播已经进入“我的收藏”分组，可进入分组查看';
          obj.type= 'success'
        }
        item.currentCollectStatus = !item.currentCollectStatus;
        //添加收藏
        this.$message(
          obj
        );
      },
      errorFn(item){
        //img error 默认图片，包括头像和背景模糊图
        item.avatar = require('../../../assets/userIcon.png')
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        this.restaurants = this.platform;

        const response_ = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
        if(response_ === false) return;
        this.cateData = this.category;
      },
      async init(){
/*        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getHigh();
        if(response === false)return;
        let data  = response.data.anchorInfos || [];
        data.forEach((v,k)=>{
          v.characteristicList = this.characteristic(v)
        })
        this.HighList = data;*/
      },
      contact(){
        this.$message('功能暂未开放！');
        return false //联系主播后端还未做，暂时屏蔽相关功能！
        this.dialogVisible = true
      },
      handleClose(){
        this.dialogVisible = false
      },
      handleSelect(item) {
        console.log(item);
      },
      querySearch1(queryString, cb) {
        let restaurants = JSON.parse(JSON.stringify(this.restaurants))
        restaurants.forEach((v,k)=>{
          v['value'] = v.name
        })
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearch(queryString, cb) {
        let cateData = JSON.parse(JSON.stringify(this.cateData))
        cateData.forEach((v,k)=>{
          v['value'] = v.typeName
        })
        var results = queryString ? cateData.filter(this.createFilter(queryString)) : cateData;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }}
    }
  }
</script>
