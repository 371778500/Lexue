<template>
	<div>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="站点名称" prop="siteName" required>
			<el-input v-model="ruleForm.siteName" ></el-input>
		</el-form-item>
		<el-form-item label="站点标题" prop="siteTitle" required>
			<el-input v-model="ruleForm.siteTitle" ></el-input>
		</el-form-item>
		<el-form-item label="客户代码" prop="CusCode" required>
			<el-input v-model="ruleForm.CusCode"></el-input>
		</el-form-item>
		<el-form-item label="站点Logo" prop="siteImg" required>
			<el-upload
				action="/app/uploadImg"
				type="drag"
				:thumbnail-mode="true"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:on-success="handleSuccess"
			>
				<i class="el-icon-upload"></i>
				<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-form-item>

		<el-form-item label="站点访问地址二维码" v-show="qrshow">
			<img :src='src' alt="该站点访问二维码"/>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即生成</el-button>
			<el-button @click="goBack">返回</el-button>
		</el-form-item>
	</el-form>
	
	</div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          siteName: '',
          CusCode: '',
					siteTitle:'',
					siteImg:''
        },
				rules: {
        		siteName: [
             { required: true, message: '请输入站点名称', trigger: 'blur' },
             { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
						]
            // siteAddress: [
						// 	{ required: true, message: '请输入站点地址', trigger: 'blur' }
						// ]
			  },
				qrshow:false,
				src:''	
      }
    },
		mounted(){
      //this.ruleForm.CusCode=this.getID(6);//设置默认的6位数
    },
    methods: {
			getID(randomLength){
				var d=new Date();
				var id=''+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds()+d.getMilliseconds();
  			return id.substr(id.length-randomLength)
			},
			handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
			handleSuccess(response, file, fileList){
        this.ruleForm.siteImg=response.fileId
			},
      submitForm(formName) {
				this.$refs[formName].validate((valid) => {
          if (valid) {
						console.log(this)
						if(!this.ruleForm.siteImg){
							alert('请上传Logo!');
							return false;
						}
						var url = "/mgr/saveSite"
							// var data = {userId:window.localStorage.UserInfo,courseId:this.$route.params.id,noteContent:content,picIds:this.imagesID}
							this.$http.post(url,this.ruleForm).then((res)=>{
									console.log(res)
									if(res.statusText=='OK'){
											alert("保存成功")
											this.qrshow=true;
											this.genQrcode(this.ruleForm.CusCode);
											this.$refs[formName].disabled=true;
											// setTimeout(() => {
											// 		this.$router.go(-1);
											// }, 1000)
									}else{
											alert("保存失败")
									}
							})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
			handlePlanIconClick(){
				console.log("click了")
				
			},
			genQrcode(urlAddress){
				this.$http.post('/mgr/qrcode',{urlAddress:urlAddress}).then((res)=>{
						this.src=window.URL.createObjectURL(res.data);
						console.log(this.src)
				})
			},
			goBack(){
				this.$router.go(-1);
			}
    }
  }
</script>