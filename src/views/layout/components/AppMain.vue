<template>
  <section class="app-main" :class="dataType?'hostDeatil':''">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>
<style>
  .app-main{
    padding: 20px 36px 50px;
    position: relative;
  }
  .hostDeatil{
    padding: 8px 0 0;
    overflow: hidden;
  }
</style>
<script>
export default {
  name: 'AppMain',
  props:{
    dataType:{
      type:String,
      default:''
    }
  },
  created(){

  }
}
</script>
