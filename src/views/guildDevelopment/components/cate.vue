<template>
<div id="cate_box">
  <div v-if="list.length<=1">
    <span v-for="(item,index) in cateData" :data-id="item.typeId" @click="selected" :class="index===0?'cate_selected cate_content':'cate_content'">
      <i class="icon ">
      <img src="../../guildManagement/addHostStream/img/selected.png" alt="icon">
    </i> {{item.typeName}}</span>
  </div>
  <div v-else>
    <div class="box" v-for="(item,index) in cateData" >
      <span v-for="(val,key) in item" :data-id="val.typeId" @click="selected" :index="index" :key="key" :class="(index===0&&key===0)?'cate_selected cate_content':'cate_content'">
          {{val.typeName}}
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
  #cate_box .box{
    width: 100%;
    display: block;
    margin-bottom: 18px;
  }
  #cate_box .hoverBox:hover{
    color: #00afff;
    cursor:pointer
  }
  #cate_box  .hoverShow{
    padding:5px;
  }
  #cate_box .hoverShow:before{
    margin-right: 5px;
  }
  #cate_box .hoverBox{
    color: #c0c4cc;
    text-align: center;
    transition: all 0.3s;
  }
  #cate_box .cate_content{
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
  #cate_box .icon{
    display: none;
    width: 18px;
    height: 18px;
  }
  #cate_box .icon img{
    width: 100%;
    height: 100%;
  }
  #cate_box .cate_content.cate_selected{
    color: #247aff;
    position: relative;
    border-color: transparent;
    background-color: rgba(36, 122, 255, 0.1);
  }
  #cate_box .cate_content.cate_selected .icon{
    display: block;
    position: absolute;
    top: -9px;
    right: -9px;
  }
  #cate_box .cate_content+i{
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
        'category'
      ])
    },
    data() {
      return {
        cateData: [],
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
      this.cateData = [];
      if(!this.category.length){
        this.getData();
      }else{
        this.cateData = JSON.parse(JSON.stringify(this.category));
        if(this.cateData.length>0){
          this.selectedArr = [];
          if(this.cateData[0].typeName !== '全部'){
            let firstItem = {
              typeId:'',
              typeName:"全部"
            }
            this.cateData.unshift(firstItem)
          }
          this.selectedArr.push(this.cateData[0].typeId);
        }
        if(this.selectedArr.length>0){
          this.handleCate();
        }
      }
    },
    methods: {
      isShowFontFn(){
        //展开隐藏
        if(this.isShowFont.btn){
          //展开
          this.isShowFont={
            btn:false,
            font:'隐藏'
          }
          this.cateData = this.list;
        }else {
          this.isShowFont={
            btn:true,
            font:'展开'
          };
          this.cateData=[];
          this.cateData[0] = this.list[0];
        }
      },
      selected(e){
//        if(e.target.tagName === 'SPAN'){
//          let id = e.target.getAttribute('data-id');
//          if(id){
//            id = typeof id === 'string'?Number(id):id
//          }
//          let firstSpan = e.target.parentNode.parentNode.childNodes
//          if(e.target.innerText !=='全部'){
//            firstSpan[0].childNodes[0].className = 'cate_content';
//            let firstId = firstSpan[0].childNodes[0].getAttribute('data-id');
//            let cateData = 0;
//            this.cateData.forEach(item=>{
//              if(item.length>0){
//                item.forEach(value=>{
//                  cateData++
//                })
//              }else {
//                cateData++
//              }
//            })
//            if(this.selectedArr.length+1 === cateData){
//              this.selectedArr = [];
//            }
//            if(this.selectedArr.includes(id) ){
//              //删除
//              if(this.selectedArr.length<=1){
//                return false
//              }
//              this.selectedArr.splice(this.selectedArr.indexOf(id),1);
//              e.target.className='cate_content'
//            }else{
//              if(this.selectedArr.length>=3){
//                return false
//              }
//              //添加
//              this.selectedArr.push(id);
//              e.target.className='selected cate_content'
//            }
//          }else {
//            //等于全部
//            let array = [];
//            firstSpan.forEach((item,index)=>{
//              if(typeof item.childNodes === 'object'){
//                item.childNodes.forEach((val,key)=>{
//                  val.className = 'cate_content';
//                })
//              }
//            })
//            this.selectedArr = [''];
//            e.target.className='selected cate_content'
//          }
//          if(this.selectedArr.length>1){
//            if(this.selectedArr[0] === ''){
//              this.selectedArr.splice(0,1)
//            }
//          }
//          this.$emit('on-cate-select',this.selectedArr);
//        }

        if(e.target.tagName === 'SPAN'){
          let id = e.target.getAttribute('data-id');
          let eleArr = Array.from(document.getElementsByClassName('cate_content'));
          if(id){
            id = typeof id === 'string'?Number(id):id;
            if( this.selectedArr.includes( '' ) ){
              this.selectedArr = [id]
            }else{
              // console.log(e.target.className);
              if(e.target.className === "cate_selected cate_content"){
                this.selectedArr.splice(this.selectedArr.indexOf(id),1)
              }else{
                this.selectedArr.push(id)
              }
            }
          }else{
            this.selectedArr = [''];
          }
          // console.log(this.selectedArr);
          this.selectedArr = this.selectedArr.length ? this.selectedArr:[''];
          // console.log(this.selectedArr);
          eleArr.forEach(item=>{
            if( item.getAttribute('data-id') ){
              if( this.selectedArr.includes( Number(item.getAttribute('data-id')) ) ){
                item.setAttribute('class','cate_selected cate_content')
              }else{
                item.setAttribute('class','cate_content')
              }
            }else{
              if( this.selectedArr.includes( '' ) ){
                item.setAttribute('class','cate_selected cate_content')
              }else{
                item.setAttribute('class','cate_content')
              }
            }

          });
          this.$emit('on-cate-select',this.selectedArr)
        }
      },
      async getData(){
        const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
        if(response === false) return;
        let list  = JSON.parse(JSON.stringify(response.data.cateInfos));
        this.$store.dispatch("set_category",response.data.cateInfos);
        if(list[0].typeName !== '全部'){
          let firstItem = {
            typeId:'',
            typeName:"全部"
          }
          list.unshift(firstItem)
        }
        this.cateData = list;
        if(this.cateData.length>0){
          this.selectedArr.push(this.cateData[0].typeId);
        }
        this.handleCate();
      },
      handleCate(){
        if(this.cateData.length>9){
          let cateData = JSON.parse(JSON.stringify(this.cateData));
          let list = [];
          // 0-8 9-18 19-27
          let parseIntNum = parseInt(cateData.length/9);
          let item =[];
          for (let i=0,len=cateData.length;i<len;i++){
            if(i>parseIntNum*9){
              item.push(cateData[i]);
            }else {
              for (let k =1;k<=parseIntNum;k++){
                // 1 2 3
                if(k*9 === i){
                  list.push(item)
                  item = [];
                }
              }
              item.push(cateData[i]);
            }
          }
          list.push(item);
          item=[];
          this.list = list;
          if(this.list.length>3){
            //超过3行 大于27
            this.cateData = [];
            this.cateData[0] = list[0] //只显示一行，点击展开后全部展开
          }else {
            //超过9个小于27
            this.cateData = list
          }
        }
        this.$emit('on-cate-select',this.selectedArr);
      }
    }
  }
</script>
