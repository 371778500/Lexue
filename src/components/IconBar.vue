<template>
        <div class='iconbar' >
            <i :class='[iconClass,"iconbar-" + iconbarColor]'></i>
            <p class='icontext' v-text='iconText'></p>
            <slot></slot> 
        </div>      
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        props:['iconbarColor','iconClass','iconText'],
    }
</script>
<style lang='scss'>
    /* IconBar.vue */
    @import '../assets/css/function';
    $iconbar-color : (red,#ff4f57),(green,#25d5b9),(yellow,#ffc600),(orange,#ff8208);
    @each $c,$color in $iconbar-color {
        .iconbar-#{$c}{
            color:$color;
        }
    }
    .iconbar{
        position:relative;
        /*display:inline-flex;
        // 本身作为 inline会与其他的inline产生间距,父容器使用flex可解决这个问题 
        justify-content:center;
        align-items:center;*/
        width:pxtorem(70px) ;
        height:pxtorem(70px);
        text-align:center;
        /*flex-flow:column wrap;*/
        i{
            font-size:pxtorem(48px);
        }
        p.icontext{
            margin-top:pxtorem(4px);
            font-size:pxtorem(12px);
            text-align:center;
            color:#666;
        }
    }

</style>