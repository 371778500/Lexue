<template>
    <div class='icon-content'  @click='goback'>
            <span class='icon'><i class='icon-angle-left'></i></span>
    </div>
</template>
<script>
    export default{
        methods:{
                    goback(){
                        //返回到上一个状态
                        this.$router.go(-1);
                    }
                }
            }
</script>
<style lang='scss'>
@import '../assets/css/function';
$baseColor : white;
.icon-content{
            position:absolute;
            /*top:pxToRem(10px);*/
            top:0;
            left:0;
            height:100%;
            width:15%;
            .icon{
                font-size:pxToRem(30px);
                color:$baseColor;
                height:100%;
                display:flex;
                justify-content:center;
                align-items:center;
            }
        }
</style>