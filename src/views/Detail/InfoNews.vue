<template>
    <div class='infoNews'>
        <iframe :src="news" :height="height" width="100%"></iframe>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                news:"http://academy.yonyou.com/API/News_Notice.aspx?type=1&infoid="+this.$route.params.id,
                height:document.documentElement.clientHeight+'px'
            }
        },
        mounted(){
            this.updateNews();
        },
        methods:{
           updateNews(){
               var userId=JSON.parse(window.sessionStorage.user).userId;
               this.$http.post('/app/delNewsInfo',{userId:userId,infoId:this.$route.params.id}).then((res)=>{
                    console.log(res);
               });
           } 
        }
    }
</script>
<style lang='scss'>
    /* infoNews.vue */
     @import '../../assets/css/function';
    .infoNews{

    }
</style>