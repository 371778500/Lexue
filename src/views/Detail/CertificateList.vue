<template>
    <div class='CertificateList'>
        <head-v text="证书专项列表">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="nav-bar">
            <ul>
                <li :class='{active:apply}' @click="apply = true">证书</li>
                <li :class='{active:!apply}'  @click="apply = false">专项</li>
            </ul>
        </div>
        <!--<div class="certificate-list" v-show='apply' v-for = 'certificate in certificateList'>
            <router-link to='/newsid'>
            <span class="icon"><i class='icon-circle' :class="[info==1?'red':'']" style='font-size:0.4rem;'></i></span>
                <div class='certificate'>
                    <p style="font-size:0.7rem;color:#666">课程名称：{{certificate.tname}}</p>
                    <p>开始时间：{{certificate.startTime}}</p>
                    <p><span>培训地点：{{certificate.taddress}}</span><span style="float:right;margin-right:1rem">{{certificate.publishTime}}</span></p>
                </div>
            </router-link>
        </div>-->
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="true"
            v-show='apply'>
            <div class="certificate-list" v-for = 'certificate in certificateList'>
                <!--<router-link :to='"/certificate/"+certificate._id'>
                <div class="cert">证</div>
                    <div class='certificate'>
                        <p style="font-size:0.7rem;color:#666">证书名称：{{certificate.certName}}</p>
                        <p>所属产品：{{certificate.certProducts}}</p>
                        <p>该证书报名时间：{{certificate.validStart | formatDate}}至{{certificate.validEnd | formatDate}}</p>
                        <p><span>所属角色：{{certificate.certDirection}}</span><span style="float:right;margin-right:1rem">{{certificate.validStart | formatDate}}</span></p>
                    </div>
                </router-link>-->
                <div class="newCertificate">
                    <router-link :to="'/certificate/'+certificate.certID">
                        <div class="cert">证</div>
                        <div class="info">
                            <p>证书名称:{{certificate.certName}}</p>
                            <p><span class="left">所属产品:{{certificate.certProducts}}</span></p>
                            <p>该专项报名时间:{{certificate.validStart | formatDay}}至{{certificate.validEnd | formatDay}}</p>
                            <p><span class="left">所属角色:{{certificate.certDirection}}</span><span class="right">创建时间:{{certificate.validStart | formatDay}}</span></p>
                            <i class="i icon-angle-right"></i> 
                            <p>
                                <!--<router-link :to="'/certificate/'+certificate.certID"><span class="left">查看该认证下课程</span></router-link>-->
                                <router-link :to="'/applycert/'+certificate.certID"><span class="right">报名认证学习</span></router-link>
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
            <p v-show="loaded" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                {{loadText}}
            </p>
        </div>
        <div
            v-infinite-scroll="loadMore2"
            infinite-scroll-disabled="loading2"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="true"
            v-show='!apply'>
            <div class="certificate-list"  v-for = ' special in specialList'>
                <!--<router-link :to='"/certificate/"+ special._id'>
                <span class="icon"><i class='icon-circle' :class="[info==1?'red':'']" style='font-size:0.4rem;'></i></span>
                    <div class='certificate'>
                        <p style="font-size:0.7rem;color:#666">专项名称：{{ special.certName}}</p>
                        <p>所属产品：{{ special.certProducts}}</p>
                        <p>该证书报名时间：{{ special.validStart | formatDate}}至{{ special.validEnd | formatDate}}</p>
                        <p><span>所属角色：{{ special.certDirection}}</span><span style="float:right;margin-right:1rem">{{ special.validStart | formatDate}}</span></p>
                    </div>
                </router-link>-->
                <div class="newCertificate">
                    <router-link :to="'/certificate/'+special.certID">
                    <div class="cert sp">专</div>
                        <div class="info">
                            <p>证书名称:{{special.certName}}</p>
                            <p><span class="left">所属产品:{{special.certProducts}}</span></p>
                            <p>该专项报名时间:{{special.validStart | formatDay}}至{{special.validEnd | formatDay}}</p>
                            <p><span class="left">所属角色:{{special.certDirection}}</span><span class="right">创建时间:{{special.validStart | formatDay}}</span></p>
                            <i class="i icon-angle-right"></i> 
                            <p>
                                <!--<router-link :to="'/certificate/'+special.certID"><span class="left">查看该证书下课程</span></router-link>-->
                                <router-link :to="'/applycert/'+special.certID"><span class="right">报名专项学习</span></router-link>
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
            <p v-show="loaded2" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                {{loadText}}
            </p>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { InfiniteScroll,Spinner,Toast,Button } from 'mint-ui'
    import { Indicator } from 'mint-ui'
    import 'mint-ui/lib/indicator/style.css'
    import Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                apply:true,
                certificateList:[],//证书列表
                specialList:[],//专项列表
                loading:false, //true禁止无限加载（证书）
                loaded:false, //true出现加载动画（证书）
                loading2:false, //true禁止无限加载（专项）
                loaded2:false, //true出现加载动画（专项）
                loadText:'加载中...',
                pageSize:'10',
                pageNumber:1,//证书页码
                pageNumber2:1,//专项页码
                src:'',
                certificateid:[]
            }
        },
        mounted(){
            this.getcertificate(0,this.pageNumber).then((values)=>{
                console.log(values)
                this.certificateList.push(...values.allCertificates)
            })
            this.getcertificate(1,this.pageNumber2).then((values)=>{
                this.specialList.push(...values.allCertificates)
            })
            // .then(allLessons =>{
            //     allLessons.map(lesson =>{
            //        var a =  this.getAveragePercent(myStudyProgress, lesson.lessonID)
            //         a.then(percent =>this.$set(lesson,"percent",percent))
            //     })
            //     Indicator.close()
            // })
        },
        methods:{
            getcertificate(type,pageNumber){
                const certificateInfoUrl = this.$store.state.api.getAllCertificate
                        + 'pageSize=' + this.pageSize
                        + '&pageIndex=' + pageNumber
                        + '&type=' + type //证书：0 专项：1
                        + '&user=' + window.localStorage.UserInfo;
                console.log(certificateInfoUrl)
                console.log(window.localStorage.UserInfo)
                return this.$http.get(certificateInfoUrl).then((res)=>{
                   return res.body.recordTotalCount?res.body:JSON.parse(res.body)
                })
            },
            loadMore(){
                if(this.apply){
                    this.loading=true
                    this.loaded=true
                    this.pageNumber++
                    setTimeout(()=>{
                        this.getcertificate(0,this.pageNumber).then((values)=>{
                            if(values.status=='false'){
                                this.loading=true
                                let instance=Toast('无更多证书')
                                setTimeout(() => {
                                    instance.close()
                                }, 1000)
                            }else{
                                this.loading=false
                                this.certificateList.push(...values.allCertificates)
                            }
                            this.loaded=false
                        })
                    },2000)
                }
            },
            loadMore2(){
                if(!this.apply){
                    this.loading2=true
                    this.loaded2=true
                    this.pageNumber2++
                    setTimeout(()=>{
                        this.getcertificate(1,this.pageNumber2).then((values)=>{
                            if(values.status=='false'){
                                this.loading2=true
                                let instance=Toast('无更多专项')
                                setTimeout(() => {
                                    instance.close()
                                }, 1000)
                            }else{
                                this.loading2=false
                                this.specialList.push(...values.allCertificates)
                            }
                            this.loaded2=false
                        })
                    },2000)
                }
            }
        },
        components:{
            HeadV:Header,
            GoBack,
            mtSpinner:Spinner,
            mtButton:Button
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/function.scss';
    .CertificateList{
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
    .CertificateList{
        .certificate-list{
            width:100%;
            background:white;
            overflow:hidden;
            border-bottom:1.5px solid #e5e5e5;
            position:relative;
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
                    background-color:#ff8208;
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
                            float:left;
                        }
                        a{
                            .left{
                                color:#ff4f57;
                            }
                            .right{
                                color:#25d5b9;
                            }
                        }
                    }
                    p:first-child{
                        color:#333;
                        font-size:pxtorem(14px);
                        margin-bottom:pxtorem(9px);
                    }
                }
            }
            .newCertificate:last-child{
                border:none;
            }.newCertificate{
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
        }
    }
</style>
