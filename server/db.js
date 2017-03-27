var mongoose =  require('mongoose'),
    Schema =    mongoose.Schema,
    init =      require('./init'),
     // 用户
    userSchema =    new Schema({
        status:String,
        userId: String,
        userName: String,
        nickName:String,
        cnName:String,
        sex:String,
        depName:String,
        pName:String,
        roleName:String,
        email:String,
        pic:String,
        roid:String,
        pwd:String,
        account:String
    }),
     // 新闻
    newsSchema =    new Schema({
        newsId: String, //赋上默认值 10086
        newsTime: String  //最新的新闻时间
    }),
    // 消息
    infoSchema =    new Schema({
        userId: String,
        infoId: String
    }),
    // 笔记
    noteSchema =    new Schema({
        userId: String,
        courseId: String,
        createDate: Date,
        noteContent: String,
        picIds:[{
            picId:String
           }
        ]
    }),

    // 评论
    commentSchema = new Schema({
        userId: String,
        userName: String,
        userImg: String,
        courseId: String,
        createDate: Date,
        commentContent: String,
        commentFlag: Number,
        starNumber: Number
    }),

    // 用户培训计划中间表
    userTrainingplanSchema = new Schema({
        userId: String,     //用户id
        trainingPlanId: String,     //培训计划id
        userName: String,   //这个才是中间表的连接属性
        nickName: String,
        cnName: String,
        sex: String,
        depName: String,
        pName: String,
        roleName: String,
        email: String,
        userImg: String,
        account: String,
        longitude:Number,   //经度
        Latitude:Number,    //纬度
        range:Number,       //签到范围
        createDate: Date,
        isSignIn: Boolean,  //是否签到
        isCheck: Boolean,   //是否填写问卷调查
        isApply: Boolean , //是否报名
        signInImg:String
    }),
    // 培训计划
    trainingplanSchema = new Schema({
        adminUserId: String, //用户id
        createDate: Date,
        startDate: Date,    //开始时间
        endDate: Date,      //结束时间
        field: String,      //培训领域
        name: String,       //培训名称
        courseName: String, //培训课程
        address: String,    //培训地址
        teacher: String,    //培训讲师
        applySum: Number,   //总报名人数
        longitude:Number,   //经度
        Latitude:Number,    //纬度
        range:Number,       //签到范围
        alreadyApplyNum: Number,//已报名人数
        isRead: Boolean      //是否已读
    }),
    // 问卷调查
    questionnaireSchema = new Schema({
        trainingPlanId: String,     //培训计划id
        createDate: Date,
        title:String,
        description:String,
        questionIds:[{
            questionId: String    //问卷id
        }]
    }),
    //问卷中间表
    // qNaireQuestionSchema = new Schema({
    //     questionnaireId: String,     //问卷id
    //     questionId: String,     //题目id
    // }),
    // 问卷题目
    questionSchema = new Schema({
        questionContent: String,     //题目内容
        createDate: Date,
        questionType:Number,//题目类型 0：单选、1：多选、2、文本型
        options:[{//选项
            content:String
        }]
    }),

  //分站
    siteSchema = new Schema({
        siteName: String,
        siteTitle:String,     
        siteAddress: String,
        siteImg:String,
        orgId:String,
        CusCode:String,  
        createDate: Date
    }),

     //订单详情
    orderSchema = new Schema({
        userID: String,     
        courseName:String,
        coursePrice:String,
        orderId:String,     
        createDate: Date
    }),

    Note =  mongoose.model('lexue_note', noteSchema),
    Order=mongoose.model('lexue_order', orderSchema),
    Comment =  mongoose.model('lexue_comment', commentSchema),
    UserTrainingPlan =  mongoose.model('lexue_user_trainingplan', userTrainingplanSchema),
    TrainingPlan =  mongoose.model('lexue_trainingplan', trainingplanSchema),
    Questionnaire =  mongoose.model('lexue_questionnaire', questionnaireSchema),
    // QNaireQuestion =  mongoose.model('lexue_qnairequestion', qNaireQuestionSchema),
    Question =  mongoose.model('lexue_question', questionSchema),
    Site =  mongoose.model('lexue_site', siteSchema),
    User=mongoose.model('lexue_user', userSchema),
    News=mongoose.model('lexue_news', newsSchema),
    Info=mongoose.model('lexue_info', infoSchema),
    note =  new Note(init.note),
    comment = new Comment(init.comment),
    trainingplan = new TrainingPlan(init.trainingPlan)

mongoose.Promise = global.Promise
// 连接远程数据库
// var dbUrl = 'mongodb://10.10.3.120/lexuemgr'
var dbUrl = 'mongodb://127.0.0.1/lexue'
mongoose.connect(dbUrl)
mongoose.set('debug', true)



var db = mongoose.connection
db.on('error', function () {
    console.log('error')
})
db.once('open', function () {
    console.log('opened')
})

module.exports = {
    mongoose:mongoose,
    dbUrl:dbUrl,
    Note: Note,
    Comment:Comment,
    UserTrainingPlan:UserTrainingPlan,
    TrainingPlan:TrainingPlan,
    Questionnaire:Questionnaire,
    User:User,
    Info:Info,
    News:News,
    Order:Order,
    // QNaireQuestion:QNaireQuestion,
    Question:Question,
    Site:Site
}
