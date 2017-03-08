<template>
    <div class="evaluation" :style="{height:evaHeight}">
        <div class="take-evaluations">
            <router-link :to="'/takeevaluation/'+index">
                <span>
                    <i class="iconfont icon-writenote"></i>
                </span>
            </router-link>
        </div>
        <p class="content">{{content}}</p>
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="true">
            <evaluate-info v-for="user in users" 
                :userimg="user.userImg"
                :username="user.userName"
                :content="user.commentContent"
                :date="user.createDate"
                :starNum="user.starNumber">
            </evaluate-info>
            <p v-show="loaded" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                {{loadText}}
            </p>
        </div>
    </div>
</template>
<script>
    import EvaluateInfo from "../../components/EvaluateInfo.vue"
    import { InfiniteScroll,Spinner,Toast } from 'mint-ui'
    import Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                users:[],
                index:this.$route.params.id,
                pageSize:'10',
                pageNumber:0,
                evaHeight:'',
                content:'',
                loading:false, //true禁止无限加载
                loaded:false, //true出现加载动画
                loadText:'加载中...'
            }
        },
        created(){
            this.getEvaluation().then((values)=>{
                this.content = values.length==0?'暂无评论':''
                this.users = values
            })
        },
        updated(){
            this.evaHeight=this.users.length<2?'14.8rem':''
            
        },
        methods:{
            getEvaluation(){
                var data = { courseId:this.$route.params.id,pageNumber:this.pageNumber,pageSize:this.pageSize }
                return this.$http.post('/app/getCommentInfo',data).then((res)=>{
                    return res.data
                }).then((body)=>{
                    console.log(body.data.length)           
                    // this.users.push(...body.data)
                    return body.data
                })
            },
            loadMore(){
                this.loading=true
                this.loaded=true
                this.pageNumber++
                setTimeout(()=>{
                    this.getEvaluation().then((values)=>{
                        if(values.length==0){
                            this.loading=true
                            let instance=Toast('无更多评价')
                            setTimeout(() => {
                                instance.close()
                            }, 1000)
                        }else{
                            this.loading=false
                            this.users.push(...values)
                        }
                        this.loaded=false
                    })
                },2000)
            }
        },
        components:{
            EvaluateInfo,
            mtSpinner:Spinner
        }
    }   
</script>
<style lang="scss">
    @import "../../assets/css/function.scss";
    /*Evaluation.vue*/
    .evaluation{
        background: #fff;
        .take-evaluations{
            overflow: hidden;
            margin-top:pxtorem(6px);
            padding:pxtorem(6px) 0 pxtorem(10px);
            border-bottom:1px solid #eee;
            span{
                float:right;
                margin-right:pxtorem(15px);
                i{
                    color:#ff4f57;
                    font-size:pxtorem(16px);
                }
            }
            span::before{
                position:relative;
                bottom:pxtorem(1px);
                content:"评价";
                font-size:pxtorem(12px);
                color:#ff4f57;
                margin-right:pxtorem(10px);
            }
        }
        .content{
            font-size:pxtorem(14px);
            text-align: center;
            color:#aaa;
            font-style: italic;
            padding-top:pxtorem(10px);
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
</style>