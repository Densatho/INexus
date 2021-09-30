const LeagueConn = require("src/database/DBConnection/leagueConnection");

async function addLeague(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let league = await LeagueConn.getLeagueByName(req.body.leagueName);
      if (league === undefined) {
        let isCreated = await LeagueConn.add(
          req.body.leagueName,
          req.body.region
        );
        let resp = {
          isCreated: isCreated,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This League name already exists",
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

export default addLeague;
