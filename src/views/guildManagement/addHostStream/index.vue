<template>
  <div class="add-host-container">
    <div class="add-host_header">
      <h3 class="add-host_header_title fl"><a href="#/guildManagement/hostStream" style="color: #3b77ff">主播管理</a> > 添加主播</h3>
    </div>
    <!--<div class="manage-container_header" v-if="!isHost">-->
      <!--<h3 class="manage-container_title fl">分组管理</h3><span>帮助你查看自定义集合的主播数据，最多添加10个</span>-->
    <!--</div>-->
    <div class="add-host_content">
      <p class="top_mode">
        <span @click="change_mode" data-mode="roomUrl"  :class="isRoomUrl ? 'current_mode':''">通过房间地址添加</span>
        <span @click="change_mode" data-mode="roomNum" :class="isRoomUrl ? '':'current_mode'">通过房间号添加</span>
      </p>
      <p class="top_import">
        <span @click="change_import" data-import="hand" :class="isAuto ? '':'current_import'">手动添加</span>
        <span @click="change_import" data-import="auto"  :class="isAuto ? 'current_import':''">批量添加</span>
      </p>

      <section class="add-host_content_operation">

        <p class="add-host_content_group_title" v-if="!addByGroup">选择分组：</p>
        <div class="add-host_content_group" v-if="!addByGroup">
          <span @click="changeSelected" v-for="item in guild_type.group" :data-id="item.id" :class="item.id===1?'selected_plat':''" v-if="item.name !=='全部分组'">
            {{item.name}}
            <img src="./img/selected.png" alt="">
          </span>
        </div>

        <p class="add-host_content_group_title" v-if="addByGroup">当前分组：</p>
        <div class="add-host_content_group" v-if="addByGroup">
          <span :data-id="currentGroup.id" class="selected_plat_group">
            {{currentGroup.name}}
            <img src="./img/selected.png" alt="">
          </span>
        </div>

        <p class="add-host_content_roomUrl_title" v-if="isRoomUrl && !isAuto">房间地址<i>*</i>：</p>
        <textarea v-if="isRoomUrl && !isAuto" name="" v-model="roomUrl"  class="add-host_content_roomUrl" placeholder="可以填写多个房间地址，换行分开"></textarea>

        <p class="add-host_content_roomNum_title" v-if="!isRoomUrl && !isAuto">房间号<i>*</i>：</p>
        <div v-if="addedRoomNum.length && !isRoomUrl && !isAuto">
          <p v-for="item in addedRoomNum">
            <span>{{item.platName}}</span><span>{{item.roomId}}</span>
          </p>
        </div>
        <div class="add-host_content_roomNum" v-if="!isRoomUrl && !isAuto">
          <el-select v-model="room_plat" placeholder="请选择平台">
            <el-option v-if="item.id !== '0'" v-for="item in platform" :value="item.name" :key="item.name">{{item.name}}</el-option>
          </el-select>
          <el-input placeholder="填写主播房间号" v-model="roomNum" style="width: 180px;"></el-input>
          <el-button type="primary" class="keep-add" @click="addRoomNum">继续添加</el-button>
        </div>

        <div class="add-host_content_upload" v-if="isAuto">
          <upload-excel-component @on-selected-file='upLoadFile' style="float:left;"></upload-excel-component>
          <a v-if="isRoomUrl && isAuto" href="https://fentuan-image.oss-cn-hangzhou.aliyuncs.com/%E6%88%BF%E9%97%B4%E5%9C%B0%E5%9D%80%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5.xlsx" download="房间地址模板">下载房间地址模板xls文档</a>
          <a v-if="!isRoomUrl && isAuto" href="https://fentuan-image.oss-cn-hangzhou.aliyuncs.com/%E6%88%BF%E9%97%B4%E5%8F%B7%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5.xlsx" download="房间号模板">下载房间号模板xls文档</a>
        </div>

        <el-button type="primary" class="upload_host" @click="uploadHost">确定</el-button>

        <el-table v-if="isRoomUrl && isAuto && urlTableData.length" :data="urlTableData" border highlight-current-row style="width: 800px;margin-top:20px;" :row-class-name="tableRowClassName">
          <el-table-column v-for='item in urlTableDataHeader' :prop="item" :label="item" :key='item'>
          </el-table-column>
        </el-table>

        <el-table v-if="!isRoomUrl && isAuto && numberTableData.length" :data="numberTableData" border highlight-current-row style="width: 800px;margin-top:20px;">
          <el-table-column v-for='item in numberTableDataHeader' :prop="item" :label="item" :key='item'></el-table-column>
        </el-table>
      </section>

      <Type-select-component style="display: none" @on-type-change='typeChange'></Type-select-component>


      <el-dialog title="" :visible.sync="dialogAdd.isVisible" width="534px" class="dialogAdd">
        <p>{{dialogAdd.title}}</p>
        <span>{{dialogAdd.description}}</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="dialogAdd.isVisible=false">继续导入</el-button>
        <el-button type="primary" round @click.native.prevent="toHostStream">前往查看</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .add-host-container{
    .add-host_header{
      height:36px;
      line-height:36px;
      padding:0 20px 0 0;
      margin-bottom: 42px;
      .add-host_header_title{
        float: left;
        margin: 0 30px 0 0;
        height: 36px;
        font-size: 26px;
        line-height: 36px;
        color: #464851;
        font-weight: normal;
      }
    }
    .add-host_content{
      padding: 0 0 20px;
      background: #fff;
      box-shadow: 0px 6px 8px 0px
      rgba(0, 0, 0, 0.04);
      .top_mode{
        width:100%;
        /*display: flex;*/
        /*flex-flow: row nowrap;*/
        margin:0;
        height:44px;
        line-height: 44px;
        background: #F5F5F5;
        overflow: hidden;
        span{
          float: left;
          display: inline-block;
          width:150px;
          height:100%;
          font-size: 14px;
          /*color: #5f6c84;*/
          text-align: center;
          cursor: pointer;
          /*background-color: #eeeff5;*/
          /*box-shadow: 0px 6px 8px 0px*/
          /*rgba(0, 0, 0, 0.04);*/
          color: #0e1a35;
          background: #fbfbfb;
          border-right:1px solid #f1f1f1;
        }
        .current_mode{
          /*background-color: transparent;*/
          /*box-shadow: none;*/
          /*color: #247aff;*/
          background: #fff;
        }
      }
      .top_import{
        height:44px;
        line-height: 40px;
        /*padding-top: 40px;*/
        border-bottom:1px solid #e9ebf1;
        margin:10px 0 0;
        span{
          display: inline-block;
          /*font-weight: bold;*/
          color: #464851;
          width:150px;
          height:100%;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          border-bottom:transparent;
          position: relative;
          top:1px;
        }
        .current_import{
          border-bottom:2px solid #247aff;
          color: #247aff;
        }
      }
      .add-host_content_operation{
        padding: 50px;
        max-width: 1000px;
        p{
          margin:0 0 20px 0;
          height: 18px;
          line-height: 18px;
          font-size: 16px;
          font-weight: normal;
          color: #242f3b;
          i{
            color: #ff4f4f;
          }
        }
        .add-host_content_group{
          margin-bottom: 15px;
          span{
            display: inline-block;
            text-align: center;
            height: 40px;
            line-height: 34px;
            border-radius: 6px;
            border: solid 3px rgba(36,122,255,0.2);
            margin-left: 30px;
            margin-bottom: 20px;
            padding: 0 20px;
            color: #247aff;
            font-size: 16px;
            cursor: pointer;
            position: relative;
            img{
              position: absolute;
              top:-11px;
              right:-11px;
              width: 22px;
              height:22px;
              display: none;
            }
          }
          .selected_plat{
            border-color: transparent;
            background-color: rgba(36,122,255,0.1);
            img{display: block}
          }
          .selected_plat_group{
            border-color: transparent;
            background-color: rgba(36,122,255,0.1);
            margin-left: 0;
            img{display: block}

          }
        }
        .add-host_content_roomUrl{
          display: block;
          width:400px;
          height:120px;
          resize: none;
          border-radius: 6px;
          border: solid 2px #e9eff4;
          padding: 18px;
          line-height: 18px;
          font-size: 14px;
          color: #242f3b;
          outline: none;
          &::-webkit-input-placeholder{
            color: #767676;
            opacity:0.4;
          }
        }
        .add-host_content_upload{
          a{
            display: inline-block;
            font-size: 14px;
            height:20px;
            font-weight: normal;
            color: #247aff;
            text-decoration: underline;
            margin-top: 106px;
            margin-left: 15px;
          }
        }
        .upload_host{
          width: 90px;
          height: 34px;
          background-color: #247aff;
          border-radius: 4px;
          margin-top: 40px;
          display: block;
        }
      }

    }
  }
</style>
<style>
  .add-host-container .add-host_content_roomNum  .el-select{
    margin-right: 20px;
  }
  .add-host-container .add-host_content_roomNum  .el-select input.el-input__inner{
    width:120px;
    border-color: #aebad4;
    color: #0e1a35;
    border-radius: 0;
  }
  .add-host-container .add-host_content_roomNum  .el-input__inner:hover{
    border-color: #aebad4;
  }
  .add-host-container .add-host_content_roomNum .el-input.is-focus .el-input__inner{
    border-color: #aebad4;
  }
  .add-host-container .add-host_content_roomNum  .el-select input::-webkit-input-placeholder{
    color: #0e1a35;
  }

  .keep-add{
    height: 34px;
    background-color: #247aff;
    border-radius: 4px;
    margin-left: 20px;
  }
  .dialogAdd .el-dialog{
        margin-top: 30vh!important;
  }
  .dialogAdd .el-dialog__header{
    display: none;
  }
  .dialogAdd .el-dialog__body{
    text-align: center;
    padding: 60px 25px 50px;
  }
  .dialogAdd .el-dialog__body p{
    font-size: 16px;
    font-weight: bold;
    color: #4b4d56;
  }
  .dialogAdd .el-dialog__body span{
    font-size: 14px;
    font-weight: normal;
    opacity:0.6;
    color: #4b4d56;
    display: block;
    width:242px;
    margin:0 auto;
  }
  .dialogAdd .el-dialog__footer{
    padding: 0 25px 20px;
  }
  .dialogAdd .el-dialog__footer .el-button{
    padding: 10px;
  }
</style>
<script>

  import TypeSelectComponent from '@/components/TypeSelect/index.vue'
  import { mapGetters } from 'vuex'
  import urlTableComponent from './components/urlTabl.vue'
  import numberTableComponent from './components/numberTable.vue'
  import UploadExcelComponent from '@/components/UploadExcel/index'
  import { parseTime, getStringTime,duplicateObj } from '@/utils'
  export default {
    components: {
      urlTableComponent,
      numberTableComponent,
      UploadExcelComponent,
      TypeSelectComponent
    },
    computed:{
      ...mapGetters([
        'guild_type',
        'total_type',
        'platform'
      ])
    },
    name: 'data_direction',
    data() {
      return {
        isRoomUrl:true,
        isAuto:false,
        urlTableData:[],
        urlTableDataHeader:[],
        numberTableData:[],
        roomUrl:"",
        roomNum:"",
        room_plat:'',
        selectPlat:[],
        addedRoomNum:[],
        addByGroup:false,
        currentGroup:{
          groupName:"",
          groupId:''
        },
        param:{
          addType:0,
          groupIdList:[],
          urlList:[],
          roomList:[]
        },
        dialogAdd:{
          title:'添加主播成功！',
          isVisible:false,
          description:"数据隔天生效"
        }
      }
    },
    methods: {
      typeChange(){
        if(this.$route.params.id){
          this.addByGroup = true;
          this.guild_type.group.map(item=>{
            if(item.id === this.$route.params.id){
              this.currentGroup = item;
            }
          });
        }
      },
      change_mode(event){
        if(event.target.className === 'current_mode')return;
        this.isRoomUrl = !this.isRoomUrl;
        this.isAuto = false;

        this.param.addType = this.isRoomUrl ? 0 : 1;
      },
      change_import(){
        if(event.target.className === 'current_import')return;
        this.isAuto = !this.isAuto;
      },
      async getPlat(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        this.$store.dispatch("set_platform",response.data.platInfos);
      },
      changeSelected(e){
        let id = e.target.getAttribute('data-id');
        try{
          document.getElementsByClassName('selected_plat')[0].setAttribute('class','');
        }catch(err){}
        this.param.groupIdList = [id];
        e.target.className = 'selected_plat';
      },
      addRoomNum(){
        if( !this.room_plat || !this.roomNum ){
          this.$message("请输入房间号或选择平台");
          return;
        }
        let plat_obj = {
          platName:this.room_plat,
          roomId:this.roomNum
        };
        this.platform.forEach(item=>{
            if(item.name === plat_obj.platName){
              plat_obj.plat = item.platform
            }
        });
        this.addedRoomNum.push(plat_obj);
        this.room_plat = '';
        this.roomNum = ''
      },
      async uploadHost(){
        if( !this.isAuto && this.isRoomUrl ){
          this.param.urlList = this.roomUrl.split(/[\n,]/g);

          if( !this.param.urlList.length ){
            this.$message("请输入主播的房间地址");
            return ;
          }
        }
        if( !this.isAuto && !this.isRoomUrl ){
          this.param.roomList = this.addedRoomNum.map(item=>{
            return{plat:item.plat,roomId:item.roomId}
          });


          if( !this.param.roomList.length ){
            this.$message("请输入主播的房间号及平台");
            return ;
          }

        }

        if( this.isAuto && this.isRoomUrl ){
          if( !this.param.urlList.length ){
            this.urlTableData = [];
            this.$message("请输入主播的房间地址");
            return ;
          }
        }

        if( this.isAuto && !this.isRoomUrl ) {
          if( !this.param.roomList.length ){
            this.numberTableData = [];
            this.$message("请输入主播的房间号及平台");
            return ;
          }
        }

        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.add(this.param);
        if(response === false) return;
        this.roomUrl = '' ;
        this.handleUploadResult(response.data.roomInfos);
        this.param.urlList = [];
        this.param.roomList = [];

        if(response.data.failedCount){
          this.dialogAdd = {
            title:'批量添加出错！',
            isVisible:true,
            description:response.data.successCount+"位主播添加成功，"+response.data.failedCount+"位主播添加出错 \n " +"建议前往查看，核对后再次添加！"
          }
        }else{
          this.dialogAdd = {
            title:'添加主播成功！',
            isVisible:true,
            description:"数据隔天生效"
          }
        }
        this.$store.dispatch("set_addHostStream",true)
      },
      upLoadFile(data){
        let header = [];
        data.header.forEach(item=>{
          if(item.indexOf('UNKNOWN') === -1){
            header.push(item);
          }
        });
        header.push('添加状态');
        if(this.isRoomUrl){
          this.param.urlList = [];
          data.results.forEach(item=>{
            try{
              this.param.urlList.push(Object.values(item)[0]);
            }catch(err){}

            item['添加状态'] = '--'
          });
          this.urlTableData = data.results;
          this.urlTableDataHeader = header;
        }else{
          data.results.forEach(item=>{
            try{
              this.param.roomList.push({
                plat:Object.values(item)[0],
                roomId:Object.values(item)[1]
              })
            }catch(err){}

            item['添加状态'] = '--'
          });

          this.numberTableData = data.results;
          this.numberTableDataHeader = header;
        }
      },
      handleUploadResult(data){
        if( this.isRoomUrl ){
            this.urlTableData = [];
            this.urlTableData = data.map(item =>{
              console.log(item);
              return{
                "房间地址（主播直播间网页地址）":item.url,
                "添加状态":item.status ===1 ? "添加成功" : item.status ===2 ? "已存在其他分组，无法重复添加" :"添加失败"
              }
            })
          }else{
            this.numberTableData = [];
            this.numberTableData = data.map(item =>{
              return{
                "平台名称（请按以下名称格式填写对应平台名称：触手、斗鱼、虎牙、龙珠、熊猫、全民、战旗）":item.plat,
                "房间号":item.roomId,
                "添加状态":item.status ===1 ? "添加成功" : item.status ===2 ? "已存在其他分组，无法重复添加" :"添加失败"
              }
            })
          }
      },
      tableRowClassName(row){
        if( row.row['添加状态'] === '房间已存在' || row.row['添加状态'] === '房间已存在'  ){
          return "fail";
        }
      },
      toHostStream(){
        this.dialogAdd.isVisible = false;
        this.urlTableData = [];
        this.numberTableData = [];
        this.$router.push({path:'/guildManagement/hostStream'});
      }
    },
    created() {
      if(!this.platform.length){
        this.getPlat();
      }
    },
    mounted(){

    },
    activated(){
      if(this.$route.params.id){
        this.addByGroup = true;
        this.param.groupIdList = [this.$route.params.id]

        this.guild_type.group.map(item=>{
          if(item.id === this.$route.params.id){
            this.currentGroup = item;

          }
        });
      }else{
        this.addByGroup = false;
      }
    },
    destroyed() {

    }
  }

</script>


