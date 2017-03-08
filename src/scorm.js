//http://www.iscorm.cn/post/152.html
//http://blog.163.com/jihanfen@126/blog/static/144013227201032910222672/

//cmi.core.lesson_staus
//passed （通过）  
//completed （已完成）  
//browsed （浏览）  
//incomplete （非完成）  
//failed （失败）  
//not attempted （未尝试）  

var plmscontrol;
var _time = 0;
var _location = '';
var _status   = '';
var _data     = '';
var _nowtime  = Date();

function LMSControlCenter()
{
    this.PTimeStart="";
    this.PTimeSession="";
    this.PTimeTotal="";
    this.PEntry="";
    this.PScore="";
    this.PScoreRaw="";
    this.PCredit="";
    this.PLastSCOID="";
    this.PLessonLocation="";
    this.PLessonStatus="not attempted";
    this.PLessonMode="";
    this.PLessonExit="";
    this.PSuspendData="";
}

function eventnone()
{
    window.event.cancelBubble=true;
    window.event._returnValue=false;
    return false;
}

function initevent()
{
    document.oncontextmenu=eventnone;
    document.onkeypress=eventnone;
    document.onkeydown=eventnone;
    document.onkeyup=eventnone;
    document.body.onkeypress=eventnone;
    document.body.onkeydown=eventnone;
    document.body.onkeyup=eventnone;
}

function init(o)
{
    initevent();
    plmscontrol = new LMSControlCenter();
    API = new APIObject();
}

function closewindow()
{
    window.opener= null;
    window.open("", "_self");
    window.close();
}

function APIObject()
{
    this.LMSInitialize = LMSInitialize;
    this.LMSSetValue = LMSSetValue;
    this.LMSGetValue = LMSGetValue;
    this.LMSCommit = LMSCommit;
    this.LMSFinish = LMSFinish;
    this.LMSGetLastError = LMSGetLastError;
    this.LMSGetErrorString = LMSGetErrorString;
    this.LMSGetDiagnostic = LMSGetDiagnostic;
}

//LMSInitialize负责启动SCO，当学习者进入开始阅读一个SCO时，SCO第一步就是先要呼叫LMSInitialize，
//LMSInitialize function判断该学员之上课记录，当学员第一次阅读该门课的该SCO时，
//LMSInitialize就会将设定初值至相关的环境变量；若学习者并不是第一次阅读该SCO，
//LMSInitialize则必须将该学习者之前的上课记录取出，并存入环境变量中，如此即完成启动SCO之动作。
function LMSInitialize(value)
{
//    if(_data !='')
//      {
//        alert('上次播放时间：'+_data);
//        LMSSetValue('cmi.core.session_time',_data)
//      } 
////      LMSSetValue('cmi.suspend_data',_data)
//   
//    if(_location !='')
//    {
//      alert('上次播放地址：'+_location);
//      LMSSetValue('cmi.core.lesson_location',_location)
//     }
//    LMSSetValue('cmi.core.lesson_status',plmscontrol.PLessonStatus)
    //LMSSetValue('cmi.core.lesson_location',4)
         $.post(
        "Scorm_Ajax.aspx",
        {Action:"post",course_id:course_id,courseware_id:courseware_id,func:"SetTime"},
        function(a,textStatus)
        {   
            if(a=='NO')
            {}
            else
            {
               // alert(a);
              LMSSetValue('cmi.suspend_data',a)
            }
        },
        "html"
    );
    //LMSSetValue('cmi.core.lesson_staus','completed')
    return 'true';
}

//在LMSSetValue是相当复杂的Function，负责储存所有相关的学习记录，当SCO呼叫欲将某个data model回存时，
//LMSSetValue第一步先判断所欲回存之data model，判断该data model是否可以set(写入)，
//其次判断其型别，当型别错误时，记录其Error Code，当型别检查通过时，则依SCORM 1.2 RTE所订定该data model的处理规则，并将数据存入内存中。
function LMSSetValue(name, value)
{
    switch(name)
    {
        case "cmi.core.student_id":
            plmscontrol.PStudentId=value;
            break;
        case "cmi.core.student_name":
            plmscontrol.PStudentName=value;
            break;
        case "cmi.core.lesson_location":
            plmscontrol.PLessonLocation=value;
            break;
        case "cmi.core.credit":
            plmscontrol.PCredit=value;
            break;
        case "cmi.core.lesson_status":
            if(plmscontrol.PLessonStatus!="completed") plmscontrol.PLessonStatus=value;
            break;
        case "cmi.core.entry":
            plmscontrol.PEntry=value;
            break;
        case "cmi.core.score":
            plmscontrol.PScore=value;
            break;
        case "cmi.core.score.raw":
            plmscontrol.PScoreRaw=value;
            break;
        case "cmi.core.total_time":
            plmscontrol.PTimeTotal=value;
            break;
        case "cmi.core.lesson_mode":
            plmscontrol.PLessonMode=value;
            break;
        case "cmi.core.exit":
            plmscontrol.PLessonExit=value;
            break;
        case "cmi.core.session_time":
            plmscontrol.PTimeSession=value;
            break;
        case "cmi.suspend_data":
            plmscontrol.PSuspendData=value;
            break;
        default:
            break; 
    }
    return "";
}

//LMSGetValue主要负责将数据由LMS取出，当SCO呼叫LMSGetValue时，LMSSetValue会先判断data model是否可以读取，
//若不可读取，则写入其错误代码；若该data model是可以读取，则进取出其值并回传给SCO。但在设计时，
//如同LMSSetValue并没有直接和receiver相连，所以是将数据由暂存的内存中取出。
function LMSGetValue(name)
{
    var _returnValue="";
    switch(name)
    {
        case "cmi.core.student_id":
            _returnValue = plmscontrol.PStudendId;
            break;
        case "cmi.core.student_name":
            _returnValue = plmscontrol.PStudendName;
            break;
        case "cmi.core.lesson_location":
            _returnValue = plmscontrol.PLessonLocation;
            break;
        case "cmi.core.credit":
            _returnValue = plmscontrol.PCredit;
            break;
        case "cmi.core.lesson_status":
            _returnValue = plmscontrol.PLessonStatus;
            break;
        case "cmi.core.entry":
            _returnValue = plmscontrol.PEntry;
            break;
        case "cmi.core.score":
            _returnValue = plmscontrol.PScore;
            break;
        case "cmi.core.score.raw":
            _returnValue = plmscontrol.PScoreRaw;
            break;
        case "cmi.core.total_time":
            _returnValue = plmscontrol.PTimeTotal;
            break;
        case "cmi.core.lesson_mode":
            _returnValue = plmscontrol.PLessonMode;
            break;
        case "cmi.core.exit":
            _returnValue = plmscontrol.PExit;
            break;
        case "cmi.core.session_time":
            _returnValue = plmscontrol.PTimeSession;
            break;
        case "cmi.suspend_data":
            _returnValue = plmscontrol.PSuspendData;
            break;
        default:
            _returnValue = "";
            break; 
    }
    return _returnValue;
}

//相较于LMSSetValue和LMSGetValue，LMSCommit可以说简单多了，其主要负责将所有暂存在内存中的学习记录，
//回存到LMS，在设计时应用了XMLHTTP之技术，所以当LMSCommit被呼叫时，会将所有之暂存数据组成XML文件，
//再应用XMLHTTP对象将数据POST到Receiver，当Receiver收到这个Request时，就会解译所传入之XML文件，再将XML文件中的数据直接存入数据库中。 
function LMSCommit(value)
{
    return 'true';
}

//当学习者阅读完并要离开一个SCO时，在结束时SCO便会将呼叫LMSFinish，
//LMSFinish主要负责将环境变量重设，并判断该SCO是否在结束之前己经有呼叫LMSCommit
//将所有记录回存至LMS，若尚未储存，则会自动呼叫将所有学习者在该SCO的上课记录回存。
function LMSFinish(value)
{
    _time = LMSGetValue('cmi.core.total_time')
    _location = LMSGetValue('cmi.core.lesson_location')
    _status = LMSGetValue('cmi.core.lesson_status')
//  _data = LMSGetValue('cmi.suspend_data')
    _data = LMSGetValue('cmi.core.session_time')
    _Recard = LMSGetValue('cmi.suspend_data')
    
    //alert('本次播放长度为：'+_data);
    //alert('本次播放地址为：'+_location);
    var str = '';

    str += '参数：cmi.core.student_id        值：'+ LMSGetValue('cmi.core.student_id')
    str += '\r';
    str += '参数：cmi.core.student_name      值：'+ LMSGetValue('cmi.core.total_time')
    str += '\r';
    str += '参数：cmi.core.lesson_location   值：'+ LMSGetValue('cmi.core.lesson_location')
    str += '\r';
    str += '参数：cmi.core.credit            值：'+ LMSGetValue('cmi.core.credit')
    str += '\r';
    str += '参数：cmi.core.lesson_status     值：'+ LMSGetValue('cmi.core.lesson_status')
    str += '\r';
    str += '参数：cmi.core.entry             值：'+ LMSGetValue('cmi.core.entry')
    str += '\r';
    str += '参数：cmi.core.score             值：'+ LMSGetValue('cmi.core.score')
    str += '\r';
    str += '参数：cmi.core.score.raw         值：'+ LMSGetValue('cmi.core.score.raw')
    str += '\r';
    str += '参数：cmi.core.total_time        值：'+ LMSGetValue('cmi.core.total_time')
    str += '\r';
    str += '参数：cmi.core.lesson_mode       值：'+ LMSGetValue('cmi.core.lesson_mode')
    str += '\r';
    str += '参数：cmi.core.exit              值：'+ LMSGetValue('cmi.core.exit')
    str += '\r';
    str += '参数：cmi.core.session_time      值：'+ LMSGetValue('cmi.core.session_time')
    str += '\r';
    str += '参数：cmi.suspend_data           值：'+ LMSGetValue('cmi.suspend_data')
    str += '\r';

    
    //window.document.write(str);

    if(_location=='') _location = '123';
    
//      $.post(
//        "Scorm_Ajax.aspx",
//        {Action:"post",_location:_location,_status:_status,_nowtime:_nowtime,_data:_data,course_id:course_id,courseware_id:courseware_id,_Recard:_Recard,func:"setFile"},
//        function(data,textStatus)
//        {   
//        
//        },
//        "html"
//    );
     thisValue =  _location + "|" +_status + "|" +_nowtime + "|" +_data + "|" +course_id + "|" +courseware_id + "|" +_Recard;
//    //location.href = "Scorm_Ajax.aspx?_location=" + _location + "&_status=" + _status + "&_nowtime=" + _nowtime+ "&_data=" + _data+'&course_id='+course_id +'&courseware_id='+courseware_id;
    //closewindow();
    return 'true';
}




//该函数将返回一个错误代码，每次API function呼叫后，该函数的值将被重置。（LMSGetErrorString及LMSGetDiagnostic除外）。
function LMSGetLastError()
{
    return "0";
}

function LMSGetErrorString(value)
{
    var _returnValue="";
    switch(value)
    {
        case "0":
            _returnValue="";
            break;
        default:
            _returnValue="未知错误！";
            break;
    }
    return _returnValue;
}

function LMSGetDiagnostic(value)
{
    switch(value)
    {
        case "0":
            _returnValue="";
            break;
        default:
            _returnValue="未知错误！";
            break;
    }
    return _returnValue;
    
    
    
}