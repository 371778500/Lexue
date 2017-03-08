<template>
    <div class='CertificateListView' :style={height:screenHeight}>
        <head-v text="证书专项详情">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="course-list">
            <ul>
                <li v-for="(courseinfo,index) in allCourse">
                        <cou-info :index= 'courseinfo.lessonID' :src="courseinfo.picUrl" :courseName="courseinfo.goodsName" :oldPrice="courseinfo.primeCost" :newPrice="courseinfo.preferentialPrice" :to="courseinfo.to"></cou-info>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { Toast } from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    import CourseInfo from '../CourseInfo.vue'
    export default{
        data(){
            return{
                allCourse:[]
            }
        },
        mounted(){
            const certAllCourse = this.$store.state.api.getCertAllCourse + "user=" + window.localStorage.UserInfo +"&z_id=" + this.$route.params.id
            // console.log(certAllCourse)
            this.$http.get(certAllCourse).then((res)=>{
                return res.data.allLessons?res.data:JSON.parse(res.data)
            }).then((body)=>{
                console.log(body)
                if(body.status=="false"){
                    let instance = Toast(body.errMsg)
                    setTimeout(()=> {
                        instance.close()
                        this.$router.go(-1)
                    }, 1500);
                }else{
                    this.allCourse = body.allLessons
                }
            })
        },
        methods:{
        },
        components:{
            HeadV:Header,
            GoBack,
            CouInfo:CourseInfo            
        }
    }
</script>
<style lang="scss">
    /*TrainingListView.vue*/
    @import '../../assets/css/function.scss';
    .CertificateListView{
        .course-list{
            overflow:hidden;
            padding-bottom:pxToRem(60px);
            margin-top:pxToRem(10px);
            ul{
                overflow:hidden;
                background:#fff;
                li{                    
                    list-style:none;
                }
            }
        }
    }
</style>