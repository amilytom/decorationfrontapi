// 引入Sequelize模块
const Sequelize = require("sequelize");

// 引入数据库实例
const db = require("../db");

// 定义model
const Case = db.define(
  "Case",
  {
    // 案例id
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 案例名称
    name: { type: Sequelize.STRING(20), allowNull: false },
    // 案例图片
    img: { type: Sequelize.STRING, allowNull: false },
    // 案例描述
    desc: { type: Sequelize.STRING },
    // 案例内容
    content: { type: Sequelize.TEXT },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: "case",
  }
);
// 导出model
module.exports = Case;
