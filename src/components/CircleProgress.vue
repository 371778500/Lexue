<template>
    <div class="circle-progress">
		<div class="circleProgress_wrapper" :id="id">
		        <div class="wrapper right">
		            <div class="circleProgress rightcircle" :class="[percent==100?'passright':'']"></div>
		        </div>
		        <div class="wrapper left">
		            <div class="circleProgress leftcircle" :class="[percent==100?'passleft':'']"></div>
		        </div>
		        <div class="progress">{{percent?percent:'0'}}%</div>
		 </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        props:["percent","id"],
        computed:{
            progress(){
                return this.percent
            }
        },
        updated(){
                $("#"+this.id+" .rightcircle").css("transform","rotate("+"-135"+"deg)")
                $("#"+this.id+" .leftcircle").css("transform","rotate("+"-135"+"deg)")
                var progress = this.progress*3.6
                if(progress<=180){
                    $("#"+this.id+" .rightcircle").css("transform","rotate("+(progress-135)+"deg)")
                }else{
                    $("#"+this.id+" .rightcircle").css("transform","rotate(45deg)")
                    $("#"+this.id+" .leftcircle").css("transform","rotate("+(progress + 45)+"deg)")
                    if(this.percent==100){
                        $("#"+this.id+" .rightcircle").css("border","3px solid #25d5b9");
                        $("#"+this.id+" .leftcircle").css("border","3px solid #25d5b9")
                    }
                }
            
        }
    }
</script>
<style lang="scss">
    @import "../assets/css/function.scss";
    $progresscolor : #ff4f57;
    $passcolor : #25d5b9;
    .circle-progress{
         overflow:hidden;
         .circleProgress_wrapper{
            float:left;
            width: pxtorem(80px);
            height: pxtorem(80px);
            position: relative;
        }
        .wrapper{
            width: pxtorem(40px);
            height: pxtorem(80px);
            position: absolute;
            top:0;
            overflow: hidden;
        }
        .right{
            right:0;
        }
        .left{
            left:0;
        }
        .circleProgress{
            width: pxtorem(75.1px);
            height: pxtorem(75.1px);
            border:pxtorem(3px) solid #fff;
            border-radius: 50%;
            position: absolute;
            top:0;
            transform: rotate(-135deg);
        }
        .rightcircle{
            border-top:pxtorem(3px) solid $progresscolor;
            border-right:pxtorem(3px) solid $progresscolor;
            right:0;
            transform: rotate(-135deg);
        }
        .passright{
            border-bottom:pxtorem(3px) solid $passcolor;
            border-left:pxtorem(3px) solid $passcolor;
        }
        .leftcircle{
            border-bottom:pxtorem(3px) solid $progresscolor;
            border-left:pxtorem(3px) solid $progresscolor;
            left:0;
            transform: rotate(-135deg);
        }
        .passleft{
            border-top:pxtorem(3px) solid $passcolor;
            border-right:pxtorem(3px) solid $passcolor;
        }
        .progress{
        	position:absolute;
        	width: pxtorem(80px);
        	height:pxtorem(80px);
        	display: flex;
        	align-items: center;
        	justify-content: center;
        	font-size:pxtorem(18px);
        	color:white ;
        	font-family: "微软雅黑";
        }
    }
</style>