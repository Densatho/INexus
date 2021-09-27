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
  HASHED_PASSWORD: {
    type: DataTypes.STRING(64),
    allowNull: false,
    is: /^[0-9a-f]{64}$/i,
  },
  BIRTHDAY: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  HASHED_CPF: {
    type: DataTypes.STRING(64),
    allowNull: false,
    is: /^[0-9a-f]{64}$/i,
  },
  AVATAR_URL: {
    type: DataTypes.TEXT,
  },
  EMAIL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

class User extends Model {
  login(password) {
    if (bcrypt.compareSync(password, this.HASHED_PASSWORD)) {
      console.log("Login");
    }
  }
}
User.init(databaseConfig, { sequelize, modelName: "USER" });

module.exports = User;
