<template>
    <div class="evaluate-info">
        <div class="evaluate-user">
            <img :src="userimg?userimg:'../../static/img4.png'" alt="" class="user-img">
            <span class="user-name">{{username}}</span>
            <span class="user-grade"><i class="icon-star" v-for="n in 5"></i></span>
        </div>
        <div class="evaluate-content">
            <p>{{ content }}</p>
        </div>
        <div class="evaluate-footer"><span>{{ date | formatDate }}</span></div>
    </div>
</template>
<script>
    export default{
        props:["userimg","username","content","date","starNum"],
        mounted(){
            var el = $(this.$el)
            var stars = el.find(".icon-star")
            for(var i=0;i<this.starNum;i++){
                stars.eq(i).addClass("star-active")
            }
        }
    }
</script>
<style lang="scss">
    /*EvaluateInfo.vue*/
    @import '../assets/css/function.scss';
    .evaluate-info{
        background-color:#fff;
        padding:pxToRem(14px) pxToRem(15px) pxToRem(8px);
        border-bottom:1px solid #ddd;
        font-family:"微软雅黑";
        .evaluate-user{
            .user-img{
                width:pxToRem(40px);
                height:pxToRem(40px);
                border-radius:50%;
            }
            .user-name{
                position:absolute;
                height:pxToRem(40px);
                line-height:pxToRem(40px);
                left:pxToRem(66px);
                font-size:pxToRem(16px);
                color:#333;
            }
            .user-grade{
                font-size:pxToRem(16px);
                position:absolute;
                right:pxToRem(15px);
                height:pxToRem(40px);
                line-height:pxToRem(40px);
                color:#ccc;
                i{
                    margin-left:pxtorem(5px);
                }
                .star-active{
                    color:#ff4f57;
                }
            }
        }
        .evaluate-content{
            font-size:pxToRem(12px);
            p{
                padding:pxtorem(17px) pxtorem(5px) pxtorem(25px);
            }
        }
        .evaluate-footer{
            font-size:pxToRem(10px);
            color:#999;
            overflow:hidden;
            span{
                float:right;
            }

        }
    }

</style>