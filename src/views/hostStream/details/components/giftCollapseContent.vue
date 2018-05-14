<template>
  <div>
    <p v-for=" content in  ContentList"  :key="content.time" >
      <span>{{content.time}}</span>给<i>{{content.nickname}}</i>送出{{content.giftConut}}个{{content.price}}元的礼物
    </p>
  </div>

</template>

<script>
  export default {
    props: {
      dataContent: {
        type: Array,
      }
    },
    data() {
      return {
        ContentList:[]
      }
    },
    created() {
      this.ContentList = this.dataContent;
    },
    methods: {
        updateData(data){
          this.ContentList = data;
        }
    }
  }
</script>
