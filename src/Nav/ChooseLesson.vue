<template>
    <div class="choose-lesson">
        <!--this is ChooseLesson.html!-->
        <div class="fixedbar">
        <head-v text="选课">
            <!--<div slot='search' class="search-control">
                <span><i class="icon-search"></i></span>
                <input type="text" name="search" class="search-input" placeholder="请输入课程名称进行搜索">
            </div>
            <go-back slot="goback"></go-back>-->
        </head-v>

        <div class="nav-list">
            <ul class="dropdown" >
                <li class="drop-down-title" v-for="(todo,index) in todos" tabindex="-1" @click="dropdown(index)">
                    {{todo.text}}
                    <span><i class="icon-angle-down" v-show="index<2"></i><i class="icon-angle-right" v-show="index==2"></span>
                    <div class="drop-down-list" v-show = todo.flag>
                        <ul>
                            <li :class = "[ search[todo.id] == type.TYPEID ? 'active' : '']" v-for="type in todo.items" :id='type.TYPEID' @click="toggle(todo.text,type.TYPEID,$event)">
                                {{type.TYPENAME}}
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        </div>
        <div class="course-list"> 
            <!--<ul  
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="1000"
            infinite-scroll-immediate-check='!loading'>
                <li v-for="(courseinfo,index) in allCourse">
                    <cou-info :index= 'index' :src="courseinfo.picUrl" :courseName="courseinfo.goodsName" :oldPrice="courseinfo.primeCost" :newPrice="courseinfo.preferentialPrice" :to="courseinfo.to"></cou-info>
                </li>
            </ul>-->
            <ul style="{height:wrapperHeight + 'px''}" ref ='wrapper'>
                <loadmore :autoFill='false' :bottom-method = 'loadBottom' @bottom-status-change = 'handleBottomChange' :bottom-all-loaded = 'allLoaded' ref='loadmore1'>
                <li v-for="(courseinfo,index) in allCourse">
                    <cou-info :index= 'courseinfo.lessonID' :src="courseinfo.picUrl" :courseName="courseinfo.goodsName" :oldPrice="courseinfo.primeCost" :newPrice="courseinfo.preferentialPrice" :to="courseinfo.goodsID"></cou-info>
                </li>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span  v-show = 'bottomStatus === "pull"' >↑</span>
                    <span  v-show = 'bottomStatus === "drop"' >↓</span>
                    <span class='fixed' v-show = 'bottomStatus === "loading" '>
                        <spinner></spinner>
                    </span>
                </div>
                </loadmore>  
            </ul>    
           
        </div>
            <back-top></back-top>
        </div>
    </template>
    <script>
        /*ChooseLesson.vue*/
        import Header from '../Header.vue'
        import CourseInfo from '../CourseInfo.vue'
        import GoBack from '../../components/GoBack.vue'
        import BackTop from '../../components/BackTop.vue'
        import { InfiniteScroll } from 'mint-ui'
        import 'mint-ui/lib/indicator/style.css'
        import { Indicator } from 'mint-ui'
        import Vue from 'vue'
        Vue.use(InfiniteScroll)
        import { Loadmore,Spinner } from 'mint-ui'
        export default{
            data:function(){
                return{
                loading:false,
                allLoaded:false,
                allType:[],
                allCourse:[],
                bottomStatus:'',
                pageSize:20,
                pageIndex:1,
                user:window.localStorage.UserInfo,
                search:{},
                wrapperHeight:0,
                todos:[
                    {text:"领域",id:"field",flag:false,items:[]},
                    {text:"产品线",id:"productLine",flag:false,items:[]},
                    {text:"证书",id:"certificate",flag:false,items:[]}
                ],
            }
        },
        created(){
            console.log("created")
        },
        mounted(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'snake'
            });
             this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
             Promise.all([this.getAllTypes(),this.getAllCourse()]).then((values)=>{
                this.allType = values[0]
                this.allCourse = values[1]
                console.log(values)
                this.todos.map(todo=>{
                    if(todo.text == "领域"){
                        this.getField.splice(1,2);
                        todo.items = this.getField;
                    }
                    if(todo.text == "产品线"){
                        todo.items = this.getProductLine;
                    }
                })
                Indicator.close();
            })  
        },
        methods:{
            toggle:function(parentType,typeid,e){
                 console.log(parentType,typeid);
                 switch(parentType){
                     case "领域":
                     typeid != this.search['field'] ? this.search['field'] = typeid : this.search['field'] = '' ;
                     break;
                     case "产品线":
                     typeid != this.search['productLine'] ? this.search['productLine'] = typeid : this.search['productLine'] = '' ;
                     break;
                     case "证书":
                     typeid != this.search['certificate'] ? this.search['certificate'] = typeid : this.search['certificate'] = '';
                     break;
                 }  
                 // 做这部操作的时候需要将pageSize和pageIndex回复初始状态。
                 this.pageSize = 20
                 this.pageIndex = 1
                 this.getAllCourse().then(allCourse =>this.allCourse = allCourse)
            },
            getAllTypes(){
                const getAllType = this.$store.state.api.allTypes;
                return this.$http.post(getAllType).then((res)=>{    
                    return res.json()
                }).catch(e=>console.log(e,'2')).then((json) =>{ 
                    let allType = []
                    if(json.status != 'false'){
                        allType = json.allType
                    }
                    return allType;
                }).catch(e=>console.log(e,'4'))
            },
            getAllCourse(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                const allCourse = this.$store.state.api.allCourse 
                 return this.$http.get(allCourse,{
                     params:{
                         user : this.user,
                         pageSize : this.pageSize,
                         pageIndex : this.pageIndex,
                         ly : this.search['field'],
                         cpx : this.search['productLine'],
                         certificate : this.search['certificate']
                     }
                 }).then(res=>{
                    return res.json()
                }).then(json=>{
                    let allLessons = []
                    if(json.status != 'false'){
                        Indicator.close();
                        allLessons = json.allLessons;
                    }
                    return allLessons;
                })
            },
            loadMore(){
                this.loading = true;
                this.pageIndex ++ ;
                //将取得的数据push到allCourse中。
                // Promise.all([this.getAllCourse()]).then(values =>{
                //     this.allCourse.push(...values[0])
                //     this.loading = false ;
                // })
                setTimeout(()=>{
                    this.getAllCourse().then(allCourse =>{
                        // 对每次取出的数据进行判断。
                        if(allCourse.length === 0){
                            console.log("没有更多数据")
                        }else{
                            this.allCourse.push(...allCourse)
                        }
                        this.loading = false
                    })
                },1000) 
            },
            loadBottom(id){
                this.pageIndex ++ ;
                setTimeout(()=>{
                    this.getAllCourse().then(allCourse =>{
                        // 对每次取出的数据进行判断。
                        if(allCourse.length === 0){
                            console.log("没有更多数据")
                            this.allLoaded = true 
                        }else{
                            console.log('this allCourse',allCourse,)
                            this.allCourse.push(...allCourse)
                        } 
                    })
                },0)
                this.$refs.loadmore1.onBottomLoaded(id)
            },
            handleBottomChange(status){
                this.bottomStatus = status
            },
            dropdown(index){
                for(var i=0;i<2;i++){
                    if(i==index&&this.todos[i].flag==false){
                        this.todos[i].flag=true
                        document.body.style.overflow='hidden'
                    }else{
                        this.todos[i].flag=false
                    }
                }
                if(this.todos[0].flag==false&&this.todos[1].flag==false){
                    document.body.style.overflow='auto'
                }
                if(index==2){
                    this.$router.push('/certificate')
                }
            }
        },
        computed:{
            // getField()
            getField(){
                // 取得领域的种类
                return this.allType.filter(type=>type.TYPEPID == "72")
            },
            getProductLine(){
                //取得产品线
                return this.allType.filter(type=>type.TYPEPID == "10")
            },
        },
        components:{
            HeadV:Header,
            CouInfo:CourseInfo,
            GoBack,
            BackTop,
            Loadmore,
            Spinner
        }
    }
</script>
<style lang="scss">
    /*ChooseLesson.vue*/
    @import "../../assets/css/function.scss";
    .choose-lesson{
        .mint-loadmore-bottom {
            span{
                display:inline-block;
                transition:.2s linear;
                vertical-align:center;
            }
        }
        
        .fixedbar{
            position:fixed;
            width:pxToRem(320px);
            z-index:2;
            top:0;
        }
        .search-control{
                height:100%;
                display:flex;
                justify-content:center;
                align-items:center;
            .search-input{
                width:pxToRem(200px);
                height:pxToRem(25px);
                max-height:25px;
                line-height:pxtorem(25px);
                border-radius:pxToRem(15px);
                padding-left:pxToRem(25px);
                outline:none;
                border:none;
                color:#999;
                font-size:12px;
            }
            span{
                position:absolute;
                left:pxToRem(55px);
                height:100%;
                display:flex;
                justify-content:center;
                align-items:center;
                color:#e84c3d;
                font-size:14px;
            }
        }
        .nav-list{
            background:#fff;
            .dropdown{
                overflow:hidden;
                height:pxToRem(20px);
                max-height:60px;
                width:100%;
                padding-top:pxtorem(15px);
                padding-bottom:pxtorem(15px);
                /*display:flex;
                justify-content:center;
                align-items:center;*/
                font-size:18px;
                .drop-down-title{
                    float:left;
                    list-style:none;
                    font-size:16px;
                    font-family:"微软雅黑";
                    width:pxToRem(106px);
                    text-align:center;
                    border-right:1px solid #ccc;
                    span{
                        margin-left:pxToRem(5px);
                        .icon-angle-down{
                            color:#333;
                        }
                    }
                    .drop-down-list{
                        position:absolute;
                        width:pxToRem(106px);
                        padding-top:5px;
                        z-index:999;
                        ul{
                            background:rgba(255,255,255,0.9);
                            max-height: pxtorem(260px);
                            overflow-x:hidden; 
                            overflow-y:scroll;
                            li{
                                list-style:none;
                                padding:5px;
                                &.active{
                                    background:#e84c3d;
                                }
                            }
                        }
                    }                    
                }
                .drop-down-title:focus{
                    outline:none;
                }
                li:last-child{
                    border-right:none;
                }
            }
        }
        .course-list{
            overflow:hidden;
            padding-bottom:pxToRem(60px);
            margin-top:pxToRem(104px);
            ul{
                overflow:hidden;
                background:#fff;
                li{                    
                    list-style:none;
                }
            }
        }
    }
</style>