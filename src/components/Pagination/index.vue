<template>
  <div class="pagination-container" :data="paginationData" v-if="paginationData.total/paginationData.pageSize>1">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="paginationData.pageSize"

      layout="total, sizes, prev, pager, next"
      :total="paginationData.total"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </div>
</template>

<style>
  .pagination-container{
    text-align: center;
  }
  .el-pagination.is-background .btn-next.disabled, .el-pagination.is-background .btn-prev.disabled{
    background-color:transparent;
  }
  .el-pagination.is-background .el-pager li{
    height:30px;
    line-height: 30px;
  }
  .el-pagination.is-background .el-pager li.active{
    border-radius: 50%;
    overflow: hidden;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background: transparent;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      paginationData: {
        type: Object,
        default: {
          total:0,
          pageSize:10,
          currentPage:1
        }
      }
    },
    computed: {

    },
    data() {
      return {
        pageSize:10,
        currentPage:1
      }
    },
    methods: {
      handleSizeChange: function(pageSize) {
        //  表单每页长度改变
        this.paginationData.pageSize = pageSize;
        this.paginationData.currentPage = 1;
        this.$emit('on-pagination-change',this.paginationData)
      },
      handleCurrentChange: function(currentPage) {
        this.paginationData.currentPage = currentPage;
        this.$emit('on-pagination-change',this.paginationData)
      },
    },
    created(){},
    mounted(){

    },
    destroyed() {

    }
  }

</script>
