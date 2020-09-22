// 引入Sequelize模块
const Sequelize = require("sequelize");

// 引入数据库实例
const db = require("../db");

// 定义model
const Event = db.define(
  "Event",
  {
    // 活动id
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 活动名称
    name: { type: Sequelize.STRING(20), allowNull: false },
    // 活动图片
    img: { type: Sequelize.STRING, allowNull: false },
    // 活动url
    url: { type: Sequelize.STRING },
    // 活动关联的文章id
    articleId: { type: Sequelize.INTEGER },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: "event",
  }
);
// 导出model
module.exports = Event;
