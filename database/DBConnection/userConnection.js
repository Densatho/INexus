const { Op } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  async getAllUsers() {
    try {
      let users = await User.findAll({
        attributes: ["NICKNAME", "BIRTHDAY", "AVATAR_URL", "EMAIL"],
      });
      return users;
    } catch (error) {}
  },
  async getUserByNickname(nickname) {
    let user;
    try {
      user = await User.findAll({
        where: {
          NICKNAME: {
            [Op.eq]: nickname,
          },
        },
      });
      return user[0];
    } catch (error) {}
  },
  async createUser(nickname, password, birthday, cpf, email) {
    let hashed_password = bcrypt.hashSync(password, 10);
    let hashed_cpf = bcrypt.hashSync(cpf, 10);

    try {
      await User.create({
        NICKNAME: nickname,
        HASHED_PASSWORD: hashed_password,
        BIRTHDAY: new Date(birthday),
        HASHED_CPF: hashed_cpf,
        EMAIL: email,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};
