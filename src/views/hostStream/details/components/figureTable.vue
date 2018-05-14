<template>
  <div class="figure-list-container">
    <el-table :data="dataRicher" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%" height="238">
      <el-table-column
        label="排名"
        type="index"
        align="center"
        width="60">
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="主播昵称 | 类型">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}} | {{scope.row.cateName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="开播状态">
        <template slot-scope="scope">
          <span><i v-if="scope.row.isLive"></i>{{scope.row.isLive?'直播中':'未开播'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="打赏总额">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="操作" class-name="small-padding">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">查看直播间</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .figure-list-container .el-table th,
  .figure-list-container .el-table td{
    height:36px;
    font-size: 12px;
    padding: 5px 0;
  }
</style>
<script>
  import level_1 from '../img/level_1.png'
  import level_2 from '../img/level_2.png'
  import level_3 from '../img/level_3.png'
  import level_4 from '../img/level_4.png'

  export default {
    props: {
      dataRicher: {
        type: Array
      }
    },
    data() {
      return {
        level_1,
        level_2,
        level_3,
        level_4
      }
    },
    created() {},
    methods: {}
  }
</script>
