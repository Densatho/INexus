const TeamConn = require("src/database/DBConnection/teamConnection");

async function addTeam(req, res) {
  if (req.method === "PUT") {
    if (req.query.secret === process.env.API_SECRET) {
      let team = await TeamConn.getTeamByName(req.body.teamName);
      if (team === undefined) {
        let isCreated = await TeamConn.add(req.body.teamName);
        let resp = {
          isCreated: isCreated,
        };
        res.json(resp);
      } else {
        res.status(500).json({
          message: "This team name already exists",
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
