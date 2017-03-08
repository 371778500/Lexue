<template>
    <div class="user-cert">
        <head-v text='证书专项详情'>
            <go-back slot="goback"></go-back>
        </head-v>
        <study-lesson :studyLessons='allCourse'></study-lesson>
    </div>
</template>
<script>
    import StudyLesson from '../../components/StudyLesson.vue'
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
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
                this.allCourse = body.allLessons
            })
        },
        components:{
            StudyLesson,
            HeadV:Header,
            GoBack
        }
    }
</script>
<style lang="scss">
/*UserCert.vue*/
</style>