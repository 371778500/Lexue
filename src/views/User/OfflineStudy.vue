<template>
    <div class="offline-study">
        <head-v :text="title">
            <go-back slot="goback"></goback>
        </head-v>
        <div class="load-bar">
            <ul>
                <li :class="{active:show}" @click="toggle">已下载</li>
                <li :class="{active:!show}" @click="toggle">下载中</li>
            </ul>
        </div>
        <div class="loaded" v-show="show">
            <div class="empty">
                <span class="special" @click="empty"><i class="icon-trash"></i><span>一键清空</span></span>
            </div>
            <div class="course">
                <study-lesson :studyLessons="mystudy"></study-lesson>
            </div>
        </div> 
        <div class="loading" v-show="!show">
            待确认样式
        </div>
        <back-top></back-top>
    </div>
</template>
<script>
    import Header from "../Header.vue"
    import GoBack from "../../components/GoBack.vue"
    import StudyLesson from "../../components/StudyLesson.vue"
    import BackTop from "../../components/BackTop.vue"
    import { MessageBox } from 'mint-ui'
    import 'mint-ui/lib/message-box/style.css'
    export default{
        data(){
            return{
                title:"离线学习",
                show:true,
                mystudy:[
                    { picUrl:"../../../static/lux_1.jpg",name:"DDP培训计划",percent:100},
                    { picUrl:"../../../static/lux_2.jpg",name:"DDP培训计划",percent:100},
                    { picUrl:"../../../static/lux_3.jpg",name:"DDP培训计划",percent:100}
                ]
            }
        },
        methods:{
            toggle(){
                this.show=this.show?false:true;
            },
            empty(){
                MessageBox.confirm('确认要清空吗？').then(action=>{
                    $(".course").remove()
                })               
            },
        },
        components:{
            HeadV:Header,
            GoBack,
            StudyLesson,
            BackTop
        }
    }
</script>
<style lang="scss">
    /*OfflineStudy.vue*/
    $basecolor : #e84c3d;
    @import "../../assets/css/function.scss";
    .offline-study{
        .load-bar{
            ul{
                background:#fff;
                overflow:hidden;
                li{
                    float:left;
                    list-style:none;
                    font-size:18px;
                    box-sizing:border-box;
                    width:pxToRem(160px);
                    text-align:center;
                    padding:pxToRem(6px) 0;
                }
                .active{
                    color:$basecolor;
                    border-bottom:2px solid $basecolor;
                }
            }
        }
        .loaded{
            .empty{
                padding:pxToRem(10px) 0;
                .special{
                    position:relative;
                    left:pxToRem(210px);
                    font-size:16px;
                    i{
                        color:#fff;
                        font-size:26px;
                        margin-right:pxToRem(4px);
                    }
                    span{
                        position:relative;
                        bottom:pxToRem(2px);
                        color:#666;
                    }
                }
            }
            .course{
                margin-bottom:pxToRem(60px);
            }
        }
    }
</style>