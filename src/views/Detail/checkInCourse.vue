<template>
    <div class='checkInCourse'>
        <head-v text="培训计划签到">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="train-list" v-show='apply' v-for = 'train in trained'>
            <div class="a">
                <span class="icon"><i class='icon-circle' :class="[info==1?'red':'']" style='font-size:0.4rem;'></i></span>
                <div class='train'>
                    <p style="font-size:0.7rem;color:#666">课程名称：{{train.courseName}}</p>
                    <p>讲师：{{train.teacher}}</p>
                    <p>开始时间：{{train.startDate | formatDate}}</p>
                    <p><span>培训地点：{{train.address}}</span></p>
                </div>
                <span class="ischeck" v-show='train.isSigns'>已签到</span>
                <!--<router-link :to="/trainingcheckin/+train._id">-->
                <mt-button class="notcheck" v-show='!train.isSigns' @click="checkin(train)">现场签到</mt-button>
                <!--</router-link>-->
            </div>
        </div>
        <div id="container" style="display: none"></div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { InfiniteScroll,Spinner,Toast,Button } from 'mint-ui'
    import Vue from 'vue'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                apply:true,
                loading:false, //true禁止无限加载
                loaded:false, //true出现加载动画
                loadText:'加载中...',
                pageSize:'10',
                pageNumber:0,
                src:'',
                trained:[],
                signInImg:'',
                isCheckIn:false,
                trainId:'',
                latitude:0,
                longitude:0,
                range:0
            }
        },
        mounted(){
            this.getTrained().then((values)=>{
                //console.log(values)
                console.log(values)
                this.trained.push(...values)
            })
        },
        methods:{
            getTrained(){
                var data = {id:window.localStorage.getItem('UserInfo') }
                return this.$http.post('/app/getMyTrainingPlan',data).then((res)=>{
                    return res.data
                    }).then((body)=>{
                        // this.notes = body.data
                        body.data.forEach((plan,index,array)=> {
                            array[index].isSigns=''
                            var obj={
                                id:window.localStorage.getItem('UserInfo'),
                                trainingPlanId:plan._id
                            }
                            this.$http.post('/app/getUserTrainingPlan',obj).then((res)=>{
                                console.log(res.data)
                                array[index].isSigns=res.data.data[0].isSignIn
                            })
                        });
                    return body.data
                })               
            },
            checkin(train){
                    var that = this
                    var geolocation;
                    var map = new AMap.Map("container", {
                        resizeEnable: true
                    });
                    map.plugin('AMap.Geolocation', function() {
                        geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true,//是否使用高精度定位，默认:true
                            timeout: 10,          //超过10秒后停止定位，默认：无穷大
                            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                            buttonPosition:'RB'
                    });
                        map.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
                    });
                    //解析定位结果
                    function onComplete(data) {
                        that.latitude=data.position.getLat()
                        that.longitude=data.position.getLng()
                        var location = new AMap.LngLat(data.position.getLng(),data.position.getLat())
                        var distance=location.distance([train.longitude,train.Latitude])
                        // var now = new Date()
                        // var fromNow=(now - train.startDate)/(60 * 60 * 1000)
                        if(distance<=train.range){
                            // if(fromNow<1 && fromNow>0){
                                that.$http.post('/app/checkIn',{userId:JSON.parse(sessionStorage.user).userName,courseId:train._id}).then(res=>{
                                    let instance = Toast(res.data.msg)
                                    that.$router.go(-1)
                                    setTimeout(()=> {
                                        instance.close()
                                    }, 1000);
                                 })
                            // }else{
                            //     let instance = Toast('签到时间在开课前一小时内,您不在签到时间范围内！')
                            //     setTimeout(()=> {
                            //         instance.close()
                            //     }, 1800);
                            // }
                        }else{
                            let instance = Toast('您不在培训地点范围内，请到培训地点再签到')
                            setTimeout(()=> {
                                instance.close()
                            }, 1500);
                        }
                        console.log(train)
                        // var str=['定位成功'];
                        // str.push('经度：' + data.position.getLng());
                        // str.push('纬度：' + data.position.getLat());
                        // if(data.accuracy){
                        //     str.push('精度：' + data.accuracy + ' 米');
                        // }//如为IP精确定位结果则没有精度信息
                        // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                        console.log(that.latitude,that.longitude)
                    }
                    //解析定位错误信息
                    function onError(data) {
                        let instance = Toast('未给予浏览器定位权限')
                                setTimeout(()=> {
                                    instance.close()
                                }, 1500);
                    }
            }
        },
        components:{
            HeadV:Header,
            GoBack,
            mtSpinner:Spinner,
            mtButton:Button
        }
    }
</script>
<style lang="scss">
    /*checkInCourse.vue*/
    @import '../../assets/css/function.scss';
    .checkInCourse{
        .train-list{
            width:100%;
            background:white;
            overflow:hidden;
            max-height:pxtorem(120px);
            border-bottom:1.5px solid #e5e5e5;
            .a{
                color:#999;
                font-size:pxtorem(12px);
                width:pxtorem(320px);
                position:relative;
                .icon{
                    position:relative;
                    top:pxtorem(8px);
                    left:pxtorem(15px);
                }
                .train{
                    float:right;
                    width: pxtorem(280px);
                    margin:pxtorem(10px) 0;
                    p{
                        margin:pxtorem(3px) 0;
                        letter-spacing: pxtorem(0.5px);
                    }
                }
                .ischeck{
                        font-size: pxtorem(14px);
                        float:right;
                        position:absolute;
                        top:pxtorem(10px);
                        right:pxtorem(20px);
                        color:aquamarine;
                    }
                    .notcheck{
                        font-size: pxtorem(14px);
                        float:right;
                        position:absolute;
                        top:pxtorem(10px);
                        right:pxtorem(10px);
                        color:orange;
                        background: none;
                    }
            }
        }
    }
    .TrainingList{
        .page-infinite-loading{
            text-align: center;
            height:pxtorem(50px);
            line-height:pxtorem(50px);
            font-size:pxtorem(16px);
            div {
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
    }
</style>
