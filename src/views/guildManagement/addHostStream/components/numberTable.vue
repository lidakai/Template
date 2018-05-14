<template>
  <div class="group-list-container">
    <el-table :data="groupData" element-loading-text="给我一点时间" fit highlight-current-row
              style="width: 100%">
      <el-table-column prop="date_time" align="center" label="平台名称（请按以下名称格式填写对应平台名称：触手、斗鱼、虎牙、龙珠、熊猫、全民、战旗）">
        <template slot-scope="scope">
          <span>{{scope.row.platName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center"  label="房间号">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="start_time" align="center"  label="添加状态">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils'
  export default {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    props: {
      groupData: {
        type: Array
      }
    },
    data() {
      return {
        dialogDel:{
          isVisible:false
        },
        dialogEditor:{
          isVisible:false,
          name:''
        },
        groupId:""

      }
    },
    created() {

    },
    methods: {
      async del_content(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.alterInfo({groupId:this.groupId});
        if(response === false) return ;
        this.dialogDel.isVisible=false;

      },
      async EditorGroup(){
        if( this.dialogEditor.name.replace(/\s/g,'').length > 10 || !this.dialogEditor.name.replace(/\s/g,'') ){
          this.$message("分组名称必须小于十个字以内，不可为空")
        }else{
          const tempData = {groupId:this.groupId,groupName:this.dialogEditor.name};
          const response = await this.$api_zbb.service.ZhibobaoGuildData.Group.alterInfo(tempData);
          if(response === false) return ;
        }
        this.dialogEditor.isVisible = false
      }
    }
  }
</script>
