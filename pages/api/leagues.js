const leagueConn = require("src/database/DBConnection/leagueConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getAllLeagues(req, res) {
  let leagues = await leagueConn.getAll();
  let leagueList = [];

  leagues.forEach((league) => {
    league.dataValues.createdAt = formatDateWithHour(
      league.dataValues.createdAt
    );
    league.dataValues.updatedAt = formatDateWithHour(
      league.dataValues.updatedAt
    );
    leagueList.push(league.dataValues);
  });

  res.json(leagueList);
}

export default getAllLeagues;
