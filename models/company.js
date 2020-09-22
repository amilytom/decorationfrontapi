// 引入Sequelize模块
const Sequelize = require("sequelize");

// 引入数据库实例
const db = require("../db");

// 定义model
const Company = db.define(
  "Company",
  {
    // 主键id
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 企业名称
    name: { type: Sequelize.STRING(50), allowNull: false },
    // 企业地址
    address: { type: Sequelize.STRING, allowNull: false },
    // 企业电话
    tel: { type: Sequelize.STRING(30), allowNull: false },
    // 企业简介
    intro: { type: Sequelize.TEXT, allowNull: false },
    // 企业坐标经度
    longitude: { type: Sequelize.DECIMAL(6), allowNull: false },
    // 企业坐标纬度
    latitude: { type: Sequelize.DECIMAL(6), allowNull: false },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // MySQL数据库表名
    tableName: "company",
  }
);
// 导出model
module.exports = Company;
