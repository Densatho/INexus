const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been establieshed succesfully");
  } catch (error) {
    console.log("Unable to connect to the database.", error);
  }
};
authenticate();
