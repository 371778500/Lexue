<template>
    <div class="take-note">
        <head-v text="我的笔记">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="content">
            <span class="mynote">
                <i class="iconfont icon-writenote"></i>
            </span>
            <textarea rows="10" cols="40" class="note-detail"></textarea>
            <!--<input type="file" name="pickfiles"  id="pickfiles" @change="preview">
            <img :src="imgURL" alt="">-->
            <!--<div id="contain">
                <button id="pickfiles" @click="test">选择图片</button> 
                <a id="uploadfiles" href="javascript:;">上传</a>
            </div>
            <div>
                <img style="width:5rem;height:5rem" :src="imgURL" alt="">
            </div>
            <div id="file-list">Your browser doesn't have Flash, Silverlight or HTML5 support.</div>-->
            <br />
        </div>
        <button class="submit" @click="submit">保存</button>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { Toast } from 'mint-ui'
    import { MessageBox } from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    import plupload from 'plupload'
    import Vue from 'vue'
    export default{
        data(){
            return{
                imagesID: [],
                imgURL:''
            }
        },
        mounted(){
        //     var that=this;
        //     var uploader = new plupload.Uploader({
        //     runtimes : 'html5,flash,silverlight,html4',
        //     browse_button : 'pickfiles', // you can pass an id...
        //     container: document.getElementById('contain'), // ... or DOM Element itself
        //     url : '/app/uploadImg',
        //     flash_swf_url : '../js/Moxie.swf',
        //     silverlight_xap_url : '../js/Moxie.xap',
            
        //     filters : {
        //         max_file_size : '10mb',
        //         mime_types: [
        //             {title : "图片文件", extensions : "jpg,gif,png"}
        //         ],
        //         prevent_duplicates : true
        //     },

        //     resize : {width : 320, height : 240, quality : 90},

        //     init: {
        //         PostInit: function() {
        //             document.getElementById('file-list').innerHTML = '';

        //             // document.getElementById('uploadfiles').onclick = function() {
        //             //     uploader.start();
        //             //     return false;
        //             // };
        //         },

        //         FilesAdded: function(up, files) {
        //             var oldLen = up.files.length - files.length;
        //             if(oldLen>2){
        //                 files.splice(0,files.length);
        //                 up.files.splice(oldLen,up.files.length);
        //                 alert('最多上传三张图片');
        //                 return false;
        //             }
        //             console.log(oldLen);
        //             plupload.each(files, function(file) {
        //                 var reader = new FileReader();
        //                 reader.readAsDataURL(file.getNative()); 
        //                 console.log(file);
        //                 console.log(reader)
        //                 reader.onload =function(e){
        //                     // that.images.push(e.target.result);  
        //                     //console.log(e.target.result);                                  
        //                     document.getElementById('file-list').innerHTML += '<div id="' + file.id + '"><img class="selected-img" src="'+e.target.result + '"/></div>';
        //                 };                 
        //             });
        //              uploader.start();
        //         },

        //         UploadProgress: function(up, file) {
        //             // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        //         },

        //         FileUploaded:function(uploader,file,responseObject){
        //             that.imagesID.push(JSON.parse(responseObject.response).fileId);
        //             // console.log(that.imagesID);
        //         },

        //         UploadComplete:function(uploader,files){
        //             alert("上传成功！");
        //         },

        //         Error: function(up, err) {
        //             switch(err.code){
        //                 case -602:alert('文件不能重复！');break;
        //                 default:alert("\nError #" + err.code + ": " + err.message);
        //             }
        //             // document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
        //         }
        //     }
        // });

        // uploader.init();

        // $(document).on('click', '.pic_list a.pic_delete', function () {
        //         $(this).parent().remove();
        //         var toremove = '';
        //         var id = $(this).attr("data-val");
        //         for (var i in uploader.files) {
        //             if (uploader.files[i].id === id) {
        //                 toremove = i;
        //             }
        //         }
        //         uploader.files.splice(toremove, 1);
        //     });

        },
        methods:{
            submit(){
                var content = $('textarea').val()
                if(content){
                    // if()
                    // MessageBox.confirm('确定执行此操作?').then(action => {
                    // })
                    var url = "/app/saveNote"
                    var data = {userId:window.localStorage.UserInfo,courseId:this.$route.params.id,noteContent:content,picIds:this.imagesID}
                    this.$http.post(url,data).then((res)=>{
                        console.log(res)
                        if(res.statusText=='OK'){
                            let instance = Toast("保存成功")
                            setTimeout(() => {
                                this.$router.go(-1);
                                instance.close()
                            }, 1000)
                        }else{

                        }
                    })
                }else{
                    let instance = Toast("内容不可为空！")
                            setTimeout(() => {
                                instance.close()
                    }, 2000)
                }
            },
            test(){        
                window.javatojs.openCamera()
            },
            preview(e){
                var file = e.target.files||e.dataTransfer.files;
                console.log(file)
                if(file){
                    var reader = new FileReader();
                    reader.onload=()=>{
                            this.imgURL=reader.result
                    }
                    reader.readAsDataURL(file);
                }
            }
        },
        components:{
            HeadV:Header,
            GoBack
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/function.scss";
    /*TakeNote.vue*/
    .selected-img{
        display: block;
        float: left;
        margin: pxtorem(5px);
        width:pxtorem(80px);
        height:pxtorem(80px);
    }
    .take-note{
        .content{
            margin:pxtorem(14px) pxtorem(15px) 0;
            width:pxtorem(290px);
            height:pxtorem(380px);
            background:#fff;
            .mynote{
                display: block;
                text-align: center;
                padding-top:pxtorem(21px);
                i{
                    color:#ff4f57;
                    font-size:pxtorem(32px);
                }
            }
            #contain{
                a{
                   font-size:pxtorem(14px);
                   cursor:pointer;
                   margin:pxtorem(5px) pxtorem(10px) ;
                }
            }
            .selectimage{
                a{
                    font-size:pxtorem(12px);
                    margin:pxtorem(20px) pxtorem(24px) pxtorem(26px);
                    padding:pxtorem(10px) 0 0;
                    color:#0000ff;
                }  
                span{
                 
                    margin: pxtorem(20px) pxtorem(24px) pxtorem(26px);
                    padding:pxtorem(10px) pxtorem(5px) 0;
                    
                } 
            }
            .note-img-upload{
                ul{
                    li{
                        list-style:none;
                        margin: pxtorem(5px) pxtorem(24px) pxtorem(26px);
                        float:left;
                        img{
                            width:pxtorem(100px);
                            height:pxtorem(100px);
                        }
                    }
                }
            }
            .note-detail{
                width:pxtorem(243.5px);
                height:pxtorem(140px);
                border:none;
                border-top:1px solid #e5e5e5;
                border-bottom:1px solid #e5e5e5;
                resize:none;
                outline:none;
                margin:pxtorem(20px) pxtorem(24px) 0;
                padding:pxtorem(10px) pxtorem(5px) 0;
                font-size:pxtorem(12px);
                color:#666;
            }
        }
        .submit{
            position:relative;
            top:pxtorem(15px);
            left:pxtorem(15px);
            width:pxtorem(290px);
            height:pxtorem(40px);
            background:#ff4f57;
            border:none;
            border-radius:pxtorem(5px);
            color:#fff;
            font-size:pxtorem(16px);
            font-family: "微软雅黑";
        }
    }
</style>