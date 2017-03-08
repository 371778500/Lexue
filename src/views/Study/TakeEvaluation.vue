<template>
    <div class="take-evaluation">
        <head-v text="我的评价">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="content">
            <span class="mynote">
                <i v-for="(i,index) in 5" :id="'star'+index" class="icon icon-star" @click="setStars(index)"></i>
            </span>
            <textarea rows="10" cols="40" class="note-detail"></textarea>
        </div>
        <button class="submit" @click="submit">提交评价</button>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { Toast } from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    export default{
        data(){
            return{
                starNum:0
            }
        },
        methods:{
            setStars(index){
                //初始化星星                
                for(var i=0;i<5;i++){
                    document.getElementById('star'+i).style.color="#e5e5e5"
                }
                //高亮星星
                for(var i=0;i<index+1;i++){
                    document.getElementById('star'+i).style.color="#ff4f57"
                }
                console.log(index+1)
                this.starNum = index+1
            },
            submit(){
                var content = $('textarea').val()
                if(content){
                    var url = "/app/saveComment"
                    var data = { userId:window.localStorage.UserInfo,
                                 courseId:this.$route.params.id,
                                 userName:window.localStorage.UserInfo,
                                 userImg:window.localStorage.pic?window.localStorage.pic:'../../../static/avatar-default.png',
                                 commentContent:content,
                                 starNumber:this.starNum
                               }
                    console.log(data)
                    this.$http.post(url,data).then((res)=>{
                        console.log(res)
                        if(res.statusText=='OK' && res.data.code==0){
                            let instance = Toast("评价成功")
                            setTimeout(() => {
                                this.$router.go(-1);
                                instance.close()
                            }, 1000)
                        }else{
                            let instance = Toast(res.data.msg)
                            setTimeout(() => {
                                this.$router.go(-1);
                                instance.close()
                            }, 1500)
                        }
                    })
                }else{
                    let instance = Toast("内容不可为空！")
                            setTimeout(() => {
                                instance.close()
                    }, 2000)
                }
            }
        },
        components:{
            HeadV:Header,
            GoBack
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/function.scss";
    /*TakeNote.vue*/
    .take-evaluation{
        .content{
            margin:pxtorem(14px) pxtorem(15px) 0;
            width:pxtorem(290px);
            height:pxtorem(310px);
            background:#fff;
            .mynote{
                display: block;
                text-align: center;
                padding-top:pxtorem(21px);
                i{
                    color:#e5e5e5;
                    font-size:pxtorem(32px);
                    letter-spacing: pxtorem(5px);
                }
            }
            .note-detail{
                width:pxtorem(243.5px);
                height:pxtorem(211px);
                border:none;
                border-top:1px solid #e5e5e5;
                border-bottom:1px solid #e5e5e5;
                resize:none;
                outline:none;
                margin:pxtorem(20px) pxtorem(24px) pxtorem(26px);
                padding:pxtorem(10px) pxtorem(5px) 0;
                font-size:pxtorem(12px);
                color:#666;
            }
        }
        .submit{
            position:relative;
            top:pxtorem(15px);
            left:pxtorem(15px);
            width:pxtorem(290px);
            height:pxtorem(40px);
            background:#ff4f57;
            border:none;
            border-radius:pxtorem(5px);
            color:#fff;
            font-size:pxtorem(16px);
            font-family: "微软雅黑";
        }
    }
</style>