<template>
  <div class="record-list-container">
    <el-table :data="dataRicher" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%" height="230">
      <el-table-column align="center" :label="description+'昵称'" width="245">
        <template slot-scope="scope">
          <span :dd="scope.row.type">{{scope.row.nickname || '未获取主播昵称'}}</span>
          <img v-if="scope.row.type === 1" :src="level_3" alt="">
          <img v-if="scope.row.type === 2" :src="level_4" alt="">
          <img v-if="scope.row.type === 3" :src="level_2" alt="">
          <img v-if="scope.row.type === 4" :src="level_1" alt="">
        </template>
      </el-table-column>


      <!--首次活跃土豪-->
      <!--<el-table-column prop="date_time" align="center" label="首次打赏时间" v-if="richerType===1">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="date_time" align="center" label="近30天打赏金额"  v-if="richerType===1"  class-name="current_thirsty">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <!--活跃打赏土豪-->
      <el-table-column prop="date_time" align="center" label="上一个30天打赏金额"  v-if="richerType===4"  class-name="last_thirsty">
        <template slot-scope="scope">
          <span>{{scope.row.oldPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="近30天打赏金额"  v-if="richerType===4"  class-name="current_thirsty">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <!--回流打赏土豪-->
      <!--<el-table-column prop="date_time" align="center" label="最近打赏时间" v-if="richerType===3">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="date_time" align="center" label="近30天打赏金额" v-if="richerType===3"  class-name="current_thirsty">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <!--流失打赏土豪-->
      <!--<el-table-column prop="date_time" align="center" label="最后在本直播间打赏时间" v-if="richerType===2">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.time}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="date_time" align="center" label="上一个30天打赏金额" v-if="richerType===2" class-name="last_thirsty">
        <template slot-scope="scope">
          <span>{{scope.row.oldPrice}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="date_time" align="center" label="操作" class-name="small-padding" width="100">
        <template slot-scope="scope">
          <router-link :to="'/audience/active/'+platform+'/'+roomId+'/'+scope.row.uid+'/richer/1'" target="_blank">查看详情</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .record-list-container .el-table th,
  .record-list-container .el-table td{
    height:36px;
    font-size: 12px;
    padding: 5px 0;
  }
  .record-list-container .el-table td img{
    position: relative;
    top:3px;
  }
</style>
<script>
  import level_1 from '../img/level_1.png'
  import level_2 from '../img/level_2.png'
  import level_3 from '../img/level_3.png'
  import level_4 from '../img/level_4.png'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      dataRicher: {
        type: Array
      },
      richerType:{
        type:Number,
        default:1
      },
      userType:{
        type:Number,
        default:2
      }
    },
    computed: {
      ...mapGetters([
        'anchorInfo'
      ])
    },
    watch:{
      userType:{
        deep:true,
        handler:function (val) {
          console.log(1111,val);
          console.log(333333333);
          if( val === 1 ){
            this.description = "观众"
          }else{
            this.description = "土豪"
          }
        }
      }
    },
    data() {
      return {
        level_1,
        level_2,
        level_3,
        level_4,
        description:"土豪"
      }
    },
    created() {
      this.platform = Number(this.$route.params.platform);
      this.roomId = this.$route.params.roomId;
      if( this.userType === 1 ){
        this.description = "观众"
      }else{
        this.description = "土豪"
      }
    },
    methods: {}
  }
</script>
