const leagueConn = require("src/database/DBConnection/leagueConnection");

async function getLeagueByName(req, res) {
  if (req.query.secret === process.env.API_SECRET) {
    let leagueName = req.query.leagueName;
    let league = await leagueConn.getLeagueByName(leagueName);

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
      }
      res.json(league);
    } else {
      res.status(500).json({
        message: "This league name doesn't exists",
      });
    }
  } else {
    res.status(500).json({
      message: "Sorry, your secret is invalid",
    });
  }
}

export default getLeagueByName;
