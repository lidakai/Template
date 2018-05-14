<template>
  <div>
    <div class="box">
      <img src="./img/null_icon.png" alt="icon" class="center_iMG">
      <p>功能即将上线，敬请期待！</p>
      <span>推荐直播宝优质认证主播，一键联系轻松高效</span>
    </div>
  </div>
</template>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .box{
    width: 100%;
    min-height: 580px;
    box-sizing: border-box;
    background-color: #ffffff;
    justify-content: flex-start;
    margin-top: 60px;
    display:flex;
    flex-direction: column;
    align-items: center;
  .center_iMG{
    width: 140px;
    height: 140px;
  }
  p{
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #464851;
    margin-top: 30px;
    margin-bottom: 0;
  }
  span{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(70, 72, 81, 0.82);
    margin-top: 25px;
  }
  }
</style>

<script>
  export default {
    props: {
      data:{
        type:String,
        default:'暂无相关数据'
      }
    },
    data(){
      return {

      }
    }
  }
</script>
