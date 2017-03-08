<template>
    <div class="content">
        <div class="course">
            <div class="icons">
                <i class="iconfont icon-courseIntroduction"></i>
            </div>
            <p class="title">课程介绍</p>
            <p class="content">{{introduction}}</p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                introduction:''
            }
        },
        mounted(){
            const course = this.$store.state.api.coursewares + 'user=' + window.localStorage.UserInfo + '&lessonid=' + this.$route.params.id;
            // console.log(this.$store.state.api.coursewares + 'user=' + this.$store.state.user + '&lessonid=' + this.$route.params.id)
            this.$http.get(course).then((res)=>{
                return res.json();
            }).then((body)=>{
                this.introduction=body.getcoursewares[0].introduction
            })
        }
    }
</script>
<style lang="scss">
    /*Content.vue*/
    @import "../../assets/css/function.scss";
    .content{
        .course{
            background-color:#fff;
            min-height: pxtorem(250px);
            /*width:pxtorem(320px);*/
            height:100%;
            margin-top:pxtorem(6px);
            padding:pxtorem(18px) pxtorem(15px) pxtorem(14px) 0;
            .icons{
                position:relative;
                top:pxtorem(-4px);
                height:pxtorem(85px);
                float:left;
                padding:0 pxtorem(9px) 0 pxtorem(15px);
                i{
                    font-size:16px;
                    color:rgb(37,213,185);
                }
            }
            .title{
                overflow: hidden;
                font-size:14px;
                border-bottom: 1px solid #999;
                padding-bottom: pxtorem(4px);
            }
            .content{
                overflow: hidden;
                font-size:12px;
                padding-top:pxtorem(11px);
                line-height:pxtorem(18px);
            }
        }
    }
</style>