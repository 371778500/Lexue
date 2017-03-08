<template>
    <div>
        <div class='showCourse'>
             <div class='subjectInfo'>                
                <i class="iconfont icon-lexue icon-color"></i>
                <span>最新证书专项</span>
                <span class="more"><router-link to='/certificate'>更多</router-link></span>
            </div>
            <div class="newCertificate">
                <router-link :to="'/certificate/'+newCert.certID">
                    <div class="cert">证</div>
                    <div class="info">
                        <p>证书名称:{{newCert.certName}}</p>
                        <p><span class="left">所属产品:{{newCert.certProducts}}</span></p>
                        <p>该专项报名时间:{{newCert.validStart | formatDay}}至{{newCert.validEnd | formatDay}}</p>
                        <p><span class="left">所属角色:{{newCert.certDirection}}</span><span class="right">创建时间:{{newCert.validStart | formatDay}}</span></p>
                        <i class="i icon-angle-right"></i> 
                    </div>
                </router-link>
            </div>
            <div class="newCertificate">
                <router-link :to="'/certificate/'+newSpecial.certID">
                    <div class="cert sp">专</div>
                    <div class="info">
                        <p>专项名称:{{newSpecial.certName}}</p>
                        <p><span class="left">所属产品:{{newSpecial.certProducts}}</span></p>
                        <p>该专项报名时间:{{newSpecial.validStart | formatDay}}至{{newSpecial.validEnd | formatDay}}</p>
                        <p><span class="left">所属角色:{{newSpecial.certDirection}}</span><span class="right">创建时间:{{newSpecial.validStart | formatDay}}</span></p>
                        <i class="i icon-angle-right"></i> 
                    </div>
                </router-link>
            </div>
        </div>
        <div class='showCourse'>
             <div class='subjectInfo'>                
                <i class="iconfont icon-lexue icon-color"></i>
                <span>最新课程</span>
                <span class="more"><router-link to='Main/choose-Lesson'>更多</router-link></span>
            </div>
            <div class='courseInfo clearfix'>
                 <course-info 
                 v-for='course in newCourse' 
                 :src="course.picUrl" 
                 :courseName="course.goodsName" 
                 :oldPrice="course.primeCost" 
                 :newPrice="course.preferentialPrice"
                 :to='course.goodsID'
                 :index= 'course.lessonID'></course-info>
            </div>
        </div>
        <div class='showCourse'>
             <div class='subjectInfo'>
                <i class="iconfont icon-lexue icon-color"></i>
                <span>最近学习</span>
                <span class="more"><router-link to='Main/Study'>更多</router-link></span>
            </div>
            <!--<div class='courseInfo clearfix'>
                 <course-info 
                 v-for='course in newCourse' 
                 :src="course.picUrl" 
                 :courseName="course.goodsName" 
                 :oldPrice="course.primeCost" 
                 :newPrice="course.preferentialPrice"
                 :to='course.goodsID'
                 :index= 'course.lessonID'></course-info>
            </div>-->
            <div style="padding:0 0.25rem;overflow:hidden;"><study-lesson :studyLessons='myStudyLessons'></study-lesson></div>
            <div v-show="!studyRecord" class="content">暂无最近学习记录</div>
        </div>
    </div>
</template>
<script>
    import CourseInfo from './CourseInfo.vue'
    import Vue from 'vue'
    import StudyLesson from '../components/StudyLesson.vue'
    import { Indicator } from 'mint-ui'
    export default{
        data(){
            return {
                newCourse:[],
                newCert:{},
                newSpecial:{},
                myStudyLessons:[],
                studyRecord:true
            }
        },
        created(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            });
            this.getNewCourse().then(values=>{
                this.newCourse.push(...values.allLessons)
            })
            Promise.all([this.getNewCert(0),this.getNewCert(1)])
                .then(values=>{
                    this.newCert=values[0].allCertificates[0]
                    this.newSpecial=values[1].allCertificates[0]
                    Indicator.close()
                })
        },
        mounted(){
            const myStuydyInfo = this.$store.state.api.lesson + 'user=' + window.localStorage.UserInfo;
            const myStudyProgress = this.$store.state.api.coursewares +'user='+window.localStorage.UserInfo;
            this.$http.get(myStuydyInfo).then((res)=>{
                return res.json();
            })
            .then((body) =>{
                if(body.status != 'false'){
                    body.allLessons.forEach(item=>{
                        if(item.lessonID==localStorage.lesson){
                            this.myStudyLessons.push(item);
                        }
                    })
                    console.log(this.myStudyLessons)                
                }
                 return this.myStudyLessons
            })
            .then(allLessons =>{
                if(allLessons.length>0){
                    allLessons.map(lesson =>{
                    var a =  this.getAveragePercent(myStudyProgress, lesson.lessonID)
                        a.then(percent =>this.$set(lesson,"percent",percent))
                    })
                }else{
                    this.studyRecord=false
                }
            })
        },
        methods:{
            getNewCourse(){
                const allCourse = this.$store.state.api.allCourse
                return this.$http.get(allCourse,{
                    params:{
                         user : this.user,
                         pageSize : 2,
                         pageIndex : 0,
                    }
                }).then(res=>{
                    return res.data.recordTotalCount?res.data:JSON.parse(res.data)
                })
            },
            getNewCert(type){
                const getAllCertificate = this.$store.state.api.getAllCertificate
                return this.$http.get(getAllCertificate,{
                    params:{
                        pageSize:1,
                        pageIndex:0,
                        type:type,
                        user:window.localStorage.UserInfo
                    }
                }).then(res=>{
                     return res.data.recordTotalCount?res.data:JSON.parse(res.data)
                })
            },
            getAveragePercent(url,lessonID){               
                return Vue.http.get(url + '&lessonid=' + lessonID).then(res=>{
                    return res.json();
                })
                .then(json =>{
                    let percent=0
                    let course = json.getcoursewares
                    if(Array.isArray(course)){
                        course.forEach((item)=>{
                            percent += parseInt(item.studyPercent)
                        })
                        return percent/course.length
                    }else{
                        return 0
                    }
                })
            },
        },
        components:{
            CourseInfo,
            StudyLesson
        },
        computed:{
        }
    }
</script>
<style  lang='scss'>
    /* ShowCourse.vue */
    @import '../assets/css/function';
    .showCourse{
        background:white;
        position:relative;
        width:100%;
        margin-bottom:pxtorem(8px);
        overflow:hidden;
        .subjectInfo{
            font-size:pxtorem(16px);
            /*box-sizing:border-box;
            width:100%;*/
            width:pxtorem(290px);
            margin:pxtorem(13px) pxtorem(15px) 0;
            padding-bottom:pxtorem(9px);
            border-bottom:1px solid #c5c5c5;
            .icon-color{
                position:relative;
                top:2px;
                font-size:pxtorem(22px);
                color:#e83426;
            }
            .more{
                float:right;
                font-size:pxtorem(14px);
                a{
                    color:#999;
                }
            }

        }
        .newCertificate{
            position:relative;
            /*height:pxtorem(94px);*/
            margin:0 pxtorem(15px);
            overflow:hidden;
            border-bottom: 1px solid #e5e5e5;
            .cert{
                position:absolute;
                top:pxtorem(26px);
                width:pxtorem(40px);
                height:pxtorem(40px);
                background-color:#ff4f57;
                border-radius:50%;
                text-align:center;
                line-height:pxtorem(40px);
                color:#fff;
                font-size:pxtorem(22px);
            }
            .sp{
                background-color:#ff8208;
            }
            .info{
                float: right;
                width: pxtorem(240px);
                font-size:pxtorem(12px);
                margin:pxtorem(13px) 0;
                p{
                    overflow:hidden;
                    color:#999;
                    .left{
                        float:left;
                    }
                    .right{
                        float:right;
                    }
                }
                p:first-child{
                    color:#333;
                    font-size:pxtorem(14px);
                    margin-bottom:pxtorem(9px);
                }
                .i{
                    color:#555;
                    font-size:pxtorem(25px);
                    position:absolute;
                    right:pxtorem(0px);
                    top:pxtorem(30px);
                }
            }
        }
        .newCertificate:last-child{
            border:none;
        }
        .courseInfo{
            width:100%;
            overflow:hidden;
        }
        .content{
            height:pxtorem(50px);
            font-size:pxtorem(14px);
            text-align: center;
            color:#aaa;
            font-style: italic;
            padding-top:pxtorem(10px);
        }
    }
</style>