<template>
    <div class='InfoList'>
        <p class="content">{{content}}</p>
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="true">
           <div class="news" v-for = 'news in newsList'>
               <router-link :to="'/newsid/'+news.NEWS_ID">
                   <div class='news-summary'>
                       <span style="margin-top:-2px"><i class='icon-circle' :class="[news.isRead?'red':'']" style='font-size:8px;margin-top:-2px;'></i></span>
                       <span>{{news.NEWS_NAME}}</span>
                   </div>
                  <div class='date'>
                      <span>{{news.NEWS_SEND_DATE}}</span> 
                  </div> 
               </router-link>
           </div>
            <p v-show="loaded" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                {{loadText}}
            </p>
       </div>
    </div>
</template>
<script>
    import { InfiniteScroll,Spinner,Toast } from 'mint-ui'
    import Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                newsList:[],
                pageSize:'10',
                pageNumber:1,
                evaHeight:'',
                content:'',
                loading:false, //true禁止无限加载
                loaded:false, //true出现加载动画
                loadText:'加载中...'
            }
        },
        mounted(){
            this.getNews().then((body)=>{
                    this.newsList.push(...body)
                })
        },
        methods:{
            getNews(){
                const news = this.$store.state.api.newsList + 'pageSize='+this.pageSize+'&pageIndex='+this.pageNumber
                console.log(news)
                return this.$http.get(news).then((res)=>{
                    var allNews=res.body.recordTotalCount?res.body.allNews:JSON.parse(res.body).allNews;
                    return this.$http.post('/app/findNewsTime').then((res)=>{
                        var news=res.body.data?res.body.data:JSON.parse(res.body).data;
                        var newsIds=[];
                        for(var i=0;i<allNews.length;i++){
                            if(new Date(allNews[i].NEWS_SEND_DATE)>new Date(news.newsTime)){
                                newsIds.push(allNews[i].NEWS_ID);
                            }else{
                                break;
                            }
                        }
                        //有比最新的时间还新的新闻，则保存新时间，发布消息
                        if(newsIds.length!=0){ 
                            var param={time:allNews[0].NEWS_SEND_DATE,newsIds:newsIds.toString()};
                            return this.$http.post('/app/editNewsTime',param).then((res)=>{
                                //查询用户的消息
                                var data=JSON.parse(window.sessionStorage.user).userId;
                                return this.$http.post('/app/serchUnRead',{userId:data}).then((res)=>{
                                    var infos=res.body.data;
                                    if(infos.length!=0 && allNews.length!=0){
                                        for(var i=0;i<infos.length;i++){
                                            for(var j=0;j<allNews.length;j++){
                                                if(infos[i].infoId==allNews[j].NEWS_ID){
                                                    allNews[j].isRead=true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    return allNews;
                                })
                            })
                        }else{
                            //查询用户的消息
                            var data=JSON.parse(window.sessionStorage.user).userId;
                            return this.$http.post('/app/serchUnRead',{userId:data}).then((res)=>{
                                var infos=res.body.data;
                                if(infos.length!=0 && allNews.length!=0){
                                    for(var i=0;i<infos.length;i++){
                                        for(var j=0;j<allNews.length;j++){
                                            if(infos[i].infoId==allNews[j].NEWS_ID){
                                                allNews[j].isRead=true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                return allNews;
                            })   
                        }
                    })                              
                })

            },
            loadMore(){
                this.loading=true
                this.loaded=true
                this.pageNumber++
                setTimeout(()=>{
                    this.getNews().then((values)=>{
                        if(values.status=='false'){
                            this.loading=true
                            let instance=Toast('无更多新闻')
                            setTimeout(() => {
                                instance.close()
                            }, 1000)
                        }else{
                            this.loading=false
                            this.newsList.push(...values)
                        }
                        this.loaded=false
                    })
                },2000)
            }
        },
        components:{
            mtSpinner:Spinner
        }
    }
</script>
<style lang='scss'>
    @import "../../assets/css/function.scss";
    .InfoList{
        width:100%;
        background:white;
        .news{
            list-style:none;
            display:block;
            position:relative;
            margin:pxtorem(13px) pxtorem(20px) pxtorem(13px) pxtorem(15px);
            a{
                display:block;
                width:100%;
                height:pxtorem(80px);
                border-bottom:1px solid #ddd;   
                .news-summary{
                    width:100%;
                    margin-bottom:pxtorem(5px);
                    span{
                          color:#666;
                          font-size:14px;
                          .red{
                              color:#e83426;
                          }
                    }
                }
            .date{
                position:absolute;
                bottom:0;
                right:pxtorem(0px);
                color:#999;
                height:pxtorem(20px);
                line-height:pxtorem(20px);
                font-size:12px;
                } 
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