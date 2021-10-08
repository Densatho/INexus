const leagueConn = require("src/database/DBConnection/leagueConnection");
const { formatDateWithHour } = require("src/database/formatDate");

async function getLeagueByName(req, res) {
  let leagueName = req.query.leagueName;
  let league = await leagueConn.getLeagueByName(leagueName);
  let isDeleted;

  if (league) {
    if (req.method === "PUT") {
      const updatedLeague = await leagueConn.update(
        league.dataValues.LEAGUE_NAME,
        req.body.leagueName,
        req.body.region
      );
      if (updatedLeague) {
        league = await leagueConn.getLeagueByName(
          req.body.leagueName ? req.body.leagueName : leagueName
        );
      }
    } else if (req.method === "DELETE") {
      isDeleted = leagueConn.delete(leagueName);
    }
    res.json(!isDeleted ? league : { isDeleted: isDeleted });
  } else {
    res.status(500).json({
      message: "This league name doesn't exists",
    });
  }
}

export default getLeagueByName;
