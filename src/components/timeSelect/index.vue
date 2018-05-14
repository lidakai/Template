<template>
  <div class="timeSelect-container">
    <span @click="quickSelect" data-offset="30" class="currentTimeSelect">近30天</span>
    <span @click="quickSelect" data-offset="7">近7天</span>
    <div class="block">
      <el-date-picker
        v-model="data_direction_time"
        type="daterange"
        align="left"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .timeSelect-container{
    height:36px;
    line-height:36px;
    /*padding:0 20px 0 0;*/
    /*margin-bottom: 42px;*/
    width:332px;
    display: inline-block;
    span{
      float: left;
      margin-right: 20px;
      cursor: pointer;
      color: #464851;
      position: relative;
      z-index: 2;
    }
    .currentTimeSelect{
      color: #3083ff;
    }
    .el-range-editor--medium.el-input__inner{
      width:200px;
      text-align: center;
      padding: 3px 0;
    }
  }
</style>
<style>
  .timeSelect-container .el-range-editor--medium .el-input__icon{
    display: none;
  }
</style>
<script>
  import { parseTime, getStringTime } from '@/utils'
  import logo_text from '@/assets/login/logo_text.png'
  export default {
    data() {
      return {
        logo_text,
        data_direction_time: [getStringTime(30), getStringTime(1)],
        pickerOptions: {
          maxTime: Date.now(),
          disabledDate: function(time) {
            if (time.getTime() > new Date().getTime() - 3600 * 1000 * 24) return true;
            if (time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 90) return true
          },
          onPick: ({minDate,maxDate}) => {
            if( minDate && maxDate){
              this.data_direction_time = [minDate,maxDate];
              try{
                document.querySelectorAll('.currentTimeSelect')[0].removeAttribute('class');
              }catch(err){}
              this.timeChange();
            }
          }
        },
      }
    },
    methods: {
      timeChange(){
        this.$emit('on-time-change',{from:parseTime(this.data_direction_time[0],'{y}-{m}-{d}'),to:parseTime(this.data_direction_time[1],'{y}-{m}-{d}')})
      },
      quickSelect(e){
        if(e.target.className!=='')return;
        if(document.querySelectorAll('.currentTimeSelect').length){
          document.querySelectorAll('.currentTimeSelect')[0].removeAttribute('class');
        }
        e.target.className='currentTimeSelect';
        const end = new Date();
        const start = new Date();
        const offset = e.target.getAttribute('data-offset');
        start.setTime(start.getTime() - 3600 * 1000 * 24*offset);
        end.setTime(end.getTime() - 3600 * 1000 * 24);
        this.data_direction_time = [start,end];
        this.timeChange();
      }
    },
    created() {
      this.timeChange();
    },
    destroyed() {}
  }

</script>
