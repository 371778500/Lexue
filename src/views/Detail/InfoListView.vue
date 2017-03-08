<template>
    <div class="InfoListView">
        <Header-v text='新闻资讯'>
            <go-back slot='goback'></go-back>
        </Header-v>
        <router-view></router-view>
        <back-top></back-top>
    </div>  
</template>
<script>
import InfoList from './InfoList.vue'
import Header from '../Header.vue'
import BackTop from '../../components/BackTop.vue'
const GoBack = require('../../components/GoBack.vue')
    export default{
        mounted(){

        },
        components:{
            info:InfoList,
            HeaderV:Header,
            GoBack,
            BackTop
        }
    }
</script>
<style lang="scss">
    /*InfoListView.vue*/
    .InfoListView{
    }
</style>