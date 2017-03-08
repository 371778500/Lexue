<template>
    <div class="particular">
        <div class="course-type">
            <div class="icons">
                <i class="iconfont icon-courseType"></i>
            </div>
            <p style="font-size:14px;">课程类别<span style="margin-left:10px">{{study.lessonName}}</span></p>
            <p>学习时长:<span style="color:#999;margin-left:0.4rem">{{study.totalTime}}</span></p>
            <p>达标评定方式:<span style="color:#999;margin-left:0.4rem">达到学习时常</span></p>
            <p>有效学习时间:<span style="color:#999;margin-left:0.4rem">{{study.lessonValidity?study.lessonValidity:'长期有效'}}</span></p>
        </div>
        <div class="course">
            <div class="icons">
                <i class="iconfont icon-courseIntroduction"></i>
            </div>
            <p class="title">小贴士</p>
            <p class="content">我们的笔记功能能够上传图片（最多一次上传三张），可以不限量的记多条笔记，快去使用吧！</p>
        </div>
        <div class="play">
            <mt-button type="default" plain @click.native="play">播放视频</mt-button>
        </div>
    </div>
</template>
<script>
    import { Button } from 'mint-ui';

    export default{
        data(){
            return{
                study:{}
            }
        },
        mounted(){
            const course = this.$store.state.api.coursewares + 'user=' + window.localStorage.UserInfo + '&lessonid=' + this.$route.params.id;
            // console.log(this.$store.state.api.coursewares + 'user=' + this.$store.state.user + '&lessonid=' + this.$route.params.id)
            this.$http.get(course).then((res)=>{
                return res.json();
            }).then((body)=>{
                this.study=body.getcoursewares[0]
               // console.log(body.getcoursewares[0])
            })
        },
        methods:{
            play(){
                //获取视频地址
                var url = this.study.coursewareUrl
                var videoUrl = "/" + url.substring(0,url.length-14) + "story_html5.html"
                console.log(videoUrl)
                window.location.href=videoUrl
            }
        },
        components:{
            mtButton:Button
        }

    }
</script>
<style lang="scss">
    /*Particular.vue*/
    @import "../../assets/css/function.scss";
    .particular{
        .course-type{
            background-color:#fff;
            /*width:pxtorem(320px);*/
            /*height:pxtorem(110px);*/
            margin-top:pxtorem(6px);
            padding:pxtorem(18px) pxtorem(15px) pxtorem(14px) 0;
            .icons{
                position:relative;
                top:pxtorem(-4px);
                height:pxtorem(90px);
                float:left;
                padding:0 pxtorem(9px) 0 pxtorem(15px);
                i{
                    font-size:16px;
                    color:#e83426;
                }
            }
            p{
                overflow: hidden;
                font-size:12px;
                margin-bottom: pxtorem(5px);
            }
        }
        .course{
             background-color:#fff;
            /*width:pxtorem(320px);*/
            height:100%;
            margin-top:pxtorem(6px);
            padding:pxtorem(18px) pxtorem(15px) pxtorem(14px) 0;
            .icons{
                position:relative;
                top:pxtorem(-4px);
                height:pxtorem(80px);
                float:left;
                padding:0 pxtorem(9px) 0 pxtorem(15px);
                i{
                    font-size:16px;
                    color:rgb(37,213,185);
                }
            }
            .title{
                overflow: hidden;
                font-size:14px;
                border-bottom: 1px solid #999;
                padding-bottom: pxtorem(4px);
            }
            .content{
                overflow: hidden;
                font-size:12px;
                padding-top:pxtorem(11px);
                line-height:pxtorem(18px);
            }
        }
        .play{
            position:relative;
            background-color:#fff;
            width:pxtorem(320px);
            min-height: pxtorem(70px);
            button{
                width:pxtorem(150px);
                height:pxtorem(40px);
                position:absolute;
                left:50%;
                top:50%;
                margin-left:pxtorem(-75px);
                margin-top:pxtorem(-20px);
            }
        }
    }
</style>