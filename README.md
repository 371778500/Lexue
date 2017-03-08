# Lexue
说明

乐学网主要是由vuejs纯前端项目（SPA）转变而来，由于业务需要，南京接口不能满足当前功能实现，于是添加了nodejs作为服务端。该系统主要技术由webpack(打包构建)+vuejs(前端视图层)+nodejs(后端中间件)+express(web服务层)+mongodb(数据访问层)实现，下面简单结合项目讲解一下相关技术。
项目图解

 
具体实现
前端（vuejs）

这里不属于后端，不做详解。理解好MVVM双向数据绑定,结合官方文档（https://cn.vuejs.org/v2/guide/），理解相关组件的使用即可。
后端服务层（nodejs）

nodejs是一门服务端语言，作为java开发的，可以理解为Servlet。vuejs就相当于jsp/html.我们一般把它作为整个系统运行的容器。例如，开启服务：
操作
命令
开启服务
node build/dev-server.js
这里的dev-server.js就是开发模式的启动方式，假设后期需要打包发布成产品，需要执行node build/build.js。本项目涉及到node原生API操作的地方不多。若想深入理解，请参看官方文档。
web服务层（express）

express作为web层，相当于java中使用Spring MVC类似。
 
这个是整个APP开始的实例。由express代理。
重点：URL地址拦截，类似Spring中@requestMapping注解
 
 
全局的API主要在server目录下的api.js
下面讲解一个示例：新增笔记
// 新增笔记
router.post('/app/saveNote', function (req, res, next) {
//post即为post请求，router.post(path, callback [, callback ...])
    var userId = req.body.userId,//这是取出请求参数
        courseId=req.body.courseId,
        noteContent=req.body.noteContent,
        picIds = req.body['picIds[]'];
        resBody = {code:0,msg:'新增成功！'}
        console.log('picIds='+picIds);
        console.log('userId='+userId);
        console.log('courseId='+courseId);
        var newNote = new db.Note({//db.Note可以理解为Note表。
                  userId: userId,
                  courseId:courseId,
                  noteContent: noteContent,
                  createDate:new Date(),
                  picIds:[{}]
              })
        if(Array.isArray(picIds)){
            for(var i=0;i<picIds.length;i++){
                var picId={}
                picId.picId=picIds[i];
                newNote.picIds[i]=picId;
            }
        }else{
            newNote.picIds[0].picId=picIds;
        }
        newNote.save(function (err) {//保存方法
            if (err){
              resBody.code=1;
              resBody.msg=err;
              return console.log(err)
            }
        })
    res.send(resBody);//返回请求体
})
前端调用
var url = "/app/saveNote"
var data = {userId:window.localStorage.UserInfo,courseId:this.$route.params.id,noteContent:content,picIds:this.imagesID}
// this.$http指代vue-resourse发送的post请求。
                    this.$http.post(url,data).then((res)=>{
                        console.log(res)
                        if(res.statusText=='OK'){
                            let instance = Toast("保存成功")
                            setTimeout(() => {
                                this.$router.go(-1);
                                instance.close()
                            }, 1000)
                        }else{
                         //请求失败
                        }
                    })
 
数据访问层（mongodb）

数据库我们使用的是mongodb,驱动为mongoose。类似与mysql与mysql-jdbc.jar的关系。但是mongodb为NoSql。非关系型数据库。下面讲解具体的建表，操作表。（其实mongodb中不是表的概念，而是collection—文档集合，这里我们用类比的方法去理解）
//引入驱动
 
1.建表（笔记）
 
前面为字段名，后面为类型。
下面列一下常用的类型
 
指定表名
 
提供外部操作入口
 
2.增删改查操作基本方法（类似于jpa）
①新增Model#save([fn])
 
②删除Model.findByIdAndRemove(id, [options], [callback])
 
③更新Model.findOneAndUpdate([conditions], [update], [options], [callback])
 
④查询Model.find(conditions, [fields], [options], [callback])

