<template>
  <div>
  <p> {{ text }} </p>
  </div>
</template>
<style scoped>
  p{
    text-align: center;
    font-family:"微软雅黑";
    margin-top: -250px;
    color:rgba(255, 255, 255, 0.9);
    width:100%;
  }
  div{
    display: flex;
    height: 568px;
    width:100%;
    background: orange;
    justify-content: center;
    align-items: center;
  }
</style>
<script>
  export default{
    data(){
      return {
        text:'缺口暂缺!',
      }
    },
    mounted(){
      this.text = this.$route.query.data ? this.$route.query.data : this.text  ;
    }
  }
</script>
