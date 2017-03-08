<template>
    <div class="ManageSystem" :style='{height:screenHeight}'>
        <span class="back" @click="goback">
            <i class="icon-angle-left"></i>
        </span>
        <div class="title">
            <i class="iconfont icon-lexue "></i>
            <i class="iconfont icon-lexuefont"></i>
            <span>乐学网培训管理系统</span>
        </div>
        <div class="operate">
            <ul>
                <li><router-link to="/managesystem/trainning"><i class="iconfont icon-publish"></i><span>培训计划</span><i class="icon-angle-right"></i></router-link></li>
                <li><i class="iconfont icon-checked"></i><span>问卷统计</span><i class="icon-angle-right"></i></li>
                <li><router-link to="/managesystem/signinsum"><i class="iconfont icon-checked"></i><span>签到统计</span><i class="icon-angle-right"></i></router-link></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                screenHeight:document.documentElement.clientHeight + "px",
            }
        },
        methods:{
            goback(){
                this.$router.push('/AdminLogin');
            }
        }
    }
</script>
<style lang="scss">
    /*ManageSystem.vue*/
    @import '../../assets/css/function.scss';
    .ManageSystem{
        background: #e5e5e5;
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
        .title{
            background-image: url('../../../static/bg-img2.png');
            background-size:pxtorem(320px) pxtorem(162px);
            height:pxtorem(162px);
            .icon-lexue{
                position:absolute;
                left:pxtorem(15px);
                top:pxtorem(52px);
                font-size:pxtorem(80px);
                color:#fff;
            }
            .icon-lexuefont{
                position:absolute;
                right:pxtorem(15px);
                top:pxtorem(52px);
                font-size:pxtorem(59px);
                color:#fff;
            }
            span{
               position:absolute;
                right:pxtorem(15px);
                top:pxtorem(95px);
                font-size:pxtorem(16px);
                color:#fff; 
            }
        }
        .operate{
            background: #fff;
            margin-top:pxtorem(5px);
            ul{
                li{
                    color:#666;
                    height:pxtorem(40px);
                    line-height:pxtorem(40px);
                    padding:0 pxtorem(15px);
                    font-size:pxtorem(16px);
                    border-bottom:1px solid #e5e5e5;
                    a{
                        display:inline-block;
                        width:100%;
                        color:#666;
                    }
                    i{
                        color:#ff4f57;
                        font-size:pxtorem(18px);
                        margin-right:pxtorem(15px);
                    }
                    i:last-child{
                        color:#999;
                        float:right;
                        margin:0;
                        height:pxtorem(40px);
                        line-height:pxtorem(40px);
                    }
                }
            }
        }
    }
</style>