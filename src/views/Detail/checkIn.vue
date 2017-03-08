<template>
    <div class='CheckIn'>
        <head-v text="签到">
            <go-back slot="goback"></go-back>
        </head-v>
        <div>
            <video id="video" autoplay="true" style="display:none;"></video>
            <canvas id="canvas" style="width:640px; height:480px;"></canvas>
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { InfiniteScroll,Spinner,Toast } from 'mint-ui'
    import Vue from 'vue'
    import jsQR from 'jsqr'
    Vue.use(InfiniteScroll);
    export default{
        data(){
            return{
                // video:document.getElementById("video"),
                // canvas:document.getElementById("canvas"),
                // context:this.canvas.getContext("2d"),
                // width:parseInt(this.canvas.style.width),
                // height:parseInt(this.canvas.style.height),
                trainList:[],
            }
        },
        mounted(){
            var front = false;
            var video = document.getElementById("video");
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");

            var width = parseInt(canvas.style.width);
            var height = parseInt(canvas.style.height);
            canvas.width = width;
            canvas.height = height;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (navigator.getUserMedia){
            function successCallback(stream){
                if (window.webkitURL) {
                video.src = window.webkitURL.createObjectURL(stream);
                } else if (video.mozSrcObject !== undefined) {
                video.mozSrcObject = stream;
                } else {
                video.src = stream;
                }
            }
            function errorCallback(){}
            navigator.getUserMedia(
                { video: { width: 1280, height: 720 } },
                {video: {frameRate: { ideal: 10, max: 15 },facingMode: { exact: "environment" }  } }, successCallback, errorCallback);
            requestAnimationFrame(tick);
            }

            function tick(){
            requestAnimationFrame(tick);
            if (video.readyState === video.HAVE_ENOUGH_DATA){
                // Load the video onto the canvas
                context.drawImage(video, 0, 0, width, height);
                // Load the image data from the canvas
                var imageData = context.getImageData(0, 0, width, height);
                var decoded = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);
                if(decoded) {
                    var data = JSON.parse(decoded)
                    data.userId=window.localStorage.getItem('UserInfo')
                    Vue.http.post('/app/checkIn',data).then((res)=>{
                        alert(res.data.msg)
                        //video.src.stop()
                        history.go(-1)
                    })
                }
            }
            }




            // var video = document.getElementById("video");
            // var canvas = document.getElementById("canvas");
            // var context = canvas.getContext("2d");

            // var width = parseInt(this.canvas.style.width);
            // var height = parseInt(this.canvas.style.height);
            // this.canvas.width = this.width;
            // this.canvas.height = this.height;
            // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            // if (navigator.getUserMedia){
            //     function successCallback(stream){
            //         if (window.webkitURL) {
            //         this.video.src = window.webkitURL.createObjectURL(stream);
            //         } else if (this.video.mozSrcObject !== undefined) {
            //         this.video.mozSrcObject = stream;
            //         } else {
            //         this.video.src = stream;
            //         }
            // }
            // function errorCallback(){}
            // navigator.getUserMedia({video: true}, successCallback, errorCallback);
            // requestAnimationFrame(this.tick);
            // }
        },
        methods:{
        //    tick(){
        //     requestAnimationFrame(this.tick);
        //     if (this.video.readyState === this.video.HAVE_ENOUGH_DATA){
        //         // Load the video onto the canvas
        //         this.context.drawImage(this.video, 0, 0, this.width, this.height);
        //         // Load the image data from the canvas
        //         var imageData = this.context.getImageData(0, 0, this.width, this.height);
        //         var decoded = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);
        //         if(decoded) {
        //         alert(decoded);
        //         }
        //     }
        //     }
        },
        components:{
            HeadV:Header,
            GoBack,
            mtSpinner:Spinner
        }
    }
</script>

<style lang="scss">
    /*TrainingList.vue*/
    @import '../../assets/css/function.scss';
    
</style>
