<template>
    <div class="apply-lesson">
        <head-v text='订单支付'>
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="lesson-content">
            <span class="icon">
                <i class="iconfont icon-lessonContent"></i>
            </span>
            <p>课程名称：<span>{{orderInfo.orderName}}</span></p>
            <p>课程等级：<span>L4</span></p>
            <p>课程价格：<span>{{orderInfo.orderAmount | accounting(2)}}</span></p>
            <p>课程简介：<span>{{orderInfo.orderDiscription}}</span></p>
            <p>订单号：<span>{{orderInfo.orderNumber}}</span></p>
            <p>订单创建时间：<span>{{orderInfo.orderSubmitDate}}</span></p>
        </div>
        <div class="footer">
            <p>
                <span style="color:#25d5b9">账户余额：<span class="key">{{balance | accounting(1)}}</span></span>
                <span style="color:#ff4f57">支付总额：<span class="key">{{orderInfo.orderAmount | accounting(1)}}</span></span>
            </p>
            <div class="operation">
                <button @click="apply">确认支付</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from './Header.vue'
    import GoBack from '../components/GoBack.vue'
    import {Toast} from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    export default{
        data(){
            return{
                balance:0,
                orderInfo:{},
                user:{}
            }
        },
        created(){
            let user = window.sessionStorage.getItem('user')
            this.user = JSON.parse(user)
            this.balance=this.user.account
            const showDetail =  this.$store.state.api.applyCourse + "funcCode=show&user=" +window.localStorage.getItem("UserInfo")
            this.$http.get(showDetail).then(res=>{
                return res.data.allOrders?res.data:JSON.parse(res.data)
            }).then(body=>{
                return body.allOrders
            }).then(values=>{
                console.log(values)
                values.forEach(item=>{
                    this.orderInfo = item.goodsID == this.$route.params.id ? item : {}
                })
            })
        },
        methods:{
            apply(){
                const apply = this.$store.state.api.applyCourse + "funcCode=pay&user=" +window.localStorage.getItem("UserInfo")+"&goodsId="+this.$route.params.id
                this.$http.get(apply).then( res =>{
                    return res.data.status?res.data:JSON.parse(res.data)
                }).then(body=>{
                    this.user.account=this.balance-this.orderInfo.orderAmount
                    sessionStorage.setItem('user',JSON.stringify(this.user))
                    let instance = Toast('购买成功')
                    var param={
                        userId:JSON.parse(window.sessionStorage.user).userId,
                        courseName:this.orderInfo.orderName,
                        coursePrice:this.orderInfo.orderAmount,
                        orderId:this.orderInfo.orderNumber,
                        createDate:this.orderInfo.orderSubmitDate
                    }
                    this.$http.post('/app/saveUserOrder',param).then((res)=>{
                        console.log(res);
                    })
                    setTimeout(()=> {
                        instance.close()
                        this.$router.go(-1)
                    }, 1000);
                })
            },
            cancel(){
                const apply = this.$store.state.api.applyCourse + "funcCode=cancel&user=" +window.localStorage.getItem("UserInfo")+"&goodsId="+this.$route.params.id
                this.$http.get(apply).then( res =>{
                    let instance = Toast('取消订单成功')
                    this.$router.go(-1)
                    setTimeout(()=> {
                        instance.close()
                    }, 1000);
                })                
            }
        },
        components:{
            HeadV:Header,
            GoBack
        }
    }

</script>
<style lang="scss">
    @import '../assets/css/function.scss';
    /*ApplyLesson.vue*/
    .apply-lesson{
        min-height:pxtorem(568px);
        background: #fff;
    }
    .apply-lesson{
        .lesson-content{
            border-top:pxtorem(8px) solid #e5e5e5;
            padding-bottom:pxtorem(40px);
            .icon{
                text-align: center;
                display:inline-block;
                width:100%;
                margin-top:pxtorem(18px);
                i{
                    font-size:pxtorem(68px);
                    color:#666;
                }
            }
            p{
                margin-left:pxtorem(25px);
                margin-top:pxtorem(15px);
                font-size:pxtorem(14px);
                span{
                    font-size:pxtorem(14px);
                    color:#666;
                }
            }
        }
    }
    .apply-lesson{
        .footer{
            p{
                border-top:pxtorem(8px) solid #e5e5e5;
                padding-top:pxtorem(10px);
                padding-bottom:pxtorem(10px);
                border-bottom:pxtorem(1px) solid #e5e5e5;
                span{
                    margin-left: pxtorem(20px);
                    font-size:pxtorem(14px);
                    .key{
                        margin:0;
                        font-size:pxtorem(20px);
                    }
                }
            }
            .operation{
                margin-top:pxtorem(15px);
                padding:0 pxtorem(42px);
                button{
                    border:none;
                    background:#ff4f57;
                    color:#fff;
                    width:pxtorem(100px);
                    height:pxtorem(35px);
                    font-size:pxtorem(14px);
                    font-family:'黑体';
                    border-radius:pxtorem(6px);   
                }
                button:first-child{
                    margin-right:pxtorem(25px);
                }
            }
        }
    }
</style>