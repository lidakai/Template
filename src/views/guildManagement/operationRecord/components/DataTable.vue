<template>
  <div class="operation-list-container">
    <el-table :data="tableData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="日期" width="300px">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作者" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.identity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作者身份" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作详情">
        <template slot-scope="scope">
          <span class="">{{scope.row.content}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>

  .operation-list-container .el-table th{
    background-color: rgba(244,244,244,0.62);
    color: #4b4d56;
    opacity: 0.82;
  }
  .operation-list-container .el-table th,.operation-list-container .el-table td{
    height:63px;
    font-size: 16px;
  }
</style>


<script>
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils'
  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    props: {
      tableData: {
        type: Array
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {

    },
    methods: {}
  }
</script>
