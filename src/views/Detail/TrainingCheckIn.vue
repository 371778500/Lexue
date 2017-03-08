<template>
    <div class='TrainingCheckIn'>
        <head-v text="现场签到">
            <go-back slot="goback"></go-back>
        </head-v>
        <div class="TrainingDetail">
            <h3>课程详情</h3>
            <p>培训领域：<span>{{Train.field}}</span></p>
            <p>培训名称：<span>{{Train.name}}</span></p>
            <p>开始时间：<span>{{Train.startDate | formatDate}}</span></p>
            <p>结束时间：<span>{{Train.endDate | formatDate}}</span></p>
            <p>培训课程：<span>{{Train.courseName}}</span></p>
            <p>培训地点：<span>{{Train.address}}</span></p>
            <p>讲师：<span>{{Train.teacher}}</span></p>
            <p>已报人数：<span style="color:#ff8028">{{Train.alreadyApplyNum}}</span><span>/{{Train.applySum}}</span></p>
        </div>
        <div class="apply">
            <!--<span @click="checkIn">签到</span>-->
            <div id="container">
                <a id="pickNow" href="javascript:;">
                    <i class="iconfont icon-checkIn" ></i>
                    <span>现场拍照签到</span>
                </a> 
                <!--<a id="uploadfiles" href="javascript:;">上传</a>-->
            </div>
            <div id="file-list">Your browser doesn't have Flash, Silverlight or HTML5 support.</div>
            <br />
            <!--<span @click="checkIn">立即签到</span>-->
        </div>
    </div>
</template>
<script>
    import Header from '../Header.vue'
    import GoBack from '../../components/GoBack.vue'
    import { Toast } from 'mint-ui'
    import 'mint-ui/lib/toast/style.css'
    import plupload from 'plupload'
    export default{
        data(){
            return{
                Train:{},
                isCheckIn:false
            }
        },
        mounted(){
            var that=this;
            var uploader = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button : 'pickNow', // you can pass an id...
                container: document.getElementById('container'), // ... or DOM Element itself
                url : '/app/uploadImg',
                flash_swf_url : '../js/Moxie.swf',
                silverlight_xap_url : '../js/Moxie.xap',
                
                filters : {
                    max_file_size : '10mb',
                    mime_types: [
                        {title : "图片文件", extensions : "jpg,gif,png"}
                    ],
                    prevent_duplicates : true
                },

                resize : {width : 320, height : 240, quality : 90},

                init: {
                    PostInit: function() {
                        document.getElementById('file-list').innerHTML = '';

                        // document.getElementById('uploadfiles').onclick = function() {
                        //     uploader.start();
                        //     return false;
                        // };
                    },

                    FilesAdded: function(up, files) {
                        var oldLen = up.files.length - files.length;
                        if(oldLen>0){
                            files.splice(0,files.length);
                            up.files.splice(oldLen,up.files.length);
                            alert('最多上传一张图片');
                            return false;
                        }
                        console.log(oldLen);
                        plupload.each(files, function(file) {
                            var reader = new FileReader();
                            reader.readAsDataURL(file.getNative()); 
                            console.log('file[i]='+file);
                            reader.onload =function(e){
                                // that.images.push(e.target.result);  
                                // console.log('e.target.result'+e.target.result);                                  
                                // document.getElementById('file-list').innerHTML += '<div id="' + file.id + '"><img class="selected-img" src="'+e.target.result + '"/></div>';
                            };                 
                        });
                        uploader.start();
                    },

                    UploadProgress: function(up, file) {
                        // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                    },

                    FileUploaded:function(uploader,file,responseObject){
                        that.signInImg=JSON.parse(responseObject.response).fileId;
                        // console.log(that.imagesID);
                    },

                    UploadComplete:function(uploader,files){
                        that.isCheckIn=true;
                        //alert("上传成功！");
                        that.goCheckIn(that.$route.params.id);
                    },

                    Error: function(up, err) {
                        switch(err.code){
                            case -602:alert('文件不能重复！');break;
                            default:alert("\nError #" + err.code + ": " + err.message);
                        }
                        // document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
                    }
                }
            });

            uploader.init();
            var data = { id:this.$route.params.id}
            //console.log(new String(this.$route.params.id))
            this.$http.post('/app/getTrainingPlan',data).then((res)=>{
                return res.data
            }).then((value)=>{
                this.Train = value.data
            })
        },
        methods:{
             goCheckIn(id){
                if(!this.signInImg){
                    alert('请上传签到图片')
                    return;
                }
                var data={
                    courseId:id,
                    signInImg:this.signInImg,
                    userId:window.localStorage.getItem('UserInfo')
                }
                this.$http.post('/app/checkIn',data).then((res)=>{
                    if(res.data.code==0){
                        let instance=Toast('签到成功')
                            setTimeout(() => {
                                instance.close()
                                this.$router.go(-1)
                            }, 1000)
                    }
                    })
            }
        },
        components:{
            HeadV:Header,
            GoBack,            
        }
    }
</script>
<style lang="scss">
    /*TrainingCheckIn.vue*/
    @import '../../assets/css/function.scss';
    .TrainingCheckIn{
        background:#fff;
        min-height: pxtorem(568px);
        .TrainingDetail{
            border-top: pxtorem(10px) solid #e5e5e5;
            h3{
                font-size:pxtorem(24px);
                color:#ff4f57;
                font-weight:400;
                text-align: center;
                margin-top:pxtorem(25px);
                box-sizing: border-box;
                height:pxtorem(62px);
            }
            p{
                font-size:pxtorem(14px);
                margin-left: pxtorem(25px);
                margin-bottom: pxtorem(16px);
                font-weight: bold;
                span{
                    font-size:pxtorem(12px);
                    color:#999;
                    font-weight:400;
                }
            }
        }
    }
    .TrainingCheckIn{
        .apply{
            text-align:center;
            color:#ff8208;
            i{
                font-size:pxtorem(48px);       
            }
            span{
                display: block;
                width:pxtorem(140px);
                margin:0 auto;
                margin-top:pxtorem(10px);
                font-size:pxtorem(18px);
            }
            #pickNow{
                color:#ff8028;
            }
        }
    }
</style>