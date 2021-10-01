const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../config");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(config);

const databaseConfig = {
  NICKNAME: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
  },
  NAME: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  LASTNAME: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  HASHED_PASSWORD: {
    type: DataTypes.STRING(64),
    allowNull: false,
    is: /^[0-9a-f]{64}$/i,
  },
  BIRTHDAY: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  CPF: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  AVATAR_URL: {
    type: DataTypes.TEXT,
  },
  EMAIL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  IS_ADMIN: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  BALANCE: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
};

class User extends Model {
  getNickname() {
    return this.NICKNAME;
  }
  getIsAdmin() {
    return this.IS_ADMIN;
  }
}
User.init(databaseConfig, { sequelize, modelName: "USER" });

module.exports = User;
