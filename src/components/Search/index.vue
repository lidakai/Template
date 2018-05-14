<template>
  <div class="search-wrapper">
    <el-select
      v-model="searchValue"
      filterable
      remote
      clearable
      default-first-option
      :placeholder="placeholder"
      :reserve-keyword="false"
      @change="changeValue"
      :remote-method="remoteMethod"
      :loading="loading"
      suffix-icon="el-icon-search">
      <el-option
        v-for="item in searchResult"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>

</template>


<style rel="stylesheet/scss" lang="scss" scoped>
  .search-wrapper{
    display: inline-block;
    /*margin-left: 50px;*/
  }
  .search-wrapper input{
    width:120px;

  }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      searchData: {
        type: Object
      },
    },
    computed: {
      ...mapGetters([
        'type_select',
        'ExperienceEmployInfos'
      ])
    },
    data() {
      return {
        searchValue:'',
        searchResult:[],
        loading:false,
        placeholder:''
      }
    },
    mounted() {
    },
    methods: {
      remoteMethod(query){
        //        远程搜索方法
        if (query !== '') {
          this.loading = true;
          this.searchEmployee(query);
        } else {
          this.searchResult = [];
        }
      },
      changeValue(){
        this.$emit('on-search-value', this.searchValue);
      },
      async searchEmployee(query){

        if(this.searchData.type === 'searchHost'){
          const data = Object.assign( {},this.searchData.param ,{searchVar : query}) ;
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getList(data);
          this.loading = false;
          if(response === false) return ;
          this.searchResult = response.data.nicknames;
        }else{
          if( this.isExperience(true) ){
            this.handleSearchEmployInfos(query);
            return;
          }
          const data = {searchVar : query,roleType: this.searchData.param.roleType};
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.getEmployeerList(data);
          this.loading = false;
          if(response === false) return ;
          this.searchResult = response.data.nicknames;
        }
      },
      handleSearchEmployInfos(query){
        let source = [];
        if( query ){
          if( this.searchData.param.roleType ){
            source = this.ExperienceEmployInfos.employInfos.filter(item=>{
              return (item.nickname.indexOf(query) > -1 && this.searchData.param.roleType === item.roleType)
            });
          }else{
            source = this.ExperienceEmployInfos.employInfos.filter(item=>{
              return item.nickname.indexOf(query) > -1
            });
          }
        }

        this.loading = false;
        this.searchResult = source.map(item=>{
          return item.nickname;
        })
      }

    },
    created() {
      if(this.searchData !== undefined){
        this.placeholder = this.searchData.placeholder
      }
    },
    destroyed() {

    }
  }

</script>
