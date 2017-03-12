var express = require('express');
var router = express.Router();
var db = require('./db');
//生成二维码
var qr_image = require('qr-image');
//文件系统
var Grid = require('gridfs-stream');
var gfs=Grid(db.mongoose.connection.db, db.mongoose.mongo);
var Busboy = require('busboy'); 
var path = require('../static/default_site_info.json');
var fs = require("fs"); 

 
//请求get方法
var http = require('http');
var qs = require('querystring');
var remote_site = require('../static/remote_site_info.json'); 

router.post('/app/uploadImg1', function(req, res) {
console.log(req.body, req.files);

})

// 保存用户
router.post('/app/saveUser', function (req, res, next) {
   var userId=req.body.userId,
       userName=req.body.userName,
       status=req.body.status,
        nickName=req.body.nickName,
        cnName=req.body.cnName,
        sex=req.body.sex,
        depName=req.body.depName,
        pName=req.body.pName,
        roleName=req.body.roleName,
        email=req.body.email,
        pic=req.body.pic,
        account=req.body.account,
       resBody ={code:0,msg:'保存用户成功！'}
      db.User.findOne({userId:userId}, function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (!doc) {//判断该用户是否存在用户表里，不存在则添加
            var newUser = new db.User({
                userId: userId,     
                userName: userName,
                status:status,
                nickName:nickName,
                cnName:cnName,
                sex:sex,
                depName:depName,
                pName:pName,
                roleName:roleName,
                email:email,
                pic:pic,
                account:account
            })
            newUser.save(function (err) {
                if (err){
                    resBody.code=1;
                    resBody.msg=err;
                    return console.log(err)
                }
            })
        }
        res.send(resBody);
    })
})

// 修改最新的新闻时间,同时发布最新的消息
router.post('/app/editNewsTime', function (req, res, next) {
    var time=req.body.time,
        newsIds=req.body.newsIds.split(','),
        obj={newsId:"10086",newsTime:time},
        resBody ={code:0,msg:'修改成功！'}
        db.News.findOneAndUpdate({newsId:"10086"},obj, function (err){//保存新时间
            console.log(err)
        }); 
        db.User.find({}, function (err, doc) { 
            if (err) {
                resBody.code=1;
                resBody.msg=err;
                console.log(err)
            } else if (doc) {//判断获取到的用户不为空
                for(var j=0;j<newsIds.length;j++){
                    for(var i=0;i<doc.length;i++){
                        var newInfo = new db.Info({
                            userId: doc[i].userId,     
                            infoId: newsIds[j]
                        })
                        newInfo.save(function (err){});
                    }
                }
            }
            res.send(resBody);
        })  
})

//删除新闻发送的已读消息
router.post('/app/delNewsInfo', function (req, res, next) {
    var userId=req.body.userId,
        infoId=req.body.infoId;
    db.Info.findOneAndRemove({userId:userId,infoId:infoId},function (err) {
        res.send({"static":"ok"});
    })
})
 
// 查找最新的新闻时间
router.post('/app/findNewsTime', function (req, res, next) {
   db.News.findOne({newsId:"10086"},function (err, doc) {
       var resBody ={code:0,msg:'修改成功！'}
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
           resBody.data=doc;
        }else{
            var news = new db.News({
                    newsId: "10086",     
                    newsTime: "2000-10-10"
                })
                news.save(function (err){});
                resBody.data=news;
        }
        res.send(resBody);
   })
})

// 创建消息
router.post('/app/saveInfo', function (req, res, next) {
   var infoId=req.body.info,
       resBody ={code:0,msg:'消息通知创建成功！'}
      db.User.find({}, function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {//判断获取到的用户不为空
            for(var i=0;i<doc.length;i++){
                var newInfo = new db.Info({
                    userId: doc[i].userId,     
                    infoId: infoId
                })
                newInfo.save(function (err){});
            }
        }
        res.send(resBody);
    })
})

// 通过用户id获取该用户的未读消息集合
router.post('/app/serchUnRead', function (req, res, next) {
   var userId=req.body.userId,
       resBody ={code:0,msg:'获取成功！'}
      db.Info.find({userId:userId}, function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
          resBody.data=doc;  
        }
        res.send(resBody);
    })
})

//上传图片
router.post('/app/uploadImg', function(req, res) {
//   var images=req.body['images[]'];
  var busboy = new Busboy({ headers : req.headers });
  var resBody = {code:0,msg:'上传成功！'};
  var fileId = new db.mongoose.Types.ObjectId();
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('got file', filename, mimetype, encoding);
    
    var writeStream = gfs.createWriteStream({
      _id: fileId,
      filename: filename,
      mode: 'w',
      content_type: mimetype,
    });
    file.pipe(writeStream);
    // fileIds.push(fileId);
  }).on('finish', function() {
    // show a link to the uploaded file
    // res.writeHead(200, {'content-type': 'text/html'});
    // res.end('<a href="/app/file/' + fileId.toString() + '">download file</a>');
    // var obj={saveFileId:fileId.toString()};
    // resBody.data=obj;
    resBody.fileId=fileId.toString();
    res.send(resBody);
  });


  req.pipe(busboy);
 
});

//获取具体的图片文件 
router.post('/app/file/:id', function(req, res) {
  gfs.findOne({ _id: req.params.id }, function (err, file) {
    if (err) return res.status(400).send(err);
    if (!file) return res.status(404).send('');

    res.set('Content-Type', file.contentType);
    // res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

    var readstream = gfs.createReadStream({
      _id: file._id
    });

    readstream.on("error", function(err) {
      console.log("Got error while processing stream " + err.message);
      res.end();
    });

    readstream.pipe(res);
  });
});



//通过站点代码,获取具体的站点图片文件 
router.post('/app/siteImg', function(req, res) {
    var resBody={};
    var CusCode=req.body.CusCode;
    if(CusCode==null || CusCode==""){
        resBody.code="0";
        resBody.msg='站点信息获取成功';
        resBody.siteTitle=path.siteTitle;
        resBody.siteImg=path.siteroot+"static/site/site_default.png";
        res.send(resBody);
        return;
    }
        db.Site.findOne({CusCode: req.body.CusCode},function(err,doc){
            if (err || !doc) {
                resBody.code="1";
                resBody.msg='该站点不存在！';
                resBody.siteTitle=path.siteTitle;
                resBody.siteImg=path.siteroot+"static/site/site_default.png";
                console.log(err);
                res.send(resBody);
                return;
            } 
            
            // console.log(err);
            resBody.code="0";
            resBody.msg='站点信息获取成功';
            resBody.siteTitle=doc.siteTitle;
            resBody.siteImg=doc.siteImg;
            console.log("doc.siteImg="+doc.siteImg);
            res.send(resBody);
            return;

    })
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/hello', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

//get请求无效，不知原因
router.get('/hello', function (req, res, next) {
    res.send('hello');
})

//文件上传




//生成二维码
router.post('/app/qrcode',function(req,res){
    var courseId=req.body.courseId
        urlAddress=req.body.urlAddress
    var temp_qrcode = qr_image.image(urlAddress);
    res.type('png');
    temp_qrcode.pipe(res);
})

//pc生成二维码
router.post('/mgr/qrcode',function(req,res){
    var urlAddress=req.body.urlAddress
    var temp_qrcode = qr_image.image(urlAddress);
    res.type('png');
    temp_qrcode.pipe(res);
})



//通过课程id获取该可课程下的学生签到情况
router.post('/app/trainCheck',function(req,res){
    var trainingPlanId=req.body.trainingPlanId,
        resBody = {code:0,msg:'获取成功！'};

    db.UserTrainingPlan.find({trainingPlanId:trainingPlanId},function(err,doc){
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err);
        } else if (doc) {
            resBody.data=doc;
        }
        res.send(resBody);
    })
})

//签到
router.post('/app/checkIn', function (req, res, next) {
     var userId = req.body.userId,
        courseId = req.body.courseId,
        signInImg = req.body.signInImg
   //var result = 'userId=1,courseId=2',
        resBody = {code:0,msg:'签到成功！'}
        db.UserTrainingPlan.findOneAndUpdate({userName: userId,trainingPlanId:courseId},
        {isSignIn:true,signInImg:signInImg},function (err) {
            if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
            }
        })
    res.send(resBody);
})



// 获取站点列表 或根据站点名称获取站点列表
router.post('/mgr/getSiteList', function (req, res, next) {
  var orgId = req.body.orgId,
      pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      siteName=req.body.siteName,
      re = new RegExp(siteName),
      resBody ={code:0,msg:'获取站点成功！'}
    db.Site.find({siteName:re })//后面需要加上orgId 根据站点名称进行模糊查询
    .skip(parseInt(pageNumber)*parseInt(pageSize))
           .limit(parseInt(pageSize))
           .sort('-createDate')
           .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   return console.log(err)
               } else if (doc) {
                   resBody.data=doc;
               }
               res.send(resBody);
             })
})



// 根据站点地址获取站点信息
router.post('/mgr/getSite', function (req, res, next) {
    var siteAddress = req.body.siteAddress,
      resBody ={code:0,msg:'获取站点成功！'}
      db.Site.findOne({siteAddress:siteAddress}, function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
            resBody.data=doc;
        }
        res.send(resBody);
    })
})

//删除站点
router.post('/mgr/deleteSite', function (req, res, next) {
    var sid=req.body.id,
        resBody = {}
    db.Site.findByIdAndRemove(sid, function (err) {
        if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
              res.send(resBody);
        }
    })
    resBody.code=0;
    resBody.msg='删除成功！';
    res.send(resBody);
})


// 新增笔记
router.post('/app/saveNote', function (req, res, next) {
    var userId = req.body.userId,
        courseId=req.body.courseId,
        noteContent=req.body.noteContent,
        picIds = req.body['picIds[]'];
        resBody = {code:0,msg:'新增成功！'}
        console.log('picIds='+picIds);
        console.log('userId='+userId);
        console.log('courseId='+courseId);
        var newNote = new db.Note({
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
        newNote.save(function (err) {
            if (err){
              resBody.code=1;
              resBody.msg=err;
              return console.log(err)
            }
        })
    res.send(resBody);
})

// 获取笔记
router.post('/app/getNoteInfo', function (req, res, next) {
  var userId = req.body.userId,
      courseId=req.body.courseId,
      resBody ={code:0,msg:'获取笔记成功！'}
    db.Note.find({userId:userId,courseId:courseId})
           .sort('-createDate')
           .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   return console.log(err)
               } else if (doc) {
                   resBody.data=doc;
               }
               res.send(resBody);
             })

})

// 新增评论
router.post('/app/saveComment', function (req, res, next) {
    var userId = req.body.userId,
        courseId=req.body.courseId,
        userName=req.body.userName,
        userImg=req.body.userImg,
        commentContent=req.body.commentContent,
        starNumber=req.body.starNumber,
        resBody = {code:0,msg:'新增成功！'}
        var newComment = new db.Comment({
                  userId: userId,
                  userName:userName,
                  userImg:userImg,
                  courseId:courseId,
                  createDate:new Date(),
                  commentContent: commentContent,
                  commentFlag: 0,
                  starNumber: starNumber
              })
        db.Comment.find({userId:userId,courseId:courseId})
                  .lean(true)
                  .exec(function (err, doc) {
                     if (err) {
                         resBody.code=1;
                         resBody.msg=err;
                         return console.log(err)
                     } else if (doc) {
                       if(doc.length>1){
                         resBody.code=1;
                         resBody.msg='您已经追评，无法再次追评！';
                         console.log('ready');
                        //  res.send(resBody);
                        //  return
                       }
                        console.log('doc='+JSON.stringify(doc))
                        // console.log('doc userId='+doc.get('userId'));
                        if(doc.length>0){
                          //同时更新原有的评论
                          // db.Comment.update({ _id: doc[0]._id }, { $set: { commentFlag: 1 }});
                          console.log('doc[0]._id='+doc[0]._id)
                          doc[0].commentFlag=1;
                          db.Comment.findByIdAndUpdate(doc[0]._id, doc[0], function () {})
                          console.log('doc length in ----');
                          newComment.commentFlag=1;
                        }
                        if(doc.length<=1 && doc.length >=0){
                          newComment.save(function (err) {
                              if (err){
                                resBody.code=1;
                                resBody.msg=err;
                                console.log(err)
                              }
                          })
                        }
                     }
                     res.send(resBody);
                 })
    // res.send(resBody);
})

// 获取用户评价标志
router.post('/app/getUserComment', function (req, res, next) {
  var userId = req.body.userId,
      courseId=req.body.courseId,
      resBody ={code:0,msg:'获取评论成功！'}
      db.Comment.find({userId:userId,courseId:courseId})
              .sort('-createDate')
              .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   console.log(err)
               } else if (doc) {
                 //加上大小判断
                   resBody.data=doc;
               }
               res.send(resBody);
           })
})

// 获取评论
router.post('/app/getCommentInfo', function (req, res, next) {
  // console.log("req.body="+JSON.stringify(req.body));
  var courseId = req.body.courseId,
      pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      resBody ={code:0,msg:'获取评论成功！'}
      db.Comment.find({courseId:courseId})
              .skip(parseInt(pageNumber)*parseInt(pageSize))
              .limit(parseInt(pageSize))
              .sort('-createDate')
              .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   console.log(err)
               } else if (doc) {
                   resBody.data=doc;
               }
               res.send(resBody);
           })
})

// 新增培训计划
router.post('/app/saveTrainingPlan', function (req, res, next) {
    var adminUserId = req.body.adminUserId,
        createDate=req.body.createDate,
        startDate=req.body.startDate,
        endDate=req.body.endDate,
        field=req.body.field,
        name=req.body.name,
        courseName=req.body.courseName,
        address=req.body.address,
        teacher=req.body.teacher,
        applySum=req.body.applySum,
        longitude=req.body.longitude,
        Latitude=req.body.Latitude,
        range=req.body.range,
        // alreadyApplyNum=req.body.alreadyApplyNum,
        resBody = {code:0,msg:'发布成功！'}
        var newTrainingPlan = new db.TrainingPlan({
                  adminUserId: adminUserId, //用户id
                  createDate: new Date(),
                  startDate: new Date(startDate),    //开始时间
                  endDate: new Date(endDate),      //结束时间
                  field: field,      //培训领域
                  name: name,       //培训名称
                  courseName: courseName, //培训课程
                  address: address,    //培训地址
                  teacher: teacher,    //培训讲师
                  applySum: applySum,   //总报名人数
                  longitude:longitude,
                  Latitude:Latitude,
                  range:range,
                  alreadyApplyNum: 0,//已报名人数
                  isRead:false    //默认未读
              })
        newTrainingPlan.save(function (err,doc) {
            if (err){
                resBody.code=1;
                resBody.msg=err;
                console.log(err)
            }else{
                console.log(doc)
                resBody.info=doc.id; 
            }
            res.send(resBody);
        })
    
})

// 获取培训计划
router.post('/app/getTrainingPlanList', function (req, res, next) {
  // console.log("req.body="+JSON.stringify(req.body));
  var pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      resBody ={code:0,msg:'获取培训计划成功！'}
      console.log("parseInt(pageNumber)="+parseInt(pageNumber));
      db.TrainingPlan.find({})
              .skip(parseInt(pageNumber)*parseInt(pageSize))
              .limit(parseInt(pageSize))
              .sort('-createDate')
              .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   console.log(err)
               } else if (doc) {
                   resBody.data=doc;
               }
               res.send(resBody);
           })
})

// 更新培训计划
router.post('/app/updateTrainingPlan', function (req, res, next) {
  var id=req.body.id,
      isRead=req.body.isRead,
      resBody ={code:0,msg:'更新培训计划成功！'}
      console.log('id='+id)
      db.TrainingPlan.findOneAndUpdate({_id: id},
        {isRead:true},function (err) {
            if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
            }
        })
      res.send(resBody);
})

// 获取培训计划
router.post('/app/getTrainingPlan', function (req, res, next) {
  var id=req.body.id,
    userId=req.body.userId,
      resBody ={code:0,msg:'获取培训计划成功！'}
      console.log('id='+id);
      db.TrainingPlan.findOne({_id: id}, function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
          resBody.data=doc;
          db.Info.findOneAndRemove({userId:userId,infoId:id},function (err) {
              return true;
          })
        }
        res.send(resBody);
    })
})

// 获取已参加的培训计划
router.post('/app/getMyTrainingPlan', function (req, res, next) {
  var userName=req.body.id,
      resBody ={code:0,msg:'获取培训计划成功！'}
      db.UserTrainingPlan.find({userName: userName})
      .sort('-createDate')
      .exec(function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
            var docId=[];
            doc.forEach(function(item){
                docId.push(item.trainingPlanId)
            })
            db.TrainingPlan.find({})
            .sort('-createDate')
            .where('_id').in(docId)
            .exec(function(err, doc0){
                if (err) {
                    resBody.code=1;
                    resBody.msg=err;
                    console.log(err)
                    } else if (doc0) {
                    resBody.data=doc0
                }
                res.send(resBody);
            })
      }
    })
})

// 获取培训计划
router.post('/app/getUserTrainingPlan', function (req, res, next) {
  var userName=req.body.id,
     trainingPlanId=req.body.trainingPlanId,
      resBody ={code:0,msg:'获取培训计划成功！'}
      db.UserTrainingPlan.find({userName: userName,trainingPlanId:trainingPlanId,})
      .sort('-createDate')//排序
      .exec(function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
            resBody.data=doc;
        }
        res.send(resBody);
    })
})

// 获取未关联问卷调查的培训计划
router.post('/app/getNoQRTrainingPlan', function (req, res, next) {
  var totalNum=0;
  db.UserTrainingPlan.count({isCheck: false},function (err, count) {
    if (err) {
        resBody.code=1;
        resBody.msg=err;
        console.log(err)
    }
    totalNum=count;
  });
  var userName=req.body.id,
      pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      resBody ={code:0,msg:'获取培训计划成功！'}
      db.UserTrainingPlan.find({isCheck: false})
      .skip(parseInt(pageNumber)*parseInt(pageSize))
      .limit(parseInt(pageSize))
      .sort('-createDate')
      .exec(function (err, doc) {
        if (err) {
            resBody.code=1;
            resBody.msg=err;
            console.log(err)
        } else if (doc) {
          resBody.data=doc;
          resBody.totalNum=totalNum;
      }
      res.send(resBody);
    })
})

// 获取管理员发布的培训计划列表
router.post('/app/getAdminTrainingPlanList', function (req, res, next) {
  // console.log("req.body="+JSON.stringify(req.body));
  var adminUserId = req.body.adminUserId, 
      pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      resBody ={code:0,msg:'获取培训计划成功！'}
      console.log("parseInt(pageNumber)="+parseInt(pageNumber));
      db.TrainingPlan.find({adminUserId:adminUserId})
              .skip(parseInt(pageNumber)*parseInt(pageSize))
              .limit(parseInt(pageSize))
              .sort('-createDate')
              .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   console.log(err)
               } else if (doc) {
                   resBody.data=doc;
               }
               res.send(resBody);
           })
})

// 取消报名培训计划
router.post('/app/cancelTrainingPlan', function (req, res, next) {
    var userId = req.body.userId,
        trainingPlanId=req.body.trainingPlanId,
        userName=req.body.userName,
        resBody = {}
        db.UserTrainingPlan.findOneAndRemove({userName: userName,trainingPlanId:trainingPlanId}, function (err) {
        if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
              res.send(resBody);
        }else{
            db.TrainingPlan.findById(trainingPlanId)
                    .lean(true)
                    .exec(function (err, doc) {
                        if (err) {
                            resBody.code=1;
                            resBody.msg=err;
                            console.log(err)
                        } else{
                            console.log(doc);
                            if(parseInt(doc.alreadyApplyNum)>0){
                                var num=parseInt(doc.alreadyApplyNum)
                                num--;
                                doc.alreadyApplyNum=num;
                                db.TrainingPlan.findByIdAndUpdate(doc._id,doc,function (err) {
                                        if (err) {
                                            resBody.code=1;
                                            resBody.msg=err;
                                            console.log(err)
                                        } 
                                })
                            }else{
                                resBody.code=1;
                                resBody.msg='您已取消报名，无需再次取消！';
                            }
                        }
                    }
                )
        }
    })
    resBody.code=0;
    resBody.msg='取消报名成功！';
    res.send(resBody);
})

// 报名培训计划
router.post('/app/applyTrainingPlan', function (req, res, next) {
    var userId = req.body.userId,
        trainingPlanId=req.body.trainingPlanId,
        userName=req.body.userName,
        nickName=req.body.nickName,
        cnName=req.body.cnName||'',
        sex=req.body.sex,
        depName=req.body.depName,
        pName=req.body.pName,
        roleName=req.body.roleName,
        email=req.body.email,
        userImg=req.body.userImg,
        account=req.body.account,
        longitude=req.body.longitude,
        Latitude=req.body.Latitude,
        range=req.body.range,
        // isSignIn=req.body.isSignIn,
        // isCheck=req.body.isCheck,
        isApply=req.body.isApply,
        resBody = {code:0,msg:'报名成功！'}
       
        //判断报名人数是否达到上限
        db.TrainingPlan.findById(trainingPlanId)
            .lean(true)//doc 转json
            .exec(function (err, doc) {
                if (err) {
                    resBody.code=1;
                    resBody.msg=err;
                    console.log(err)
                } else{
                    console.log(doc);
                    if(parseInt(doc.alreadyApplyNum)<parseInt(doc.applySum)){
                        var train_body=doc;
                        var num=parseInt(train_body.alreadyApplyNum)
                        num++;
                        train_body.alreadyApplyNum=num;
                        //判断该用户是否曾经报过名
                        db.UserTrainingPlan.findOne({userId:userId,trainingPlanId:trainingPlanId},function(err,doc){
                            if (err) {
                                resBody.code=1;
                                resBody.msg=err;
                                console.log(err)
                                res.send(resBody);
                            }else{
                                if(!doc){ //没有报过名，则去报名
                                    var newUserTrainingPlan = new db.UserTrainingPlan({
                                            userId: userId, //用户id
                                            createDate: new Date(),
                                            trainingPlanId: trainingPlanId,
                                            userName: userName,   //这个才是中间表的连接属性
                                            nickName: nickName,
                                            cnName: cnName,
                                            sex: sex,
                                            depName: depName,
                                            pName: pName,
                                            roleName: roleName,
                                            email: email,
                                            userImg: userImg,
                                            account: account,
                                            longitude:longitude,   //经度
                                            Latitude:Latitude,    //纬度
                                            range:range,       //签到范围
                                            isSignIn: false,  //是否签到
                                            isCheck: false,   //是否填写问卷调查
                                            isApply: isApply
                                        })
                                    newUserTrainingPlan.save(function (err) {
                                        if (err){
                                            resBody.code=1;
                                            resBody.msg=err;
                                            res.send(resBody);
                                        }else{
                                            //修改已报名人数   
                                            db.TrainingPlan.findByIdAndUpdate(train_body._id,train_body,function (err) {
                                                if (err) {
                                                    resBody.code=1;
                                                    resBody.msg=err;
                                                    console.log(err)
                                                    res.send(resBody);
                                                }else{
                                                    res.send(resBody);
                                                } 
                                            })
                                        }
                                    })
                                }else{
                                    resBody.msg="您已报名，请勿重复报名！"
                                    res.send(resBody);
                                }
                            }
                        })
                    }else{
                        resBody.code=1;
                        resBody.msg="抱歉,报名人数达到上限,请选择其他相关的课程,谢谢！";
                        console.log(err) 
                        res.send(resBody);
                    }
                }  
            })     
})

// 新增或编辑问卷题目
router.post('/mgr/saveOrEditQuestion', function (req, res, next) {
    var resBody = {};
    if (req.body.id&&req.body.id!=0) {
        var obj = {
            questionContent: req.body.questionContent,     //题目内容
            questionType:parseInt(req.body.questionType),
            options:[],
            createDate:new Date()
        }
        var options = req.body['options[]'];
        for(var i=0;i<options.length;i++){
            var option={}
            option.content=options[i];
            obj.options[i].content=options[i];
        }
        // options.forEach(function(item,index){
        //     obj.options[index].content=item
        // })
        console.log('obj='+obj);
        db.Question.findByIdAndUpdate(req.body.id, obj, function (err) {
            if (err){
                resBody.code=1;
                resBody.msg=err;
                console.log(err)
                res.send(resBody);
            }
        })
        resBody.msg='编辑成功！';
    } else {
        var newQuestion = new db.Question({
                questionContent: req.body.questionContent,     //题目内容
                questionType:parseInt(req.body.questionType),
                options:[{}],
                createDate:new Date()
              })
        var options = req.body['options[]'];
        console.log("options="+options);
        // var optionArray=new Array(options.length);
        // options.forEach(function(item,index){
        //     obj.options[index].content=item
        // })
        for(var i=0;i<options.length;i++){
            var option={}
            option.content=options[i];
            newQuestion.options[i]=option;
            console.log('newQuestion.options['+i+'].content='+newQuestion.options[i].content);
            console.log('options['+i+']='+options[i]);
        }
        newQuestion.save(function (err) {
            if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
              res.send(resBody);
            }
        })
        resBody.msg='新增成功！';
    }
    resBody.code=0;
    res.send(resBody);
})

//删除问卷题目
router.post('/mgr/deleteQuestion', function (req, res, next) {
    var sid=req.body.id,
        resBody = {}
    db.Question.findByIdAndRemove(sid, function (err) {
        if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
              res.send(resBody);
        }
    })
    resBody.code=0;
    resBody.msg='删除成功！';
    res.send(resBody);
})

// 获取问卷题目列表
router.post('/mgr/getQuestionList', function (req, res, next) {
  // console.log("req.body="+JSON.stringify(req.body));
  var totalNum=0;
  db.Question.count(function (err, count) {
    if (err) {
        resBody.code=1;
        resBody.msg=err;
        console.log(err)
    }
    totalNum=count;
  });
//   console.log('totalNum='+totalNum);
  var pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      resBody ={}
      db.Question.find({})
              .skip(parseInt(pageNumber)*parseInt(pageSize))
              .limit(parseInt(pageSize))
              .sort('-createDate')
              .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   console.log(err)
               } else if (doc) {
                   resBody.data=doc;
                   resBody.totalNum=totalNum;
                   resBody.code=0;
                   resBody.msg='获取问卷题目成功！';
               }else{
                   resBody.code=1;
                   resBody.msg='结果集为空！';
               }
               res.send(resBody);
           })
})

// 新增或编辑问卷
router.post('/mgr/saveOrEditQuestionNaire', function (req, res, next) {
    var resBody = {};
    if (req.body.id&&req.body.id!=0) {
        var obj = {
            trainingPlanId:req.body.trainingPlanId,
            title:req.body.title,
            description:req.body.description,
            questionIds:[],
            createDate:new Date()
        }
        var questionIds = req.body['questionIds[]'];
        var questionId={}
        // for(var i=0;i<options.length;i++){
        //     option.content=options[i];
        //     obj.options[i].content=options[i];
        // }
        console.log('obj='+obj);
        db.Questionnaire.findByIdAndUpdate(req.body.id, obj, function (err) {
            if (err){
                resBody.code=1;
                resBody.msg=err;
                console.log(err)
                res.send(resBody);
            }
        })
        resBody.msg='编辑成功！';
    } else {
        var newQuestionNaire = new db.Questionnaire({
                trainingPlanId:req.body.trainingPlanId,
                title:req.body.title,
                description:req.body.description,
                questionIds:[],
                createDate:new Date()
              })
        var questionIds = req.body['questionIds[]'];
        var questionId={}
        // for(var i=0;i<options.length;i++){
        //     option.content=options[i];
        //     newQuestionNaire.options[i]=option;
        //     console.log('options[i]='+options[i]);
        // }
        newQuestionNaire.save(function (err) {
            if (err){
              resBody.code=1;
              resBody.msg=err;
              console.log(err)
              res.send(resBody);
            }
        })
        resBody.msg='新增成功！';
    }
    resBody.code=0;
    res.send(resBody);
})

// 获取问卷题目列表
router.post('/mgr/getQuestionNaireList', function (req, res, next) {
  // console.log("req.body="+JSON.stringify(req.body));
  var totalNum=0;
  db.Questionnaire.count(function (err, count) {
    if (err) {
        resBody.code=1;
        resBody.msg=err;
        console.log(err)
    }
    totalNum=count;
  });
//   console.log('totalNum='+totalNum);
  var pageNumber=req.body.pageNumber,
      pageSize=req.body.pageSize,
      resBody ={}
      db.Questionnaire.find({})
              .skip(parseInt(pageNumber)*parseInt(pageSize))
              .limit(parseInt(pageSize))
              .sort('-createDate')
              .exec(function (err, doc) {
               if (err) {
                   resBody.code=1;
                   resBody.msg=err;
                   console.log(err)
               } else if (doc) {
                   resBody.data=doc;
                   resBody.totalNum=totalNum;
                   resBody.code=0;
                   resBody.msg='获取问卷成功！';
               }else{
                   resBody.code=1;
                   resBody.msg='结果集为空！';
               }
               res.send(resBody);
           })
})

//根据用户ID去获取订单记录
router.post('/app/getUserOrder',function(req, res, next){
    var userID=req.body.userId,
        pageNumber=req.body.pageNumber,
        pageSize=req.body.pageSize,
        resBody={code:0,msg:'获取成功'};
    db.Order.find({userID:userID}).skip(parseInt(pageNumber)*parseInt(pageSize))
           .limit(parseInt(pageSize))
           .sort('-createDate')
           .exec(function (err, doc) {
                if(err){
                    resBody.code=1;
                    resBody.msg=err;
                    res.send(resBody);
                }else{
                    resBody.data=doc;
                }
                res.send(resBody);
         });
})

//保存订单
router.post('/app/saveUserOrder',function(req, res, next){
    var userID=req.body.userId,
        courseName=req.body.courseName,
        coursePrice=req.body.coursePrice,
        orderId=req.body.orderId,
        createDate=new Date(req.body.createDate),
        resBody={code:0,msg:'保存成功'};
   var neworder=new db.Order({
        userID: userID,     
        courseName:courseName,
        coursePrice:coursePrice,
        orderId:orderId,     
        createDate: createDate
   })
   neworder.save(function(err){
       if(err){
          resBody.code=0;
          resBody.msg=err; 
       }
       res.send(resBody);
   });
})



//用户登录
router.post('/app/login',function(req, res, next){
        var login_res=res;

        var loginData = {  
            key:remote_site.key,  
            user:req.body.login_name,
            pwd:req.body.password,
            

        };//这是需要提交的数据  
         var userParam = {  
            key:remote_site.key,  
            user:req.body.login_name,
            pwd:req.body.password
            //siteId:req.body.company_id

        };


	new Promise(function(resolve,rej){ //登录验证用户名和密码
        var loginContent = qs.stringify(loginData);  
        var options = {  
            hostname: remote_site.hostname,  
            port: remote_site.port,  
            path: remote_site.path.login + loginContent,  
            method: 'GET'  
        };  
       
        var req2 = http.request(options, function (res) {
             
             
            res.setEncoding('utf8');  
            res.on('data', function (chunk) { 
                resolve(chunk); 
            });  
        });  
        
        req2.on('error', function (e) { 
            console.log('problem with request: ' + e.message);  
            return false; 
           
        });  
        req2.on('end',function(){
            console.log('problem with request: end');
        }); 
        req2.end();


    }).then(function(chunk){
        var loginresult= JSON.parse(chunk).status=="true"?true:false;
        if(!loginresult){
             login_res.send({
                    code:"0",
                    msg:"用户名密码不匹配"
                })
               return false; 
        }else{
             return true;
        }
    }).then(function(res){ //获取用户具体信息并判断用户所在站点是否正确
        if(res){
            var Content = qs.stringify(userParam);  
            var options = {  
                hostname: remote_site.hostname,  
                port: remote_site.port,  
                path: remote_site.path.userInfo + Content,  
                method: 'GET'  
            };  
            
            var req3 = http.request(options, function (res) {  
                // console.log(res);  
                res.setEncoding('utf8');
                var result_info={}; 
                res.on('data', function (chunk) {  
                    if(JSON.parse(chunk).status=="false"){
                        result_info.code='0';
                        result_info.msg='没找到该用户';
                    }else{
                        result_info.code='1';
                        result_info.msg='获取成功';
                        result_info.userId=JSON.parse(chunk).userId
                    }
                    //判定站点是否匹配
                    // if (chunk.siteID !=loginData.siteId ){
                    //     result.code='0';
                    //     result.msg='该用户不再该站点内';
                    //     return result;
                    // }
                    login_res.send(result_info);
                }); 
            });  

            req3.on('error', function (e) { 

                console.log('problem with request: ' + e.message); 
                login_res.send({
                            code:"0",
                            msg:e.message
                        }) 
            });  
            req3.end();             
        }
    }).catch(function(err){
        console.log(err);
         login_res.send({
            code:"0",
            msg:err
        }) 
    })

})

//保存站点
router.post('/mgr/saveSite', function (req, res, next) {
    var siteName = req.body.siteName,
        CusCode=req.body.CusCode,
        siteTitle=req.body.siteTitle,
        siteImg=req.body.siteImg,
        url=req.body.url,
        // orgId=req.body.orgId, 这个可以从当前用户中取出（暂时没有提供该数据）
        resBody = {code:0,msg:'新增成功！'}
        var imgPath= "static/site/"+siteImg;

        new Promise(function(resolve,rej){
            var data={};
            data.imgBuff='';
            gfs.findOne({ _id:siteImg }, function (err, file) {
                if (err) resolve("");
                if (!file) resolve("");
                imgPath+=file.filename.substr(-4)
                var readstream = gfs.createReadStream({
                    _id: file._id
                });
                readstream.on("data", function(chunk) {
                    console.log(chunk);
                    data.imgBuff+=chunk.toString('base64');               
                });
                readstream.on("error", function(err) {
                    resolve(""); 
                });
                readstream.on("end", function () {
                    data.path=imgPath;
                    resolve(data);
                });
            });
        }).then(function(data){
            if(data.imgBuff.length==0){
                return ""
            }
            var dataBuffer = new Buffer(data.imgBuff, 'base64');
           return fs.writeFile(data.path,dataBuffer,function(err) {
                return err?"":data.path
            });
        }).then(function(param){
            var newSite = new db.Site({
                    siteName: siteName,     
                    siteAddress: '',
                    siteImg: url+imgPath,
                    siteTitle:siteTitle,
                    CusCode:CusCode,
                    orgId:'',     
                    createDate: new Date()
              })
            newSite.save(function (err) {
                if (err){
                    resBody.code=1;
                    resBody.msg=err;
                    return console.log(err)
                } 
            })
            res.send(resBody);
        }).catch(function(err){
            console.log(err);
            res.send({
                code:"0",
                msg:err
            }) 
        })
})

//测试
router.post('/app/test', function (req, res, next) {
    fs.readFile('static/83.jpg', function(err, originBuffer) {
        console.log(Buffer.isBuffer(originBuffer));

        // 生成图片2(把buffer写入到图片文件)
        fs.writeFile('static/site/831.jpg', originBuffer, function(err) {
            if(err) {console.log(err)}
        });

        var base64Img = originBuffer.toString('base64');  // base64图片编码字符串

        console.log(base64Img);

        var decodeImg = new Buffer(base64Img, 'base64');  // new Buffer(string, encoding)

        console.log(Buffer.compare(originBuffer, decodeImg));  // 0 表示一样


        // 生成图片3(把base64位图片编码写入到图片文件)
        fs.writeFile('static/site/832.jpg', decodeImg, function(err) {
            if(err) {console.log(err)}
        });
    });
})



 










module.exports = router;
