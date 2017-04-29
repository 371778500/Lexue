<template>
    <div class="my-settings">
        <!--this is MySettings.html!-->
        <head-v :text='title' :bgcolor="'#ff4f57'"></head-v>
        <div class="user-info">
            <div>
                <img :src="user.pic" class="circle-img" alt="">
            </div>
            <div class="avatar">
                <span class="username">{{user.cnName}}</span>
                <span>{{user.depName}}-{{user.pName}}</span>
                <!--this is added by yinheng-->
            </div>
            <router-link class="in-icon" to="/userinfo"><i class="icon-angle-right"></i></router-link>
        </div>
        <div class="user-operation">
            <div class="horizon-list">
                <ul>
                  <li><router-link style="color:#666" to="/userfinance"><i class="iconfont icon-myFinance" style="color:rgb(255,198,0);"></i>我的财务</router-link></li>
                  <li><router-link style="color:#666" to="/userorder"><i class="iconfont icon-myOrder" style="color:rgb(37,213,185)"></i>我的证书</router-link></li>
                </ul>
            </div>
            <div class="vertical-list">
                <ul>
                    <li><i class="iconfont icon-offlineStudy left" style="color:rgb(255,79,87)"></i>离线学习<span><i class="icon-angle-right"></i></span></li>
                    <li><i class="iconfont icon-studyRecord left" style="color:rgb(255,161,19)"></i>学习记录<span><i class="icon-angle-right"></i></span></li>
                </ul>
            </div>
            <div class="vertical-list">
                <ul>
                    <li><router-link class="link" to="/usergrade"><i class="iconfont icon-myGrade left" style="color:rgb(43,205,251)"></i>我的成绩<span><i class="icon-angle-right"></i></span></router-link></li>
                    <li><router-link class="link" to="/userpractice"><i class="iconfont icon-myPractice left" style="color:rgb(17,205,110)"></i>我的练习<span><i class="icon-angle-right"></i></span></router-link></li>
                </ul>
            </div>
            <div class="vertical-list">
                <ul>
                    <li><router-link class="link" to="/usersetting"><i class="iconfont icon-mySettings left" style="color:rgb(190,190,190)"></i>设置<span><i class="icon-angle-right"></i></span></router-link></li>
                </ul>
            </div>
        </div>
        <!--<router-link to="/videoDemo">测试</router-link>-->
    </div>
</template>
<script>
     import Header from '../Header.vue'
    export default{

        data(){
            return{
                user:{},
                title:'我的',
                defaultImg:true
            }
        },
        mounted(){
            // var user = this.$store.state.api.userInfo + "user="+this.getCookie("user")+"&pwd="+this.getCookie("pwd")
            // this.$http.get(user).then((res)=>{
            //     return res.json()
            // }).then((body)=>{
            //     console.log(body)
            //     this.user=body
            //     if(body.pic.length<=29){
            //         this.user.pic='../../../static/avatar-default.png'
            //     }
            // })
            this.user=JSON.parse(sessionStorage.user)
        },
        methods:{
            getCookie(name){
                var cookieName = encodeURIComponent(name) + "=",
                    cookieStart = document.cookie.indexOf(cookieName),
                    cookieValue = null;
                if(cookieStart>-1){
                    var cookieEnd = document.cookie.indexOf(";",cookieStart);
                    if(cookieEnd==-1){
                        cookieEnd = document.cookie.length;
                    }
                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
                }
                return cookieValue;
            }
        },
        components:{
            HeadV:Header,
        }
    }
</script>
<style lang="scss">
    /*MySettings.vue*/
    @import "../../assets/css/function.scss";
    $basecolor : rgb(255,79,87);
    .my-settings{
        height:pxtorem(568px);
        margin-bottom:pxtorem(60px);
        .user-info{
            /*height:4.6rem;*/
            position: relative;
            background-color:$basecolor;
            overflow:hidden;
            .default-avatar{
              position: relative;
              top: 24px;
              margin:0 auto;
              background: white;
              margin-bottom: 10px;
              width:pxtorem(85px);
              height:pxtorem(85px);
              line-height: pxtorem(85px);
              text-align: center;
              border-radius: 50%;
              i{
                font-size:pxtorem(45px)
              }

            }
            .circle-img{
                /*float:left;*/
                display: block;
                margin:0 auto;
                position:relative;
                width:pxtorem(85px);
                height:pxtorem(85px);
                border-radius:50%;
                opacity:0.8;
                /*margin:0.8rem 1.2rem;*/
            }
            .avatar{
                /*float:left;*/
                /*margin-top:pxToRem(25px);*/
                font-family:"微软雅黑";
                color:#fff;
                span{
                    display: block;
                    text-align:center;
                    font-size:12px;
                    margin-bottom:pxtorem(25px);
                }
                .username{
                    margin-top:pxtorem(30px);
                    margin-bottom:pxtorem(9px);
                    font-size:pxToRem(24px);
                }
            }
            .in-icon{
                position:absolute;
                right:15px;
                bottom: 37px;
                text-decoration:none;
                color:#fff;
                i{
                    font-size:pxtorem(30px);
                }
                /*line-height:4.6rem;
                margin-right:0.7rem;*/
            }
        }
        .user-operation{
            /*margin-top:0.4rem;*/
            font-family:"微软雅黑";
            color:#666;
            .horizon-list{
                padding:pxToRem(8px) pxToRem(10px);
                background-color:#fff;
                ul{
                    overflow:hidden;
                    font-size:pxToRem(16px);
                    li{
                        float:left;
                        list-style:none;
                        width:pxToRem(149px);
                        border-right:1px solid #ccc;
                        line-height:pxtorem(24px);
                        i{
                            position:relative;
                            top:pxtorem(3px);
                            padding:0 pxtorem(10px) 0 pxtorem(25px);
                            font-size:pxtorem(24px);
                        }
                    }
                    li:last-child{
                        border-right:none;
                    }
                }
            }
            .vertical-list{
                margin-top:pxToRem(4px);
                padding:0 pxToRem(15px) 0 pxtorem(10px);
                background-color:#fff;
                ul{
                    overflow:hidden;
                    font-size:pxToRem(16px);
                    .link{
                        display: inline-block;
                        color:#666;
                        width:pxtorem(295px);
                    }
                    li{
                        list-style:none;
                        padding:pxToRem(8px) 0;
                        border-bottom:2px solid rgba(238,238,238,1);
                        span{
                            float:right;
                            color:#aaa;
                            font-size:pxtorem(18px);
                        }
                        .left{
                            position:relative;
                            top:pxtorem(2px);
                            padding:0 pxtorem(13px) 0 pxtorem(6px);
                            font-size:pxtorem(18px);
                        }
                    }
                    li:last-child{
                        border-bottom:none;
                    }
                }
            }
        }
    }
</style>

