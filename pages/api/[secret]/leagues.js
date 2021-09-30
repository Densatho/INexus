const leagueConn = require("src/database/DBConnection/leagueConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getAllLeagues(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
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
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getAllLeagues;
