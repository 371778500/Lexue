<template>
    <div class ='navbar'>
        <ul class='fl'>
            <!-- 添加exact只在匹配/main时被激活. -->
                <li><router-link  to='/Main' exact><i class='iconfont icon-front'></i><span>首页</span></router-link></li>
                <li><router-link  to='/Main/choose-Lesson' ><i class='iconfont icon-chooseLesson'></i><span>选课</span></router-link></li>
                <li><router-link  to='/Main/Study' ><i class='iconfont icon-study'></i><span>学习</span></router-link></li>
                <!--<li><router-link  to='/Main/Examination'><i class='iconfont icon-test'></i><span>测评</span></router-link></li>-->
                <li><a href="javascript:void(0);"><i class='iconfont icon-test'></i><span>测评</span></a></li>
                <li><router-link  to='/Main/MySettings' ><i class='iconfont icon-my'></i><span>我的</span></router-link></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                navbar:[
                    1,2,3,4,5
                ]
            }
        }
    }
</script>
<style lang='scss'>
@import "../assets/css/function.scss";
    /*$font-size:0.6rem;*/
    $basecolor:#e83426;
.navbar ul{
    list-style: none;
    border-top:1px solid rgba(238, 238, 238, 1);
}
.navbar ul li{
     float:left;
     display:flex;
     width:3.2rem;
     justify-content: center;
     align-items: center;
     flex-flow: column wrap;
     height: 50px;
     height:2.5rem;
     a{
         color:#ccc;
         &.router-link-active{
             color:$basecolor;
         }
     }

}
.navbar ul li a{
    text-align: center;
}
.navbar ul li span{
    align-self: flex-end; 
    font-size: pxtorem(12px);
    display: block;
        
}
.navbar ul li i{
    font-size:pxtorem(16px);
}

.navbar {
    background: rgba(255, 255,255,1);
    position: fixed;
    bottom:0px;
    z-index:100;
}
.fl{
    float: left;
}
a.router-link-active{
    color:rgba(0,206,169,1);
}
</style>