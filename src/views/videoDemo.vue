<template>
    <div class="video-demo">
        <video-player id="videoDemo" :options="videoOptions"></video-player>
        <button @click="test"></button>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { videoPlayer } from 'vue-video-player'
    export default {
        data () {
            return {
                videoOptions: {
                    source: {
                        type: "video/mp4",
                        src: 'http://vjs.zencdn.net/v/oceans.mp4',
                        // if you need custom player state changed event name, you can config it like this
                        customEventName: 'my-player-state-changed-event-custom-name'
                    },
                    autoplay:false,
                    height:document.documentElement.clientHeight*300/568
                    },
                }
            },
        mounted(){
            // let myVideo=videojs('videoDemo')
            // console.log(myVideo.currentTime())
        },
        methods:{
            test(){
                let myVideo=videojs('videoDemo')
                console.log(myVideo.currentTime())
            }
        },
        components:{
            videoPlayer
        }
    }
</script>
<style lang="scss">
/*videoDemo.vue*/    
</style>