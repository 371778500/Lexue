<template>
    <div class="video-play" :style="{height:screenHeight}">
        <span class="back" @click="goback">
            <mt-button class="fnbtn"><span><i class="icon-angle-left"></i></span></mt-button>
        </span>
        <mt-button type="default" class="fnbtn pos" @click.native="big">适配高</mt-button>
        <mt-button type="default" class="fnbtn pos" @click.native="small">恢复</mt-button>
        <div class="video  rotated" @click="full($event)">
           <!--<iframe src="/test/story_html5.html" class='iframes' :style="{width:toggle}"  FRAMEBORDER=0 SCROLLING=NO></iframe>-->
           <iframe :src="videoUrl" class='iframes' :style="{width:toggle}"  FRAMEBORDER=0 SCROLLING=NO></iframe>
           <!--<iframe src="/Upload/PXResourceCourseware/default/NCV65客开培训/NCV65项目开发-界面框架开发 - Storyline output/story_html5.html" class='iframes'  FRAMEBORDER=0 SCROLLING=NO></iframe>-->
           <!--<iframe src="/Upload/PXResourceCourseware/default/NCv65/企业协同/NCV65产品价值培训-ECM增量 - Storyline output/index_lms.html"></iframe>-->
           <!--<iframe src="/PXUserCourse/Scorm_1_2.aspx?courseware_id=991&course_id=958" style="width:1000px;height:500px" class='iframes'  FRAMEBORDER=0 SCROLLING=NO></iframe>-->
           <!--<iframe src="/Upload/PXResourceCourseware/default/NCv65/企业协同/NCV65产品价值培训-ECM增量 - Storyline output/story_html5.html" style="width:1000px;height:500px" class='iframes'  FRAMEBORDER=0 SCROLLING=NO></iframe>-->
        </div>
    </div>
</template>
<script>
    import GoBack from "../components/GoBack.vue"
    import {Button} from "mint-ui"
    export default{
        data(){
            return{
                screenHeight:screen.height+"px",
                toggle:"",
                videoUrl:""
            }
        },
        methods:{
            full(e){
                e.target.webkitRequestFullScreen();
            },
            //
            loadSrc(filepath) {
                document.getElementById("iframescormcontent").src = filepath;
           },
            goback(){
                var index=this.$route.params.id;
                this.$router.push('/studydetail/'+index);
            },
            big(){
                this.toggle=(screen.width)+"px"
                console.log(this.toggle)
            },
            small(){
                this.toggle=""
                console.log(this.toggle)
            }
        },
        mounted(){
            var video = $('.video').get(0);
            video.webkitRequestFullScreen();
            const course = this.$store.state.api.coursewares + 'user=' + window.localStorage.UserInfo + '&lessonid=' + this.$route.params.id;
            this.$http.get(course).then((res)=>{
                return res.json()
            }).then((body)=>{
                var url = body.getcoursewares[0].coursewareUrl
                var videoUrl = "/" + url.substring(0,url.length-14) + "story_html5.html"
                this.videoUrl = videoUrl
                console.log(videoUrl)
            })
        },
        components:{
            GoBack,
            mtButton:Button,
        }
    }
</script>
<style lang="scss">
    /*VideoPlay.vue*/
    @import "../assets/css/function.scss";
    .video-play{
        background-color: #fff;
        overflow: hidden;
        .back{
            position:absolute;
            top:pxtorem(15px);
            right:pxtorem(57px);
            z-index:1;
            /*dispaly:inline-block;
            width:pxtorem(35px);
            height:pxtorem(35px);*/
            line-height:pxtorem(35px);
            /*transform:rotate(90deg);*/
            text-align:center;
            background:transparent;
            span{
                i{
                    font-size:pxtorem(30px);
                    color:#666;
                }
            }
        }
        .fnbtn{
            position:absolute;
            transform: rotate(90deg);
            width:pxtorem(60px);
            height:pxtorem(30px);
            font-size:pxtorem(12px);
        }
        .pos{
            top:pxtorem(15px);
            right:pxtorem(30px);
        }
        .pos:nth-child(3){
            right:pxtorem(63px);
        }
        .rotated{
            transform:rotate(90deg) translateX(pxtorem(100px)) translateY(pxtorem(6px)) scale(1.5,1.5);
            iframe{
                /*width:pxtorem(380px);*/
                height:pxtorem(400px);
                width:pxtorem(260px);
                overflow:hidden;
            }
        }
    }
</style>