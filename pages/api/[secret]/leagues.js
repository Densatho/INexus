const leagueConn = require("src/database/DBConnection/leagueConnection");

function formatDateWithHour(date) {
  date = new Date(date);
  let formatedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}:${date.getHours()} hour(s) and ${date.getMinutes()} minute(s)`;
  return formatedDate;
}

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
