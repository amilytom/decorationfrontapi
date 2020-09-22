// 引入Express对象
var express = require("express");
// 引入路由对象
var router = express.Router();
// 引入我们自定义的controller
const IndexController = require("../controllers/index");
// 定义首页路由，GET请求
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// 定义活动列表路由，GET请求
router.get("/event", IndexController.eventList);
// 定义分类列表路由，GET请求
router.get("/cate", IndexController.cateList);
// 定义文章列表路由，GET请求
router.get("/article", IndexController.articleList);
// 定义文章详情路由，GET请求
router.get("/article/:articleId", IndexController.article);
// 定义案例列表路由，GET请求
router.get("/case", IndexController.caseList);
// 定义案例详情路由，GET请求
router.get("/case/:caseId", IndexController.caseInfo);
// 定义企业信息路由，GET请求
router.get("/company", IndexController.company);
// 定义预约路由，POST请求
router.post("/order", IndexController.order);
// 导出路由，供app.js文件调用
module.exports = router;
