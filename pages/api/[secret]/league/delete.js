const LeagueConn = require("src/database/DBConnection/leagueConnection");

async function deleteUser(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let league = await LeagueConn.getLeagueByName(req.body.leagueName);
      if (league !== undefined) {
        let isDeleted = await LeagueConn.delete(league.dataValues.LEAGUE_NAME);
        let resp = {
          isDeleted: isDeleted,
        };
        res.json(resp);
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
  } else {
    res.status(500).json({
      message: "Sorry, we only accept PUT requests",
    });
  }
}

export default deleteUser;
