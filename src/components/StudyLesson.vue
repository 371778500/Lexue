<template>
    <div class="study-progress">
        <div class="study-content">
            <div class="study-lesson" v-for ='(s,index) in studyLessons' :id="'study'+index">               
                <img :src="s.picUrl" alt="" @load="changeImage(s.picUrl,$event)">
                <router-link :to="'/studydetail/'+s.lessonID" class='lesson-position'>
                    <div class="lesson-title">
                        <span class="omit">{{ s.name }}</span>
                    </div>
                </router-link>
                <div class="isPass" :class="[s.percent==100?'pass':'unpass']">{{s.percent==100?"通过":"未通过"}}</div>
                <div class="circle"><circle-progress :percent="s.percent" :id="'id'+s.lessonID"></circle-progress></div>
            </div>
        </div>
    </div>
</template>
<script>
    import CircleProgress from "./CircleProgress.vue"
    import { MessageBox } from 'mint-ui'
    import 'mint-ui/lib/message-box/style.css'
    export default{
        data(){
            return{
                study:[]
            }
        },
        mounted(){
            this.study = this.studyLessons
        },
        props:{
            studyLessons:{
                validator(value){                   
                        return Array.isArray(value)                
                }
            },
        },
        methods:{
            changeImage(value,e){
                // console.log(value + 'image is loaded')
                // console.log(e.target)
            },
            del(index){
                MessageBox.confirm('确认要删除吗？').then(action=>{
                     $("#study"+index).remove()
                })
            }
        },
        components:{
            CircleProgress
        }
    }
</script>
<style lang="scss">
    /*StudyProgress.vue*/
    @import "../assets/css/function.scss";
    $passcolor : #25d5b9;
    $unpasscolor : #ff4f57;
    .study-progress{
        .study-content{
                padding:pxtorem(10px) pxtorem(10px) 0 pxtorem(10px);
                .study-lesson{
                    position:relative;
                    height:pxtorem(125px);
                    overflow:hidden;
                    img{
                        width:100%;
                        height:100%;
                        opacity:1;
                    }
                    margin-bottom:pxtorem(10px);
                    .circle{
                        position:absolute;
                        top:pxtorem(22px);
                        right:pxtorem(15px);
                        opacity:1;
                    }
                    .isPass{
                        position:absolute;
                        width:pxtorem(60px);
                        height: pxtorem(22px);
                        line-height: pxtorem(22px);
                        bottom:pxtorem(15px);
                        left:pxtorem(15px);
                        font-size:12px;
                        text-align: center;
                        border-radius: pxtorem(10px);
                        color:#fff;
                    }
                    .pass{
                            background-color: $passcolor;
                    }
                    .unpass{
                            background-color: $unpasscolor;
                    }
                }
                .lesson-position{
                    width:100%;
                    height:100%;
                    background:rgba(0,0,0,.3);
                    position:absolute;
                    font-size:pxtorem(14px);
                    top:0;
                    left:0;
                    color:white;
                    .lesson-title{
                        width:100%;
                        color:white;
                        span{
                            margin-top:pxtorem(12px);
                            margin-left:pxtorem(15px);
                        }
                    }
                }
            }
        }
        .omit{
            display:inline-block;
            width:pxtorem(200px);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
</style>