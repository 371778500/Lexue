<template>
    <div class="Map">
        <div id="container" tabindex="0"></div>
        <!--<div id="tip"></div>-->
        <div class ='panel'>
            <input id = 'input' placeholder='点击地图显示地址/输入地址显示位置'></input>
            <div id = 'message'></div>
        </div>
        <button class="confirm" @click="confirm">确定</button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                position:{}
            }
        },
        mounted(){
            var that = this
            var geolocation;
            var map = new AMap.Map('container',{
                    resizeEnable: true
                    
            });
            AMap.plugin('AMap.Geocoder',function(){
                var geocoder = new AMap.Geocoder({
                    city: "010"//城市，默认：“全国”
                });
                var marker = new AMap.Marker({
                    map:map,
                    bubble:true
                })
            var input = document.getElementById('input');
            var message = document.getElementById('message');
            map.on('click',function(e){
                marker.setPosition(e.lnglat);
                that.position.lnglat=e.lnglat
                geocoder.getAddress(e.lnglat,function(status,result){
                    console.log(status);
                    console.log(result);
                if(status=='complete'){
                    input.value = result.regeocode.formattedAddress
                    that.position.address = result.regeocode.formattedAddress
                    message.innerHTML = ''
                }else{
                    message.innerHTML = '无法获取地址'
                }
                })
            })
            var placeSearch = new AMap.PlaceSearch({
                map: map
            });  //构造地点查询类
            var autoOptions = {
                input: "input"
            }
            // var map = new AMap.Map("container", {
            //     resizeEnable: true
            // })
            var auto = new AMap.Autocomplete(autoOptions)
            AMap.event.addListener(auto, "select", select)
            function select(e) {
                // placeSearch.setCity(e.poi.adcode);
                placeSearch.search(e.poi.name);  //关键字查询查询
                that.position.address=e.poi.name
                that.position.lnglat=e.poi.location
            }    
            input.onchange = function(e){
                var address = that.position.address;
                geocoder.getLocation(address,function(status,result){
                    if(status=='complete'&&result.geocodes.length){
                        marker.setPosition(result.geocodes[0].location);
                        map.setCenter(marker.getPosition())
                        message.innerHTML = ''
                    }else{
                        //message.innerHTML = '无法获取位置'
                    }
                })
            }
            input.onclick = function(e){
                input.value=''
            }
        
            
            //加载地图，调用浏览器定位服务
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
                var str=['定位成功'];
                str.push('经度：' + data.position.getLng());
                str.push('纬度：' + data.position.getLat());
                if(data.accuracy){
                    str.push('精度：' + data.accuracy + ' 米');
                }//如为IP精确定位结果则没有精度信息
                str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                //document.getElementById('tip').innerHTML = str.join('<br>');
            }
            //解析定位错误信息
            function onError(data) {
                //document.getElementById('tip').innerHTML = '定位失败';
            }
            if(sessionStorage.position&&sessionStorage.position!='{}'){
                var input = document.getElementById('input')
                var position = JSON.parse(sessionStorage.position)
                input.value=position.address
                var event = document.createEvent('HTMLEvents')
                event.initEvent('change',true,true)
                event.eventType = 'message';
                input.dispatchEvent(event)
                marker.setPosition(position.lnglat)
                that.position=position
            }
            });
        },
        methods:{
            confirm(){
                sessionStorage.setItem('position',JSON.stringify(this.position))
                this.$router.go(-1)
                console.log(this.position)
            }
        }
    }
</script>
<style lang="scss">
/*Map.vue*/
 @import "../../assets/css/function.scss";
    .Map{
      #container{
        height: 100%;
        margin: 0px
      }
      .panel {
        background-color: #ddf;
        color: #333;
        border: 1px solid silver;
        box-shadow: 3px 4px 3px 0px silver;
        position: absolute;
        top: pxtorem(10px);
        right: pxtorem(10px);
        border-radius: pxtorem(5px);
        overflow: hidden;
        line-height: pxtorem(20px);
      }
      #input{
        width: pxtorem(250px);
        height: pxtorem(25px);
        border: 0;
        padding:0 pxtorem(6px);
      }
      .confirm{
        width:pxtorem(50px);
        background-color: #fff;
        color:#444;
        font-size:pxtorem(13px);
        border: 1px solid silver;
        box-shadow: 3px 4px 3px 0px silver;
        position: absolute;
        top: pxtorem(45px);
        right: pxtorem(10px);
        border-radius: pxtorem(5px);
        overflow: hidden;
        line-height: pxtorem(20px);
      }
    }
</style>