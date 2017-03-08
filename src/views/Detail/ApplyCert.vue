<template>
    <div class="apply-cert">
        <head-v text='订单支付'>
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="lesson-content">
            <span class="icon">
                <!--<i class="iconfont icon-lessonContent"></i>-->
                <img src="../../../static/cert.png" alt="">
            </span>
            <p>证书名称：<span>{{applyDetail.cname}}</span></p>
            <p>课程数量：<span>{{applyDetail.courseCount}}</span></p>
            <p>课程价格：<span>{{applyDetail.needPay | accounting(1)}}</span></p>
            <p>优惠价格：<span>{{applyDetail.realPay | accounting(1)}}</span></p>
        </div>
        <div class="footer">
            <p>
                <span style="color:#25d5b9">账户余额：<span class="key">{{applyDetail.account | accounting(1)}}</span></span>
                <span style="color:#ff4f57">支付总额：<span class="key">{{applyDetail.realPay | accounting(1)}}</span></span>
            </p>
            <div class="operation">
                <button @click="apply">确认支付</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import {Toast} from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    export default{
        data(){
            return{
                applyDetail:{}
            }
        },
        created(){
            const applyCert = this.$store.state.api.applyCert + 'user=' +window.localStorage.UserInfo +'&cert='+ this.$route.params.id+'&action=creatorder'
            this.$http.get(applyCert).then(res=>{
                return JSON.parse(res.data)
            }).then(body=>{
                console.log(body)
                this.applyDetail=body
                if(body.needPay=='0'){
                    let instance = Toast('已购买该专项，无需再次购买！')
                    setTimeout(()=> {
                        instance.close()
                        this.$router.go(-1)
                    }, 2000);
                }
            })
        },
        methods:{
            apply(){
                const applyCert = this.$store.state.api.applyCert + 'user=' +window.localStorage.UserInfo +'&cert='+ this.$route.params.id+'&action=payorder&order='+this.applyDetail.orderId
                this.$http.get(applyCert).then(res=>{
                    return JSON.parse(res.data)
                }).then(body=>{
                    if(body.status=='success'){
                        let instance = Toast(body.errMsg)
                        setTimeout(()=> {
                            instance.close()
                            this.$router.push('/userorder')
                        }, 1500);
                    }
                })
            },
            cancel(){
                this.$router.go(-1)
            }
        },
        components:{
            HeadV:Header,
            GoBack
        }
    }

</script>
<style lang="scss">
    @import '../../assets/css/function.scss';
    /*ApplyCert.vue*/
    .apply-cert{
        height:pxtorem(568px);
        background: #fff;
    }
    .apply-cert{
        .lesson-content{
            border-top:pxtorem(8px) solid #e5e5e5;
            padding-bottom:pxtorem(27px);
            min-height:pxtorem(350px);
            .icon{
                text-align: center;
                display:inline-block;
                width:100%;
                margin-top:pxtorem(18px);
                margin-bottom: pxtorem(30px);
                i{
                    font-size:pxtorem(68px);
                    color:#666;
                }
            }
            p{
                margin-left:pxtorem(25px);
                margin-top:pxtorem(25px);
                font-size:pxtorem(14px);
                span{
                    font-size:pxtorem(14px);
                    color:#666;
                }
            }
        }
    }
    .apply-cert{
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
                padding:0 pxtorem(45px);
                display: flex;
                display: -webkit-flex;
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
                    margin-right:pxtorem(24px);
                }
            }
        }
    }
</style>