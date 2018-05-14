<template>
  <div class="richer-list-container">
    <div :class="popover?'popover popoverHover':'popover'" v-html="content">

    </div>
    <el-table :data="tableData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column
        label="排名"
        align="center"
        width="60">
        <template slot-scope="scope">
          <div v-if="(((current-1)*pageSize)+scope.$index+1)<=3" class="border_box">{{((current-1)+(scope.$index+1))}}</div>
          <div v-else>{{(scope.$index+1)>=pageSize?current*pageSize:(current-1)*pageSize+scope.$index<9?+scope.$index:(current===1?(scope.$index+1):(((current-1)*pageSize)+(scope.$index+1)))}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" align="center" label="土豪" :render-header="renderHeader">
        <template slot-scope="scope">
          <div style="display: flex;align-items: center;justify-content: center">
            <img class="fl" :src="scope.row.icon" alt="userIcon" @error='errorImg' v-if="false">
            <el-tooltip  effect="light" :content="!filterName(scope.row.nickname)?'未获取昵称':scope.row.nickname" placement="top">
              <span  class="nickname">{{!filterName(scope.row.nickname)?'未获取昵称':scope.row.nickname}}</span>
            </el-tooltip>
            <i class="typeFilterBox">
              <img :src="typeFilter(scope.row.type).img" :alt="typeFilter(scope.row.type).msg" :title="typeFilter(scope.row.type).msg">
            </i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="platform" align="center" label="平台">
        <template slot-scope="scope">
          <span>{{platformFn(scope.row.platform)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" align="center"  label="打赏（元）">
        <template slot-scope="scope">
          <span>{{priceFil(scope.row.price)}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="count" align="center" label="打赏次数">
        <template slot-scope="scope">
          <span>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxPrice" align="center" label="最大打赏（元）">
        <template slot-scope="scope">
          <span>{{scope.row.maxPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date_time" align="center" label="操作">
        <template slot-scope="scope">
          <a :href="'#/audience/active/'+scope.row.platform+'/1/'+scope.row.uid+'/richer/2'" target="_blank" class="learn_detail">查看详情</a>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style>
  .richer-list-container .popover{
    display: none;
    background: #fff;
    opacity: 1;
    position: absolute;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    top: 8%;
    z-index: 2;
    color: #606266;
    line-height: 1.5;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .popoverHover{
    display: block!important;
  }
  .border_box{
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #679bf8;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 12px;
    text-align: center;
    box-sizing: inherit!important;
  }
  .richer-list-container img{
    width: 40px;
    height:40px;
    overflow: hidden;
    border-radius: 50%;
    float: left;
  }
  .richer-list-container .el-table td span.nickname{
    float: left;
    height:100%;
    line-height: 40px;
    margin:0 5px;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-space: nowrap;
    white-space:nowrap;
    font-size: 14px;
    display: inline-block;
  }
  .richer-list-container .el-table td i {
    float: left;
    height:100%;
    line-height: 40px;
    color: red;
    font-style: normal;
    font-size: 12px;
    display: inline-block;
  }
  .richer-list-container .isLiving{
    width: 18px;
    height: 18px;
    color: #cccccc;
    position: relative;
    margin-left: 5px;
    vertical-align: middle;
    float: none;
  }
  .richer-list-container .identity_header{
    vertical-align: middle;
  }
  .typeFilterBox{
    width: 63px;height: 18px;
    display: flex!important;
    align-items: center;
  }
  .typeFilterBox img{
    width: 100%;
    height: auto;
    overflow: inherit;
    border-radius: inherit;
    float: inherit;
  }
  .learn_detail{
    color: #679bf8
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import {filterName} from '../../../utils/index'
  import what_tip from "@/assets/what.png"
  export default {
    props: {
      tableData: {
        type: Array
      },
      currentPage:{
        type:Number,
        default:1
      },
      pageSize:{
        type:Number,
        default:10
      }
    },
    computed: {
      ...mapGetters([
        'platform'
      ]),
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        what_tip:what_tip,
        current:1,
        popover:false,
        content:"小&nbsp;&nbsp;土&nbsp;&nbsp;豪：最近30天在平台累计打赏5000元-1万元<br/>" +
        "大&nbsp;&nbsp;土&nbsp;&nbsp;豪：最近30天在平台累计打赏1-5万<br/>" +
        "超级土豪：最近30天在平台累计打赏5-20万<br/>" +
        "顶级土豪：最近30天在平台累计打赏20万以上",
        typeList:[
          {
            type:1,
            img:require('../img/level_1.png'),
            msg:'顶级土豪'
          },{
            type:2,
            img:require('../img/level_4.png'),
            msg:'超级土豪'
          },{
            type:3,
            img:require('../img/level_2.png'),
            msg:'大土豪'
          },{
            type:4,
            img:require('../img/level_3.png'),
            msg:'小土豪'
          },
        ]
      }
    },
    watch:{
      'currentPage':'currentPageFn'
    },
    created() {

    },
    methods: {
      priceFil(num){
        return num.toFixed(2)
      },
      errorImg(event){
        let img = require('../../../assets/userIcon.png');
        event.target.src = img;
      },
      filterName:filterName,
      currentPageFn(val){
        this.current = val
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        this.$store.dispatch("set_platform",response.data.platInfos);
      },
      platformFn(id){
        let msg = '';
        if(this.platform.length<=0){
          this.getData()
        }
        this.platform.forEach((item,index)=>{
          if(id == item.platform){
            msg = item.name
          }
        });
        return msg || '--'
      },
      typeFilter(id){
        let obj = {};
        this.typeList.forEach((item,index)=>{
          if(item.type === id){
            obj = item
          }
        });
        return obj;
      },
      hover_(){
        this.popover = true
      },
      HoverOut(){
        this.popover = false
      },
      renderHeader(createElement, { column, $index }){
        return createElement(
          'div',
          {
            'class': 'header-center'
          },
          [
            createElement('span', {
                attrs: { 'type': 'text','class':'identity_header'},
              }, ['土豪']
            ),
            createElement('img', {
                attrs: {'class':"isLiving",'src':what_tip},
                on:{mouseover:this.hover_,mouseout:this.HoverOut},
              }
            )
          ]
        );
      },
    }
  }
</script>
