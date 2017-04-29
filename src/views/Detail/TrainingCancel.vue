<template>
    <div class='TrainingCancel'>
        <head-v text="培训计划详情">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="TrainingDetail">
            <h3>课程详情</h3>
            <p>培训领域：<span>{{Train.field}}</span></p>
            <p>培训名称：<span>{{Train.name}}</span></p>
            <p>开始时间：<span>{{Train.startDate | formatDate}}</span></p>
            <p>结束时间：<span>{{Train.endDate | formatDate}}</span></p>
            <p>培训课程：<span>{{Train.courseName}}</span></p>
            <p>培训地点：<span>{{Train.address}}</span></p>
            <p>讲师：<span>{{Train.teacher}}</span></p>
            <p>已报人数：<span style="color:#ff8028">{{Train.alreadyApplyNum}}</span><span>/{{Train.applySum}}</span></p>
        </div>
        <div class="apply">
            <i class="iconfont icon-cancel-train" @click="cancel"></i>
            <span @click="cancel">取消报名</span>
            <!--<span @click="checkIn">立即签到</span>-->
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { Toast } from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    export default{
        data(){
            return{
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
            cancel(){
                const data = {
                    userName : window.localStorage.UserInfo,
                    trainingPlanId : this.$route.params.id
                }
                // data.alreadyApplyNum=this.Train.alreadyApplyNum
                const now = new Date()
                const fromNow = (new Date(this.Train.startDate).getTime()-now.getTime())/(24*60*60*1000)
                if(fromNow>1){
                    this.$http.post('/app/cancelTrainingPlan',data).then((res)=>{
                        let instance = Toast(res.data.msg)
                        setTimeout(()=> {
                            instance.close()
                            this.$router.go(-1)
                        }, 1500);
                    })
                }else{
                    let instance = Toast('无法在距培训开始24时之内取消报名')
                    setTimeout(()=> {
                        instance.close()
                        this.$router.go(-1)
                    }, 1000);                    
                }
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
    .TrainingCancel{
        background:#fff;
        min-height: pxtorem(568px);
        .TrainingDetail{
            border-top: pxtorem(10px) solid #e5e5e5;
            h3{
                font-size:pxtorem(24px);
                color:#ff4f57;
                font-weight:400;
                text-align: center;
                margin-top:pxtorem(25px);
                box-sizing: border-box;
                height:pxtorem(62px);
            }
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
    .TrainingCancel{
        .apply{
            text-align:center;
            color:#ff8208;
            i{
                font-size:pxtorem(48px);       
            }
            span{
                display: block;
                width:pxtorem(100px);
                margin:0 auto;
                margin-top:pxtorem(10px);
                font-size:pxtorem(18px);
            }
        }
    }
</style>