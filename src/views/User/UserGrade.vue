<template>
    <div class="user-grade">
        <head-v :text="title">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="lesson-list">
            <ul>
                <li v-for="lesson in lessons">
                    <div class="lesson-info">
                        <i class="icon-angle-right right-icon"></i>
                        <span class="lesson-name">{{lesson.name}}</span>
                        <span :class="[lesson.pass?'pass':'unpass','tip']">{{lesson.pass?"已通过":"未通过"}}</span>
                        <div :class="[lesson.pass?'angle-pass':'angle-unpass','my-angle']"></div>
                        <div class="lesson-detail">
                            <span>考试分类：{{lesson.category}}</span>
                            <span>最好成绩：{{lesson.bestgrade}}分</span>
                            <span class="toggle" @click="lesson.packup=!lesson.packup">{{lesson.packup?'收起':'展开'}}<i :class="[lesson.packup ? 'icon-angle-up':'icon-angle-down','toggle-icon']"></i></span>
                        </div>
                    </div>
                    <div class="lesson-grade" v-show="lesson.packup">
                        <div class="grade-list" v-for="gradeDetail in lesson.gradeDetails">
                            <p>参加实践：<span>{{gradeDetail.time}}</span></p>
                            <p>用时：<span>{{gradeDetail.usedTime}}</span></p>
                            <p>
                                得分：<span>{{gradeDetail.grade}}</span>
                                正确：<span>{{gradeDetail.correct}}</span>
                                错误：<span>{{gradeDetail.err}}</span>
                                未作：<span>{{gradeDetail.unfinished}}</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    export default{
        data(){
            return{
                title:"我的成绩",
                lessons:[
                    { name:"圆的性质",category:"数学",bestgrade:"100",pass:true,
                      gradeDetails:[
                        { time:"2016-01-01  00:00:00",usedTime:"00:30:00",grade:"20",correct:"5",err:"25",unfinished:"0" },
                        { time:"2016-01-02  00:00:00",usedTime:"00:30:00",grade:"100",correct:"30",err:"0",unfinished:"0" }
                      ]
                    },
                    { name:"圆的性质",category:"数学",bestgrade:"100",pass:false,
                      gradeDetails:[
                        { time:"2016-01-01  00:00:00",usedTime:"00:30:00",grade:"20",correct:"5",err:"25",unfinished:"0" },
                        { time:"2016-01-02  00:00:00",usedTime:"00:30:00",grade:"100",correct:"30",err:"0",unfinished:"0" }
                      ]
                    }
                ]
            }
        },
        mounted(){
            this.lessons.map(lesson =>{
                // lessons['packup'] = true ;
                // on above the way,it wouldn't obsserve data .http://vuefe.cn/guide/list.html#注意事项 ,see this!
                this.$set(lesson,'packup',false);
            })
        },
        components:{
            HeadV:Header,
            GoBack
        }
    }
</script>
<style lang="scss">
    /*UserGrade.vue*/
    @import "../../assets/css/function.scss";
    $basecolor:#e84c3d;
    .user-grade{
        .lesson-list{
            .lesson-info{
                margin-top:pxToRem(10px);
                background:#fff;
                padding:pxToRem(10px) pxToRem(15px) pxToRem(20px);
                overflow:hidden;
                .right-icon{
                    color:$basecolor;
                    font-size:30px;
                }
                .lesson-name{
                    position:relative;
                    top:pxToRem(-2px);
                    font-size:18px;
                    color:#333;
                }
                .my-angle{
                    float:right;
                    position:relative;
                    top:pxToRem(4px);
                }
                .angle-pass{
                    border-style:solid;
                    border-color:rgba(143,195,32,1) rgba(143,195,32,1) rgba(143,195,32,1) #fff;
                    border-width:12px 0 12px 12px;
                }
                .angle-unpass{
                    border-style:solid;
                    border-color:rgba(255,80,85,1) rgba(255,80,85,1) rgba(255,80,85,1) #fff;
                    border-width:12px 0 12px 12px;
                }
                .tip{
                    float:right;
                    position:relative;
                    top:pxToRem(4px);
                    display:inline-block;
                    font-size:12px;
                    padding:4px 8px;
                    color:#fff;
                }
                .pass{
                    background:rgba(143,195,32,1);
                }
                .unpass{
                    background:rgba(255,80,85,1);
                }
                .lesson-detail{
                    margin-left:pxToRem(14px);
                    position:relative;
                    span{
                        font-size:12px;
                        color:#ccc;
                        margin-right:pxToRem(10px);
                    }
                    .toggle{
                        color:$basecolor;
                        position:absolute;
                        top:pxToRem(20px);
                        left:pxToRem(238px);
                        .toggle-icon{
                            position:absolute;
                            left:pxToRem(28px);
                            font-size:14px;
                        }
                    }
                }
            }
            .lesson-grade{
                background:#fff;
                padding:pxToRem(10px) pxToRem(15px) pxToRem(20px);
                .grade-list{
                    font-size:13px;
                    color:#666;
                    border:1px solid #eee;
                    padding:pxToRem(15px);
                    margin-bottom:pxToRem(15px);
                    p{
                        padding:pxToRem(4px) 0;
                    }
                    span{
                        color:#aaa;
                        padding:0 pxToRem(8px) 0 pxToRem(2px);
                    }
                }
                .grade-list:last-child{
                    margin-bottom:0;
                }
            }
        }

    }
</style>