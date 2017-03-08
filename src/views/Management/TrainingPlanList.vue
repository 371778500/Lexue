<template>
    <div class='TrainingList'>
        <head-v text="培训计划列表">
            <go-back slot="goback"></go-back>
        </head-v>
        <!--<div class="train-list" v-show='apply' v-for = 'train in trainList'>
            <router-link to='/newsid'>
            <span class="icon"><i class='icon-circle' :class="[info==1?'red':'']" style='font-size:0.4rem;'></i></span>
                <div class='train'>
                    <p style="font-size:0.7rem;color:#666">课程名称：{{train.tname}}</p>
                    <p>开始时间：{{train.startTime}}</p>
                    <p><span>培训地点：{{train.taddress}}</span><span style="float:right;margin-right:1rem">{{train.publishTime}}</span></p>
                </div>
            </router-link>
        </div>-->
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="true">
            <div class="train-list" v-for = 'train in trainList'>
                <router-link :to='"/managesystem/trainning/"+train._id'>
                <span class="icon"><i class='icon-circle' :class="[info==1?'red':'']" style='font-size:0.4rem;'></i></span>
                    <div class='train'>
                        <p style="font-size:0.7rem;color:#666">课程名称：{{train.courseName}}</p>
                        <p>开始时间：{{train.startDate | formatDay}}</p>
                        <p><span>培训地点：{{train.address}}</span><span style="float:right;margin-right:1rem">{{train.createDate | formatDay}}</span></p>
                    </div>
                </router-link>
            </div>
            <span class="publish"><i class="el-icon-plus" @click="add"></i></span>
            <p v-show="loaded" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                {{loadText}}
            </p>
        </div>
        <!--<img :src='src' alt="签到二维码"/>  -->
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { InfiniteScroll,Spinner,Toast } from 'mint-ui'
    import Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                trainList:[],
                loading:false, //true禁止无限加载
                loaded:false, //true出现加载动画
                loadText:'加载中...',
                pageSize:'10',
                pageNumber:0,
                src:'',
                trained:[1,1,1]
            }
        },
        mounted(){
            this.getTraining().then((values)=>{
                //console.log(values)
                this.trainList.push(...values)
                console.log(this.trainList)
            })
           
        },
        methods:{
            getTraining(){
                var data = { adminUserId:window.localStorage.getItem('UserInfo'),pageNumber:this.pageNumber,pageSize:this.pageSize }
                return this.$http.post('/app/getAdminTrainingPlanList',data).then((res)=>{
                    return res.data
                }).then((body)=>{
                    console.log(body.data.length)
                    return body.data
                })
            },
            loadMore(){
                this.loading=true
                this.loaded=true
                this.pageNumber++
                setTimeout(()=>{
                    this.getTraining().then((values)=>{
                        if(values.length==0){
                            this.loading=true
                            let instance=Toast('无更多培训')
                            setTimeout(() => {
                                instance.close()
                            }, 1000)
                        }else{
                            this.loading=false
                            this.trainList.push(...values)
                        }
                        this.loaded=false
                    })
                },2000)
            },
            add(){
                this.$router.push('/managesystem/publishtrain');
            }
        },
        components:{
            HeadV:Header,
            GoBack,
            mtSpinner:Spinner
        }
    }
</script>
<style lang="scss">
    /*TrainingList.vue*/
    @import '../../assets/css/function.scss';
    .TrainingList{
        .train-list{
            width:100%;
            background:white;
            overflow:hidden;
            border-bottom:1.5px solid #e5e5e5;
            a{
                color:#999;
                font-size:pxtorem(12px);
                width:pxtorem(320px);
                .icon{
                    position:relative;
                    top:pxtorem(8px);
                    left:pxtorem(15px);
                }
                .train{
                    float:right;
                    width: pxtorem(280px);
                    margin:pxtorem(10px) 0;
                    p{
                        margin:pxtorem(3px) 0;
                        letter-spacing: pxtorem(0.5px);
                    }
                }
            }
        }
    }
    .TrainingList{
        .page-infinite-loading{
            text-align: center;
            height:pxtorem(50px);
            line-height:pxtorem(50px);
            font-size:pxtorem(16px);
            div {
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
    }
    .publish{
        position: fixed;
        bottom: 30px;
        right: 20px;
        display: inline-block;
        font-size: 14px;
		width:50px;
		height:50px;
		line-height:50px;
		margin-right:10px;
		text-align: center;
		border-radius: 50%;
		background:#e83426;
		color:#fff;
    }
</style>
