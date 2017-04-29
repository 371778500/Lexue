<template>
    <div class='study-container'>
        <header-v text='学习'></header-v>
        <!--<div class="study-header">
            <mt-button class='offline' type='primary' size='small' @click.native = 'goOffline'><i class='icon-circle-arrow-right'>&nbsp;前往离线学习</i> </mt-button>
        </div>-->
        <div >
            <!--<ul class="study-content">
                <li class='study-lesson' v-for='lesson in myStudyLessons'>
                    <img src="~assets/Miku.jpg" alt="">
                    <router-link to='a' class='lesson-position'>
                        <div class="lesson-title">
                            <span>{{ lesson.name }}</span>
                            <span></span>
                        </div>
                        <div class='lesson-footer'>
                            <span class="lesson-complete">
                                <i class='icon-file-alt'></i>
                                <span>未通过</span>
                            </span>
                        </div>
                    </router-link>
                </li>
            </ul>-->
            <study-lesson :studyLessons='myStudyLessons'></study-lesson>
        </div>
    </div>
</template>
<script>
    import { Button } from 'mint-ui'
    import { Indicator } from 'mint-ui'
    import HeaderV from '../Header.vue'
    import 'mint-ui/lib/button/style.css'
    import 'mint-ui/lib/indicator/style.css'
    import StudyLesson from '../../components/StudyLesson.vue'
    import Vue from 'vue';
    export default{
        data(){
            return { 
                myStudyLessons:[],
                myStudyProgress:[]
            }
        },
        mounted(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            });
            const myStuydyInfo = this.$store.state.api.lesson + 'user=' + window.localStorage.UserInfo;
            const myStudyProgress = this.$store.state.api.coursewares +'user='+window.localStorage.UserInfo;
            this.$http.get(myStuydyInfo).then((res)=>{
                return res.json();
            })
            .then((body) =>{
                console.log(body)
                if(body.status != 'false'){
                    console.log(body.allLessons)
                    this.myStudyLessons = body.allLessons;                
                }
                 return this.myStudyLessons
            })
            .then(allLessons =>{
                allLessons.map(lesson =>{
                   var a =  this.getAveragePercent(myStudyProgress, lesson.lessonID)
                    a.then(percent =>this.$set(lesson,"percent",percent))
                })
                Indicator.close()
            })
        },
        methods:{
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
            // goOffline(){
            //     this.$router.push('/offlinestudy')
            // }
        },
        components:{
            mtButton:Button,
            HeaderV,
            StudyLesson
        }
        
    }
</script>
<style lang='scss'>
    /* Study.vue */
    @import '../../assets/css/function';
    .study-container{
        margin-bottom:pxtorem(60px);
            .study-header{
                background:white;
                height:pxtorem(50px);
                text-align:right;
                line-height:pxtorem(50px); 
                overflow:hidden;
            .offline{
                float:right;
                margin-right:pxtorem(15px);
                margin-top:pxtorem(10px);
            }
        }
    }
</style>