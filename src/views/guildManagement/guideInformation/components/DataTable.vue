<template>
  <div class="calendar-list-container">
    <el-table :data="tableData" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center"  label="日期" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="follow" sortable align="center" label="新增关注">
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.follow}}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column sortable align="center" label="新增关注占比">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.followPercent}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="打赏人数">
        <template slot-scope="scope">
          <span>{{scope.row.gift_people}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="打赏总额">
        <template slot-scope="scope">
          <span>{{scope.row.gift_total}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="打赏率">
        <template slot-scope="scope">
          <span>{{scope.row.gift_percent}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" label="弹幕数" width="95">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.barrage}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable class-name="status-col" align="center" label="人气值" width="100">
        <template slot-scope="scope">
          <span >{{scope.row.people_num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <span>加入对比</span>
          <a href="http://www.zhibobao.com" target="_blank">详情</a>
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
