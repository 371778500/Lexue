<template>
    <div class="user-practice">
        <div class='fixedbar'>
            <header-v :text = 'text' >
                <go-back slot='goback' v-if='text'></go-back>
            </header-v>
            <ul class='achieve'>
                <li :class='{ active:unfinished }'  @click='unfinished = true' >
                    <span>练习列表</span>
                    <span class='triangle'></span>
                </li>
                <li :class='{ active:!unfinished}'  @click='unfinished = false'>     
                    <span>练习记录</span>
                    <span class='triangle'></span>
                </li>
            </ul>
        </div>
        <loadmore :top-method='loadTop' @top-status-change='handleTopChange' ref='loadmore'>
            <!-- Custom  dropdown refresh -->
            <div slot="top" class="mint-loadmore-top">
                <div class='spinner-container' v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                   <spinner ></spinner>
                  
                </div>
                <div style='font-size:16px;color:#ccc;' v-show="topStatus === 'loading'">Loading...</div>
            </div>
            <!-- two can switch section -->
            <transition>
            <div v-show ='unfinished'>
                <div class='article' v-for = 'article in articles'>
                    <div class='article-header' @click='article.packup = !article.packup'> 
                        <i class='icon-chevron-right' style='color:#00cea9;font-size:18px'></i>
                        <span>【数学】</span>
                        <span style='color:#ccc;font-size:12px'>(共<span style='color:red'>3</span>门)</span>
                        <div class='packup' >
                            <span>{{article.packup ? '收起' : '展开'}}</span>
                            <i :class ="[article.packup ? 'icon-angle-up':'icon-angle-down']" style='font-size:14px'></i>
                        </div>
                    </div>
                    <div class='article-content'  v-show='article.packup'>
                        <div class='article-list' v-for='list in lists'>
                            <div class='article-list-header'>
                                <span>1、线性代数</span>
                                <i class = 'icon-book'></i>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </transition>
       <div v-show ='!unfinished'>
                <div class='article' v-for = 'article in articles1'>
                    <div class='article-header'  @click='article.packup = !article.packup'> 
                        <i class='icon-chevron-right' style='color:#00cea9;font-size:18px'></i>
                        <span>【语文】</span>
                        <span style='color:#ccc;font-size:12px'>(共<span style='color:red'>2</span>门)</span>
                        <div class='packup'>
                            <span>{{article.packup ? '收起' : '展开'}}</span>
                            <i :class ="[article.packup ? 'icon-angle-up':'icon-angle-down']" style='font-size:14px'></i>
                        </div>
                    </div>
                    <div class='article-content'  v-show='article.packup'>
                        <div class='article-list' v-for='list in lists1'>
                            <div class='article-list-header'>
                                <span>1、古代文言文</span>
                                <i class = 'icon-check'></i>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        <!--<loadmore :top-method='loadTop' @top-status-change='handleTopChange' ref='loadmore'></loadmore>-->
        </loadmore>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack'
    import Timer  from '../../components/Timer'
    import { Loadmore ,Spinner } from 'mint-ui'
    import 'mint-ui/lib/loadmore/style.css'
    import 'mint-ui/lib/spinner/style.css'
    export default{
        // 对于动态绑定class,三元表达式用数组,单一的class则用对象,所以记住对象名一定要合法.'icon-active'不是合法的变量名
        //不会转成 字符串,需要手动声明.
        // 对于:class='{icon-active:isActive,}',就会是无效的表达式.需要:class="{'icon-active':isActive,}"
        data(){
            return{
                text:'我的练习',
                unfinished:true,
                articles:[{},{},{}],
                lists:[1,2],
                articles1:[{},{},{}],
                lists1:[1,2],
                topStatus:'',
            }
        },
        mounted(){
            this.articles.map(article =>{
                // article['packup'] = true ;
                // on above the way,it wouldn't obsserve data .http://vuefe.cn/guide/list.html#注意事项 ,see this!
                this.$set(article,'packup',true);
            })
            this.articles1.map(article =>{
                // article['packup'] = true ;
                // on above the way,it wouldn't obsserve data .http://vuefe.cn/guide/list.html#注意事项 ,see this!
                this.$set(article,'packup',true);
            })
           
        },
        components:{
            HeaderV:Header,
            GoBack,
            Timer,
            Loadmore,
            Spinner,
        },
        computed:{
            
        },
        methods:{
            toggle(){
                this.packup = !this.packup;
            },
            //对下拉刷新时状态的变化的监听.http://mint-ui.github.io/docs/#!/zh-cn2/loadmore
            //这个是组件emit的过来的,带有参数,status有几个默认值,pull,drop,loading.还可以看源码实现,挺简单.
            handleTopChange(status){
               this.topStatus = status ;    
            },
            loadTop(id){
                //针对有几个loadmore的时候,需要把对应的id扔进去,重新定位.
                //onTopLoaded是组件自身定义的methods.这个就是在父组件作用域调用子组件的方法.
                //这个id无需传,是组件在创建时,定义的uuid,怎么发生作用的呢.
                // 一句话,在父组件mounted的阶段生成了该组件的uuid,然后通过父组件的props将子组件onToploaded的引用指向了子组件的topMethod(传递id),
                //在调用子组件的topMethod(this.uuid)方法,间接将参数this.uuid赋值给了id,传递到了onToploaded(id),整个过程起到一个唯一性校验的作用.
                this.lists.push({});
                this.$refs.loadmore.onTopLoaded(id);
            }
        }
    }
</script>
<style lang="scss">
    /*UserPractice.vue*/
    @import "../../assets/css/function.scss";
    $basecolor : #00cea9 ;
    .user-practice{
        width:100%;
        margin-bottom:pxtorem(60px);
        margin-top:pxtorem(90px);
        ul.achieve{
            background:white;
            font-size:pxtorem(16px);
            font-family:'微软雅黑';
            overflow:hidden;
            li{
                width:pxtorem(160px);
                float:left;
                height:pxtorem(40px);
                display:inline-block;           
                text-align:center;
                line-height:pxtorem(40px);
                position:relative;
                span:nth-child(1){
                    display:inline-block;
                    width:70%;
                    height:pxtorem(40px);
                    border:none;
                    box-sizing:border-box;
                }
                span.triangle{
                    position:absolute;
                    bottom:2px;
                    left:50%;
                    margin-left:-4px;
                    display:none;
                    border-width:4px;
                    border-style:solid;
                    border-color: white white  $basecolor white;        
                }
                &.active{
                    span:nth-child(1){
                        border-bottom:2px solid $basecolor;
                    }
                    span.triangle{
                        display:block;
                    }
                }
                
            }
        }
    }
    .user-practice{
        .article{
            .article-header{
                padding-left:pxtorem(10px);
                display:flex;
                flex-flow:row nowrap;
                align-items:center;
                height:pxtorem(50px);
                line-height:pxtorem(50px);
                overflow:hidden;
                font-family:'微软雅黑';
                font-size:pxtorem(16px);
                .packup{
                   color:$basecolor;
                   font-size:pxtorem(12px);
                   flex:3 1 auto;
                   text-align:right;
                   padding-right:pxtorem(15px);
                }
            }
            .article-content{
                width:100%;
                background:white;
                .article-list{
                    position:relative;
                    padding:pxtorem(15px) pxtorem(28px);
                    font-size:pxtorem(14px);
                    .article-list-header{
                        width:pxtorem(280px);
                        height:pxtorem(20px);
                        line-height:pxtorem(20px);
                        overflow:hidden;
                        position:relative;
                        i{
                            position:absolute;
                            top:pxtorem(0px);
                            right:pxtorem(0px);
                            z-index:1;
                            color:rgba(51,179,244,1);
                            font-size:pxtorem(20px)
                        }

                    }
                }
            }
        }
        .spinner-container{
            position:relative;
            display:flex;
            flex-flow:column nowrap;
            justify-content:center;
            align-items:center;
            color:#26a2ff;
        }
        .fixedbar{
            position:fixed;
            top:0;
            left:0;
            z-index:2;
        }
    }
</style>