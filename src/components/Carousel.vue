<template>
    <div class='swiper-carousel'>
        
            <!--<div class ='carousel-content'>
                <div class='carousel-image'>
                     <template  v-for="(carou, index) in carousel">
                        <img :src='carou.image' :alt="carou.image">
                    </template>
                </div>      
                <div class='carousel-tab'>
                    <template  v-for="(carou, index) in carousel">
                        <span></span>
                    </template>
                </div>   
            </div>-->
            <swiper :options="swiperOption">
                <!-- 幻灯内容 -->
                <!--<swiper-slide>I'm Slide 1</swiper-slide>
                <swiper-slide>I'm Slide 2</swiper-slide>
                <swiper-slide>I'm Slide 3</swiper-slide>-->
                <template  v-for="(carou, index) in carousel">
                      <swiper-slide>
                          <!--<router-link :to='carou.url'>-->
                                <img :src='carou.image' :alt="carou.image"> 
                          <!--</router-link>-->
                      </swiper-slide>               
                </template>
                <!-- ... -->
                <!-- 以下配置均为可选（使用具名slot来确定并应用一些操作控件元素） -->
                <div class="swiper-pagination"  slot="pagination"></div>
                <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                <!--<div class="swiper-button-next" slot="button-next"></div>-->
                <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
            </swiper>
    </div>
</template>
<script>
    import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'

    export default{
        data(){
            return {

                swiperOption: {
                    // 自定义配置别名 
                    name: 'currentSwiper',
                    // 所有配置均为可选（同Swiper配置） 
                    autoplay: 4000,
                    autoplayDisableOnInteraction : false,//(false表示用户触摸后不停止 autoplay的行为,默认是true)
                    direction : 'horizontal',
                    loop : true ,//(开启循环模式)
                    grabCursor : true,//(pc端有用,手势变成抓取,根据浏览器有差异性)
                    setWrapperSize :true,//(采用flex布局,对于支持不好的浏览器,wrapper开启这个设定会在Wrapper上添加等于slides相加的宽高.)
                    autoHeight: false,//(wrapper和container会随着当前slide的宽高变化而变化)
                    pagination : '.swiper-pagination',//定义包裹分页器的容器.
                    paginationType : 'bullets',//(默认是圆点bullets,fraction分式,progress(进度条),custon(自定义))
                    // paginationClickable :true,//(圆点能够触发swipe,默认是false.)
                    paginationHide : false,//(默认是点击不隐藏pagination,为true时是点击就隐藏pagination)
                    // paginationBulletRender: function (index, className) {
                    //     return '<span class="' + className + '">' + (index + 1) + '</span>';
                    // },//重绘paginationBullet的样式.加了索引.类名还是设置的类名.
                    // prevButton:'.swiper-button-prev',
                    // nextButton:'.swiper-button-next',
                    // scrollbar:'.swiper-scrollbar',//(不启用滚动条.为null的话)
                    // scrollbarHide:true,//(自动隐藏滚动条.默认是true)
                    mousewheelControl : true,//滚轮控制切换.
                    // observeParents:true,
                    // if you need use plugins in the swiper, you can config in this 
                    debugger: true,
                    //设置切换效果,slide(位移切换,默认),fade,cube(立方体切换),coverflow(3D展示),flip(空翻)
                    effect:'fade',
                    // more callbacks 
                    onTransitionStart: function(swiper){
                        // console.log(swiper)
                    },
                // more Swiper config ... 
                // ... 
                }
            }
        },
        props:['carousel'],
        mounted() {
            // this.getSwiper()
        },
        // find the swiper object in current component(vm) childrens 
        methods: {
            getSwiper() {
                let currentSwiper = this.$children.find(children => children.options.name == 'currentSwiper').swiper
                console.log(swiper)
                return currentSwiper
            }
        },
        components:{
            swiper,
            swiperSlide,
        }
    }

//     swiperPlugins.debugger = function(swiper, params) {
//         if (!params) return;
//         // Need to return object with properties that names are the same as callbacks 
//         return {
//             onInit: function(swiper) {
//             console.log('onInit');
//         },
//             onClick: function(swiper, e) {
//             console.log('onClick');
//         },
//             onTap: function(swiper, e) {
//             console.log('onTap');
//         },
//     // something callback... 
//   }
// }
</script>
<style lang='scss' >
    /* carousel.vue */
    @import "../assets/css/function";
    .carousel-image{
        width: 100%;
        /*height:pxtorem(140px);*/
        overflow: hidden;
        img{
            width:100%;
            height:100%;
        }
    }
    .carousel-content{
        position: relative;
    }
    .carousel-tab{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .carousel-tab span{
            float: left;
			width: 0.6rem;
			height: 0.6rem;
			border-radius: 0.6rem;
			background: #ccc;
			margin: 0.2rem 0.2rem;
    }
    /*覆写pagination-bullet的样式*/
    .swiper-carousel{
        /*max-width:750px;*/
        height:pxtorem(174px);
        .swiper-container{
            .swiper-wrapper{
                height:pxtorem(169px);
                .swiper-slide img{
                    width:100%;
                    /*height:160px;*/
                    height:100%;
                }
            }
            .swiper-pagination{
                
                .swiper-pagination-bullet{
                    background:rgba(255,255,255,0.7);
                }
            }
        }
    }
</style>