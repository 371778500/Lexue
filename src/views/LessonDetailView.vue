<template>
    <div class="lesson-detail-view">    
        <head-v :text="title">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="lesson-bar">
            <ul>
                <li><span :class="{'active':show}" @click="toggle">详情</span></li>
                <li><span :class="{'active':!show}" @click="toggle">评价</span></li>
            </ul>
        </div>
        <div class="lesson-detail" v-show="show">
            <div class="course-type">
                <div class="icons">
                    <i class="iconfont icon-courseType"></i>
                </div>
                <p style="font-size:0.7rem;">课程类别<span style="margin-left:10px">{{lesson.coursewareName}}</span></p>
                <p style="margin-top:0.7rem">
                    学分:
                    <span  style="color:#999;margin-left:0.4rem">{{lesson.studyScore?lesson.studyScore: '' | getNum }}</span>
                    <!--<span style="color:rgb(37,213,185);margin-left:25px">60学时</span>-->
                </p>
                <p>学习时长:<span style="color:#999;margin-left:0.4rem">{{lesson.totalTime}}</span></p>
                <p>达标评定方式:<span style="color:#999;margin-left:0.4rem">达到学习时长</span></p>
                <p>有效学习时间:<span style="color:#999;margin-left:0.4rem">{{lesson.lessonValidity?lesson.lessonValidity:'长期有效'}}</span></p>
            </div>
            <div class="course">
                <div class="icons">
                    <i class="iconfont icon-courseIntroduction"></i>
                </div>
                <p class="title">课程介绍</p>
                <p class="content">{{lesson.introduction}}</p>
            </div>
            <!--<div class="course">
                <div class="icons">
                    <i class="iconfont icon-courseOutline" style="color:rgb(255,150,52)"></i>
                </div>
                <p class="title">课程大纲</p>
                <p class="content">
                </p>
            </div>-->
            <div class="lesson-footer">
                <div class="apply">
                    <i class="iconfont icon-apply" @click="apply"></i>
                    <p>立即报名</p>
                </div>
            </div>
        </div>
        <div class="lesson-evaluate" v-show="!show">
            <p class="content">{{content}}</p>
            <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                infinite-scroll-immediate-check="true">
                <evaluate-info v-for="user in users" 
                    :userimg="user.userImg"
                    :username="user.userName"
                    :content="user.commentContent"
                    :date="user.createDate"
                    :starNum="user.starNumber">
                </evaluate-info>
                <p v-show="loaded" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    {{loadText}}
                </p>
            </div>
        </div>
        <back-top></back-top>
    </div>
</template>
<script>
    import Header from "./Header.vue"
    import GoBack from "../components/GoBack.vue"
    import EvaluateInfo from "../components/EvaluateInfo.vue"
    import BackTop from "../components/BackTop.vue"
    import { InfiniteScroll,Spinner,Toast } from 'mint-ui'
    import Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                title:"课程详情",
                lesson:{},
                show:true,
                users:[],
                content:'',
                loading:false, //true禁止无限加载
                loaded:false, //true出现加载动画
                loadText:'加载中...',
                pageSize:'10',
                pageNumber:0
            }
        },
        mounted(){
            const course = this.$store.state.api.coursewares + 'user=' + window.localStorage.getItem('UserInfo') + '&lessonid=' + this.$route.params.id;
            // console.log(this.$store.state.api.coursewares + 'user=' + this.$store.state.user + '&lessonid=' + this.$route.params.id)
            this.$http.get(course).then((res)=>{
                return res.json();
            }).then((body)=>{
                if(!$.isEmptyObject(body)){
                    this.lesson=body.getcoursewares[0]
                    console.log(this.lesson)
                }else{
                    
                }
            })
            
        },
        beforeRouterEnter(){
            
            
        },
        created(){
            this.getEvaluation().then((values)=>{
                this.content = values.length==0?'暂无评论':''
                this.users=values
            })
        },
        methods:{
            toggle:function(){
                this.show=this.show?false:true
            },
            apply(){
                const apply = this.$store.state.api.applyCourse + "funcCode=submit&user=" +window.localStorage.getItem("UserInfo")+"&goodsId="+this.$route.params.lesson
                this.$http.get(apply).then( res =>{
                    return res.data.status?res.data:JSON.parse(res.data)
                }).then(body=>{
                    console.log(body)
                    if(body.status=='false'){
                        let instance = Toast('已购买此课程！')
                        setTimeout(()=> {
                            instance.close()
                        }, 1500);
                    }else{
                        this.$router.push('/apply/'+this.$route.params.lesson)
                    }
                })
                //this.$router.push('/apply/'+this.$route.params.id)
            },
            getEvaluation(){
                var data = { courseId:this.$route.params.id,pageNumber:this.pageNumber,pageSize:this.pageSize }
                return this.$http.post('/app/getCommentInfo',data).then((res)=>{
                    return res.data
                }).then((body)=>{
                    console.log(body.data.length)           
                    // this.users.push(...body.data)
                    return body.data
                })
            },
            loadMore(){
                if(!show){
                    this.loading=true
                    this.loaded=true
                    this.pageNumber++
                    setTimeout(()=>{
                        this.getEvaluation().then((values)=>{
                            if(values.length==0){
                                this.loading=true
                                let instance=Toast('无更多评价')
                                setTimeout(() => {
                                    instance.close()
                                }, 1000)
                            }else{
                                this.loading=false
                                this.users.push(...values)
                            }
                            this.loaded=false
                        })
                    },2000)
                }
            }
        },
        components:{
            HeadV:Header,
            GoBack,
            EvaluateInfo,
            BackTop,
            mtSpinner:Spinner
        }
    }
</script>
<style lang="scss">
    /*LessonDetailView.vue*/
    @import "../assets/css/function.scss";
    .lesson-detail-view{
        min-height: pxtorem(568px);
        background: #fff;      
        .lesson-bar{
            font-family:"微软雅黑";
            background:#fff;
            border-bottom:2px solid #eee;
            height:pxToRem(42px);            
            ul{
                padding:pxToRem(10px) 0 0 0;
                border-top:pxtorem(8px) solid #e5e5e5;

                li{
                    float:left;
                    list-style:none;
                    box-sizing:border-box;
                    width:pxToRem(160px);
                    text-align:center;
                    font-size:pxToRem(16px);
                    span{
                        box-sizing:border-box;
                        display:inline-block;
                        width:pxToRem(80px);
                        height:pxToRem(25px);
                    }
                    .active{
                        color:#e84c3d;
                        border-bottom:2px solid #e84c3d;
                    }
                }
            }
        }
        .lesson-detail{
            .course-type{
                background-color:#fff;
                /*width:pxtorem(320px);*/
                /*height:pxtorem(110px);*/
                margin-top:pxtorem(6px);
                padding:pxtorem(18px) pxtorem(15px) pxtorem(14px) 0;
                .icons{
                    position:relative;
                    top:pxtorem(-4px);
                    height:pxtorem(130px);
                    float:left;
                    padding:0 pxtorem(9px) 0 pxtorem(15px);
                    i{
                        font-size:pxtorem(16px);
                        color:#e83426;
                    }
                }
                p{
                    overflow: hidden;
                    font-size:pxtorem(12px);
                    margin-bottom: pxtorem(5px);
                }
            }
            .course{
                background-color:#fff;
                /*width:pxtorem(320px);*/
                /*height:pxtorem(110px);*/
                margin-top:pxtorem(6px);
                padding:pxtorem(18px) pxtorem(15px) pxtorem(14px) 0;
                .icons{
                    position:relative;
                    top:pxtorem(-4px);
                    /*height:pxtorem(85px);*/
                    float:left;
                    padding:0 pxtorem(9px) 0 pxtorem(15px);
                    i{
                        font-size:pxtorem(16px);
                        color:rgb(37,213,185);
                        height:pxtorem(100px);
                        display: inline-block;
                    }
                }
                .title{
                    overflow: hidden;
                    font-size:pxtorem(14px);
                    border-bottom: 1px solid #999;
                    padding-bottom: pxtorem(4px);
                }
                .content{
                    overflow: hidden;
                    font-size:pxtorem(12px);
                    padding-top:pxtorem(11px);
                    line-height:pxtorem(18px);
                }
            }
        }
        .lesson-footer{
            .apply{
                position:fixed;
                bottom:pxtorem(50px);
                left:0;
                right:0;
                text-align:center;
                color:#ff8208;
                width:pxtorem(90px);
                margin:0 auto;
                i{
                    font-size:pxtorem(64px);       
                }
                p{
                    margin-top:pxtorem(10px);
                    font-size:pxtorem(18px);
                }
            }
        }
    }
    .lesson-detail-view{
        .lesson-evaluate{
            background: #fff;
            .take-evaluations{
                overflow: hidden;
                margin-top:pxtorem(6px);
                padding:pxtorem(6px) 0 pxtorem(10px);
                border-bottom:1px solid #eee;
                span{
                    float:right;
                    margin-right:pxtorem(15px);
                    i{
                        color:#ff4f57;
                        font-size:pxtorem(16px);
                    }
                }
                span::before{
                    position:relative;
                    bottom:pxtorem(1px);
                    content:"评价";
                    font-size:pxtorem(12px);
                    color:#ff4f57;
                    margin-right:pxtorem(10px);
                }
            }
            .content{
                font-size:pxtorem(14px);
                text-align: center;
                color:#aaa;
                font-style: italic;
                padding-top:pxtorem(10px);
            }
            .page-infinite-loading{
                text-align: center;
                height:pxtorem(50px);
                line-height:pxtorem(50px);
                font-size:pxtorem(16px);
                div {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: pxtorem(5px);
                }
            }
        }
    }
</style>