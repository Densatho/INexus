const gameConn = require("src/database/DBConnection/gamesConnection");

async function addTeam(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let game = await gameConn.getGameByTeamsAndDate(
        req.body.date,
        req.body.teamName1,
        req.body.teamName2
      );
      if (game === undefined) {
        let isCreated = await gameConn.add(
          req.body.date,
          req.body.leagueName,
          req.body.teamName1,
          req.body.teamName2
        );
        let resp = {
          isCreated: isCreated,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This game already exists",
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

export default addTeam;
