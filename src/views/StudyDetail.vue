<template>
    <div class="study-detail">
        <span class="back" @click="goback">
            <i class="icon-angle-left"></i>
        </span>
        <!--<form name="form1" method="post" action="Scorm_1_2.aspx?courseware_id=991&amp;course_id=958" id="form1">
            <div>
                <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUJOTU1OTMyNzg2ZGSdcqo/7mEcF0a+6syIopv5KWcnHA==" />
            </div>

            <iframe width="1024px" height="700px" frameborder="0" id="iframescormcontent"></iframe>
            <input id="Button1" type="button" value="载入..." :click="loadSrc('../Upload/PXResourceCourseware/default/NCV65客开培训/NCV65项目开发-环境搭建 - Storyline output/index_lms.html')"
            style="display: none;" />
                
        </form>-->
        <!--<input type="" placehodler name="" value="">-->
        <div class="video-pic" >
            <!--<router-link :to="'/videoplay/'+index"><i class="iconfont icon-player"></i><img src="../../static/img3.png"></router-link>-->
            <a :href="videoUrl"><i class="iconfont icon-player"></i><img :src="study.picUrl?study.picUrl:'../../static/video-default.png'"></a>
        </div>
        <div class="progress">
            <div class="progress-info">
                <span>课件完成度</span>
                <div class="progress-bar">
                    <div class="progress-mask"></div>
                </div>
                <span class="percent">{{study.studyPercent}}%</span>
            </div>
            <span :class="[pass?'green':'orange','tag']">{{pass?"通过":"未通过"}}</span>
        </div>
        <div class="nav-list">
            <ul>
                <!--<li :class="[flag==1?'active':'']" @click="switchNav(1,'/studydetail')">详情</li>
                <li :class="[flag==2?'active':'']" @click="switchNav(2,'/studydetail/content')">目录</li>
                <li :class="[flag==3?'active':'']" @click="switchNav(3,'/studydetail/note')">笔记</li>
                <li :class="[flag==4?'active':'']" @click="switchNav(4,'/studydetail/evaluation')">评价</li>-->
                <li><router-link  :to="'/studydetail/'+index" exact>详情</router-link></li>
                <li><router-link  :to="'/studydetail/content/'+index" >简介</router-link></li>
                <li><router-link  :to="'/studydetail/note/'+index" >笔记</router-link></li>
                <li><router-link  :to="'/studydetail/evaluation/'+index" >评价</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                study:{
                    name:"DDP录入培训",
                    percent:"20",
                },
                flag:1,
                pass:false,
                index:this.$route.params.id,
                videoUrl:"",
                // video:"http://10.1.234.175/story_html5.html"
            }
        },
        methods:{
            // play(){
            //     var video1=document.getElementById("videoPlay1")
            //     video1.controls=video1.controls?"":"controls"
            //     setTimeout(()=>{
            //         video1.controls=""
            //     },5000)
            //     video1.play()
            // },
            switchNav(num,to){
                this.flag=num
                this.$router.push(to+'/'+this.$route.params.id)
            },
            goback(){
                this.$router.push('/Main/Study');
            }
        },
        mounted(){
            localStorage.setItem('lesson',this.$route.params.id)
            const course = this.$store.state.api.coursewares + 'user=' + window.localStorage.UserInfo + '&lessonid=' + this.$route.params.id;
            // console.log(this.$store.state.api.coursewares + 'user=' + this.$store.state.user + '&lessonid=' + this.$route.params.id)
            this.$http.get(course).then((res)=>{
                return res.json();
            }).then((body)=>{
                console.log(body)
                this.study=body.getcoursewares[0]
                var progress=this.study.studyPercent
                var p=(parseInt(progress)/20)-5
                console.log(p)
                if(p==100){
                    this.pass=true
                }
                $(".progress-mask").css("left",p+'rem');
                //获取视频地址
                var url = body.getcoursewares[0].coursewareUrl
                var videoUrl = "/" + url.substring(0,url.length-14) + "story_html5.html"
                this.videoUrl = videoUrl
                console.log(videoUrl)
            })
        },
        components:{
        }
    }
</script>
<style lang="scss">
    @import "../assets/css/function.scss";
    $basecolor: #000;
    $green : rgb(37,213,185);
    $orange : #ff4f57;
    /*StudyDetail.vue*/
    .study-detail{
        background:#e5e5e5;
        width:pxtorem(320px);
        overflow:hidden;
        .back{
            position:absolute;
            top:pxtorem(10px);
            left:pxtorem(5px);
            dispaly:inline-block;
            width:pxtorem(30px);
            height:pxtorem(30px);
            text-align:center;
            line-height:pxtorem(30px);
            background: rgba(100,100,100,0.8);
            border-radius:50%;
            i{
                font-size:pxtorem(30px);
                color:#fff;
            }
        }
        .video-pic{
            height:pxtorem(177px);
            img{
                width:pxtorem(320px);
                height:100%;
            }
            i{
                position:absolute;
                top:pxtorem(71px);
                left:pxtorem(144px);
                font-size:pxtorem(32px);
                color:#666;
            }
        }
        .progress{
            background:$basecolor;
            position:relative;
            padding:pxtorem(9px) 0;
            .progress-info {
                span {
                    position: relative;
                    color: #aaa;
                    font-size: 10px;
                    margin-left: pxtorem(14px);
                }
                .percent {
                    margin-left: pxtorem(11px);
                    font-size:12px;
                    color:$orange;
                }
                .progress-bar {
                    position: relative;
                    left:pxtorem(8px);
                    top:pxtorem(1px);
                    overflow: hidden;
                    background: #333;
                    height: pxtorem(10px);
                    width: pxtorem(100px);
                    display: inline-block;
                    border-radius: 8px;
                    .progress-mask {
                        position: absolute;
                        left: pxtorem(-100px);
                        width: pxtorem(100px);
                        height: pxtorem(10px);
                        border-radius: 8px;
                        background: $orange;
                    }
                    .green{
                        background: $green;
                    }
                }
            }
            .tag{
                position:absolute;
                top:pxtorem(16px);
                right:pxtorem(15px);
                line-height:pxtorem(20px);
                text-align: center;
                font-size:12px;
                display: inline-block;
                width:pxtorem(54px);
                height:pxtorem(20px);
                color:white;
                border-radius:pxtorem(10px);
            }
            .green{
                background-color:$green;
            }
            .orange{
                background-color:$orange;
            }
        }
        .nav-list{
            overflow:hidden;
            background:#fff;
            ul{
                li{
                    float:left;
                    width:pxtorem(80px);
                    height:pxtorem(44px);
                    text-align:center;
                    line-height:pxtorem(44px);
                    list-style:none;
                    font-size:pxtorem(14px);
                    a{
                        color:#666;
                        &.router-link-active{
                            color:#e83426;
                        }
                    }
                }
                .active{
                    color:#e83426;
                }
            }
        }
    }
</style>