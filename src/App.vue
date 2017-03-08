<template>
  <div id="app">

    <transition name="fade" mode="out-in" >
      <router-view class="view"></router-view>
    </transition>
  </div>

</template>

<script>
    import { mapActions,mapGetters} from 'vuex'
    export default {
        data(){
            return {
            }
        },
        created(){
            // this.$router.push('/bg');
        },
        mounted() {
            //初始化改变根节点的font-size,以320的屏幕为基准,20px为基准.
            //this is added by zou
            (function(doc, win) {
                var docEl = doc.documentElement,
                    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                    recalc = function() {
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        if(clientWidth<768){
                            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                        }
                    };
                if (!doc.addEventListener) return;
                win.addEventListener(resizeEvt, recalc, false);
                doc.addEventListener('DOMContentLoaded', recalc, false);
            })(document, window);
        },
        components: {

        },
        methods:{
            ...mapActions([
                'changeLoading'
            ])
        },
        computed:{
            ...mapGetters([
                'isLoading'
            ])
        },
        updated(){

        },
        beforeDestroyed(){

        },
        destroyed(){
            console.log('destroyed')
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    html {
        height: 100%;
        font-size: 10px;
    }

    body {
        font-family: "yahei";
        background: rgba(238, 238, 238, 1);
    }

    #app {
        font-family:"微软雅黑", Helvetica, sans-serif;
    }

    a {
        text-decoration: none;
    }
    @import "../node_modules/font-awesome/css/font-awesome.min.css";
</style>

<!-- standalone css -->
<style src='./assets/css/font-awesome.css'></style>
<style src='./assets/css/common.css'></style>
<style src='./assets/css/iconfont.css'></style>
