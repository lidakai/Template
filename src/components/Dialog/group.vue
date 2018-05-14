<template>
  <div class="modify-group-wrapper" id="modify-group-wrapper">
    <el-dialog :title="dialogGroup.title" :visible.sync="dialogGroup.isVisible" class="dialogGroup" width="500px">
      <p>{{dialogGroup.description}}</p>
      <div class="modify-group_content" id="modify-group_content">
        <span v-if="dialogGroup.type ==='modifyGroup'" @click="selectGroup(item,index)" v-for="(item,index) in list.group" :data-id="item.id" :key="item.id" :class="item.className">
          {{item.name}}
         <img src="./img/selected.png" alt="">
        </span>
        <span  v-if="dialogGroup.type ==='set_permission'" @click="selectGroup(item,index)"
              v-for="(item,index) in list.group"
              :data-id="item.id"
              :key="item.id"
              :class="item.name==='我的收藏'?'hide':item.name==='未分组'?'hide':item.className"
        >
          {{item.name}}
         <img src="./img/selected.png" alt="">
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="dialogGroup.isVisible = false">取 消</el-button>
        <el-button round type="primary" @click="QuickModifyGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<style>
  .host-list-container .el-dialog{
    height: auto;
  }
  .v-modal{
    opacity:1;
    background: rgba(0,0,0,0.2);
  }
  .modify-group-wrapper  .el-dialog{
    top:50%;
    box-shadow: 0px 0px 38px 0px
    rgba(0, 0, 0, 0.1);
    border-radius: 0;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-top: 0!important;
  }
  .modify-group-wrapper  .el-dialog__header{
    background-color: rgba(196,196,196,0.1);
  }
  #modify-group-wrapper .el-dialog__footer{
    background-color: #FFFFFF;
  }
  .modify-group-wrapper  .el-dialog__body{
    padding: 20px 20px 0 !important;
    font-size: 16px;
    color: #4b4d56;
  }
/*  .modify-group-wrapper  .el-dialog__footer{
    padding: 26px 20px;
  }*/
  .modify-group-wrapper .el-button{
    font-size: 16px;
    padding: 10px 28px;
  }

  .modify-group-wrapper .definition{
    /*display: block;*/
    margin:24px 0 0 0;
    display: block;
  }


  .modify-group-wrapper_tips{
    line-height:18px;
    font-size: 14px;
    font-weight: normal;
    color: #3b77ff;
    background-color: rgba(196,196,196,0.2);
    padding:20px 27px 20px;
    margin:30px -20px 0;
    opacity:0.8;
  }
  .modify-group-wrapper_tips p{
    margin:0;
  }
  .modify-group-wrapper_tips p:first-child{
    margin-bottom: 18px;
  }
  .modify-group-wrapper .el-radio{
    color: #282a32;
  }
  .modify-group-wrapper .el-input{
    width:60px;
    margin:0 2px;
  }
  .modify-group-wrapper .el-input .el-input__inner{
    padding: 0 12px;
  }

  .group_box{
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
    margin-top: 10px;
  }
  .group_box img{
    position: absolute;
    top:-11px;
    right:-11px;
    width: 22px;
    height:22px;
    display: none;
  }
  .selected_group.group_box{
    border-color: transparent;
    background-color: rgba(36,122,255,0.1);
    /*margin-left: 0;*/
  }
  .selected_group img{display: block}
  #modify-group_content{
    max-height: 150px;
    overflow-y: auto;
  }
  #modify-group_content span.hide{
    display: none;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {
    },
    computed: {
      ...mapGetters([
        'guild_type',
      ]),
    },
    props:{
      dialogGroup:{
        type:Object
      }
    },
    name: 'effectiveTime',
    data() {
      return{
        list:{
          group:[]
        },
        selectedGroup:[]
      }
    },
    watch: {
      guild_type:{
        deep: true,
        handler(option) {
          let list = JSON.parse(JSON.stringify(option));
          list.group.forEach((item,index)=>{
            if(item.id === 'all'){
              list.group.splice(index,1)
            }
          });
          this.list = list;
        }
      },
      dialogGroup:{
        deep: true,
        async handler(option) {
          if(this.list.group.length<=0){
            const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getGroupTree();
            if(response === false) return ;
            let group = response.data.groupTree;
            group.forEach(item=>{
              item.id = item.groupId;
              item.name = item.groupName;
            });
            this.list.group = group;
            this.optionAll(option)
          }else {
            this.optionAll(option)
          }
        }
      }
    },
    methods: {
      optionAll (option){
        this.selectedGroup = [];
        this.list.group.forEach(item=>{
          item.className = 'group_box';
          if(this.dialogGroup.type === 'modifyGroup'){
            option.empUid.forEach(value=>{
              if(value.groupIds.includes(item.id)){
                item.className = 'selected_group group_box';
                this.selectedGroup.push(item.id)
              }
            });
          }else {
            if(option.groupIds.includes(item.id)){
              item.className = 'selected_group group_box';
              this.selectedGroup.push(item.id)
            }
          }
        })
      },
      selectGroup(item,index){
        let group = JSON.parse(JSON.stringify(this.list));
        if( this.dialogGroup.type === 'modifyGroup' ){
          group.group.forEach(item=>{
            item.className = "group_box";
          });
          this.selectedGroup = [item.id];
          group.group[index].className ="selected_group group_box";
          console.log(group.group[index]);
        }else{
          if(this.selectedGroup.includes(item.id)){
            group.group[index].className = 'group_box';
            this.selectedGroup.splice(this.selectedGroup.indexOf(item.id),1)
          }else{
            this.selectedGroup.push(item.id);
            group.group[index].className ="selected_group group_box";
          }
        }
        this.list = group;
      },
      async QuickModifyGroup(){
        if(!this.selectedGroup.length){
          this.$message("请先选择分组");
          return;
        }
        if(this.dialogGroup.type === 'modifyGroup'){
          const data = this.dialogGroup.empUid.map(item=>{
            return {
              platform:item.platform,
              roomId:item.roomId,
              groupIds:item.groupIds
            }
          });
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.changeGroup({oldRooms:data,newGroupIds:this.selectedGroup});
          if(response === false) return ;
          this.dialogGroup.isVisible = false;
          this.$message({
            message:'修改分组成功',
            type:"success"
          })
          this.$emit("group-change-dialog")
        }else{
          const data = {empUid:this.dialogGroup.empUid,groupIds:this.selectedGroup};
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Guild.setBrokerGroupBind(data);
          if(response === false) return ;
          this.dialogGroup.isVisible = false;
          this.$message({
            message:'设置权限成功',
            type:"success"
          })
          this.$emit("group-change-dialog")
        }

      }
    },
    created() {
    },
    destroyed() {

    }
  }

</script>


