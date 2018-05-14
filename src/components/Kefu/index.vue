<template>
  <!--<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=e04a3a2cc642cd9a9217c8b5fc3942916dd33952a4cbaa031bb2ff2d260d5a77" class="w-widget_connect">-->
  <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=3cdd9068e5c227ff0a1d7dd7bd60615c18a65faace795bbd5f92fedd91dcf6b3" class="w-widget_connect">
    <img src="./kefu.png" alt="">
    <span>联系客服</span>
  </a>
</template>

<script>
export default {
  name: 'kefu',
  data() {
    return {}
  },
  mounted() {
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {

  }
}
</script>
<style>
  .w-widget_connect{
    position: fixed;
    bottom:160px;
    right:50px;
    z-index: 9999;
    width:86px;
    height:86px;
    background: url("./shadow_bg.png") no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
    line-height: 86px;
    text-align: center;
    overflow: hidden;
    border-radius: 100px;
  }
  .w-widget_connect span{
    display: none;
    font-size: 13px;
    color: #4189fa;
    font-weight: bold;
  }
  .w-widget_connect:hover img{
    display: none;
  }
  .w-widget_connect:hover span{
    display: block;
  }

</style>
