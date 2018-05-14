<template>
  <div id="plat_box">
    <div v-if="list.length<=1">
      <span v-for="(item,index) in platData" :data-id="item.platform" @click="selected" :class="index===0?'selected plat_content':'plat_content'">
       <i class="icon">
          <img src="../../guildManagement/addHostStream/img/selected.png" alt="icon">
        </i>
        {{item.name}}</span>
    </div>
    <div v-else>
      <div class="box" v-for="(item,index) in platData" >
    <span v-for="(val,key) in item" :data-id="val.platform" @click="selected" :index="index" :key="key" :class="(index===0&&key===0)?'selected plat_content':'plat_content'">
        {{val.name}}
        <i class="icon">
          <img src="../../guildManagement/addHostStream/img/selected.png" alt="icon">
        </i>
    </span>
      </div>
      <div class="hoverBox" v-if="list.length>3">
        <span :class="isShowFont.btn?'el-icon-caret-bottom hoverShow':'el-icon-caret-top hoverShow'" @click="isShowFontFn">{{isShowFont.font}}</span>
      </div>
    </div>
  </div>

</template>
<style>
  #plat_box .box{
    width: 100%;
    display: block;
    margin-bottom: 18px;
  }
  #plat_box .plat_content{
    display: inline-block;
    text-align: center;
    min-width: 82px;
    height: 28px;
    border-radius: 2px;
    border: solid 2px rgba(36, 122, 255, 0.2);
    margin-left: 20px;
    color: #247aff;
    font-size: 14px;
    padding: 0 12px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    line-height: 24px;
  }
  #plat_box .icon{
    display: none;
    width: 18px;
    height: 18px;
  }
  #plat_box .icon img{
    width: 100%;
    height: 100%;
  }
  #plat_box .plat_content.selected{
    color: #247aff;
    position: relative;
    border-color: transparent;
    background-color: rgba(36, 122, 255, 0.1);
  }
  #plat_box .plat_content.selected .icon{
    display: block;
    position: absolute;
    top: -9px;
    right: -9px;
  }
  #plat_box .plat_content+i{
   float: left;
    width:70px;
    font-size: 16px;
    font-style: normal;
    color: #3b77ff;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'userInfo',
        'platform'
      ])
    },
    data() {
      return {
        platData: [],
        selectedArr:[],
        list:[],
        isShowFont:{
          btn:true,
          font:'展开'
        }
      }
    },
    created() {

    },
    activated(){
      this.platData = [];
      if(!this.platform.length){
        this.getData();
      }else{
        this.platData = JSON.parse(JSON.stringify(this.platform));
        if(this.platData.length>0){
          this.selectedArr = []
          if(this.platData[0].name !== '全部'){
            let firstItem = {
              platform:'',
              alias:'all',
              name:"全部"
            }
            this.platData.unshift(firstItem)
          }
          let id = this.platData[0].platform;
          if(id === ''){

          }else {
            id = typeof id === 'string'?Number(id):id
          }
          this.selectedArr.push(id);
        }
        if(this.selectedArr.length>0){
          this.handlePlat();
        }
      }
    },
    methods: {
      selected(e){
        if(e.target.tagName === 'SPAN'){
        let id = e.target.getAttribute('data-id');
        if(id){
          id = typeof id === 'string'?Number(id):id
        }
        let firstSpan = e.target.parentNode.parentNode.childNodes
          if(e.target.innerText !=='全部'){
            firstSpan[0].childNodes[0].className = 'plat_content';
            let firstId = firstSpan[0].childNodes[0].getAttribute('data-id');
            let platData = 0;
            this.platData.forEach(item=>{
              if(item.length>0){
                item.forEach(value=>{
                  platData++
                })
              }else {
                platData++
              }

            })
            if(this.selectedArr.length+1 === platData){
              this.selectedArr = [];
            }
            if( this.selectedArr.includes(id) ){
              if(this.selectedArr.length<=1){
                return false
              }
              this.selectedArr.splice(this.selectedArr.indexOf(id),1);
              e.target.className='plat_content'
            }else{
              this.selectedArr.push(id);
              e.target.className='selected plat_content'
            }
        }else {
            firstSpan.forEach((item,index)=>{
              if(typeof item.childNodes === 'object'){
                item.childNodes.forEach((val,key)=>{
                  val.className = 'plat_content';
                })
              }
            })
            this.selectedArr = [''];
            e.target.className='selected plat_content'
          }
          if(this.selectedArr.length>1){
            if(this.selectedArr[0] === ''){
              this.selectedArr.splice(0,1)
            }
          }
        this.$emit('on-plat-select',this.selectedArr);
        }
      },
      isShowFontFn(){
        //展开隐藏
        if(this.isShowFont.btn){
          //展开
          this.isShowFont={
            btn:false,
            font:'隐藏'
          }
          this.platData = this.list;
        }else {
          this.isShowFont={
            btn:true,
            font:'展开'
          }
          this.platData=[];
          this.platData[0] = this.list[0];
        }
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getPlatInfo();
        if(response === false) return;
        let list  = JSON.parse(JSON.stringify(response.data.platInfos));
        this.$store.dispatch("set_platform",response.data.platInfos);
        if(list[0].name !== '全部'){
          let firstItem = {
            platform:'',
            alias:'all',
            name:"全部"
          }
          list.unshift(firstItem)
        }
        this.platData = list;
        if(this.platData.length>0){
          let id = this.platData[0].platform;
          if(id !== ''){
            id = typeof id === 'string'?Number(id):id
          }
          this.selectedArr.push(id);
        }
        this.handlePlat();
      },
      handlePlat(){
        if(this.platData.length>9){
          let platData = JSON.parse(JSON.stringify(this.platData));
          let list = [];
          // 0-8 9-18 19-27
          let parseIntNum = parseInt(platData.length/9);
          let item =[];
          for (let i=0,len=platData.length;i<len;i++){
            if(i>parseIntNum*9){
              item.push(platData[i]);
            }else {
              for (let k =1;k<=parseIntNum;k++){
                // 1 2 3
                if(k*9 === i){
                  list.push(item)
                  item = [];
                }
              }
              item.push(platData[i]);
            }
          }
          list.push(item);
          item=[];
          this.list = list;
          if(this.list.length>3){
            //超过3行 大于27
            this.platData = [];
            this.platData[0] = list[0] //只显示一行，点击展开后全部展开
          }else {
            //超过9个小于27
            this.platData = list
          }
        }
        this.$emit('on-plat-select',this.selectedArr);
      }
    }
  }
</script>
