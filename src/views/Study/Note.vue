<template>
    <div class="note" :style="{height:noteHeight}">
        <div class="take-notes">
            <router-link :to="'/takenote/'+index">
                <span>
                    <i class="iconfont icon-writenote"></i>
                </span>
            </router-link>
        </div>
        <p class="tip">{{content}}</p>
        <div class="notes">
            <div v-for="note in notes">
                <div class="content">
                    {{note.noteContent}}
                    <div class="imageContainer" >
                        <img v-for="imageSrc in note.images" :src="imageSrc" @click="showImg(imageSrc)"/>
                    </div>
                    <span class="time">{{note.createDate | formatTime}}</span>
                </div>
            </div>
        </div>
        <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade"  style="background:transparent;" >
            <img :src="imgSrc">
        </mt-popup>
    </div>
</template>
<script>
    import { Popup } from 'mint-ui';
    import Vue from 'vue'
    Vue.component(Popup.name, Popup);
    export default{
        data(){
            return{
                notes:[],
                noteHeight:'',
                index:this.$route.params.id,
                content:'',
                popupVisible:false,
                imgSrc:''
            }
        },
        methods:{
            showImg(imageSrc){
                this.popupVisible=this.popupVisible?false:true;
                this.imgSrc=imageSrc;
            }
        },
        created(){
            var data = { userId:window.localStorage.UserInfo,courseId:this.$route.params.id }
            this.$http.post('/app/getNoteInfo',data).then((res)=>{
                return res.json()
            }).then((body)=>{
                    // this.notes = body.data
                    body.data.forEach((note,index,array)=> {
                        array[index].images=[]
                        if(note.picIds.length!=0){
                            note.picIds.forEach((picId)=>{
                                console.log(picId)
                                if(picId.picId!=undefined){
                                    this.$http.post('/app/file/'+picId.picId).then((res)=>{
                                        array[index].images.push(window.URL.createObjectURL(res.data));
                                    })
                                }
                            })
                        }
                    });
                return body.data
            }).then((data)=>{
                this.notes = data
                this.content = data.length==0?'暂无笔记':''
            })
        },
        updated(){
            // console.log($('body').height())
            // this.noteHeight=$('body').height()<$('html').height()?'13.8rem':''
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/function.scss";
    /*Note.vue*/
    .note{
        background: #fff;
        padding:0 pxtorem(15px) pxtorem(20px);
        .take-notes{
            overflow: hidden;
            margin-top:pxtorem(6px);
            padding:pxtorem(6px) 0 pxtorem(10px);
            border-bottom:1px solid #eee;
            span{
                float:right;
                i{
                    color:#ff4f57;
                    font-size:pxtorem(16px);
                }
            }
            span::before{
                position:relative;
                bottom:pxtorem(1px);
                content:"记笔记";
                font-size:pxtorem(12px);
                color:#ff4f57;
                margin-right:pxtorem(10px);
            }
        }
    }
    .tip{
            font-size:pxtorem(14px);
            text-align: center;
            color:#aaa;
            font-style: italic;
            padding-top:pxtorem(10px);
    }
    .note{
        .notes{
            .content{
                position:relative;
                width:100%;
                line-height:pxtorem(18px);
                padding:pxtorem(15px) 0 pxtorem(18px);
                border-bottom:1px solid #eee;
                color:#666;
                font-size:pxtorem(12px);
                overflow: hidden;
                .time{
                    position:absolute;
                    right:0;
                    bottom:pxtorem(1px);
                    color:#999;
                    font-size:pxtorem(12px);
                }
            }
            .imageContainer{
                   img{
                        display: block;
                        float: left;
                        margin: pxtorem(5px);
                        width:pxtorem(80px);
                        height:pxtorem(80px);
                   } 
            }
        }
    }
</style>
