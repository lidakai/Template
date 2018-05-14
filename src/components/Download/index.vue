<template>
  <el-button class="download_excel" icon="el-icon-download" @click="handleClick" :loading="downloadLoading" type="primary" round>{{fileName}}</el-button>
</template>

<style>
  .type-change-wrapper{
    display: inline-block;
  }
  .type-change-wrapper input.el-input__inner{
    width:120px;
  }
</style>


<script>
  import { parseTime } from '@/utils'
  export default {
    props: {
      downloadData: {
        type: Object,
        default: null
      },
      fileName:{
        type:String,
        default:'导出Excel文件'
      }
    },
    data() {
      return {
        downloadLoading:false,
        roleType:{
          1:'管理员',
          2:'经纪人',
          3:"会长"
        }
      }
    },
    watch:{
      downloadData:{
        deep:true,
        handler(source) {
          if(source.isloading){
            this.handleDownload();
          }else{
            this.downloadLoading = false;
          }

        }
      }
    },
    methods: {
      handleDownload(){
//        this.downloadLoading = true;
//        console.log(this.downloadData);
        import('@/vendor/Export2Excel').then(excel => {
          const data = this.formatJson(this.downloadData.filterVal, this.downloadData.data);
          excel.export_json_to_excel(this.downloadData.tHeader, data, this.downloadData.xlms_name);
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          }else if( j ==='roleType' ) {
            return this.roleType[v[j]]
          } else {
            return v[j]
          }


        }))
      },
      handleClick(){
        if(this.isExperience())return;
        this.downloadLoading = true;
        this.$emit('on-download-click')
      }
    }
  }

</script>
