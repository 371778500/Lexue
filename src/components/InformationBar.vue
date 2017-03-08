<template>
    <div class='informationBar'>
            <router-link to='/news'>
                <icon-bar   
                iconClass='iconfont icon-news' 
                iconbarColor='red'
                iconText='新闻资讯'>
                    <!--<span class='corner-mark' slot>
                        {{ getNewsNum }}
                    </span>-->
                </icon-bar>     
            </router-link>
           
            <router-link to='/certificate'>
            <icon-bar
            iconClass='iconfont icon-cert' 
            iconbarColor='orange'
            iconText='证书专项'>
            <!--<span class='corner-mark' slot>
                {{ getNoticeNum }}
            </span>-->
            </icon-bar>
            </router-link>

            <router-link to='/CheckIn'>
            <icon-bar   
            iconClass='iconfont icon-checkIn' 
            iconbarColor='yellow'
            iconText='签到'>
            
            </icon-bar>
            </router-link>

            <router-link to='training'>
            <icon-bar 
            iconClass='iconfont icon-trainPlan' 
            iconbarColor='green'
            iconText='培训计划'>
           
            </icon-bar>
            </router-link>
       
    </div>
</template>
<script>
    import IconBar from './IconBar.vue'
    export default{    
        mounted(){
            // this fetch data from api 
            // FixMe
            // this.news_num = 3 ; 
            // this.notice_num = 4 ;
        },
        data(){
            return { 
                news_num : Math.random()*10,
                notice_num : 10,
            }
        },
        computed:{
            getNewsNum(){
                return this.news_num > 10 ?  '...' : Math.round(this.news_num) ;
            },
            getNoticeNum(){
                return this.notice_num > 10 ? '...' : Math.round(this.notice_num) ;
            },
        },
        components:{
            IconBar,
        }

    }
</script>
<style lang='scss'>
    /* InformationBar.vue */
    @import '../assets/css/function';
    /*.corner-mark{
        position:absolute;
        width:pxtorem(16px);
        height:pxtorem(16px);
        top:pxtorem(-2px);
        right: pxtorem(-2px);
        display:inline-block;
        font-size:pxtorem(10px);
        line-height:pxtorem(17px);
        border-radius:pxtorem(16px);
        background:red;
        color:white;
        text-align:center;
    }*/
    .informationBar{
        display:flex;
        width:100%;
        justify-content:space-around;
        padding-top:pxtorem(6px);
        padding-bottom:pxtorem(10px);
        margin-top:pxtorem(-5px);
        margin-bottom:pxtorem(4px);
        background-color:#fff;

    }
</style>