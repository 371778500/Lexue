<template>
    <transition name='expand'>
        <i class = 'icon iconTop' @click = 'goTop'  v-show ='show'></i>
    </transition>
</template>
<style scoped>
    .icon{
        background:url('../assets/goTop.png') center center no-repeat;
        display:block;
        width:50px;
        height:50px;
        cursor:pointer;  
    }
    .iconTop{
        position: fixed;
        bottom:80px;
        right: 20px;
        z-index: 9999;
    }
    .expand-enter-active, .expand-leave-active {
        transition: opacity .8s
    }
    .expand-enter, .expand-leave-active {
         opacity: 0
    }
</style>
<script>
    export default{
        data(){
            return {
                show:false
            }
        },
        mounted(){
                $(window).on('scroll',()=>{
                    if($(window).scrollTop() > 100){
                        this.show = true;
                    }else{
                        this.show = false;
                    }
                })
            },
        beforeDestroy(){
            $(window).off('scroll')
        },
        methods:{
            goTop(){
                $(window).scrollTop(0)
                this.show = false 
            }
        }
    }
</script>