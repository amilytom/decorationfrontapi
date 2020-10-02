// 引入公共方法
const Common = require("./common");
// 引入event表的model
const EventModel = require("../models/event");
// 引入cate表的model
const CateModel = require("../models/cate");
// 引入case表的model
const CaseModel = require("../models/case");
// 引入article表的model
const ArticleModel = require("../models/article");
// 引入company表的model
const CompanyModel = require("../models/company");
// 引入order表的model
const OrderModel = require("../models/order");
// 引入常量
const Constant = require("../constant/constant");
// 引入dateformat包
const dateFormat = require("dateformat");
// 配置对象
let exportObj = {
  eventList,
  cateList,
  cate,
  articleList,
  article,
  caseList,
  caseInfo,
  company,
  order,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取活动列表方法
function eventList(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 查询方法
    query: (cb) => {
      // 使用event的model去数据库中查询，查询所有活动
      EventModel.findAll()
        .then(function (result) {
          // 查询结果处理
          // 定义一个空数组list，用来存放最终结果
          let list = [];
          // 遍历SQL查询出来的结果，处理后装入list
          result.forEach((v, i) => {
            let obj = {
              id: v.id,
              name: v.name,
              img: v.img,
              url: v.url,
              articleId: v.articleId,
              createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
            };
            list.push(obj);
          });
          // 给返回结果赋值
          resObj.data = {
            list,
          };
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取分类列表方法
function cateList(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 查询方法
    query: (cb) => {
      // 使用cate的model去数据库中查询， 查询出所有分类
      CateModel.findAll()
        .then(function (result) {
          // 查询结果处理
          // 定义一个空数组list，用来存放最终结果
          let list = [];
          // 遍历SQL查询出来的结果，处理后装入list
          result.forEach((v, i) => {
            let obj = {
              id: v.id,
              name: v.name,
              img: v.img,
              createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
            };
            list.push(obj);
          });
          // 给返回结果赋值
          resObj.data = {
            list,
          };
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取单条分类方法
function cate(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["id"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用cate的model中的方法查询
        CateModel.findByPk(req.params.id)
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                id: result.id,
                name: result.name,
                img: result.img,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.CATE_NOT_EXSIT);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取文章列表方法
function articleList(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.query, ["page", "rows"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 根据前端提交参数计算SQL语句中需要的offset，即从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0;
        // 根据前端提交参数计算SQL语句中需要的limit，即查询多少条
        let limit = parseInt(req.query.rows) || 20;
        // 设定一个查询条件对象
        let whereCondition = {};
        // 如果查询标题存在，查询对象增加标题
        if (req.query.cate) {
          whereCondition.cate = req.query.cate;
        }
        // 通过offset和limit使用article的model去数据库中查询，并按照创建时间排序
        ArticleModel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [["created_at", "DESC"]],
          // 关联cate表进行联表查询
          include: [
            {
              model: CateModel,
            },
          ],
        })
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            // 遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach((v, i) => {
              let obj = {
                id: v.id,
                title: v.title,
                desc: v.desc.substr(0, 60) + "...",
                cate: v.cate,
                // 获取联表查询中的cate表中的name
                cateName: v.Cate.name,
                cover: v.cover,
                createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              list.push(obj);
            });
            // 给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count,
            };
            // 继续后续操作
            cb(null);
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取文章详情方法
function article(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["articleId"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用article的model中的方法查询
        ArticleModel.findByPk(req.params.articleId, {
          include: [
            {
              model: CateModel,
            },
          ],
        })
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                id: result.id,
                title: result.title,
                desc: result.desc,
                content: result.content,
                cate: result.cate,
                cover: result.cover,
                // 获取联表查询中的cate表中的name
                cateName: result.Cate.name,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.ARTICLE_NOT_EXSIT);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取案例列表方法
function caseList(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.query, ["page", "rows"], cb);
    },
    // 查询方法
    query: [
      "checkParams",
      (results, cb) => {
        // 设定一个查询条件，定义按照创建时间倒序
        let whereCondition = { order: [["created_at", "DESC"]] };
        // 如果从首页请求，只返回四条数据，否则分页查询
        if (req.query.from === "index") {
          whereCondition.limit = 2;
        } else {
          // 如果没传入，分页查询
          // 根据前端提交参数计算SQL语句中需要的offset，即从多少条开始查询
          let offset = req.query.rows * (req.query.page - 1) || 0;
          // 根据前端提交参数计算SQL语句中需要的limit，即查询多少条
          let limit = parseInt(req.query.rows) || 20;
          // 把查询条件添加进条件对象
          whereCondition.offset = offset;
          whereCondition.limit = limit;
        }

        // 通过offset和limit使用case的model去数据库中查询，并按照创建时间排序
        CaseModel.findAndCountAll(whereCondition)
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            // 遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach((v, i) => {
              let obj = {
                id: v.id,
                name: v.name,
                desc: v.desc,
                img: v.img,
                createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              list.push(obj);
            });
            // 给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count,
            };
            // 继续后续操作
            cb(null);
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取案例详情方法
function caseInfo(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["caseId"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用case的model中的方法查询
        CaseModel.findByPk(req.params.caseId)
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                id: result.id,
                name: result.name,
                img: result.img,
                desc: result.desc,
                content: result.content,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.ARTICLE_NOT_EXSIT);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取企业信息方法
function company(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 查询方法，依赖校验参数方法
    query: (cb) => {
      // 使用company的model中的方法查询，查询id为1的数据
      CompanyModel.findByPk(1)
        .then(function (result) {
          // 查询结果处理
          let obj = {
            id: result.id,
            name: result.name,
            address: result.address,
            tel: result.tel,
            intro: result.intro,
            longitude: result.longitude,
            latitude: result.latitude,
            createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
          };
          // 给返回结果赋值，包括列表和总条数
          resObj.data = obj;
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 添加预约方法
function order(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["name", "phone", "type", "orderDate"], cb);
    },
    // 添加方法，依赖校验参数方法
    add: (cb) => {
      // 使用order的model中的方法插入到数据库
      OrderModel.create({
        name: req.body.name,
        phone: req.body.phone,
        type: req.body.type,
        orderDate: req.body.orderDate,
        message: req.body.message,
      })
        .then(function () {
          // 插入结果处理
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
