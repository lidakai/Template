<template>
  <div class="type-change-wrapper">
      <el-select v-model="type_select.group" placeholder="全部分组" @change="change_group">
        <el-option v-for="item in guild_type.group" :value="item.name" :key="item.name">{{item.name}}</el-option>
      </el-select>
      <el-select v-model="type_select.plat" placeholder="全部平台" @change="change_plat">
        <el-option v-for="item in guild_type.platform"  :value="item.name" :key="item.name">{{item.name}}</el-option>
      </el-select>
      <el-select v-model="type_select.category" placeholder="全部分类" @change="change_cate">
        <el-option v-for="item in guild_type.category" :value="item.name" :key="item.id">{{item.name}}</el-option>
      </el-select>
  </div>
</template>

<style>
  .type-change-wrapper{
    display: inline-block;
  }
  .type-change-wrapper input.el-input__inner{
    width:110px;
    border-color: #3b77ff;
    color: #3b77ff;
    border-radius: 0;
  }
  .type-change-wrapper .el-input__inner:hover{
    border-color: #3b77ff;
  }
  .type-change-wrapper .el-select .el-input.is-focus .el-input__inner{
    border-color: #3b77ff;
  }

  .type-change-wrapper input::-webkit-input-placeholder{
    color: #3b77ff;
  }
  .type-change-wrapper .el-select+.el-select{
    margin-left: 15px;
  }
  .type-change-wrapper .el-select .el-input .el-select__caret{
    color: #3b77ff;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import { duplicateObj } from '@/utils'
  const vim  = {
    computed: {
      ...mapGetters([
        'total_type',
        'type_select',
        'guild_type',
      ]),
    },
    name:"typeSelectChild",
    data() {
      return {}
    },
    methods: {
      change_group(group){
        //过滤、去重
        let cate = [];
        let plat = [];

        if( group === '全部分组' ){
          this.total_type.forEach(item=>{
            try{
              plat = [...plat,...item.plats];
            }catch(err){}
          });
        }else{
          this.total_type.forEach(item=>{
            if( item.groupName === group){
              plat = item.plats ? item.plats : [];
              return false;
            }
          });
        }



        //检测及修改
        if( this.type_select.plat ==='全部平台' || !this.guild_type.platform.some(item => { return item.name === this.type_select.plat}) ){
          this.type_select.plat = '';
          this.guild_type.platform =duplicateObj(plat.map(item=>{
            try{
              cate = [...cate,...item.cates];
            }catch(err){}
            return {id:item.platform,name:item.platName}
          }));
        }else{
          this.guild_type.platform =duplicateObj(plat.map(item=>{
            if( item.platName === this.type_select.plat && item.cates ){
              cate = [...cate,...item.cates];
            }
            return {id:item.platform,name:item.platName}
          }));
        }

        if( !this.guild_type.category.some(item =>{return item.name === this.type_select.category}) ){
          this.type_select.category = ''
        }


        this.guild_type.category = duplicateObj(cate.map(item=>{
          return {id:item.cateId,name:item.cateName};
        }));
        this.guild_type.platform.unshift({
          id:0,
          name:'全部平台'
        });

        this.guild_type.category.unshift({
          id:0,
          name:'全部分类'
        });


        //存储及上报
        this.$store.dispatch('changeType', this.type_select);
        this.$emit('on-type-change', {
          groupId:this.getIdByName('group',this.type_select.group),
          platform:this.getIdByName('plat',this.type_select.plat),
          cateId:this.getIdByName('cate',this.type_select.category)
        });
      },
      change_plat(plat_name){
        //过滤、去重
        let plat = [],cate = [];
        console.log(this.type_select.group);
        if(this.type_select.group === '全部分组' || this.type_select.group === ''){
          this.total_type.forEach(item=>{
            try{
              plat = [...plat,...item.plats];
            }catch(err){}
          });
        }else{
          this.total_type.forEach(item=>{
            if(item.groupName === this.type_select.group){
              plat = item.plats ? item.plats : [];
              return false;
            }
          });
        }

        if( plat_name === '全部平台' ){
          plat.forEach(item =>{
            try{
              cate = [...cate,...item.cates]
            }catch(err){}
          });
        }else{
          plat.forEach(item =>{
            if(item.platName === plat_name && item.cates ){
              cate = [...cate,...item.cates]
            }
          });
        }

        this.guild_type.category = duplicateObj(cate.map(item=>{
          return {id:item.cateId,name:item.cateName};
        }));
        this.guild_type.category.unshift({
          id:0,
          name:'全部分类'
        });
        //检测及修改
        if( !this.guild_type.category.some(item =>{return item.name === this.type_select.category}) ){
          this.type_select.category = ''
        }

        //存储及上报
        this.$store.dispatch('changeType', this.type_select);
        this.$emit('on-type-change', {
          groupId:this.getIdByName('group',this.type_select.group),
          platform:this.getIdByName('plat',this.type_select.plat),
          cateId:this.getIdByName('cate',this.type_select.category)
        });
      },
      change_cate(cate){
        this.type_select.category = cate;
        this.$store.dispatch('changeType', this.type_select);
        this.$emit('on-type-change', {
          groupId:this.getIdByName('group',this.type_select.group),
          platform:this.getIdByName('plat',this.type_select.plat),
          cateId:this.getIdByName('cate',this.type_select.category)
        });
      },
      getIdByName(type,name){
        switch (type){
          case 'group':
            let selectGroupId ="all";
            this.guild_type.group.forEach(item=>{
              if(item.name === name){
                return  selectGroupId = item.id;
              }
            });
            return selectGroupId;
          case 'plat':
            let selectPlatId =0;
            this.guild_type.platform.forEach(item=>{
              if(item.name === name){
                return selectPlatId = Number(item.id);
              }
            });
            return selectPlatId;
          case 'cate':
            let selectCateId =0;
            this.guild_type.category.forEach(item=>{
              if(item.name === name){
                return selectCateId = Number(item.id);
              }
            });
            return selectCateId;
          default:
            return '0';
        }
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Anchor.getGroupTree();
        if(response === false) return ;
        this.$store.dispatch('set_total_type',response.data.groupTree);
        let plat = [],cate = [];
        this.guild_type.group = this.total_type.map(item=>{
          try{
            plat = [...plat,...item.plats];
          }catch(err){}
          return {id:item.groupId,name:item.groupName}
        });
        this.guild_type.group.unshift({
          name:"全部分组",
          id:'all'
        });
        this.guild_type.platform =duplicateObj(plat.map(item=>{
          try{
            cate = [...cate,...item.cates];
          }catch(err){}
          return {id:item.platform,name:item.platName}
        }));
        this.guild_type.platform.unshift({
          id:0,
          name:'全部平台'
        });
        this.guild_type.category = duplicateObj(cate.map(item=>{
          return {id:item.cateId,name:item.cateName};
        }));
        this.guild_type.category.unshift({
          id:0,
          name:'全部分类'
        });
        this.$store.dispatch('set_guild_type', this.guild_type);

        this.$emit('on-type-change', {
          groupId:this.getIdByName('group',this.type_select.group),
          platform:this.getIdByName('plat',this.type_select.plat),
          cateId:this.getIdByName('cate',this.type_select.category),
        });
      }
    },
    mounted() {
      if(!this.guild_type.group.length){
        this.getData();
      }else{
        this.$emit('on-type-change', {
          groupId:this.getIdByName('group',this.type_select.group),
          platform:this.getIdByName('plat',this.type_select.plat),
          cateId:this.getIdByName('cate',this.type_select.category),
        });
      }
    },
    destroyed() {

    }
  };
  export default vim


</script>
