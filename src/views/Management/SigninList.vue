<template>
    <div class="SigninList">
        <head-v text="签到记录">
            <go-back slot="goback"></go-back>
        </head-v>
        <ul>
            <li v-for="user in users">
                <span class="username">{{user.userName}}</span>
                <span :class="[user.isSignIn?'isSign':'red']">{{user.isSignIn?'已签到':'未签到'}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    export default{
        data(){
            return{
                users:[]
            }
        },
        mounted(){
            this.$http.post('/app/trainCheck',{trainingPlanId:this.$route.params.id}).then(res=>{
                return res.data
            }).then(body=>{
                console.log(body.data)
                this.users=body.data
            })
        },
        components:{
            HeadV:Header,
            GoBack
        }
    }
</script>
<style lang="scss">
    /*SigninList.vue*/
    @import '../../assets/css/function.scss';
    .SigninList{
        ul{
            background:#fff;
            min-height:pxtorem(508px);
            margin-top:pxtorem(10px);
            li{
                background:#fff;
                color:#333;
                font-size:pxtorem(14px);
                border-bottom:pxtorem(1px) solid #e5e5e5;
                padding:pxtorem(10px) pxtorem(15px);
                .isSign{
                    float:right;
                    color:#25d5b9;
                }
                .red{
                    float:right;
                    color:#e83426;
                }
            }
        }
    }

</style>