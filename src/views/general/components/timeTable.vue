<template>
  <div class="calendar-list-container">
    <el-table :data="tableData" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center"  label="开播时间" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.start_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="follow" align="center" label="下播时间">
        <template slot-scope="scope">
          <span>{{scope.row.end_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收益(元)">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.profit}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="直播时长(小时)">
        <template slot-scope="scope">
          <span>{{scope.row.live_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最大打赏金额">
        <template slot-scope="scope">
          <span>{{scope.row.large_reward}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="打赏率">
        <template slot-scope="scope">
          <span>{{scope.row.reward_percent}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <a href="http://www.zhibobao.com" target="_blank">直播小结</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
import { parseTime } from '@/utils'
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
