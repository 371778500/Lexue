export const accounting = (value,num) =>{
    if(typeof value == 'string'){
        return parseFloat(value).toFixed(num)
    }else if(typeof value == 'undefined'){
        return 0         
    }else{
        return value.toFixed(num)
    }
    
}


/**
 * 格式化时间（***前）
 */
export const formatTime = (str)=>{
    var now = new Date().getTime(),
        oldTime = new Date(str).getTime(),
        difference = now - oldTime,
        result='',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = difference/year,
        _month =difference/month,
        _week =difference/(7*day),
        _day =difference/day,
        _hour =difference/hour,
        _min =difference/minute;
         if(_year>=1) {result= ~~(_year) + " 年前"}
    else if(_month>=1) {result= ~~(_month) + " 个月前"}
    else if(_week>=1) {result= ~~(_week) + " 周前"}
    else if(_day>=1) {result= ~~(_day) +" 天前"}
    else if(_hour>=1) {result= ~~(_hour) +" 个小时前"}
    else if(_min>=1) {result= ~~(_min) +" 分钟前"}
    else result="刚刚";
    return result;
}
/**
 * 格式化日期
 */
export const formatDate=(str)=>{
    var date = new Date(str),
        year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        result1 = [year,month,day].join('/'),
        result2 = [hour,minute].join(':'),
        result = [result1,result2].join(' ')
    return result
}

export const formatDay=(str)=>{
    var date = new Date(str),
        year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate(),
        result =[year,month,day].join('/')
    return result
}

export const getNum=(str)=>{
    var value=str.replace(/[^1-9]/ig,"")
    return value
}

export const addfu=(str)=>{
    var value='-'+str
    return value
}