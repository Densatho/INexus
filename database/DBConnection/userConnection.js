const { Op } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  async getAll() {
    try {
      let users = await User.findAll({
        attributes: [
          "NICKNAME",
          "NAME",
          "LASTNAME",
          "CPF",
          "BIRTHDAY",
          "AVATAR_URL",
          "EMAIL",
          "createdAt",
          "updatedAt",
        ],
      });
      return users;
    } catch (error) {}
  },
  async getAllAdmins() {
    try {
      let admin = await User.findAll({
        attributes: [
          "NICKNAME",
          "NAME",
          "LASTNAME",
          "CPF",
          "BIRTHDAY",
          "AVATAR_URL",
          "EMAIL",
          "createdAt",
          "updatedAt",
        ],
        where: {
          IS_ADMIN: {
            [Op.eq]: true,
          },
        },
      });
      return admin;
    } catch (error) {}
  },
  async getUserByNicknameLogin(nickname) {
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
  async getUserByNickname(nickname) {
    let user;
    try {
      user = await User.findAll({
        attributes: [
          "NICKNAME",
          "NAME",
          "LASTNAME",
          "CPF",
          "BIRTHDAY",
          "AVATAR_URL",
          "EMAIL",
          "createdAt",
          "updatedAt",
        ],
        where: {
          NICKNAME: {
            [Op.eq]: nickname,
          },
        },
      });
      return user[0];
    } catch (error) {}
  },
  async add(nickname, name, lastName, password, birthday, cpf, email) {
    let hashed_password = bcrypt.hashSync(password, 10);

    try {
      await User.create({
        NICKNAME: nickname,
        NAME: name,
        LASTNAME: lastName,
        HASHED_PASSWORD: hashed_password,
        BIRTHDAY: new Date(birthday),
        CPF: cpf,
        EMAIL: email,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async addAdmin(nickname, name, lastName, password, birthday, cpf, email) {
    let hashed_password = bcrypt.hashSync(password, 10);

    try {
      await User.create({
        NICKNAME: nickname,
        NAME: name,
        LASTNAME: lastName,
        HASHED_PASSWORD: hashed_password,
        BIRTHDAY: new Date(birthday),
        CPF: cpf,
        EMAIL: email,
        IS_ADMIN: true,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async update(nickname, name, lastName, password, birthday, cpf, email) {
    try {
      if (password) {
        let hashed_password = bcrypt.hashSync(password, 10);
        await User.update(
          {
            NAME: name,
            LASTNAME: lastName,
            HASHED_PASSWORD: hashed_password,
            BIRTHDAY: new Date(birthday),
            CPF: cpf,
            EMAIL: email,
            IS_ADMIN: true,
          },
          {
            where: {
              NICKNAME: {
                [Op.eq]: nickname,
              },
            },
          }
        );
      } else {
        await User.update(
          {
            NAME: name,
            LASTNAME: lastName,
            BIRTHDAY: new Date(birthday),
            CPF: cpf,
            EMAIL: email,
            IS_ADMIN: true,
          },
          {
            where: {
              NICKNAME: {
                [Op.eq]: nickname,
              },
            },
          }
        );
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async delete(nickname) {
    try {
      await User.destroy({
        where: {
          NICKNAME: {
            [Op.eq]: nickname,
          },
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
