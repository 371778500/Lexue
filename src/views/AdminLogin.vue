<template>
    <div id='Login'>
        <!--this is Login html! ~
        <button type="" @click='Login_in'>Login in</button>
        <button type="" @click='sign_up'>Sign up</button>-->
        <!--<span class="back" @click="goback">
            <i class="icon-angle-left"></i>
        </span>-->
        <div class="login-img">
            <i class='iconfont icon-logo-ulexue'></i>
            <i class='iconfont icon-ulexuefont'></i>
            <p>欢迎进入乐学网培训管理系统</p>
        </div>
        <div class="login-body">
            <div class="input-txt">
                <label for="username"><i class="iconfont icon-username"></i>管理员</label>
                <input type="text" id="username" name="username" maxLength="20">
            </div>
            <div class="input-txt">
                <label for="password"><i class="iconfont icon-pwd"></i>密码</label>
                <input type="password" id="password" name="password" maxLength="16">
                <span @click="toggle_pwd_show"><i :class="iconEye"></i></span>
            </div>
            <div class="input-chk">
                <input type="checkbox" id="rememberpwd">
                <label for="rememberpwd">记住密码</label>
                <input type="checkbox" id="autologin">
                <label for="autologin" style="text-align: right">自动登录</label>
            </div>
            <div  @click="Login_in" style='text-align:center;'>
                <mt-button type="danger" class="signin-btn">登&nbsp;&nbsp;录</mt-button>
            </div>         
        </div>
    </div>
</template>
<script>
    import { Button,Spinner,Toast,Indicator } from 'mint-ui';
    import 'mint-ui/lib/toast/style.css';
    import 'mint-ui/lib/indicator/style.css';
    import { mapActions,} from 'vuex';
    export default{
        data:function(){
            return{
                toggle:"false",
                iconEye:"icon-eye-open",
            }
        },
        mounted(){
            $('#username').val(this.getCookie("user"))
            $('#password').val(this.getCookie("pwd"))
            if(this.getCookie("user")&&this.getCookie("pwd")){
                $("#rememberpwd").attr("checked",true)
            }
            if(this.getCookie("auto")=="true"){
                $("#autologin").attr("checked",true)
                this.Login_in()
            }
            // console.log(this.getCookie("user"))
            // console.log(this.getCookie("pwd"))
            // console.log(this.getCookie("auto"))
            // console.log($("#rememberpwd").is(':checked'))
        },
        methods:{
            ...mapActions({

            }),
            Login_in(){
                if($("#autologin").is(':checked')){
                    var date=new Date();
                    date.setTime(date.getTime()+7*24*60*60*1000); //设置date为当前时间+7天
                    document.cookie="auto=true";
                }else{
                    var date=new Date();
                    date.setTime(date.getTime()+7*24*60*60*1000); //设置date为当前时间+7天
                    document.cookie="auto=false";
                }
                if($("#rememberpwd").is(':checked')){
                    var date=new Date();
                    date.setTime(date.getTime()+7*24*60*60*1000); //设置date为当前时间+7天
                    document.cookie="user="+$('#username').val()+";expires="+date.toGMTString(); //将date赋值给expires
                    document.cookie="pwd="+$('#password').val()+";expires="+date.toGMTString(); //将date赋值给expires
                }
                //this.$router.push('managesystem')
                // this.$store.api.login = '/api/loginLx.ashx?key=6480-4230-27FD-8AA0&'
                // 基于/api的请求会被http-proxy转发为'http://academy.yonyou.com/api/loginLx.ashx?key=6480-4230-27FD-8AA0&'
                const login = this.$store.state.api.login + 'user='+ $('#username').val().trim() + '&pwd=' + $('#password').val().trim();
                if($('#username').val() && $('#password').val()){
                        Indicator.open({
                        text: '登录中...',
                        spinnerType: 'snake'
                    })
                    this.$http.get(login).then(res=>{
                        return  res.data.userName? res.data:JSON.parse(res.data);
                    }).then(body=>{
                        console.log(body)
                        if(body.status=='true'){
                            if(body.identity=='35'){
                                this.$store.dispatch('setUserdata', body.userName)
                                Indicator.close()
                                this.$router.push('managesystem')
                            }else{
                                Indicator.close()
                                let instance = Toast("用户名和密码错误！");
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            }
                        }else{
                            Indicator.close()
                            let instance = Toast("用户名和密码错误！");
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                        }
                    })          
                }else{
                    let instance = Toast("用户名和密码不能为空！");
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            },
            toggle_pwd_show(){
                var pwd=document.getElementById('password');
                pwd.getAttribute('type');
                this.toggle=!this.toggle;
                this.iconEye=this.toggle?"icon-eye-open":"icon-eye-close";
                var type=this.toggle?"password":"text";
                pwd.setAttribute('type',type);
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
            },
            goback(){
                this.$router.push('/Login');
            }
        },
        components:{
            mtButton:Button,
            mtSpinner:Spinner,
            Toast,
        }
    }
</script>
<style lang="scss" scoped>
    /* Login.vue */
    @import "../assets/css/function.scss";
    #Login{
        min-height:pxToRem(568px);
        background-color:#fff;
        .back{
            position:absolute;
            top:pxtorem(6px);
            dispaly:inline-block;
            width:pxtorem(40px);
            height:pxtorem(40px);
            text-align:center;
            line-height:pxtorem(40px);
            i{
                font-size:pxtorem(30px);
                color:#fff;
            }
        }
        .login-img{
            /*position:relative;*/
            background-image: url('../../static/loginbg-img0.png');
            background-size:pxtorem(320px) pxtorem(278px);
            padding-top:pxToRem(35px);
            display:flex;
            justify-content:center;
            align-items:center;
            flex-flow:column wrap;
            i{
                margin-bottom:pxtorem(-20px);
                /*color:#e83426;*/
            }
            .icon-logo-ulexue{
                font-size: pxtorem(110px);
                color:#fff
            }
            .icon-ulexuefont{
                font-size:pxtorem(60px);
                color:#fff;
                margin-top:pxtorem(10px);
            }
            p{
                position:relative;
                top:pxtorem(30px);
                color:#fff;
                font-size:pxtorem(12px);
            }
            padding-bottom:pxtorem(70px);
        }
        .login-body{
            margin-top: pxtorem(20px);
            .input-txt{
                padding:pxtorem(20px) 0 pxtorem(5px);
                margin:0 pxtorem(33px);
                text-align:left;
                font-size:pxtorem(14px);
                border-bottom:1px solid #888;
                label{
                    color:#666;
                    display:inline-block;
                    width:5em;
                    margin:0 0.5rem;
                    i{
                        margin-right:pxtorem(9px);
                        color:#e83426;
                    }
                }

                span{
                    position:absolute;
                    right:pxtorem(33px);
                    .icon-eye-open{
                        color:#666;
                    }
                    .icon-eye-close{
                        color:#666;
                    }
                }
                input{
                    color:#666;
                    font-size:0.6rem;
                    border:none;
                    outline:none;
                    background:rgba(255,255,255,0.1);
                }
                input:-webkit-autofill{
                    -webkit-box-shadow: 0 0 0px 1000px white inset;
                        background-color: white;
                }
            }
            .input-chk{
                padding:pxtorem(20px) 0;
                margin:0 pxtorem(33px);
                text-align:left;
                font-size:pxtorem(12px);
                color:#666;
                text-indent:pxtorem(10px);
                /*input{
                    position:relative;
                    top:pxtorem(2px);
                    width:pxtorem(12px);
                    height:pxtorem(12px);
                    margin-right:pxtorem(10px);
                }*/
                input[type="checkbox"]{
                    display: none;
                }
                input[type="checkbox"]+label {
                    display: inline-block;
                    width: 47%;
                    text-align: left;
                    -webkit-box-sizing: border-box;
                }
                label::before{
                    content:'';
                    display: inline-block;
                    width: pxtorem(16px);
                    height: pxtorem(16px);
                    background: url('../../static/未选-52.svg') no-repeat;
                    vertical-align: middle;
                    margin-right:pxtorem(10px);
                    margin-left: pxtorem(-10px);
                    margin-top:pxtorem(-1px);
                }
                input[type="checkbox"]:checked+label::before{
                    background: url('../../static/勾选-49.svg') no-repeat;
                }
            }
            .signin-btn{
                width:pxtorem(254px);
                height:pxToRem(44px);
                margin-top:pxToRem(32px);
                background-color:#ff4f57;
                border:none;
                border-radius:pxToRem(4px);
                color:#fff;
                font-size:pxToRem(16px);
            }
        }
    }
</style>
<style src='mint-ui/lib/button/style.css'></style>
