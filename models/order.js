// 引入Sequelize模块
const Sequelize = require("sequelize");

// 引入数据库实例
const db = require("../db");

// 定义model
const Order = db.define(
  "Order",
  {
    // 主键id
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 姓名
    name: { type: Sequelize.STRING(30), allowNull: false },
    // 电话
    phone: { type: Sequelize.STRING(20), allowNull: false },
    // 装修类型
    type: { type: Sequelize.STRING(20), allowNull: false },
    // 预约时间
    orderDate: { type: Sequelize.DATE, allowNull: false },
    // 留言
    message: { type: Sequelize.STRING },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: "order",
  }
);
// 导出model
module.exports = Order;
