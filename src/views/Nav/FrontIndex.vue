<template>
    <div class='front-index'>
         <head-v :text='text' time=time>
             <!-- 优势在于我们明确知道这个地方需要将goback组件和timer组件传递到frontindex.vue中,没必要用数据控制v-show来进行子组件内部的渲染 -->
             <i class="icon-bell" slot="bell" @click="remind" v-show="reminded" style="position:absolute;top:0;right:0.4rem;height:2.5rem;line-height:2.5rem;color:#fff;text-decoration:blink;"></bell>
         </head-v>
         <mt-popup
            v-model="popupVisible"
            class="mypopup">
            <div class="remindTitle">培训提醒</div>
            <div class="remindContent" v-for="item in remindItem">
                <p>您的培训计划（{{item.name}}）于{{item.startDate | formatDate}}在{{item.address}}开始，别忘了前往培训哦！</p>
            </div>
         </mt-popup>
        <!--<mt-popup
            v-model="popupVisible1"
            class="mypopup">
            <div class="tipTitle">小贴士</div>
            <div class="tipContent">
                <p>为了方便您日后进入，我们提供了以下方案：</p>
                <p>1.使用浏览器进入并将其添加到书签或是添加到桌面;</p>
                <p>2.使用微信进入的可将其在聊天中置顶;</p>
                <p>备注：以上操作都在右上方三点处或下方中间的三横杠处。</p>
                <button @click="noMoreShow">不再显示</button>
                <button @click="close">关闭</button>
            </div>
         </mt-popup>-->
         <carousel :carousel='carousel' ></carousel>
         <information-bar></information-bar>
         <show-course></show-course>
         <back-top></back-top>
    </div>
</template>
<script>
    import Carousel from '../../components/Carousel.vue'
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import Timer from '../../components/Timer.vue'
    import InformationBar from '../../components/InformationBar.vue'
    import ShowCourse from '../ShowCourse.vue'
    import BackTop from '../../components/BackTop.vue'
    import { Popup } from 'mint-ui'
    export default{
        data(){
            return {
                carousel:[
                    {url:'a',image:'../../../static/frontIndex_02.png'},
                    {url:'b',image:'../../../static/img1.png'}
                    ],
                text:'首页',
                popupVisible:false,
                remindItem:[],
                reminded:false,
                popupVisible1:true //友情提醒显示
            }
        },
        created(){
            // console.log('frontIndex.vue','created()');
            if(window.localStorage.tipStatus){
                this.popupVisible1=false
            }
            if(window.sessionStorage.tipStatus){
                this.popupVisible1=false
            }
            if(!window.sessionStorage.getItem('state')){
                var data = {id:window.localStorage.getItem('UserInfo') }
                this.$http.post('/app/getMyTrainingPlan',data).then((res)=>{
                    return res.data
                }).then((body)=>{
                    body.data.forEach(item=>{
                        let now = new Date()
                        let fromNow = (new Date(item.startDate).getTime()-now.getTime())/(24*60*60*1000)
                        if(fromNow<1 && fromNow>0){
                            this.reminded=true
                            this.remindItem.push(item)
                        }
                    })
                    return body.data
                })
            }  
        },
        methods:{
            remind(){
                window.sessionStorage.setItem('state',true)
                this.popupVisible=true
                this.reminded=false
                //this.$route.push()
            },
            noMoreShow(){
                window.localStorage.setItem('tipStatus',true)
                this.popupVisible1=false
            },
            close(){
                window.sessionStorage.setItem('tipStatus',true)
                this.popupVisible1=false
            },
        },
        components:{
            Carousel,
            HeadV:Header,
            GoBack,
            Timer,
            InformationBar,
            ShowCourse,
            BackTop,
            MtPopup:Popup
        }
    }
</script>
<style lang='scss'>
   /* FrontIndex.vue */
   @import '../../assets/css/function' ;
    .dividing-line{
        height: 1px;
        width: 100%;
        background: gray
    }
    .front-index{
        padding-bottom:pxtorem(60px);
        .icon-bell{
            animation:mymove 1s infinite;
            -webkit-animation:mymove 1s infinite;
        }
        @keyframes mymove
        {
            0% {transform:rotate(20deg)}
            50% {transform:rotate(-20deg)}
            100% {transform:rotate(20deg)}
        }
        @-webkit-keyframes mymove
        {
            0% {transform:rotate(20deg)}
            50% {transform:rotate(-20deg)}
            100% {transform:rotate(20deg)}
        }
        .mypopup{
            border-radius: 5%;
            .remindTitle{
                text-align:center;
                margin:pxtorem(10px) pxtorem(20px) 0;
                padding-bottom: pxtorem(5px);
                border-bottom: pxtorem(2px) dotted #e5e5e5;
                font-size:pxtorem(18px);
                font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
            }
            .remindContent{
                width:pxtorem(200px);
                padding:pxtorem(20px);
                font-size:pxtorem(14px);
                font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
            }
            .tipTitle{
                text-align:center;
                margin:pxtorem(10px) pxtorem(20px) 0;
                padding-bottom: pxtorem(5px);
                border-bottom: pxtorem(2px) dotted #e5e5e5;
                font-size:pxtorem(18px);
                font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
            }
            .tipContent{
                width:pxtorem(200px);
                padding:pxtorem(20px);
                font-size:pxtorem(14px);
                font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
                p{
                    padding-bottom:pxtorem(5px);
                }
                button{
                    background: none;
                    display: block;
                    width:pxtorem(200px);
                    padding:pxtorem(10px) pxtorem(10px);
                    margin-top:pxtorem(10px);
                    font-size:pxtorem(12px);
                    border:pxtorem(1px) dashed #aaa;
                    color:#666;
                }
            }
        }
    }

</style>