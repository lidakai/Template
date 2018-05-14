<template>
  <div class="richerInfo-container">
    <div class="richerInfo-header">
      <h3 class="richerInfo-header_title" style="display: inline-block;margin-right: 0">土豪概况 </h3>
      <p style="display: inline-block">（近三十天土豪数据）</p>
    </div>
    <div class="richerInfo-content">
     <div style="margin-bottom: 40px">
       <!--<plat-component @on-platform-change="platformChange"></plat-component>-->
       <Cloumn-List-Component @on-Cloumn-change="CloumnChange"></Cloumn-List-Component>
       <!--<cate-component @on-category-change="categoryChange"></cate-component>-->
     </div>
      <el-row class="padingBox">
        <el-col :xs="24" :sm="24" :lg="12" class="column_list">
          <div class="chart-wrapper" id="chart-wrapper1">
            <pie-chart-component :chart-data="formData.spreadData" ></pie-chart-component>
            <div v-if="formData.spreadData.data.length<=0" class="spreadDataBox_">暂无数据</div>
            <div v-else>
              <span class="codeBtn" @mouseout="popoverFn(false,1)" @mouseover="popoverFn(true,1)"><img :src="what_tips" alt="" style="height: 18px;"></span>
              <Popover-component :popover="popoverTuo"></Popover-component>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" class="column_list">
          <div class="chart-wrapper" id="chart-wrapper2">
            <!--<bar-chart-component :chart-data="formData.active_num_form"></bar-chart-component>-->
            <bar-chart-component :chart-data="formData.lieSpreadData" :height="height"></bar-chart-component>
            <div v-if="!(formData.lieSpreadData.data.length>0)" class="spreadDataBox_">暂无数据</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" class="column_list">
          <div class="chart-wrapper chart-wrapper3" id="chart-wrapper3">
            <pie-chart-component :chart-data="formData.enjoyData" ></pie-chart-component>
            <div v-if="!(formData.enjoyData.data.length>0)" class="spreadDataBox_">暂无数据</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12" class="column_list">
          <div class="chart-wrapper chart-wrapper3" id="chart-wrapper4">
            <!--<bar-chart-component :chart-data="formData.active_num_form"></bar-chart-component>-->
            <bar-chart-component :chart-data="formData.lieEnjoyData" :height="height"></bar-chart-component>
            <div v-if="!(formData.lieEnjoyData.data.length>0)" class="spreadDataBox_">暂无数据</div>
          </div>
        </el-col>


      </el-row>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .chart-wrapper{
    position: relative;
    background-color: #ffffff;
    box-shadow: 0px 6px 8px 0px
    rgba(0, 0, 0, 0.04);
    margin:0 10px 40px;
    padding: 10px;
  .spreadDataBox_{
    position: absolute;
    top: 50%;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    left: 50%;
    margin-left: -100px;
    margin-top: -50px;
    color: #cccccc;
  }
  }
  .richerInfo-container{
    .richerInfo-header{
      margin-bottom: 10px;
      .richerInfo-header_title{
        font-size: 26px;
        font-weight: normal;
        height:36px;
        line-height: 36px;
        color: #464851;
        margin:0 30px 0 0;
      }
    }
    .richerInfo-content{
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.04);
      background: #fff;
      .padingBox{
        padding:  0  50px 30px;
      }
    }
    .column_list:nth-of-type(2n+1){
      .chart-wrapper{
        margin-left: 0;
      }
    }
    .column_list:nth-of-type(2n){
      .chart-wrapper{
        margin-right: 0;
      }
    }
  }
  #chart-wrapper1{
   position: relative;
    span.codeBtn{
      color: #cccccc;
      position: absolute;
      left: 11%;
      top: 4.8%;
      cursor: pointer;
      z-index: 99;
    }
  }
  @media only screen and (max-width: 1200px){
    .profit-container .chart-wrapper{
      margin-left:0;
      margin-right:0;
    }
  }
</style>


<script>
  import pieChartComponent from '@/components/Echart/pieChart'
  import barChartComponent from '@/components/Echart/barChart'
  import CloumnListComponent from '@/components/CloumnList/index'
  import platComponent from './components/plat.vue'
  import cateComponent from './components/cate.vue'
  import {sort,Arrangement} from '../../utils/index'
  import { mapGetters } from 'vuex'
  import { Loading } from 'element-ui';
  import PopoverComponent from '@/components/Popover/index'

  import what_tips from '@/assets/what.png';
  let formData_test = {
    spreadData :{
      title:'土豪分布',
      data :[]
    },
    enjoyData:{
      title:'土豪偏好',
      data :[]
    },
    lieSpreadData:{
    name:'不同时段打赏金额分布',
      coordinate:[],
      data:[]
  },
    lieEnjoyData:{
    name:'打赏金额分布',
      coordinate:[],
      data:[]
  },
  }
  export default {
    components: {
      pieChartComponent,
      barChartComponent,
      platComponent,
      cateComponent,
      CloumnListComponent,
      PopoverComponent
    },
    computed: {
      ...mapGetters([
        'category'
      ]),
    },
    name: 'richerInfo',
    data() {
      return {
        height:'295px',
        parameter : {
          platform:'',
          roomId:''
        },
        popover:false,
        popoverTuo:false,
        formData:{
          spreadData:{ data:[]},
          enjoyData:{ data:[]},
          lieSpreadData:{ data:[]},
          lieEnjoyData:{data:[]}
        },
        what_tips
      }
    },
    methods: {
      popoverFn(btn,code){
        if(code === 1){
          this.popoverTuo = btn;
        }else {
          this.popover = btn;
        }
      },
      CloumnChange(value){
        formData_test = {
          spreadData :{
            title:'土豪分布',
            data :[]
          },
          enjoyData:{
            title:'土豪偏好',
            data :[]
          },
          lieSpreadData:{
            name:'不同时段打赏金额分布',
            coordinate:[],
            data:[]
          },
          lieEnjoyData:{
            name:'打赏金额分布',
            coordinate:[],
            data:[]
          },
        }
        this.formData = {
          spreadData:{},
          enjoyData:{},
          lieSpreadData:{},
          lieEnjoyData:{}
        };
        this.parameter.platform = value.platform
        if(value.platform !== ''&&value.platform !=0){
          this.clearData(); //获取新数据，数据重置
        }
      },
      async getTuhaoDistribution(){
        let options = {
          target:'#chart-wrapper1'
        }
        let loadingInstance = Loading.service(options);
        // 1
        formData_test.spreadData.data = [];
        const response = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getTuhaoDistribution(this.parameter);
        if(response === false){
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          this.formData.spreadData.data = false
          return
        };
        if(response.code === 0){
          let data = response.data;
          let list  = data.tuhaoDistributionList||[];
          if(list.length<=0){
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close();
            });
            this.formData.spreadData.data = false
          }
          let tuhao = [{type:1,name:'顶级土豪'},{type:2,name:'超级土豪'},{type:3,name:'大土豪'},{type:4,name:'小土豪'}]
          list.forEach((v,k)=>{
            tuhao.forEach((item,index)=>{
              if(v.type === item.type){
                v.name = item.name
              }
              v.value = typeof v.count === "string"?Number(v.count):v.count
            })
          })
          formData_test.spreadData.data = list;
        }
         this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
         loadingInstance.close();
       });
        this.getData();
      },
      async getCatePreference(){
        let options = {
          target:'#chart-wrapper3'
        }
        let options1 = {
          target:"#chart-wrapper4"
        }
        let loadingInstance = Loading.service(options);
        let loadingInstance1 = Loading.service(options1);
        formData_test.enjoyData.data = [];
        formData_test.lieEnjoyData.data = [];
          // 3 4
        let data = {
          "platform": this.parameter.platform,
          "userType": 2 //1==>普通用户 2==>土豪用户，后端辨别身份！
        }
        const CatePreference = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getCatePreference(data);
        if(CatePreference === false){
          this.formData.lieEnjoyData.data = false
          this.formData.enjoyData.data = false
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
            loadingInstance1.close();
          });
          return
        };
        if(CatePreference.code === 0){
          let data = CatePreference.data
          let list = data.catePreferenceList||[]
          if(list.length<=0){
            this.formData.lieEnjoyData.data = false
            this.formData.enjoyData.data = false
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close();
              loadingInstance1.close();
            });
          }
          let category = JSON.parse(JSON.stringify(this.category))
          if(category.length<=0){
            const response = await this.$api_zbb.service.ZhibobaoGuildData.General.getCateInfo();
            if(response === false) return;
            category = response.data.cateInfos;
          }
          if(typeof list === 'object'){
            list.forEach((v,k)=>{
              let msg = ''
              category.forEach((item,index)=>{
                if(item.typeId == v.cateId){
                  msg = item.typeName
                }else if(v.cateId === "other"){
                  msg = '其它'
                }
              })
              v.name = msg||'未知';
              v.value = v.count;
            })
          }else {
            list = []
          }
          if(list.length<=0){
            return false
          }
          list.forEach((item,index)=>{
            if(item.cateId=== 'all'){
              list.splice(index,1)
            }
          })
          list = list.splice(0,6)
          formData_test.enjoyData.data = list;
        }
        formData_test.lieEnjoyData = {
          name:'打赏金额分布',
          data:formData_test.enjoyData.data.map(item=>{
            return {
              value: item.price
            }
          }),
          coordinate:formData_test.enjoyData.data.map(item=>{
            return item.name
          })
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
          loadingInstance1.close();
        });
        this.getData();
      },
      async getActiveTime(){
        let options = {
          target:'#chart-wrapper2'
        }
        let loadingInstance = Loading.service(options);
        // 2
        formData_test.lieSpreadData.data = [];
        let ActiveTimeData = {
          "platform":this.parameter.platform,
          "userType": 2, //1==>普通用户 2==>土豪用户，后端辨别身份！
          "type": 2
        }
        const ActiveTime = await this.$api_zbb.service.ZhibobaoGuildData.Audience.getActiveTime(ActiveTimeData);
        if(ActiveTime === false){
          this.formData.lieSpreadData.data = false;
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          return;
        }
        if(ActiveTime.code === 0){
          let list = ActiveTime.data.audienceActiveTimeList||[];
          if(list.length<=0){
            this.formData.lieSpreadData.data = false;
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close();
            });
          }
          if(typeof list !== 'object'){
            list = []
          }
          formData_test.lieSpreadData = {
            name:'不同时段打赏金额分布',
            coordinate:list.map(item=>{
              return item.hours
            }),
            data:list.map(item=>{
              return {
                value:item.count
              }
            })
          }
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        this.getData();
      },
      async clearData(){
        this.formData.spreadData.data =[]; // 1

        this.formData.enjoyData.data = [];  // 3 4

        this.formData.lieEnjoyData.data = [];

        this.formData.lieSpreadData.data = [];  // 2

        /**
         * 以上代码作用  修改echares setoption data 值 ，触发 loading 效果！
         * **/
        this.getTuhaoDistribution(); //1
        this.getActiveTime();  //2
        this.getCatePreference();  // 3.4
      },
       getData(){
        let spreadData = {
          nameArr:formData_test.spreadData.data.map(item=>{
            return item.name
          }),
          data:formData_test.spreadData.data.map(item=>{
            return {value:item.value,name:item.name,count:Number(item.count)}  /*((item.value/formData_test.spreadData.Total)*100).toFixed(2)+'%'*/
          }),
          title:formData_test.spreadData.title
        };
         this.formData.spreadData = spreadData
        let enjoyData = {
          nameArr:formData_test.enjoyData.data.map(item=>{
            return item.name
          }),
          data:formData_test.enjoyData.data.map(item=>{
            return {value:item.value,name:item.name,count:item.count,code:'enjoyData'}
          }),
          title:formData_test.enjoyData.title,
        };
         this.formData.enjoyData = enjoyData;
        this.formData.lieSpreadData = {
          coordinate: formData_test.lieSpreadData.data.map((item,index)=>{
            let inx = 0;
            if(0<index+1&&index+1<=24){
              inx = index+1;
            }else {
              inx = false
            }
            return inx
          }),
          name:formData_test.lieSpreadData.name,
          title:formData_test.lieSpreadData.name,
          coordinateType:'ActiveTime',
          data:formData_test.lieSpreadData.data.map((item,index)=>{
            let inx = 0;
            if(0<index+1&&index+1<=24){
              inx = index+1;
            }else {
              inx = false
            }
             return {
               value:item.value,
               id:inx,
               itemStyle:{
                 normal:{color:'#deeafe'}
               }
             }
          })
        }
        this.formData.lieSpreadData.data = Arrangement(this.formData.lieSpreadData.data); // 数据整理，写成公共方法了！

        let colorList = ['#67a3ff','#91bdff','#c2daff','#e8f1ff','#ecf7fc']
        let list = sort(JSON.parse(JSON.stringify(formData_test.lieEnjoyData.data)))
        let lieEnjoyData = {
          data:formData_test.lieEnjoyData.data.map((item,index)=>{
            return {
              value : item.value,
              itemStyle:{
                normal:{
                  color:this.returnColor(item,colorList,list)
                }
              }
            }
          }),
          name:formData_test.lieEnjoyData.name,
          title:formData_test.lieEnjoyData.name,
          coordinate:formData_test.lieEnjoyData.coordinate
        };
         this.formData.lieEnjoyData = lieEnjoyData
      },
      returnColor(item,colorList,list){
        let color = '';
        list.forEach(((val,index)=>{
          if(item.value === val.value){
            color = (index+1)>colorList.length?'#fff':colorList[index]
          }
        }))
        return color
      }
    },
    created() {

    },
    destroyed() {

    }
  }

</script>
