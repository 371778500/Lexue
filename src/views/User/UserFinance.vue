<template>
 <div class="user-finance">
   <head-v :text="title" :bgcolor="'#e64d43'">
     <go-back slot="goback"></go-back>
   </head-v>
   <div class="head-content">
     <div class="circle" style="color:#e64d43">{{sum | accounting(1)}}</div>
     <!--<span class="deadline">有效期:{{deadline}}</span>-->
   </div>
   <div class="mid-content">
     <ul>
       <!--<li style="color:#fc515b">
           <i class="iconfont icon-myFinance" style="color:#e84c3d"></i>
         充值记录
       </li>-->
        <li style="color:#fc515b">
          <i class="iconfont icon-myFinance" style="color:rgb(37,213,185)" ></i>
          我的订单
        </li>
     </ul>
   </div>

   <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="true">
      <ul>
       <li v-for="order in orders">
          <div class="list-content">
            <p>课程名称：<span>{{order.courseName}}</span></p>
            <p>课程价格：<span>{{order.coursePrice | accounting(2)}}</span></p>
            <p>订单号：<span>{{order.orderId}}</span></p>
            <p class='last-p' style="display: block;padding-bottom: 10px">订单创建时间：<span>{{order.createDate | formatDate}}</span></p>
          </div>
       </li>
     </ul>
      <p v-show="loaded" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          {{loadText}}
      </p>
  </div>
 </div>
</template>

<script>
  import Header from '../Header.vue';
  import GoBack from '../../components/GoBack.vue';
  // import MyJSON from '../../../static/data.json';
  import { InfiniteScroll,Spinner,Toast } from 'mint-ui'
  import Vue from 'vue'
  Vue.use(InfiniteScroll);
  export default {
    data() {
      return {
        title:"我的乐学币",
        deadline:"2016-12-31",
        sum:"999",
        orders:[],
        pageSize:'10',
        pageNumber:0,
        loading:false, //true禁止无限加载
        loaded:false, //true出现加载动画
        loadText:'加载中...'
        // MyJSON:MyJSON
      };
    },
    created(){
      this.sum=JSON.parse(sessionStorage.getItem('user')).account
    },
    mounted(){
      this.getOrders().then((values)=>{
                console.log(values)
                this.orders.push(...values.data)
            }) 
    },
    methods:{
        getOrders(){
            var userId=JSON.parse(window.sessionStorage.user).userId;
            var param={userId:userId,pageNumber:this.pageNumber,pageSize:this.pageSize};
            return this.$http.post('/app/getUserOrder',param).then((res)=>{
                console.log(res)
                return res.data.data?res.data:JSON.parse(res.data)
            })
        },
        loadMore(){
            this.loading=true
            this.loaded=true
            this.pageNumber++
            setTimeout(()=>{
                this.getOrders().then((values)=>{
                    if(values.data.length==0){
                        this.loading=true
                        let instance=Toast('无更多记录')
                        setTimeout(() => {
                            instance.close()
                        }, 1000)
                    }else{
                        this.loading=false
                        this.orders.push(...values.data)
                    }
                    this.loaded=false
                })
            },1000)
        }
    },
    components:{
      HeadV:Header,
      GoBack,
      mtSpinner:Spinner
    }
  };
</script>

<style lang="scss">
  $basecolor:#e84c3d;
  @import "../../assets/css/function.scss";
  .page-infinite-loading{
      text-align: center;
      height:pxtorem(50px);
      line-height:pxtorem(50px);
      font-size:pxtorem(16px);
      div {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
      }
  }
  .user-finance{
    width: 100%;
    margin-bottom: pxtorem(60px);
    .head-content{
      position: relative;
      background-color: $basecolor;
      padding: pxToRem(19px) 0 pxtorem(19px) 0;
      .circle{
        width: pxtorem(85px);
        height: pxtorem(85px);
        margin: 0 auto;
        line-height: pxtorem(85px);
        text-align: center;
        border-radius: 50%;
        background: #feebab;
      }
      .deadline{
        position: absolute;
        right: pxtorem(16px);
        bottom: pxtorem(14px);
        font-size: pxtorem(12px);
        color: white;
      }

    }
    .mid-content{
      margin-top: pxtorem(10px);
      width: 100%;
      background: white;
      ul{
        overflow: hidden;
        padding: pxtorem(13px) 0 pxtorem(13px) 0;
        font-size: pxtorem(18px);
        li{
          width: 49%;
          float: left;
          list-style: none;
          border-right: 1px solid #ccc;
          i{
            position: relative;
            top: pxtorem(3px);
            padding:0 pxtorem(5px) 0 pxtorem(24px);
            font-size: pxtorem(26px);
          }

        }
        li:last-child{
          border-right: none;
          p{
            font-size: pxtorem(16px);
          }

        }

      }
    }
    .list-content{
      margin-top: 10px;
      background: white;
      p{
          margin-left:pxtorem(25px);
          margin-top:pxtorem(6px);
          font-size:pxtorem(14px);
          .last-p{
              display: block;
              padding-bottom: 10px;
          }
          span{
              font-size:pxtorem(14px);
              color:#666;
          }
      }
      ul{
        padding: 0;
        li{
          padding:12px  15px 11px 17px;
          border-bottom: 1px solid #ccc;
          
          span{
            font-size: pxtorem(12px);
          }
          .record-time{
            position: relative;
            left: 60%;
          }
        }
        li:last-child{
          list-style: none;
          border-bottom: none;

        }
      }
    }

  }

</style>
