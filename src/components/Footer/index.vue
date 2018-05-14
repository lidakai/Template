<template>
  <div class="footer-container">
      <p class="footer-container_inner">
        <span>© 2017 Zhibobao All Rights Reserved. 浙ICP备17042647号</span>
        <span>联系方式：
          <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=e04a3a2cc642cd9a9217c8b5fc3942916dd33952a4cbaa031bb2ff2d260d5a77" class="w-footer_qq">（ 直播宝数据 ）</a>
          <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=41f538fa03c47cb96c1ba75300789e8674983f2ce697cf236633d710db864fee" class="w-footer_qq w-footer_qq_tool">（ 直播宝工具 ）</a>
        </span>
      </p>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .footer-container{
    padding-top: 47px;
    .footer-container_inner{
      width:1200px;
      margin:0 auto;
      span{
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #8492af;
        a{
          display: inline-block;
          height:16px;
          line-height: 18px;
          font-size: 12px;
          background: url("./img/qq_connect.png") no-repeat 0 0;
          -webkit-background-size: auto 16px;
          background-size: auto 16px;
          padding-left: 18px;
          color: #8492af;
          font-weight: normal;
          font-stretch: normal;
        }
        &:first-child{
          float: left;
        }
        &:last-child{
          float: right;
        }
      }
    }
  }
</style>


<script>
  export default {
    data() {
      return {}
    },
    methods: {},
    created() {},
    destroyed() {}
  }

</script>
