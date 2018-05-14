<template>
  <div>
    <p v-for=" content in  ContentList"  :key="content.time" >
      <span>{{content.time}}</span>对<i>{{content.nickname}}</i>说 <span class="barrage-content">{{content.content}}</span>
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
