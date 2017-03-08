<template>
    <transition name="toast">
        <div class="toast" v-show="showa">
            <div class="toast-info">
                {{text}}
            </div> 
        </div>
    </transition>
</template>
<script>
    var num = 0 ;
    export default{
        data(){
            return{
                showa:""
            }
        },
        props:["text"],
        watch:{
            text:function(newTest){
                console.log("watch"+newTest)
                this.showa=true
                setTimeout(()=>{
                    this.showa=false
                },1000)
            }
        },
        beforeCreate(){
            console.log("beforeCreate")
        },
        created(){
            console.log("created")
        },
        beforeMount(){
            console.log("beforeMount")
        },
        mounted(){
            console.log("mounted")
        },
        beforeUpdate(){
            console.log("beforeUpdate")
        },
        updated(){
            console.log("updated")
        },
        beforeDestroy(){
            console.log("beforeDestroy")
        },
        destroyed(){
            console.log("destroyed")
        }

    }
</script>
<style lang="scss">
    /*Toast.vue*/
    @import "../assets/css/function.scss";
    .toast{
        .toast-info{
            position:fixed;
            bottom:pxToRem(250px);
            left:pxToRem(85px);
            z-index:999;
            width:pxToRem(150px);
            padding:pxToRem(20px) 0;
            background:rgba(0,0,0,0.6);
            color:#ddd;
            text-align:center;
            font-size:pxToRem(14px);
        }
    }
    .toast-enter-active， .toast-leave-active{
        transition:all 1s
    }
    .toast-enter, .toast-leave-active{
        opacity:0;
        bottom:0;
    }
</style>