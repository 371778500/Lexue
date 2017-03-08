<template>
    <div class="user-setting">
        <head-v :text="title">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="operator">
            <ul>
                <li>关于<span><i class="icon-angle-right"></i></span></li>
                <li>清空缓存<span>100M</span></li>
                <li>修改密码<span><i class="icon-angle-right"></i></span></li>
            </ul>
        </div>
        <div class="logout">
            <span @click="logout">退出登录</span>
        </div>
    </div>
</template>
<script>
    import Header from "../Header.vue"
    import GoBack from "../../components/GoBack.vue"
    export default{
        data(){
            return{
                title:"设置"
            }
        },
        methods:{
            logout(){
                // if(this.getCookie("auto")=="true"){
                //     var date=new Date(); 
                //     date.setTime(date.getTime()+7*24*60*60*1000); //设置date为当前时间+7天
                //     document.cookie="auto=false";
                // }
                // window.localStorage.removeItem("UserInfo")
                // this.$router.push("/Login")
                window.wave()
                window.javatojs.test()
            },
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
    /*UserSetting.vue*/
    @import "../../assets/css/function.scss";
    .user-setting{
        .operator{
            background:#fff;
            ul{
                margin-top:pxToRem(10px);
                li{ 
                    color:#333333;
                    list-style:none;
                    font-size:14px;
                    padding:pxToRem(10px) 0;
                    margin:0 pxToRem(15px);
                    border-bottom:1px solid #eee;
                    span{
                        float:right;
                        color:#aaa;
                    }
                    i{
                        font-size:22px;
                    }
                }
                li:last-child{
                    border:none;
                }
            }
        }
        .logout{
            margin-top:pxToRem(15px);
            span{
                display:block;
                padding:pxToRem(10px);
                text-align:center;
                font-size:16px;
                color:white;
                margin:0 pxtorem(15px);
                background:#ff4f57;
                border-radius:5px;
            }
        }
    }
</style>