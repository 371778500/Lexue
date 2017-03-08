<template>
    <div class="course-info">
        <router-link :to="'/Main/choose-Lesson/lesson/'+ index +'/'+to " class="course-link" >
            <img class="course-img" :src="src" alt="" @error='changeImage($event)'>        
            <p class="course-name">{{ courseName }}</p>
            <i class="i icon-angle-right"></i> 
            <p class="price"><span class="old-price"><i class="iconfont icon-oldPrice"></i>原价:{{oldPrice  | accounting(0) }}</span><span class="new-price"><i class="iconfont icon-newPrice"></i>优惠后:{{newPrice | accounting(0)  }}</span></p>
        </router-link>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        props:['src','courseName','oldPrice','newPrice','to','index'],
        methods:{
            //设置图片加载不出来,或者图片本身不存在时 对应的图片
            changeImage(event){
                var target = event.target;
                target.src="../../static/lesson-default.svg"
                console.log(target.src)
            }
        }
    }
</script>
<style lang="scss">
    /*CourseInfo.vue*/
    /*使用该组件时需要清理浮动*/
    $basecolor:white;
    @import '../assets/css/function.scss';
    .course-info{
        font-family:'黑体';
        width:pxToRem(290px);
        height:pxtorem(100px);
        background-color:$basecolor;
        margin:pxToRem(15px) pxToRem(10px) 0 pxToRem(15px);
        position:relative;
        border-bottom:1px solid #e5e5e5;
        overflow:hidden;
        .course-link{
            color:#000;
            .i{
                position:absolute;
                right:pxtorem(0px);
                top:pxtorem(25px);
            }
            .course-img{
                width:pxToRem(114px);
                height:pxtorem(76px);
            }
            .course-name{
                position:absolute;
                display:block;
                width:pxtorem(155px);
                height:pxtorem(27px);
                line-height: pxtorem(14px);
                left:pxtorem(130px);
                overflow:hidden;
                text-overflow: ellipsis;
			    overflow: hidden;
                top:10px;
                font-size:pxToRem(14px);
            }
            .price{
                position:absolute;
                left:pxtorem(130px);
                top:pxtorem(60px);
                font-size:pxToRem(12px);
                i{
                    margin-right: pxtorem(2px);
                    display:inline-block;
                    font-size:pxtorem(12px);
                }
                .old-price{
                    display:inline-block;
                    width:pxtorem(70px);
                    text-decoration: line-through;
                    color:#999;
                }
                .new-price{
                    display:inline-block;
                    width:pxtorem(80px);
                    text-align:right;
                    color:rgba(255,80,80,1);
                }
            }
        }
    }
</style>