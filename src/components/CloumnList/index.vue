<template>
  <div class="cloumnList">
    <ul>
      <li v-for="(item,index) of list" @click="activeList(item,index)" :class="index === indexClass?'active':''">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
  ul{
    width: 100%;
    background-color: #F5F5F5;
    display: flex;
    padding:0;
    margin:0;
    li{
      width: 98px;
      height: 44px;
      background-color: #fbfbfb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #5f6c84;
      border-right:1px solid #f1f1f1;
      cursor: pointer;
    }
    li:last-child{
      border-right: 0;
    }
    .active{
      background-color: #FFFFFF;
      color: #247aff;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'platform'
      ])
    },
    data() {
      return {
        list:[],
        platformId:'',
        indexClass:0
      }
    },
    props: {
      /*list: {
         type: Array
       }*/
    },
    watch:{

    },
    methods: {
      activeList(item,index){
        this.$emit('on-Cloumn-change',item);
        this.indexClass = index
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        let list  = response.data.platInfos;
        let obj ={};
        list.forEach((item,index)=>{
          if(item.name === '全部'){
            obj = {
              index:index,
              item:item
            }
          }
        });
        if(obj.index !== undefined){
          list.splice(obj.index,1); //删除
          list.splice(0,0,obj.item); //添加到第一
        }
        this.list = list;
        this.$store.dispatch("set_platform",list);
        let item = list[0];
        let index = 0;
        this.activeList(item,index)  //默认选中第一个
      }
    },
    created() {
      if(this.platform.length<=0){
        this.getData()
      }else {
        this.list = this.platform;
        this.activeList(this.list[0],0)
      }
    }
  }
</script>
