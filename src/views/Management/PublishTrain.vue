<template>
    <div class="publish-train">
        <head-v text="发布培训计划">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="form">
            <ul>
                <li>
                    <span>培训地点:</span>
                    <input id="adinput" style="width:9.5rem" type="text" v-model="Train.padd">
                    <i class="iconfont icon-map" style="font-size: 1.2rem;position:relative;top:0.15rem"  @click="showMap"></i>
                </li>
                <li>
                    <span>签到范围:</span>
                    <input  type="text" placeholder="(建议500，单位：米)" v-model="Train.range">
                </li>
                <li>
                    <span>培训领域:</span>
                    <input type="text" v-model="Train.territory">
                </li>
                <li>
                    <span>培训名称:</span>
                    <input type="text" v-model="Train.pname">
                </li>
                <li>
                    <span>开始时间:</span>
                    <input type="text" :value="Train.startTime|formatDate" @click="open('picker1')">
                </li>
                <li>
                    <span>结束时间:</span>
                    <input type="text" :value="Train.endTime|formatDate" @click="open('picker2')">
                </li>
                <li>
                    <span style="position:relative; top:-3.75rem">培训课程:</span>
                    <textarea v-model="Train.pcourse"></textarea>
                </li>
                <li>
                    <span>讲师:</span>
                    <input type="text" v-model="Train.pteacher">
                </li>
                <li>
                    <span>报名人数:</span>
                    <input type="text" v-model="Train.num">
                </li>
            </ul>
        </div>
        <div class="submit">
            <button @click="publish">发布</button>
        </div>
        <mt-datetime-picker
            ref="picker1"
            type="datetime"
            v-model="Train.startTime"
            :startDate="startDate"
            @confirm="handleChange">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="picker2"
            type="datetime"
            v-model="Train.endTime"
            :startDate="Train.startTime?Train.startTime:startDate"
            @confirm="handleChange">
        </mt-datetime-picker>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { DatetimePicker,Toast } from 'mint-ui'
    import 'mint-ui/lib/datetime-picker/style.css'
    import 'mint-ui/lib/toast/style.css'
    export default{
        data(){
            return{
                Train:{
                    territory:'',
                    pname:'',
                    startTime:'',
                    endTime:'',
                    pcourse:'',
                    padd:'',
                    pteacher:'',
                    num:'',
                    lat:0,
                    lng:0,
                    range:null
                },
                startDate:new Date(),
            }
        },
        mounted(){
            var that = this
            var position = sessionStorage.position!=undefined?JSON.parse(sessionStorage.position):''
            console.log(position)
            if(position&&position!={}){
                that.Train.lat=position.lnglat.lat
                that.Train.lng=position.lnglat.lng
                that.Train.padd=position.address
            }
            console.log(that.Train)
            var autoOptions = {
                input: "adinput"
            }
            // var map = new AMap.Map("container", {
            //     resizeEnable: true
            // })
            var auto = new AMap.Autocomplete(autoOptions)
            AMap.event.addListener(auto, "select", select)
            function select(e) {
                // placeSearch.setCity(e.poi.adcode);
                // placeSearch.search(e.poi.name);  //关键字查询查询
                that.Train.lat=e.poi.location.lat
                that.Train.lng=e.poi.location.lng
                            console.log(that.Train)
            }
            // var placeSearch = new AMap.PlaceSearch({
            //     map: map
            // })
        },
        destroyed(){
            var adinput = document.getElementById('adinput')
            adinput.blur()
        },
        methods:{
            open(picker){
                this.$refs[picker].open();
            },
            handleChange(value){
                console.log(value)
            },
            publish(){
                var url = '/app/saveTrainingPlan',
                    data = {
                        field:this.Train.territory,
                        name:this.Train.pname,
                        adminUserId:window.localStorage.UserInfo,
                        startDate:this.Train.startTime.toString(),
                        endDate:this.Train.endTime.toString(),
                        courseName:this.Train.pcourse,
                        address:this.Train.padd,
                        teacher:this.Train.pteacher,
                        applySum:this.Train.num,
                        Latitude:this.Train.lat,
                        longitude:this.Train.lng,
                        range:this.Train.range
                    }
                this.$http.post(url,data).then((res)=>{
                    let instance = Toast(res.data.msg);
                    console.log(res.data.msg);
                    history.go(-1);
                    setTimeout(()=>{
                        instance.close();
                        var url= '/app/saveInfo'
                        this.$http.post(url,{info:res.data.info}).then((res)=>{ 
                             console.log(res.data.msg);
                        })                       
                    },1500)
                })
            },
            showMap(){
                this.$router.push('/managesystem/trainning/map')
            }
        },
        components:{
            HeadV:Header,
            GoBack,
            MtDatetimePicker:DatetimePicker
        }
    }
</script>
<style lang="scss">
    /*PublishTrain.vue*/
    @import "../../assets/css/function.scss";
    .publish-train{
        min-height: pxtorem(568px);
        background: #fff;
        .form{
            background: #fff;
            border-top:pxtorem(10px) solid #e5e5e5;
            padding:pxtorem(18px) pxtorem(15px) 0;
            ul{
                list-style: none;
                font-size:pxtorem(14px);
                margin-bottom: pxtorem(16px);
                li{
                    margin-bottom:pxtorem(10px);
                    span{
                        display:inline-block;
                        width:pxtorem(60px);
                    }
                    input{
                        -webkit-box-sizing:border-box;
                        height:pxtorem(30px);
                        width:pxtorem(220px);
                        border:none;
                        border:1px solid #bbb;
                        border-radius: pxtorem(5px);
                        padding:pxtorem(5px);
                    }
                    textarea{
                        -webkit-box-sizing:border-box;
                        width: pxtorem(220px);
                        height:pxtorem(95px);
                        border:none;
                        border:1px solid #bbb;
                        border-radius: pxtorem(5px);
                        resize:none;
                        outline:none;
                        padding:pxtorem(5px);
                    }
                }
            }
        }
    }
    .publish-train{
        .submit{
            border-top:1px solid #e5e5e5;
            text-align:center;
            padding-top:pxtorem(10px);              
            button{
                width:pxtorem(135px);
                height:pxtorem(40px);
                border-radius:pxtorem(5px);
                background:#ff4f57;
                font-size:pxtorem(16px);
                font-family:'微软雅黑';
                border:none;
                color:#fff;
            }
        }
    }
</style>