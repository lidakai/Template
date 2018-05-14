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
  }
</style>

<script>
  export default {
    props: {
      isShow:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {

      }
    }
  }
</script>
