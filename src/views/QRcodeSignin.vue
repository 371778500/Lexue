<template>
    <div class="qrcode-signin">
        <head-v text="二维码签到"></head-v>
        <div class="login-body">
            <div class="input-txt">
                <label for="username"><i class="iconfont icon-username"></i>用户名</label>
                <input type="text" id="username" name="username" v-model="username" maxLength="20">
            </div>
            <div class="input-txt">
                <label for="password"><i class="iconfont icon-pwd"></i>密码</label>
                <input type="password" id="password" name="password" maxLength="16">
                <span><i :class="iconEye"></i></span>
            </div>
            <div @click="confirm" style='text-align:center;'>
                <mt-button class="signin-btn">确&nbsp;&nbsp;认</mt-button>
            </div> 
        </div>
    </div>
</template>
<script>
    import Header from '../views/Header.vue'
    import { Button,Toast } from 'mint-ui'
    export default{
        data(){
            return{
                username:''
            }
        },
        methods:{
            confirm(){
                console.log(this.$route.params.id)
                console.log(this.username)
                this.$http.post('/app/checkIn',{userId:this.username,courseId:this.$route.params.id}).then(res=>{
                    console.log(res)
                let instance = Toast(res.data.msg)
                    this.$router.push('/Main')
                    window.localStorage.setItem('UserInfo',this.username)
                    var user = this.$store.state.api.userInfo + "user="+$('#username').val().trim()+"&pwd="+$('#password').val().trim()
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
                    })
                    setTimeout(()=> {
                        instance.close()
                    }, 1000);
                })
            }
        },
        components:{
            HeadV:Header,
            mtButton:Button
        }
    }
</script>
<style lang="scss">
    /*QRcodeSignin*/
    @import '../assets/css/function.scss';
    .qrcode-signin{
        background: #fff;
        min-height: pxtorem(568px);
        .login-body{
            position:relative;
            top:pxtorem(200px);
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
</style>