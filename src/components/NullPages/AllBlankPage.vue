<template>
  <div>
    <div class="box">
      <img src="./img/icon.svg" alt="icon" class="center_iMG">
      <p>“当前您未添加任何主播，暂无数据，请添加直播后查看！”</p>
      <div class="addUser">
        <el-button type="primary">去添加主播</el-button>
      </div>
    </div>
  </div>
</template>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .box{
    margin: 20px;
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
  .addUser{
    font-size: 14px;
    color: #FFFFFF;
    width: 108px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-image: linear-gradient(-90deg,
    #3c8aff 0%,
    #579cff 100%);
    margin-top: 40px;
  }
  }
</style>
