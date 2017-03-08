// type Array<RouterConfig>
// declare type RouteConfig = {
//   path: string;
//   component?: Component;
//   name?: string; // for named routes (命名路由)
//   components?: { [name: string]: Component }; // for named views (命名视图组件)
//   redirect?: string | Location | Function;
//   alias?: string | Array<string>;
//   children?: Array<RouteConfig>; // for nested routes
//   beforeEnter?: (route: Route, redirect: Function, next: Function) => void;
//   meta?: any;
// }


 export const routes = [

    //  { path: '/', component:"" },
    { path: '/', component: require('./views/Bg.vue')},
    //  { path: '/bg', component: require('./views/Bg.vue')},
    { path: '/Login', component: require('./views/Login.vue')},
    { path: '/MgrLogin', component: require('./views/Mgr/Login.vue')},
    { path: '/Home', name: '问卷管理',component: require('./views/Mgr/Home.vue'),
        children: [
            { path : '/qrcodeTable',name:'站点列表',component: require('./views/Mgr/SiteMgr/QrcodeTable.vue')},
            { path : '/genQrcode',name:'生成访问二维码',component: require('./views/Mgr/SiteMgr/QrcodePage.vue')},
            { path : '/questionTable',name:'问卷题库',component: require('./views/Mgr/QuestionNaireMgr/QuestionTable.vue')},
            { path : '/questionNaireTable',name:'问卷列表',component: require('./views/Mgr/QuestionNaireMgr/QuestionnaireTable.vue')},
            { path : '/questionNaireTable/add',name:'新增问卷',component: require('./views/Mgr/QuestionNaireMgr/QuestionnairePage.vue')}
        ]
    },
     { path: '/AdminLogin', component: require('./views/AdminLogin.vue')},
     { path: '/Main', component: require('./views/Main.vue'),
        children: [
            { path : '',component: require('./views/Nav/FrontIndex.vue')},
            { path : 'choose-Lesson',component: require('./views/Nav/ChooseLesson.vue')},
            { path : 'Study',component: require('./views/Nav/Study.vue')},
            { path : 'examination',component: require('./views/Nav/Examination.vue')},
            { path : 'mySettings',component: require('./views/Nav/MySettings.vue')},
        ]
    },
    { path: '/news',component:require('./views/Detail/InfoListView.vue'),
        children: [
            { path: '',component: require('./views/Detail/InfoList.vue'),},
            { path: '/newsid/:id',component: require('./views/Detail/InfoNews.vue')}
        ]
    },
    { path: '/notice',component:require('./views/Detail/NoticeListView.vue')},
    { path: '/signin',component:require('./views/Detail/SignInView.vue')},
    { path: '/training',component:require('./views/Detail/TrainingList.vue')},
    { path: '/training/:id',component:require('./views/Detail/TrainingListView.vue')},
    { path: '/trainingcancel/:id',component:require('./views/Detail/TrainingCancel.vue')},
    { path: '/trainingcheckin/:id',component:require('./views/Detail/TrainingCheckIn.vue')},
    { path: '/certificate',component:require('./views/Detail/CertificateList.vue')},
    { path: '/certificate/:id',component:require('./views/Detail/CertificateListView.vue')},
    { path: '/applycert/:id',component:require('./views/Detail/ApplyCert.vue')},,
    { path: '/Main/choose-Lesson/lesson/:id/:lesson',component: require('./views/LessonDetailView.vue')},
    { path: '/apply/:id',component: require('./views/ApplyLesson.vue')},
    { path: '/Test', component: require('./views/Test.vue')},
    { path: '/CheckIn', component: require('./views/Detail/checkInCourse.vue')},
    { path: '/QRcodeSignin/:id', component: require('./views/QRcodeSignin.vue')},
    { path: '/userinfo',component:require('./views/User/UserInfo.vue')},
    { path: '/usergrade',component:require('./views/User/UserGrade.vue')},
    { path:'/userfinance',component:require('./views/User/UserFinance.vue')},
    { path:'/userorder',component:require('./views/User/UserOrder')},
    { path:'/usercert/:id',component:require('./views/User/UserCert')},
    // { path: '/Main/Study/:id',component: ''},
    { path: '/userpractice',component:require('./views/User/UserPractice.vue')},
    { path: '/usersetting',component:require('./views/User/UserSetting.vue')},
    { path: '/offlinestudy',component:require('./views/User/OfflineStudy.vue')},
    { path: '/studydetail/:id',component:require('./views/StudyDetail.vue'),
        children:[
            { path:'',component:require('./views/Study/Particular.vue')},
            { path:'/studydetail/content/:id',component:require('./views/Study/Content.vue')},
            { path:'/studydetail/note/:id',component:require('./views/Study/Note.vue')},
            { path:'/studydetail/evaluation/:id',component:require('./views/Study/Evaluation.vue')},
        ]
    },
    { path: '/takenote/:id',component:require('./views/Study/TakeNote.vue') },
    { path: '/takeevaluation/:id',component:require('./views/Study/TakeEvaluation.vue') },
    { path: '/videoplay/:id',component:require('./views/VideoPlay.vue')},
    { path: '/managesystem',component:require('./views/Management/ManageSystem.vue')},
    { path: '/managesystem/publishtrain',component:require('./views/Management/PublishTrain.vue')},
    { path: '/managesystem/trainning',component:require('./views/Management/TrainingPlanList.vue')},
    { path: '/managesystem/signinsum',component:require('./views/Management/SigninSummary.vue')},
    { path: '/managesystem/SigninList/:id',component:require('./views/Management/SigninList.vue')},
    { path: '/managesystem/trainning/map',component:require('./views/Management/Map.vue')},
    { path: '/managesystem/trainning/:id',component:require('./views/Management/TrainingPlanDetail.vue')},
    { path: '/videoDemo',component:require('./views/videoDemo.vue')},
    //  { path: '/parent', component: require('./views/Parent.vue'),
    //    children: [
    //     { path: '', component:  require('./views/Default.vue') },
    //     { path: 'foo', component:  require('./views/Foo.vue') },
    //     { path: 'bar', component:  require('./views/Bar.vue') },
    //     ]
    // },
     { path : '*', component : require('./views/Notfound')}
 ]

