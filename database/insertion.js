const userConn = require("./DBConnection/userConnection");

nickname = "Densatho";
name = "Dennis Santos";
lastName = "Jacintho";
password = "Teste";
birthday = "11/10/2000";
cpf = "012.345.678-90";
email = "dsjacinthotre@gmail.com";

async function teste() {
  const user = await userConn.createUser(
    nickname,
    name,
    lastName,
    password,
    birthday,
    cpf,
    email
  );
  console.log(user);
}

teste();
