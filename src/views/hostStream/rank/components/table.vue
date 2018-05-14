<template>
  <div class="host-list-container" id="host-list-container-rank">
    <el-table :data="tableDataList" @header-click="checkboxFn" @sort-change="changeSort" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%" :default-sort="{prop:'price',order:'descending'}">
      <el-table-column
        label="排名"
        width="60"
        align="center">
        <template slot-scope="scope">
          <div v-if="scope.$index<3" class="border_box">{{scope.$index+1}}</div>
          <div v-else>{{scope.$index+1}}</div>
        </template>
      </el-table-column>
      <el-table-column align="left" label="主播" width="280px" :render-header="renderHeader">
        <template slot-scope="scope">
          <img class="fl" :src="scope.row.avatar" alt="">
          <div :class="scope.row.status===1?'isLiving host_detail':'host_detail'">
            <el-tooltip :disabled="!(scope.row.nickname.length>8)" effect="light" :content="scope.row.nickname" placement="top">
              <span class="overflow_">{{scope.row.nickname}}</span>
            </el-tooltip>
            <em></em>
            <i>{{scope.row.status===1?'直播中':'未直播'}}</i>
          </div>
          <div class="host_plat_cate">{{scope.row.platName}} |  {{scope.row.cateName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" sortable="custom" align="center" label="收益（元）">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contributePersent" sortable="custom" align="center" label="贡献占比">
        <template slot-scope="scope">
          <span>{{(scope.row.contributePersent===0||scope.row.contributePersent===null)?0:scope.row.contributePersent<0.001?'<0.01':(scope.row.contributePersent*100).toFixed(2)}}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="addFollower" sortable="custom" align="center" label="新增订阅数" v-if="!tableTime">
        <template slot-scope="scope">
          <span>{{scope.row.addFollower}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="barNum" sortable="custom" align="center" label="弹幕条数">
        <template slot-scope="scope">
          <span>{{scope.row.barNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="online" sortable="custom" align="center"  label="人气峰值">
        <template slot-scope="scope">
          <span>{{scope.row.online}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="effectiveDays" sortable="custom" align="center" label="有效直播天数" v-if="!tableTime">
        <template slot-scope="scope">
          <span>{{scope.row.effectiveDays}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="timeLong" sortable="custom" align="center"  label="直播总时长" v-if="!tableTime">
        <template slot-scope="scope">
          <span>{{timeToHour(scope.row.timeLong)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width"  width="320px">
        <template slot-scope="scope">
          <a :href="'#/analysis/profit/detail/'+scope.row.platform+'/'+scope.row.roomId" target="_blank">查看数据</a>
          <a :href="scope.row.url" target="_blank">查看直播间</a>
          <a href="javascript:;" @click="compare(scope.row)">对比</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style  rel="stylesheet/scss" lang="scss">
  .border_box{
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #679bf8;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 12px;
    box-sizing: inherit!important;
  }
  #host-list-container-rank .cell img{
    width: 46px;
    height: 46px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 12px;
  }
  #host-list-container-rank .host_detail{
    height:14px;
    line-height: 14px;
    margin-top: 5px;
    font-size: 14px;
    font-weight: normal;
    display:flex;
    align-items: center;
     .overflow_{
      max-width: 120px;
      display: inline-block;
      height: 100%;
      color: #277dff ;
      font-size: 14px ;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  #host-list-container-rank .host_detail em{
    display: inline-block;
    width:8px;
    height:8px;
    background-color: #4b4d56;
    opacity: 0.2;
    border-radius: 50%;
    overflow: hidden;
    margin:0 4px 0 5px;
  }
  #host-list-container-rank .host_detail i{
    font-style: normal;
    font-size: 12px;
    font-weight: normal;
    color: #4b4d56;
    opacity: 0.6;
  }
  #host-list-container-rank .isLiving.host_detail em{
    background: #51cbf7;
    opacity: 1;
  }
  #host-list-container-rank .isLiving.host_detail i{
    color: #51cbf7;
    opacity: 1;
  }
  #host-list-container-rank .host_plat_cate{
    line-height: 12px;
    font-size: 12px;
    margin-top: 10px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
<script>
  import { timeToHour } from "@/utils"
  export default {
    props: {
      tableData: {
        type: Array,
        default:[]
      },
      compareArrList:{
        type: Array
      },
      tableTime:{
        type:Boolean,
        default:true
      },
      compareIdArr:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        tableDataList:[]
      }
    },
    created() {

    },
    watch:{
//      'compareArrList':'compareArrListFn',
      'tableData':'tableDataFn'
    },
    methods: {
      tableDataFn(list){
        if(list){
          this.tableDataList = list
        }
      },
      checkboxFn(val,event){
       if(event.target.localName === 'input'){
         // checked
         if(event.target.checked){
           //选中
          this.$emit('on-status-change',1)
         }else {
           this.$emit('on-status-change',0)
         }
       }
      },
      compareArrListFn(val){
        if(this.compareIdArr.length !== undefined && val.length!== undefined){
          if(this.compareIdArr.length !== val.length){
            this.compareIdArr = val.map(item=>{
              return item.live_time
            });
          }
        }
      },
      changeSort(value){
        this.$emit('on-change-sort',{order:value.order,order_by:value.prop})
      },
      compare(value){
        if(this.compareIdArr.includes(value)){
          this.$message("该主播已选择");
          return false;
        }else if( this.compareIdArr.length >= 10 ){
          this.$message("一次最多选择10位进行对比");
          return false;
        }else{
          this.compareIdArr.push(value)
        }
        this.$emit('on-host-compare',this.compareIdArr)
      },
      renderHeader(createElement, { column, $index }){
        return createElement(
          'div',
          {
            'class': 'header-center',
            'style':'display: block!important;'
          },
          [
            createElement('span', {
                attrs: { type: 'text','class':'identity_header','style':'margin-right: 5px;'},
              }, ['主播']
            ),
            createElement('el-checkbox', {
                attrs: {'v-model':"isLiving" }
              }, ['只看直播中']
            )
          ]
        );
      },
      timeToHour
    }
  }
</script>
