<template>
  <div class="cate-change-wrapper">
    <el-select v-model="cate_name" placeholder="全部分类" @change="change_cate">
      <el-option v-for="item in category" :value="item.typeName" :key="item.typeId">{{item.typeName}}</el-option>
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
        'category'
      ]),
    },
    data() {
      return {
        cate_name:''
      }
    },
    methods: {
      change_cate(){
        this.$emit('on-category-change', { category:this.getIdByName(this.cate_name) });
      },
      getIdByName(name){
        if(name === '')return '';
        let param = '';
        this.category.forEach(item=>{
          if(item.typeName === name){
            param = item.typeId;
            return false;
          }
        });
        return param;
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
        if(response === false) return;
        let list = response.data.cateInfos;
        this.$store.dispatch("set_category",list);
      }
    },
    created() {
      this.getData();
      /*if(!this.category.length){
        this.getData();
      }*/
    },
    destroyed() {

    }
  };
  export default vim


</script>
