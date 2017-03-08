<template>
	<div>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="问卷名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="问卷描述">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="培训计划">
			 <el-input placeholder="请选择培训计划" v-model="form.input1.name">
				<el-button slot="append" icon="search" @click="handlePlanIconClick"></el-button>
			</el-input>
		</el-form-item>
		<el-form-item label="问卷题目">
			<el-input placeholder="请选择问卷题目" v-model="form.input2">
				<el-button slot="append" icon="search" @click="handleQuestionIconClick"></el-button>
			</el-input>
		</el-form-item>
		<el-form-item label="已选题目">
			<el-table :data="selectedQuestion" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="80">
				</el-table-column>
				<el-table-column prop="questionContent" label="题目" sortable>
				</el-table-column>
				<el-table-column prop="questionType" label="类型" :formatter="formatType" sortable>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!--<el-form-item label="活动时间">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="即时配送">
			<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
		</el-form-item>
		<el-form-item label="活动性质">
			<el-checkbox-group v-model="form.type">
				<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
				<el-checkbox label="地推活动" name="type"></el-checkbox>
				<el-checkbox label="线下主题活动" name="type"></el-checkbox>
				<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="特殊资源">
			<el-radio-group v-model="form.resource">
				<el-radio label="线上品牌商赞助"></el-radio>
				<el-radio label="线下场地免费"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="活动形式">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>-->
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
	<el-dialog title="选择培训计划" v-model="selectPlanVisible" :close-on-click-modal="false">
			<!--列表-->
			<el-table :data="planList" highlight-current-row v-loading="listLoading"  @selection-change="handleSelectionChange" style="width: 100%;">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column prop="name" label="培训名称">
				</el-table-column>
				<el-table-column prop="address" label="培训地址">
				</el-table-column>
				<el-table-column prop="startDate" label="开始时间"  sortable>
				</el-table-column>
				<el-table-column prop="endDate" label="结束时间"  sortable>
				</el-table-column>
			</el-table>
			<!--分页-->
			<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
				<el-pagination :current-page="1"  :page-size="5" layout="total, prev, pager, next, jumper"
					:total="totalNum" style="float:right" @current-change="currentContent">
				</el-pagination>
			</el-col>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="selectPlanVisible = false">取 消</el-button>
				<el-button type="primary" @click.native="editSubmit">{{btnEditText}}</el-button>
			</div>
		</el-dialog>
			<el-dialog title="选择问卷问题" v-model="selectQuestionVisible" :close-on-click-modal="false">
			<!--列表-->
			<el-table :data="questionList" highlight-current-row v-loading="listLoading"  @selection-change="handleSelectionChange1" style="width: 100%;">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column prop="questionContent" label="问题"  sortable>
				</el-table-column>
				<el-table-column prop="questionType" label="问题类型" :formatter="formatType" sortable>
				</el-table-column>
			</el-table>
			<!--分页-->
			<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
				<el-pagination :current-page="1"  :page-size="5" layout="total, prev, pager, next, jumper"
					:total="totalNum1" style="float:right" @current-change="currentContent1">
				</el-pagination>
			</el-col>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="selectQuestionVisible = false">取 消</el-button>
				<el-button type="primary" @click.native="editSubmit1">{{btnEditText}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
					input1:'',
					input2:''
        },
				selectPlanVisible:false,
				selectQuestionVisible:false,
				btnEditText:'',
				//培训计划
				planList:[],
				selected:[],
				totalNum:10,
				//问卷题目
				questionList:[],
				selected1:[],
				totalNum1:0,
				selectedQuestion:[],
				//分页数据
				pageNumber:0,
				pageSize:5
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
			//类型显示转换
			formatType:function(row,column){
				return row.questionType==0?'单选':row.questionType==1?'多选':'问答';
			},
			//点击培训计划进行弹框
			handlePlanIconClick(){
				this.selectPlanVisible=true
				this.btnEditText='确定'
				this.getTrainingPlan(0).then((values)=>{
					this.planList=values
				})
			},
			//获取培训计划
			getTrainingPlan(pageNumber){
				let data = { pageNumber:pageNumber,pageSize:this.pageSize }
        return this.$http.post('/app/getTrainingPlanList',data).then((res)=>{
            return res.data
        }).then((body)=>{
            return body.data
        })
			},
			//获取培训计划当前页内容
			currentContent(currentPage){
				this.getTrainingPlan(currentPage-1).then((values)=>{
					console.log(values)
					this.planList=values
				})
			},
			//处理培训计划选择
			handleSelectionChange(val){
				this.selected = val
			},
			//提交选择的培训计划
			editSubmit(){
				if(this.selected.length>1){
					this.$message.error('只允许选择一个培训计划');
				}else{
					this.form.input1=this.selected[0]
					console.log(this.form.input1)
					this.selectPlanVisible=false
				}
			},
			//点击问卷问题进行弹框
			handleQuestionIconClick(){
				this.selectQuestionVisible=true
				this.btnEditText='确定',
				this.getQuestionList(0).then((values)=>{
					this.questionList=values
				})
			},
			//获取问题列表
			getQuestionList(pageNumber){
				let data = {pageNumber:pageNumber,pageSize:this.pageSize }
        return this.$http.post('/mgr/getQuestionList',data).then((res)=>{
              return res.data
          }).then((body)=>{
              this.totalNum1 = body.totalNum
              return body.data
          })				
			},
			//获取问题当前页内容
			currentContent1(currentPage){
				this.getQuestionList(currentPage-1).then((values)=>{
					console.log(values)
					this.questionList=values
				})
			},
			//处理问题选择
			handleSelectionChange1(val){
				this.selected1 = val
			},
			//提交选择的问题
			editSubmit1(){
				this.selectedQuestion = this.selected1
				this.selectQuestionVisible=false
			}
    }
  }
</script>