<template>
  <div>
    <div :class="popover?'popover popoverHover':'popover'" v-html="content">

    </div>
  </div>
</template>
<style scoped>
  .popover{
    display: none;
    background: #fff;
    opacity: 1;
    position: absolute;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    top: 50px;
    z-index: 2000;
    color: #606266;
    line-height: 1.5;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .popoverHover{
    display: block!important;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      popover: {
        type:Boolean
      }
    },
    computed: {
      ...mapGetters([
        'platform'
      ]),
    },
    data() {
      return {
        content:"小&nbsp;&nbsp;土&nbsp;&nbsp;豪：最近30天在平台累计打赏5000元-1万元<br/>" +
        "大&nbsp;&nbsp;土&nbsp;&nbsp;豪：最近30天在平台累计打赏1-5万<br/>" +
        "超级土豪：最近30天在平台累计打赏5-20万<br/>" +
        "顶级土豪：最近30天在平台累计打赏20万以上",
      }
    },
    watch:{

    },
    created() {},
    methods: {

    }
  }
</script>
