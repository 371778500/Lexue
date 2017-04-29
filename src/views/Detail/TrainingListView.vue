<template>
    <div class='TrainingListView' :style={height:screenHeight}>
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
            <i class="iconfont icon-apply" @click="apply"></i>
            <span @click="apply">立即报名</span>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { Toast } from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    import Vue from 'vue'
    export default{
        data(){
            return{
                screenHeight:document.documentElement.clientHeight+'px',
                Train:{}
            }
        },
        mounted(){
            var userId=JSON.parse(window.sessionStorage.localuser).userId;
            var data = { id:this.$route.params.id,userId:userId}
            //console.log(new String(this.$route.params.id))
            this.$http.post('/app/getTrainingPlan',data).then((res)=>{
                return res.data
            }).then((value)=>{
                this.Train = value.data
            })
        },
        methods:{
            apply(){
                var now=new Date()
                if(now<new Date(this.Train.startDate)){
                    var data=JSON.parse(window.sessionStorage.getItem("user"))
                    data.userId=JSON.parse(window.sessionStorage.getItem("localuser")).userId
                    data.userName=JSON.parse(window.sessionStorage.getItem("localuser")).userName
                    data.trainingPlanId=this.$route.params.id
                    data.isApply=true
                    data.Latitude=this.Train.Latitude
                    data.longitude=this.Train.longitude
                    data.range=this.Train.range
                    // data.alreadyApplyNum=this.Train.alreadyApplyNum
                    this.$http.post('/app/applyTrainingPlan',data).then((res)=>{
                        let instance = Toast(res.data.msg)
                        setTimeout(()=> {
                            instance.close()
                            this.$router.go(-1)
                        }, 1500);
                        console.log(res.data)
                    })
                }else{
                    let instance=Toast('报名已截止')
                    setTimeout(()=> {
                        instance.close()
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
    .TrainingListView{
        background:#fff;
        .TrainingDetail{
            border-top: pxtorem(10px) solid #e5e5e5;
            h3{
                font-size:pxtorem(24px);
                color:#ff4f57;
                font-weight:400;
                text-align: center;
                margin-top:pxtorem(20px);
                box-sizing: border-box;
                height:pxtorem(40px);
            }
            p{
                font-size:pxtorem(14px);
                margin-left: pxtorem(25px);
                margin-bottom: pxtorem(15px);
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
            span{
                display: block;
                width:pxtorem(100px);
                margin:0 auto;
                margin-top:pxtorem(5px);
                font-size:pxtorem(18px);
            }
        }
    }
</style>