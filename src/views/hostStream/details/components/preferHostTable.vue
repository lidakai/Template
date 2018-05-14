<template>
  <div class="prefer-list-container">
    <el-table :data="dataRicher" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%" height="240">
      <el-table-column prop="date_time" align="left" label="主播" class="www" width="200px">
        <template slot-scope="scope">
          <span><a :href="scope.row.url"><i>{{scope.row.index}}</i><span class="text_">{{scope.row.nickname}} | {{scope.row.cateName}}</span></a></span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="打赏金额">
        <template slot-scope="scope">
          <span>{{scope.row.priceNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="弹幕条数">
        <template slot-scope="scope">
          <span>{{scope.row.barNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="30天内活跃天数">
        <template slot-scope="scope">
          <span>{{scope.row.activeDays}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .prefer-list-container .el-table th,
  .prefer-list-container .el-table td{
    height:36px;
    font-size: 14px;
    padding: 5px 0;
  }
  /*.prefer-list-container .el-table td span{*/
    /*color: #4b4d56;*/
  /*}*/
  .prefer-list-container .el-table td span a{
    text-align: center;
    display: flex;
  }
  .prefer-list-container .el-table td span a span.text_{
    text-align: left;
  }
  .prefer-list-container .el-table td span i{
      display: inline-block;
      border-radius: 50%;
      margin-right: 7px;
      margin-top: 2px;
      font-style: normal;
      background: transparent;
      width:20px;
      height:20px;
      line-height: 20px;
      color: #508ef7;
  }
  .el-table__row:nth-of-type(1) span,.el-table__row:nth-of-type(2) span,.el-table__row:nth-of-type(3) span{
    color: #508ef7!important;
  }
  .el-table__row:nth-of-type(1) span i,.el-table__row:nth-of-type(2) span i,.el-table__row:nth-of-type(3) span i{
    color: #fff!important;;
    background: #679bf8!important;;
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
