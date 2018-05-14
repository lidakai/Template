<template>
  <div>
    <div class="box">
      <img src="./img/icon.svg" alt="icon" class="center_iMG">
      <p>“{{data}}”</p>
    </div>
  </div>
</template>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    margin: 50px 0;
    background-color: #ffffff;
    justify-content: center;
    display:flex;
    flex-direction: column;
    align-items: center;
  .center_iMG{
    width: 140px;
    height: 140px;
    margin-bottom: 30px;
  }
  p{
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #464851;
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
