<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInline.user" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="questionList" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="80">
				</el-table-column>
				<el-table-column prop="questionContent" label="题目" sortable>
				</el-table-column>
				<el-table-column prop="questionType" label="类型" :formatter="formatType" sortable>
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="100">
					<span>
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
					</span>
				</el-table-column>
			</el-table>
		</template>

		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination :current-page="1"  :page-size="10" layout="total, prev, pager, next, jumper"
				:total="totalNum" style="float:right" @current-change="currentContent">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="题目内容" prop="questionContent">
					<el-input v-model="editForm.questionContent" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="题目类型">
					<!--<el-select v-model="editForm.sex" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="0"></el-option>
					</el-select>-->
					<el-radio-group v-model="editForm.questionType">
						<el-radio class="radio" :label="0" @click.native="showOptions=true">单选</el-radio>
						<el-radio class="radio" :label="1" @click.native="showOptions=true">多选</el-radio>
						<el-radio class="radio" :label="2" @click.native="showOptions=false ">问答</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选项" v-show="showOptions">
					<el-input type="text" v-model="editForm.options[index]" style="margin-bottom: 5px"   v-for="(option,index) in editForm.options"></el-input>
				</el-form-item>
				<el-form-item label="增/删选项" v-show="showOptions">
					<span class="option"><i class="el-icon-plus" @click="addOptions"></i></span>
					<span class="option"><i class="el-icon-minus" @click="delOptions"></i></span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
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
					questionContent: '',
					questionType: 0,
					options:['']
				},
				editLoading:false,
				btnEditText:'提 交',
				editFormRules:{
					name:[
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				questionList: [],
				listLoading:false,
				pageNumber:0,
				pageSize:10,
				showOptions:true, //显示问题添加'选项'项
				totalNum:0 //问题总数
     		}
    },
	mounted(){
		this.getQuestions(0).then((values)=>{
			//console.log(values)
			this.questionList.push(...values)
			console.log(this.questionList)
		})
		
	},
    methods: {
			//类型显示转换
			formatType:function(row,column){
				return row.questionType==0?'单选':row.questionType==1?'多选':'问答';
			},
			getQuestions:function(pageNumber){
				var data = {pageNumber:pageNumber,pageSize:this.pageSize }
                return this.$http.post('/mgr/getQuestionList',data).then((res)=>{
                    return res.data
                }).then((body)=>{
                    this.totalNum = body.totalNum
                    return body.data
                })
			},
			//删除记录
			handleDel:function(row){
				// console.log("row="+row);
				var _this=this;
				this.$confirm('确认删除该记录吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					_this.listLoading=true;
					NProgress.start();
					setTimeout(function(){
						for(var i=0;i<_this.questionList.length;i++){
							if(_this.questionList[i]._id==row._id){
								console.log(_this.questionList[i]._id)
								_this.$http.post('/mgr/deleteQuestion',{id:_this.questionList[i]._id}).then((res)=>{
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
								_this.questionList.splice(i,1);

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
				this.editForm.id=row._id;
				this.editForm.questionType=row.questionType;
				this.editForm.questionContent=row.questionContent;
				if(row.questionType==2){
					this.showOptions=false
				}else{
					this.showOptions=true
					this.editForm.options=[]
					row.options.forEach((item,index)=>{
						this.editForm.options.push(item.content)
					})
				}
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
									_this.questionList.pop()
									_this.questionList.unshift({
										questionContent: _this.editForm.questionContent,
										questionType: _this.editForm.questionType
									});
									var data = {
										questionContent : _this.editForm.questionContent,
										questionType: _this.editForm.questionType,
										options:_this.editForm.options
									}
									console.log(data)
									_this.$http.post('/mgr/saveOrEditQuestion',data).then((res)=>{
										_this.totalNum++
										console.log(res)
									})
								}else{
									//编辑
									_this.$http.post('/mgr/saveOrEditQuestion',data).then((res)=>{
										console.log(res)
									})



									// for(var i=0;i<_this.questionList.length;i++){
									// 	if(_this.questionList[i].id==_this.editForm.id){
									// 		_this.questionList[i].name=_this.editForm.name;
									// 		_this.questionList[i].sex=_this.editForm.sex;
									// 		_this.questionList[i].age=_this.editForm.age;
									// 		_this.questionList[i].birth=_this.editForm.birth==''?'':util.formatDate.format(new Date(_this.editForm.birth),'yyyy-MM-dd');
									// 		_this.questionList[i].addr=_this.editForm.addr;
									// 		break;
									// 	}
									// }
								}
							},1000);
						
						});

					}
				});

			},
			//显示新增界面
			handleAdd:function(){
				this.editFormVisible=true;
				this.editFormTtile='新增';
				this.editForm.questionContent='';
				this.editForm.questionType=0;
				this.editForm.options=[''];
				this.showOptions=true;
			},
			//添加选项
			addOptions:function(){
				this.editForm.options.push('')
			},
			//添加选项
			delOptions:function(){
				this.editForm.options.pop('')
			},
			//当前页内容
			currentContent:function(currentPage){
				this.getQuestions(currentPage-1).then((values)=>{
					this.questionList=values
				})
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

	.option{
		display: inline-block;
		width:30px;
		height:30px;
		line-height:30px;
		margin-right:10px;
		text-align: center;
		border-radius: 50%;
		background:rgb(32,160,255);
		color:#fff;
	}
	.option:hover{
		cursor: pointer;
	}
</style>