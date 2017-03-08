<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInline.user" placeholder="站点名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getQrcodeList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="qrcodeList" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="siteName" label="站点名称"  sortable>
				</el-table-column>
				<el-table-column prop="siteTitle" label="站点标题"  sortable>
				</el-table-column>
				<el-table-column prop="CusCode" label="客户代码" sortable>
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="100">
					<span>
						<el-button type="text" size="small" @click="viewQrcode(row)">查看二维码</el-button>
						<!--<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>-->
						<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
					</span>
				</el-table-column>
			</el-table>
		</template>

		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination :current-page="1" :page-sizes="[1, 2, 3, 4]" :page-size="1" layout="total, sizes, prev, pager, next, jumper"
				:total="4" style="float:right">
			</el-pagination>
		</el-col>

		<!--二维码界面-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
			<div class="">
				<img :src='src' alt="签到二维码"/>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editFormVisible = false">OK,知道了</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../../common/util'
	import NProgress from 'nprogress'

  export default {
    data() {
      return {
				formInline: {
					user: ''
				},
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				value1:'',
				editFormVisible:false,//编辑界面显是否显示
				editFormTtile:'编辑',//编辑界面标题
				//编辑界面数据
				editForm: {
					id:0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				editLoading:false,
				btnEditText:'提 交',
				editFormRules:{
					name:[
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				qrcodeList: [],
				src:'',
				listLoading:false,
				pageNumber:0,
				pageSize:10,
				showOptions:true, //显示问题添加'选项'项
				totalNum:0 //问题总数
     		}
    },
	mounted(){
		this.getQrcodeList(0,true).then((values)=>{
			//console.log(values)
			this.qrcodeList.push(...values)
		})
	},
    methods: {
		   //获取站点列表
			getQrcodeList:function(pageNumber,flag){
				var _this=this;
				var pageNum=pageNumber||0;
				var fg=flag||false;
				var data = {pageNumber:pageNum,pageSize:this.pageSize,siteName:this.formInline.user }
                return this.$http.post('/mgr/getSiteList',data).then((res)=>{
                    return res.data
                }).then((body)=>{
                    this.totalNum = body.totalNum
					//如果不是第一次进入则是由点击查询触发该事件，需要刷新数据
					if(!fg){
                    	_this.listLoading=true;
						_this.qrcodeList.length=0;
						_this.qrcodeList.push(...body.data);
						_this.listLoading=false;
					}
                    return body.data
                })
			},
			viewQrcode:function(row){
				this.editFormVisible=true;
				this.editFormTtile='查看站点访问二维码';
				this.genQrcode(row.CusCode);
			},
			genQrcode(urlAddress){
                this.$http.post('/mgr/qrcode',{urlAddress:urlAddress}).then((res)=>{
                    this.src=window.URL.createObjectURL(res.data);
                    console.log(this.src)
                })
            },
			 //删除站点记录
			handleDel:function(row){
				// console.log("row="+row);
				var _this=this;
				this.$confirm('确认删除该记录吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					_this.listLoading=true;
					NProgress.start();
					setTimeout(function(){
						for(var i=0;i<_this.qrcodeList.length;i++){
							if(_this.qrcodeList[i]._id==row._id){
								console.log(_this.qrcodeList[i]._id)
								_this.$http.post('/mgr/deleteSite',{id:_this.qrcodeList[i]._id}).then((res)=>{
									return res.data
								}).then((body)=>{
									NProgress.done();
									if(body.code==0){
										_this.$notify({
											title: '成功',
											message: '删除成功',
											type: 'success'
										});
									}else{
										_this.$notify({
											title: '失败',
											message: '删除失败',
											type: 'fail'
										});
									}
								})
								_this.qrcodeList.splice(i,1);

								_this.listLoading=false;

								break;
							}
						}
					},1000);
				}).catch(() => {
							
				});
			},
			
			//显示编辑界面
			handleEdit:function(row){
				this.editFormVisible=true;
				this.editFormTtile='编辑';
				this.editForm.id=row.id;
				this.editForm.name=row.name;
				this.editForm.sex=row.sex;
				this.editForm.age=row.age;
				this.editForm.birth=row.birth;
				this.editForm.addr=row.addr;
			},
			//编辑 or 新增
			editSubmit:function(){
				var _this=this;

				_this.$refs.editForm.validate((valid)=>{
					if(valid){
						
						_this.$confirm('确认提交吗？','提示',{}).then(()=>{
							_this.editLoading=true;
							NProgress.start();
							_this.btnEditText='提交中';
							setTimeout(function(){
								_this.editLoading=false;
								NProgress.done();
								_this.btnEditText='提 交';
								_this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success'
								});
								_this.editFormVisible = false;

								if(_this.editForm.id==0){
									//新增
									_this.questionNaireList.push({
										id:new Date().getTime(),
										name: _this.editForm.name,
										sex: _this.editForm.sex,
										age: _this.editForm.age,
										birth: _this.editForm.birth==''?'':util.formatDate.format(new Date(_this.editForm.birth),'yyyy-MM-dd'),
										addr: _this.editForm.addr
									});
								}else{
									//编辑
									for(var i=0;i<_this.questionNaireList.length;i++){
										if(_this.questionNaireList[i].id==_this.editForm.id){
											_this.questionNaireList[i].name=_this.editForm.name;
											_this.questionNaireList[i].sex=_this.editForm.sex;
											_this.questionNaireList[i].age=_this.editForm.age;
											_this.questionNaireList[i].birth=_this.editForm.birth==''?'':util.formatDate.format(new Date(_this.editForm.birth),'yyyy-MM-dd');
											_this.questionNaireList[i].addr=_this.editForm.addr;
											break;
										}
									}
								}
							},1000);
						
						});

					}
				});

			},
			//显示新增界面
			handleAdd:function(){
				var _this=this;

				// this.editFormVisible=true;
				// this.editFormTtile='新增';
				_this.$router.push('/genQrcode');
			}
    }
  }
</script>

<style scoped>
	.toolbar .el-form-item {
		margin-bottom: 10px;
	}
	
	.toolbar {
		background: #fff;
		padding: 10px 10px 0px 10px;
	}
</style>