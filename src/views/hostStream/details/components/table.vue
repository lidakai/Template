<template>
  <div class="record-list-container">
    <el-table :data="tableData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          <span>{{scope.row.dateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="开播时间">
        <template slot-scope="scope">
          <span>{{scope.row.startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="下播时间">
        <template slot-scope="scope">
          <span>{{scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="直播时长（小时）">
        <template slot-scope="scope">
          <span>{{scope.row.timeLong}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="收益（元）" class-name="small">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .record-list-container .el-table th,
  .record-list-container .el-table td{
    height:36px;
    font-size: 14px;
    padding: 5px 0;
  }
</style>
<script>
  export default {
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
    created() {

    },
    methods: {}
  }
</script>
