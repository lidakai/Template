<template>
<div class="guideInfo-container">
    <div class="guideInfo-container_header">
        <h3 class="guideInfo-container_title">公会入驻</h3>
    </div>
    <div class="guideInfo-container_content" v-if="haveRegister==0">
      <el-form ref="guildInfo" :model="guildInfo" label-width="110px" label-position="left">
        <el-form-item label="公会名称：">
          <el-input v-model="guildInfo.unionName" placeholder="请填写您的公会名称或公司名称"></el-input>
        </el-form-item>
        <el-form-item label="直播平台：">
          <el-checkbox-group v-model="guildInfo.unionPlat">
            <el-checkbox :label="item.name" :name="item.name" v-for="item in platform" :key="item.name"></el-checkbox>
            <i>支持多选</i>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="主要类型：">
          <el-checkbox-group v-model="guildInfo.unionCate">
            <el-checkbox :label="item.typeName" :name="item.typeName"  v-for="item in category" :key="item.typeId"></el-checkbox>
            <i>支持多选</i>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="公会LOGO：" class="guild_logo">
          <img v-if="guildInfo.unionLogoUrl" width="200" :src="guildInfo.unionLogoUrl" alt="" class="fl">
          <span v-else class="fl">暂无图片</span>
          <i @click="imageCropperShow=true">上传</i>
          <em class="upload_tips">提示：建议上传大小200*200像素，最大2M仅支持格式：png、jpg、jpeg格式</em>
        </el-form-item>
        <el-form-item label="公会介绍：">
          <el-input type="textarea" placeholder="请填写公会介绍，有利于主播选择签约您的公会" v-model="guildInfo.unionIntroduction"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" class="guide_connect">
          <el-input placeholder="请填写联系方式，以便主播能够联系公会" v-model="guildInfo.contactOpenid" class="input-with-select">
            <el-select v-model="guildInfo.contactType" slot="prepend" placeholder="请选择" @change="guildInfoSelect">
              <el-option label="QQ" :value="1"></el-option>
              <el-option label="微信" :value="2"></el-option>
              <el-option label="手机号" :value="0"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button :loading="loading" type="primary" round class="guideInfo-container_register" @click="registerGuild" v-if="!userInfo.unionId">申请入驻</el-button>
      <el-button :loading="loading" type="primary" round class="guideInfo-container_register" @click="registerGuild" v-else>提交修改</el-button>
      <!--<p class="guideInfo-container_tips">提示：1.直播宝数据助手会在1-2个工作日内审核您的公会申请   2.请确保您的公会资质完善，利于审核通过</p>-->
    </div>
    <div class="guideInfo-container_content" v-else>
      <el-form label-width="110px" label-position="left">
        <el-form-item label="公会名称：">
          <span class="guideInfo-container_name guideInfo-container_span">{{guildInfo.unionName}}</span>
        </el-form-item>
        <el-form-item label="直播平台：">
          <span class="guideInfo-container_plat guideInfo-container_plat_cate" v-for="item in guildInfo.unionPlat">{{item}}</span>
        </el-form-item>
        <el-form-item label="主要类型：">
          <span class="guideInfo-container_cate guideInfo-container_plat_cate" v-for="item in guildInfo.unionCate">{{item}}</span>
        </el-form-item>
        <el-form-item label="公会LOGO：" class="guild_logo">
          <img width="200" :src="guildInfo.unionLogoUrl" alt="" class="fl">
        </el-form-item>
        <el-form-item label="公会介绍：">
          <span class="guideInfo-container_introduce guideInfo-container_span">{{guildInfo.unionIntroduction}}</span>
        </el-form-item>
        <el-form-item label="联系方式：" class="guide_connect">
          <span class="guideInfo-container_connect guideInfo-container_span">{{guildInfo.contactOpenid}}</span>
        </el-form-item>
      </el-form>
      <el-button disabled type="primary" round class="guideInfo-container_register" v-if="haveRegister==1 && userInfo.roleType === 3">审核中</el-button>
      <el-button :loading="loading" type="primary" round class="guideInfo-container_register" @click="editorGuild" v-if="haveRegister==2 && userInfo.roleType === 3">编辑公会信息</el-button>
      <!--<p class="guideInfo-container_tips">提示：1.直播宝数据助手会在1-2个工作日内审核您的公会申请   2.请确保您的公会资质完善，利于审核通过</p>-->
    </div>


  <image-cropper @on-image-upload="modifyLogoSuccess" :width="300" :height="300" url="https://httpbin.org/post" v-show="imageCropperShow" @close="imageCropperShow=false"></image-cropper>
</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .guideInfo-container{
    box-shadow: 0px 6px 8px 0px
    rgba(0, 0, 0, 0.04);
    .guideInfo-container_header{
      .guideInfo-container_title{
        font-size: 26px;
        font-weight: normal;
        line-height: 26px;
        color: #464851;
        margin:0 0 40px;
      }
    }
    .guideInfo-container_content{
      padding: 30px 50px;
      background: #fff;
      .guild_logo{
        img{
          width:70px;
          height:70px;
          border-radius: 2px;
        }
        span{
          width: 70px;
          height: 70px;
          border-radius: 2px;
          font-size: 24px;
          text-align: center;
          background: #efefef;
          color: #409EFF;
        }
        em{
          display: block;
          width: 280px;
          height: 36px;
          font-size: 14px;
          font-weight: normal;
          line-height: 18px;
          color: #3b77ff;
          margin-left: 90px;
          opacity: 0.6;
          font-style: normal;
        }
        i{
          width: 60px;
          height: 24px;
          background-color: #3b77ff;
          border-radius: 4px;
          font-size: 16px;
          line-height: 24px;
          color: #ffffff;
          font-style: normal;
          text-align: center;
          display: block;
          margin-left: 90px;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
      .guide_connect{
        .el-input__inner{
          width:100px;
        }
      }
      .guideInfo-container_register{
        width: 380px;
        height: 48px;
        background-color: #3b77ff;
        border-radius: 24px;
        display: block;
        margin:44px auto 20px;
      }
      .guideInfo-container_tips{
        margin:0;
        font-size: 14px;
        line-height: 18px;
        color: #3b77ff;
        text-align: center;
        opacity:0.6
      }
      .guideInfo-container_span{
        font-size: 16px;
        color: #282a32;
      }
      .guideInfo-container_plat_cate{
        float: left;
        padding: 0 8px;
        height:24px;
        border-radius: 2px;
        border: solid 1px #3b77ff;
        text-align: center;
        line-height:24px;
        margin-top: 6px;
        font-size: 16px;
        color: #00afff;
        margin-right: 25px;
      }
    }
  }
</style>
<style>

  .guideInfo-container label.el-form-item__label{
    font-size: 16px;
    font-weight: normal;
    color: #76767e;
  }
  .guideInfo-container .el-form-item{
    max-width: 1200px;
  }
  .guideInfo-container .el-checkbox__label{
    font-size: 16px;
    color: #282a32;
  }
  .guideInfo-container .el-checkbox-group i{
    display: inline-block;
    width:70px;
    font-size: 16px;
    font-style: normal;
    color: #3b77ff;
  }
  .guideInfo-container_content .el-input__inner{
    width:360px;
  }
  .guideInfo-container_content .el-textarea__inner{
    width:360px;
    height:100px;
  }
  .guideInfo-container_content .guide_connect .el-select .el-input__inner{
    width: 100px;
  }
  .guideInfo-container_content .guide_connect .el-input-group__prepend{
    background: transparent;
  }
  .guideInfo-container_content .el-checkbox{
    margin-left: 0;
    margin-right: 30px;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
//  import { MapPlat } from '@/utils'
//  import { isvalidMobile } from '@/utils/validate'
  import ImageCropper from '@/components/ImageCropper'
//  import { getCheckCode, checkOldMobile, unbindRoom } from '@/api/user'
//  import { isExperience } from '@/utils/auth'
  export default {
    components: {
      ImageCropper
    },
    computed: {
      ...mapGetters([
        'type_select',
        'userInfo',
        'platform',
        'category',
        'guildInfo'
      ])
    },
    name: 'guide',
    data() {
      return {
        loading:false,
        haveRegister:0,
        imageCropperShow:false
      }
    },
    methods: {
      guildInfoSelect(value){

      },
      async registerGuild(){
        //  注册公会
        if( !this.guildInfo.unionName ){
          this.$message("请输入公会名称");
          return;
        }

        if( !this.guildInfo.unionPlat.length ){
          this.$message("请选择公会所在平台");
          return;
        }

        if( !this.guildInfo.unionCate.length ){
          this.$message("请选择公会主播开播类型");
          return;
        }

        if( !this.guildInfo.unionLogoUrl ){
          this.$message("请上传公会LOGO");
          return;
        }

        if( !this.guildInfo.unionIntroduction ){
          this.$message("请输入公会简介");
          return;
        }

        if( !this.guildInfo.contactOpenid ){
          this.$message("请输入公会联系方式");
          return;
        }

        let cateId = [];
        this.category.forEach(item=>{
          if( this.guildInfo.unionCate.includes(item.typeName) ){
            cateId.push(item.typeId)
          }
        });

        let platform = [];
        this.platform.forEach(item=>{
          if( this.guildInfo.unionPlat.includes(item.name) ){
            platform.push(Number(item.platform))
          }
        });
        const data = Object.assign({},this.guildInfo);
        data.unionCate = cateId;
        data.unionPlat = platform;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.alter({unionInfo:data});
        if(response === false) return ;
        if( !this.userInfo.unionId ){
          this.$message({
            type:'success',
            message:"注册成功"
          });
        }else{
          this.$message({
            type:'success',
            message:"修改成功"
          });
        }

        this.haveRegister = 2;
      },
      editorGuild(){
        //  编辑公会信息
        if(this.isExperience())return;
        this.haveRegister = 0;
        if(!this.platform.length && !this.haveRegister){
          this.getPlatform();
        }

        if(!this.category.length && !this.haveRegister){
          this.getCategory();
        }
      },
      close(){
        this.imageCropperShow =false;
      },
      modifyLogoSuccess(value){
          this.guildInfo.unionLogoUrl = value;
          this.imageCropperShow =false;
      },
      async getData(){
        if(!this.haveRegister || this.guildInfo.unionPlat.length )return;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.getDetail();
        if(response === false) return;
        this.$store.dispatch('set_guildInfo',response.data.unionInfo);
      },
      async getPlatform(){
        if(this.platform.length || this.haveRegister)return;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        this.$store.dispatch("set_platform",response.data.platInfos);
      },
      async getCategory(){
        if(this.category.length || this.haveRegister)return;
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
        if(response === false) return;
        this.$store.dispatch("set_category",response.data.cateInfos)
      }
    },
    created() {
      if( !this.userInfo.unionId ){
        this.haveRegister = 0;
      }else{
        this.haveRegister = 2;
      }
      this.getData();
      this.getPlatform();
      this.getCategory();
    },
    destroyed() {

    }
  }

</script>
