<template>
    <div id='Login'>
        <!--this is Login html! ~
        <button type="" @click='Login_in'>Login in</button>
        <button type="" @click='sign_up'>Sign up</button>-->
        <div class="login-img">
            <i class='iconfont icon-logo-ulexue' v-show="icon"></i>
            <i class='iconfont icon-ulexuefont' v-show="icon"></i>
            <img :src="src" v-show="!icon">
        </div>
        <div class="login-body">
            <div class="input-txt">
                <label for="username"><i class="iconfont icon-username"></i>用户名</label>
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
            <router-link to="/AdminLogin">
                <div>
                    <i class="iconfont icon-mySettings"></i>
                    <span>进入后台管理</span>
                </div>
            </router-link>
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
                icon:true,
                src:''
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
            // const url = window.location.protocol +'//' + window.location.host
            // if(url!='http://10.10.3.118:81'&&url!='http://localhost:5001'){
            //     console.log(url)
            //     this.$http.post('/app/siteImg',{CusCode:""}).then(res=>{                   
            //         this.src=res.data.siteImg
            //         this.icon=false                    
            //     })
            // }
           
        },
        methods:{
            ...mapActions({

            }),
            setRemember(){
                console.log("aa")
            },
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
                // this.$router.push('Main')
                // this.$store.api.login = '/api/loginLx.ashx?key=6480-4230-27FD-8AA0&'
                // 基于/api的请求会被http-proxy转发为'http://academy.yonyou.com/api/loginLx.ashx?key=6480-4230-27FD-8AA0&'
                // const login = this.$store.state.api.login + 'user='+ $('#username').val().trim() + '&pwd=' + $('#password').val().trim();
                const login = "app/localogin"
                if($('#username').val() && $('#password').val()){
                        Indicator.open({
                        text: '登录中...',
                        spinnerType: 'snake'
                    })
                    const param={
                        username:$('#username').val().trim(),
                        pwd:$('#password').val().trim()
                    }
                    this.$http.post(login,param).then((res)=>{
                        console.log(res);
                        return res.data.status?res.data:JSON.parse(res.data);                  
                    },(res) =>{
                        console.log("login is rejected");
                    }).then((body) =>{
                        console.log(body);
                        if(body.status == 'false'){
                            // FIXME add toast
                            Indicator.close()
                            let instance = Toast(body.errMsg);
                                setTimeout(() => {
                                instance.close();
                            }, 2000);
                            console.log(body.errCode,body.errMsg)
                        }else{
                            setTimeout(()=>{
                            // fixme  将用户名和密码存在本地之后路由到主界面 main
                            this.$http.post(login,param).then((res)=>{
                                return res.json();
                            }).then((body)=>{
                                if(body.status =='true'){
                                    return new Promise((resolve,reject) =>{
                                        this.$store.dispatch('setUserdata', body.userName)
                                        resolve();
                                    });
                                }      
                            }).catch(e =>console.log(e)).then(()=>{
                                Indicator.close()
                                //保存用户信息到sessionStorage中
                                // var user = this.$store.state.api.userInfo + "user="+$('#username').val().trim()+"&pwd="+$('#password').val().trim()
                                 var user="/api/getUserInfo.ashx?key=6480-4230-27FD-8AA0&user=zslx2&pwd=123456"
                                this.$http.get(user).then((res)=>{
                                    return res.json()
                                }).then((body)=>{
                                    console.log(body.toString())
                                    this.user=body
                                    if(body.pic.length<=29){
                                        this.user.pic='../../../static/avatar-default.png'
                                    }else{
                                        localStorage.setItem('pic',body.pic)
                                    }
                                    window.sessionStorage.setItem("user",JSON.stringify(this.user))
                                    //将用户保存到mongoose中
                                    var url='/app/saveUser';
                                    var data={
                                                userId:this.user.userId,
                                                userName:this.user.userName,
                                                status:this.user.status,
                                                nickName:this.user.nickName,
                                                cnName:this.user.cnName,
                                                sex:this.user.sex,
                                                depName:this.user.depName,
                                                pName:this.user.pName,
                                                roleName:this.user.roleName,
                                                email:this.user.email,
                                                pic:this.user.pic,
                                                account:this.user.account
                                            };
                                    this.$http.post(url,data).then(res=>{
                                        console.log(res.data.msg)
                                    })
                                })
                                this.$router.push('Main')
                            }) 
                        },0)
                        }
                        
                    })                    
                }else{
                    let instance = Toast("用户名和密码不能为空！");
                                setTimeout(() => {
                                instance.close();
                    }, 2000);
                }
            },
            sign_up(){
                this.$router.push('Main');
            },
            toggle_pwd_show(){
                var pwd=document.getElementById('password');
                pwd.getAttribute('type');
                this.toggle=!this.toggle;
                this.iconEye=this.toggle?"icon-eye-open":"icon-eye-close";
                var type=this.toggle?"password":"text";
                pwd.setAttribute('type',type);
            },
            showaaa(){
                this.emit('sign_up');
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
            mtButton:Button,
            mtSpinner:Spinner,
            Toast
        }
    }
</script>
<style lang="scss" scoped>
    /* Login.vue */
    @import "../assets/css/function.scss";
    #Login{
        min-height:pxToRem(568px);
        background-color:#fff;
        .login-img{
            /*position:relative;*/
            padding-top:pxToRem(35px);
            display:flex;
            justify-content:center;
            align-items:center;
            flex-flow:column wrap;
            i{
                margin-bottom:pxtorem(-20px);
                color:#e83426;
            }
            .icon-logo-ulexue{
                font-size: pxtorem(110px);
                color:#e83426
            }
            .icon-ulexuefont{
                font-size:pxtorem(65px);
                color:#666465;
                margin-top:pxtorem(15px);
            }
            img{
                width:pxtorem(120px);
                height:pxtorem(120px);
            }
            margin-bottom:pxtorem(70px);
        }
        .login-body{
            margin-top: pxtorem(-15px);
            .input-txt{
                padding:pxtorem(10px) 0;
                margin:0 pxtorem(30px);
                text-align:left;
                font-size:pxtorem(14px);
                border-bottom:1px solid #eee;
                label{
                    color:#888;
                    display:inline-block;
                    width:5.5em;
                    margin:0 0 0 0.5rem;
                    i{
                        margin-right:pxtorem(9px);
                        color:#e83426;
                    }
                }

                span{
                    position:absolute;
                    right:pxtorem(33px);
                    .icon-eye-open{
                        color:#888;
                    }
                    .icon-eye-close{
                        color:#888;
                    }
                }
                input{
                    width:pxtorem(100px);
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
            a{
                div{
                    float:right;
                    font-size:pxtorem(14px);
                    color:#666;
                    margin:pxtorem(24px) pxtorem(33px) 0 0;
                    i{
                        position:relative;
                        top:pxtorem(2px);
                        font-size:pxtorem(18px);
                    }
                }
            }
        }
    }
</style>
<style src='mint-ui/lib/button/style.css'></style>
