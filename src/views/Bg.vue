<template>
    <div class='bg' :style='{height:bgHeight}'>
        <div class='start'>
            <img class='slogan' src="~assets/slogan.png" alt="assets/Miku.jpg">
        </div>
        <div class='book'>
            <img src="~assets/book.png" alt="">
        </div>
        <div class='logo'>
            <img src="~assets/icon_ulexue.png" alt="">
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                bgHeight:document.documentElement.clientHeight +'px',
            }
        },
        mounted(){
            //3s后进入登录界面.
            setTimeout(()=>{
                this.$router.push("Login");
                // this.$router.push("Main");
            },3000)
        }
    }
</script>
<style lang='scss'>
    /* bg.vue */
    
    @import '../assets/css/function.scss';
    @keyframes move {
        0% {
            top: pxtorem(5px);
        }
        25% {
            top: pxtorem(20px);
 
        }
        50% {
            top: pxtorem(30px);
        }
        75% {
            top: pxtorem(20px);
        }
        100% {
            top: pxtorem(5px);
        }
    }
    
    .bg {
        position:relative;
        background: white;
        text-align: center;
        /*padding-bottom:pxtorem(20px);*/
        .start {
            position: absolute;
            top: pxtorem(5px);
            left: pxtorem(65px);
            padding-top: pxtorem(0px);
            animation: move 2s linear 0s infinite alternate;
            img {
                width: pxtorem(200px);
                
            }
        }
        .book {
            padding-top: pxtorem(300px);
            img {
                width: pxtorem(156px);
            }
        }
        .logo {
            /*position:fixed;
            bottom:pxtorem(40px);
            left:pxtorem(120px);*/
            padding-top: pxtorem(45px);
            img {
                width: pxtorem(87.5px)
            }
        }
    }
</style>