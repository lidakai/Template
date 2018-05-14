<template>
  <div class="cate-change-wrapper">
    <el-select v-model="plat_name" placeholder="全部分组" @change="change_plat">
      <el-option v-for="item in platform" :value="item.name" :key="item.name">{{item.name}}</el-option>
    </el-select>
  </div>
</template>

<style>
  .cate-change-wrapper{
    display: inline-block;
    margin-right: 30px;
  }
  .cate-change-wrapper input.el-input__inner{
    width:110px;
    border-color: #3b77ff;
    color: #3b77ff;
    border-radius: 0;
  }
  .cate-change-wrapper .el-input__inner:hover{
    border-color: #3b77ff;
  }
  .cate-change-wrapper .el-select .el-input.is-focus .el-input__inner{
    border-color: #3b77ff;
  }

  .cate-change-wrapper input::-webkit-input-placeholder{
    color: #3b77ff;
  }
  .cate-change-wrapper .el-select+.el-select{
    margin-left: 33px;
  }
  .cate-change-wrapper .el-select .el-input .el-select__caret{
    color: #3b77ff;
  }

</style>
<script>
  import { mapGetters } from 'vuex'
  import { duplicateObj } from '@/utils'
  const vim  = {
    computed: {
      ...mapGetters([
        'platform'
      ]),
    },
    data() {
      return {
        plat_name:''
      }
    },
    methods: {
      change_plat(){
       let platform = this.getIdByName(this.plat_name);
        this.$emit('on-platform-change', { platform: platform});
      },
      getIdByName(name){
        if(name === '')return '';
        let param = '';
        this.platform.forEach(item=>{
          if(item.name === name){
            param = item.platform;
            return false;
          }
        });
        return param;
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        let list = response.data.platInfos;
        let obj = {};
        list.forEach((item,index)=>{
          if(item.name === '全部'){
            obj = {
              val : item,
              index: index
            }
          }
        })
        if(obj.index !== undefined){
          list.splice(0,1,obj.val)
          list.splice(obj.index,1)
        }
        this.$store.dispatch("set_platform",list);
        this.plat_name = this.platform[0].name;
        this.change_plat()
      }
    },
    mounted() {
      if(!this.platform.length){
        this.getData();
      }else {
        this.plat_name = this.platform[0].name;
        this.change_plat()
      }
    },
    destroyed() {

    }
  };
  export default vim


</script>
