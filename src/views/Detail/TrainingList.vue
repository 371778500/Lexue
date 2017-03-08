<template>
    <div class='TrainingList'>
        <head-v text="培训管理">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="nav-bar">
            <ul>
                <li :class='{active:apply}' @click="apply = true">线上报名</li>
                <li :class='{active:!apply}'  @click="apply = false">已报名</li>
            </ul>
        </div>
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
            <div class="train-list" v-show='apply' v-for = 'train in trainList'>
                <router-link :to='"/training/"+train._id'>
                <span class="icon"><i class='icon-circle' :class="[train.isRead?'red':'']" style='font-size:0.4rem;'></i></span>
                    <div class='train'>
                        <p style="font-size:0.7rem;color:#666">培训名称：{{train.name}}</p>
                        <p>讲师：{{train.teacher}}</p>
                        <p>开始时间：{{train.startDate | formatDate}}</p>
                        <p><span>培训地点：{{train.address}}</span></p>
                        <p><span style="float:right;">{{train.createDate | formatDate}}</span></p>
                        <i class="i icon-angle-right"></i> 
                    </div>
                </router-link>
            </div>
            <p v-show="loaded" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                {{loadText}}
            </p>
        </div>
        <div class="train-list" v-show='!apply' v-for = 'train in trained'>
            <router-link :to='"/trainingcancel/"+train._id'>
            <span class="icon"><i class='icon-circle' :class="[info==1?'red':'']" style='font-size:0.4rem;'></i></span>
                <div class='train'>
                    <p style="font-size:0.7rem;color:#666">培训名称：{{train.name}}</p>
                    <p>讲师：{{train.teacher}}</p>
                    <p>开始时间：{{train.startDate | formatDate}}</p>
                    <p><span>培训地点：{{train.address}}</span></p>
                    <p><span style="float:right;">{{train.createDate | formatDate}}</span></p>
                    <i class="i icon-angle-right"></i> 
                </div>
            </router-link>
        </div>
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
                apply:false,
                trainList:[],
                loading:false, //true禁止无限加载
                loaded:false, //true出现加载动画
                loadText:'加载中...',
                pageSize:'10',
                pageNumber:0,
                src:'',
                trained:[]
            }
        },
        mounted(){
            this.getTraining().then((values)=>{
                //console.log(values)
                this.trainList.push(...values)
            })
            this.getTrained().then((values)=>{
                //console.log(values)
                this.trained.push(...values)
            })
            // this.$http.post('/app/qrcode',{userId:1,courseId:1}).then((res)=>{
            //     this.src=window.URL.createObjectURL(res.data);
            //     // this.src=res.data;
            //     console.log(this.src)
            // })
        },
        beforeRouteEnter: (to, from, next) => {
            if(from.path=='/Main'){
                next(vm=>{
                    vm.apply=true
                })
            }else{
                next()
            }
        },
        methods:{
            getTraining(){
                var data = { pageNumber:this.pageNumber,pageSize:this.pageSize }
                return this.$http.post('/app/getTrainingPlanList',data).then((res)=>{
                    var trains=res.body.data;
                    var data=JSON.parse(window.sessionStorage.user).userId;
                    this.$http.post('/app/serchUnRead',{userId:data}).then((res)=>{
                        var infos=res.body.data;
                        if(infos.length!=0 && trains.length!=0){
                           for(var i=0;i<infos.length;i++){
                               for(var j=0;j<trains.length;j++){
                                   if(infos[i].infoId==trains[j]._id){
                                       trains[j].isRead=true;
                                       break;
                                   }
                               }
                           }
                       }
                    })
                    return trains
                }).then((data)=>{
                    console.log(data.length)
                    return data
                })
            },
            getTrained(){
                var data = {id:window.localStorage.getItem('UserInfo') }
                return this.$http.post('/app/getMyTrainingPlan',data).then((res)=>{
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
        .nav-bar{
            ul{
                list-style: none;
                background:#fff;
                overflow:hidden;
                margin-top:pxtorem(8px);
                border-bottom:1px solid #e5e5e5;
                li{
                    float:left;
                    width:pxtorem(80px);
                    height:pxtorem(40px);
                    text-align: center;
                    line-height: pxtorem(40px);
                    margin:0 pxtorem(40px);
                    font-size:pxtorem(16px);
                    color:#666;
                }
                .active{
                    color:#e83426;
                    border-bottom:2px solid #e83426;
                }
            }
        }
    }
    .TrainingList{
        .train-list{
            width:100%;
            background:white;
            overflow:hidden;
            position:relative;
            border-bottom:1.5px solid #e5e5e5;
            a{
                color:#999;
                font-size:pxtorem(12px);
                width:pxtorem(320px);
                .icon{
                    position:relative;
                    top:pxtorem(8px);
                    left:pxtorem(15px);
                    .red{
                        color:#e83426;
                    }
                }
                .train{
                    float:right;
                    width: pxtorem(280px);
                    margin:pxtorem(10px) 0;
                    p{
                        width:pxtorem(260px);
                        margin:pxtorem(3px) 0;
                        letter-spacing: pxtorem(0.5px);
                    }
                    .i{
                        color:#555;
                        font-size:pxtorem(25px);
                        position:absolute;
                        right:pxtorem(15px);
                        top:pxtorem(10px);
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
</style>
