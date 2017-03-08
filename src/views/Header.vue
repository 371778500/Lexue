<template>
    <div class='head-bar'>
        <div class='header' :style="{background:bgcolor}">
            <span v-if='text'>{{ text }}</span>
            <span v-else>
                <!-- 如果text的truthness为false,渲染父组件中slot名为timer的组件,如果父组件中没有这个组件,显示no timer -->
                <slot name='timer'></slot>
                <slot name='search'></slot>

            </span>
        </div>
        <!-- 如果在父组件内部调用了slot名为的goback的组件,会将其渲染进来,代替这个goback -->
        <slot name='goback'></slot>
        <slot name='bell'></slot>
    </div>   
</template>
<script>
    export default {
          data(){
              return {
                  
              }
          },
          props:['text','bgcolor'],
          methods:{
              goback(){
                  //返回到上一个状态
                  this.$router.go(-1);
              }
          }
    }
</script>
<style lang='scss'>
/* Header.vue */
@import "../assets/css/function";
$baseColor : white;
$headColor : #e83426;

/*@function max_height($px)*/
    .head-bar{
        position:relative;
        .header{
            width:100%;
            height:pxToRem(50px);
            background: $headColor;
            text-align: center;
            font-size:pxToRem(20px);
            line-height:50px;
            color:$baseColor;
            max-height:50px;
        }
        
    }
    @media screen and (min-width:768px){
        .head-bar{
            .icon-content{
                .icon{
                    font-size:35px;
                }
            }
        }
    }
</style>
