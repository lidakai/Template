<template>
  <div>
    <div class="box">
      <img src="./img/icon.svg" alt="icon" class="center_iMG">
      <p>“当前选项下无任何主播，请重新选择后查看!”</p>
    </div>
  </div>
</template>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .box{
    width: 100%;
    margin: 20px 0;
    background-color: #ffffff;
    min-height: 580px;
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
