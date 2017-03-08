module.exports={
    note:{
      userId: '1',
      courseId: '1',
      createDate:new Date(),
      noteContent: 'mongoose测试1',
    },
    comment:{
      userId: '1',
      userName:'xiaolan',
      userImg: '',
      courseId: '1',
      createDate:new Date(),
      commentContent: 'mongoose测试评论1',
      commentFlag: 0,
      starNumber: 4
    },
    trainingPlan:{
        userId: '1',     //用户id
        userName: 'xiaolan',
        userImg: '',
        isSignIn: false,  //是否签到
        isCheck: false,   //是否填写问卷调查
        createDate: new Date(),
        startDate: new Date(),    //开始时间
        endDate: new Date(),      //结束时间
        field: '财务',      //培训领域
        name: '培训test1',       //培训名称
        courseName: 'yonyou', //培训课程
        address: 'beijing',    //培训地址
        teacher: 'xiaolan',    //培训讲师
        isApply: false,   //是否报名
        applySum: 40,   //总报名人数
        alreadyApplyNum: 30//已报名人数
    }
}
