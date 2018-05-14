<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="item.hideChildren || (item.children.length===1 && !item.children[0].children)" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <i :class="item.children[0].meta.icon"></i>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <i :class="child.meta.icon"></i>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  created(){}
}
</script>

<style>
  .menu-wrapper li i{
    display: inline-block;
    margin-right: 10px;
  }
  .menu-wrapper li i.general{
      width:19px;
      height:18px;
      background: url('../../img/general.png') no-repeat 0 0;
      -webkit-background-size: 100%;
      background-size: 100%;
  }
  .menu-wrapper li i.data{
    width:19px;
    height:18px;
    background: url('../../img/data.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .menu-wrapper li i.guildDev{
      width:21px;
      height:17px;
      background: url('../../img/guildDev.png') no-repeat 0 0;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  .menu-wrapper li i.center{
      width:20px;
      height:22px;
      background: url('../../img/center.png') no-repeat 0 0;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  .menu-wrapper li i.guildManage{
      width:21px;
      height:22px;
      background: url('../../img/guildManage.png') no-repeat 0 0;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  .menu-wrapper li i.richer{
      width:18px;
      height:22px;
      background: url('../../img/richer.png') no-repeat 0 0;
      -webkit-background-size: 100%;
      background-size: 100%;
  }




  .menu-wrapper li.is-active i.general{
    width:19px;
    height:18px;
    background: url('../../img/general_selected.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .menu-wrapper li.is-active i.data{
    width:19px;
    height:18px;
    background: url('../../img/data_selected.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .menu-wrapper li.is-active i.guildDev{
    width:21px;
    height:17px;
    background: url('../../img/guildDev_selected.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .menu-wrapper li.is-active i.center{
    width:20px;
    height:22px;
    background: url('../../img/center_selected.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .menu-wrapper li.is-active i.guildManage{
    width:21px;
    height:22px;
    background: url('../../img/guildManage_selected.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .menu-wrapper li.is-active i.richer{
    width:18px;
    height:22px;
    background: url('../../img/richer_selected.png') no-repeat 0 0;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  #app .menu-wrapper li.el-menu-item.is-active{
    background: #ecf5ff!important;
  }
</style>

