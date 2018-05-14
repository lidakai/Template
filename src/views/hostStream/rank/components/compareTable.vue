<template>
  <div class="compare-list-container">
    <el-table :data="tableData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="综合指数">
        <template slot-scope="scope">
          <span :class="scope.row.systemPrice === scope.row.maxSystemPrice?'maxValue':''">{{scope.row.systemPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="总收益">
        <template slot-scope="scope">
          <span :class="scope.row.price === scope.row.maxPrice?'maxValue':''">{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="弹幕数">
        <template slot-scope="scope">
          <span :class="scope.row.barNum === scope.row.maxBar?'maxValue':''">{{scope.row.barNum}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="平均观看人数">
        <template slot-scope="scope">
          <span :class="scope.row.averagePerson === scope.row.maxAveragePerson?'maxValue':''">{{scope.row.averagePerson}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="直播总时长">
        <template slot-scope="scope">
          <span :class="scope.row.timeLong === scope.row.maxTimeLong?'maxValue':''">{{timeToHour(scope.row.timeLong)}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="新增订阅">
        <template slot-scope="scope">
          <span :class="scope.row.addFollow === scope.row.maxAddFollow?'maxValue':''">{{scope.row.addFollow}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
  .compare-list-container .maxValue{
    color: #3b77ff!important;
    font-weight: bold;
  }
</style>
<script>
  import { timeToHour } from "@/utils"
  export default {
    props: {
      tableData: {
        type: Array
      }
    },
    data() {
      return {
      }
    },
    created() {

    },
    methods: {
      timeToHour
    }
  }
</script>
