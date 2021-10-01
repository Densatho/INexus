const { Op } = require("sequelize");
const User = require("../models/user");

module.exports = {
  async getAll() {
    try {
      let users = await User.findAll({
        attributes: [
          "NICKNAME",
          "BALANCE",
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
          "BALANCE",
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
          "BALANCE",
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
    try {
      await User.create({
        NICKNAME: nickname,
        NAME: name,
        LASTNAME: lastName,
        HASHED_PASSWORD: password,
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
  async addAdmin(nickname) {
    try {
      await User.update(
        {
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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async deleteAdmin(nickname) {
    try {
      await User.update(
        {
          IS_ADMIN: false,
        },
        {
          where: {
            NICKNAME: {
              [Op.eq]: nickname,
            },
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async update(
    nickname,
    name,
    lastName,
    password,
    birthday,
    cpf,
    email,
    balance
  ) {
    try {
      if (password) {
        await User.update(
          {
            NAME: name,
            LASTNAME: lastName,
            HASHED_PASSWORD: password,
            BIRTHDAY: new Date(birthday),
            CPF: cpf,
            EMAIL: email,
            BALANCE: balance,
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
            BALANCE: balance,
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
  async isAdmin(nickname) {
    try {
      let user = await this.getUserByNicknameLogin(nickname);
      return user.dataValues.IS_ADMIN;
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
