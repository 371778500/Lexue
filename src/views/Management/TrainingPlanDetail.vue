<template>
    <div class='TrainingListView'>
        <head-v text="培训计划详情">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="TrainingDetail">
            <!--<h3>课程详情</h3>-->
            <p>培训领域：<span>{{Train.field}}</span></p>
            <p>培训名称：<span>{{Train.name}}</span></p>
            <p>开始时间：<span>{{Train.startDate | formatDay}}</span></p>
            <p>结束时间：<span>{{Train.endDate | formatDay}}</span></p>
            <p>培训课程：<span>{{Train.courseName}}</span></p>
            <p>培训地点：<span>{{Train.address}}</span></p>
            <p>讲师：<span>{{Train.teacher}}</span></p>
            <p>已报人数：<span style="color:#ff8028">{{Train.alreadyApplyNum}}</span><span>/{{Train.applySum}}</span></p>
        </div>
        <div class="apply">
            <p @click="genQrcode">生成签到二维码</p>
            <img :src='src' v-show="qrshow" alt="签到二维码"/>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'

    export default{
        data(){
            return{
                qrshow:false,
                src:'',
                Train:{}
            }
        },
        mounted(){
            var data = { id:this.$route.params.id}
            //console.log(new String(this.$route.params.id))
            this.$http.post('/app/getTrainingPlan',data).then((res)=>{
                return res.data
            }).then((value)=>{
                this.Train = value.data
            })
            
        },
        methods:{
            genQrcode(){

                this.$http.post('/app/qrcode',{courseId:this.$route.params.id,urlAddress:location.origin}).then((res)=>{
                    this.qrshow=true;
                    this.src=window.URL.createObjectURL(res.data);
                    console.log(this.src)
                })
            }
        },
        components:{
            HeadV:Header,
            GoBack,            
        }
    }
</script>
<style lang="scss">
    /*TrainingListView.vue*/
    @import '../../assets/css/function.scss';
    .TrainingListView{
        background:#fff;
        min-height: pxtorem(568px);
        .TrainingDetail{
            border-top: pxtorem(10px) solid #e5e5e5;
            p{
                font-size:pxtorem(14px);
                margin-left: pxtorem(25px);
                margin-bottom: pxtorem(16px);
                font-weight: bold;
                span{
                    font-size:pxtorem(12px);
                    color:#999;
                    font-weight:400;
                }
            }
        }
    }
    .TrainingListView{
        .apply{
            text-align:center;
            color:#ff8208;
            i{
                font-size:pxtorem(64px);       
            }
            p{
                margin-top:pxtorem(10px);
                font-size:pxtorem(18px);
            }
        }
    }
</style>