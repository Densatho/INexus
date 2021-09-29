const userConn = require("./DBConnection/userConnection");

nickname = "shollzz";
name = "Lucas Henrique";
lastName = "Azzi";
password = "Teste";
birthday = "8/1/2000";
cpf = "012.345.678-90";
email = "lucashazzi@gmail.com";

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
