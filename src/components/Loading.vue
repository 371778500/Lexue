<template>
    <div class='loading' v-show='isLoading'>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return {
                // isLoading:this.$store.isLoading,
            }
        },
        computed:{
            ...mapGetters([
                'isLoading'
            ])
        }

    }
</script>
<style lang='scss'>
    /* Loading.vue */
    .loading{
        position:fixed;
        left:50%;
        top:50%;
        width:100%;
        margin-top:-284px;
        margin-left:-160px;
        width:100%;
        height:100%;
        background:url('~assets/loading1.gif') no-repeat center center ;
        z-index:9999;
    }
</style>