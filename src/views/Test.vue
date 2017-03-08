<template>
    <div>
        this is Text.html!
        <button type="" @click='add({account:3})'>加一个数</button>
        {{  getData1 }}
        <button type="" @click='changeIndex'>改变index</button>
        {{ getIndex1 }}
    </div>
</template>
<script>
    import { mapActions, mapGetters, } from 'vuex'
    export default{
        data(){
            return {
                payload:{
                    account:0
                }
            }
        },
        methods:{
            // 将methods中的add映射到actions中,第一个参数就指的就是store对象了.
            // 这种方式只是快捷的不需要写actions的dispatch事件,语法糖而已,当然名字一样的情况下,就不需要使用前面的具名赋值.
            // 两种方式,一种是对象,
            ...mapActions({
                add:'increment',
            }),
            ...mapActions([
                'change'
            ]),
            // 如果没有下面的代码,生效的就是行内的add方法.
            // add(){
            //     this.$store.dispatch('increment',{account:100})
            // },
             changeIndex(){
                this.$store.dispatch('change',{ index:5} )
            }
        },
        computed:{
            ...mapGetters({
                getData1:'getData',
                getIndex1:'getIndex'
            }),
           
        }
    }
</script>