<template>
    <div class="userInfo">
        <head-v :text="title">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="base-info">
            <ul>
                <li class="special">
                    <span>头像</span>
                    <img :src="user.pic" alt="">
                    <span class="angle-position"><i class="icon-angle-right"></i></span>
                </li>
                <li>
                    <span>用户名</span>
                    <span class="grey">{{user.cnName}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span class="angle-position-normal"><i class="icon-angle-right"></i></span>
                    <span class="grey-special">{{user.sex}}</span>                 
                </li>
            </ul>
            <ul>
                <li>
                    <span>部门</span>
                    <span class="grey">{{user.depName}}</span>
                </li>
                <li>
                    <span>岗位</span>
                    <span class="grey">{{user.pName}}</span>
                </li>
                <li>
                    <span>手机号</span>
                    <span class="angle-position-normal"><i class="icon-angle-right"></i></span>
                    <span class="grey-special">{{user.tel?user.tel:'无'}}</span>                 
                </li>
                <li>
                    <span>邮箱</span>
                    <span class="angle-position-normal"><i class="icon-angle-right"></i></span>
                    <span class="grey-special">{{user.email?user.email:'无'}}</span>                 
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    export default{
        data(){
            return{
                title:'个人资料',
                user:{}
            }
        },
        mounted(){
            this.user=JSON.parse(sessionStorage.getItem('user'))
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
            GoBack
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/function.scss";
    .userInfo{
        .base-info{
            ul{
                background:#fff;
                padding:0 pxToRem(16px);
                overflow:hidden;
                margin-top:pxToRem(4px);
                li{
                    list-style:none;
                    font-size:pxToRem(16px);
                    padding:pxToRem(10px) pxToRem(4px) pxToRem(10px) pxToRem(12px);
                    border-bottom:2px solid #eee;
                    height:pxToRem(30px);
                    line-height:pxToRem(30px);
                    .grey{
                        color:#999;
                        float:right;
                        margin-right:pxToRem(25px);
                    }
                    .grey-special{
                        color:#999;
                        float:right;
                        margin-right:pxToRem(18px);
                    }
                    .angle-position-normal{
                        float:right;
                        color:#999;
                        font-size:pxToRem(25px);
                    }

                }
                li:last-child{
                    border:none;
                }
                .special{                    
                    padding:pxToRem(4px) pxToRem(4px) pxToRem(4px) pxToRem(10px);
                    height:pxToRem(90px);
                    overflow:hidden;
                    span{
                        float:left;
                        height:pxToRem(68px);
                        line-height:pxToRem(68px);
                    }
                    img{
                        position:relative;
                        left:pxToRem(120px);
                        width:pxToRem(85px);
                        height:pxToRem(85px);
                        border-radius:50%;
                    }
                    .angle-position{
                        float:right;
                        font-size:pxToRem(25px);
                        height:pxToRem(90px);
                        line-height:pxToRem(90px);
                        color:#999;
                    }
                }
            }
        }
    }
</style>