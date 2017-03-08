<template>
    <div>      
        <!--<content></content>-->
        <!--这里路由到navbar对应的子界面-->
        <!-- 保证切换时组件是激活状态. -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
            <!--<router-view></router-view>-->
        <nav-bar></nav-bar>
    </div>
</template>
<script>
    import Header from './Header.vue'

    import NavBar from '../components/NavBar.vue'
    export default{
        data(){
            return {
                user:{}
            }
        },
        mounted(){
            //获取原生传来的用户名和密码
            let username=this.$route.query.username 
            let password=this.$route.query.password
            console.log(username,password)
            if(username&&password){
                const user = this.$store.state.api.userInfo + "user="+username+"&pwd="+password
                this.$http.get(user).then(res=>{
                    return res.json()
                }).then((body)=>{
                    console.log(body)
                    this.user=body
                    if(body.pic.length<=29){
                        this.user.pic='../../../static/avatar-default.png'
                    }else{
                        localStorage.setItem('pic',body.pic)
                    }
                    window.sessionStorage.setItem("user",JSON.stringify(this.user))
                    window.localStorage.setItem("UserInfo",this.user.userName)
                    //将用户保存到mongoose中
                    var url='/app/saveUser';
                    var data={userId:this.user.userId,userName:this.user.userName};
                    this.$http.post(url,data).then(res=>{
                        console.log(res.data.msg)
                    })
                })
            }
            // if(!window.localStorage.UserInfo){
            //     this.$router.push("/Login")
            // }
            // var user = this.$store.state.api.userInfo + "user="+window.localStorage.UserInfo+"&pwd="+this.getCookie('pwd')
            // this.$http.get(user).then((res)=>{
            //     return res.json()
            // }).then((body)=>{
            //     console.log(body.pic.length)
            //     if(body.pic.length>29){
            //         localStorage.setItem('pic',body.pic)
            //     }
            // })
            // var user = this.$store.state.api.userInfo + "user="+this.getCookie("user")+"&pwd="+this.getCookie("pwd")
            // this.$http.get(user).then((res)=>{
            //     return res.json()
            // }).then((body)=>{
            //     console.log(body.toString())
            //     this.user=body
            //     if(body.pic.length<=29){
            //         this.user.pic='../../../static/img4.png'
            //     }
            //     window.sessionStorage.setItem("user",JSON.stringify(this.user))
            // })
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
            
            NavBar
        }
    }
</script>