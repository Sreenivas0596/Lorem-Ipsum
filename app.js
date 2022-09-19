const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "cricketMatchDetails.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log(process.env.PORT);
    app.listen(process.env.PORT || 3004, () => {
      console.log("Server Running at http://localhost:3004/");
    });
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//All Players

app.get("/players/", async (request, response) => {
  const getAllPlayersQuery = `
    SELECT 
        player_details.player_id as playerId,
        player_details.player_name as playerName
    FROM 
        player_details
    ORDER BY
        playerId;`;

  const allPlayersArray = await db.all(getAllPlayersQuery);

  response.send(allPlayersArray);
});

//single Player

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;

  const singlePlayerDetailsQuery = `
    SELECT
        player_details.player_id as playerId,
        player_details.player_name as playerName
    FROM
        player_details
    GROUP BY
        playerId
    HAVING
        playerId = ${playerId};`;

  const singlePlayer = await db.get(singlePlayerDetailsQuery);
  response.send(singlePlayer);
});

//Update players Details

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;

  const playerDetails = request.body;

  const { playerName } = playerDetails;

  const updatePlayerQuery = `
    UPDATE
        player_details
    SET
        player_name = "${playerName}"
    WHERE
        player_id = ${playerId};`;

  await db.run(updatePlayerQuery);

  response.send("Player Details Updated");
});

//Details of a match

app.get("/matches/:matchId", async (request, response) => {
  const { matchId } = request.params;

  const singleMatchDetailsQuery = `
    SELECT 
        match_details.match_id as matchId,
        match,
        year
    FROM
        match_details
    GROUP BY
        match_id
    HAVING
        matchId = ${matchId};`;

  const singleMatch = await db.get(singleMatchDetailsQuery);

  response.send(singleMatch);
});

//Matches of a Player
app.get("/players/:playerId/matches/", async (request, response) => {
  const { playerId } = request.params;

  const allMatchesOfAPlayer = `
    SELECT 
        match_details.match_id as matchId,
        match,
        year
    FROM
        match_details JOIN player_match_score
        ON match_details.match_id = player_match_score.match_id
        JOIN player_details 
        ON player_details.player_id = player_match_score.player_id
    WHERE
        player_details.player_id = ${playerId};`;

  const allMatches = await db.all(allMatchesOfAPlayer);

  response.send(allMatches);
});

//specific Match player

app.get("/matches/:matchId/players/", async (request, response) => {
  const { matchId } = request.params;

  const specificMatchDetailsQuery = `
    SELECT 
        player_details.player_id as playerId,
        player_details.player_name as playerName
    FROM 
        player_details JOIN player_match_score 
        ON player_details.player_id = player_match_score.player_id
        JOIN match_details
        ON player_match_score.match_id = match_details.match_id
    WHERE
        match_details.match_id = ${matchId};`;

  const specificMatch = await db.all(specificMatchDetailsQuery);

  response.send(specificMatch);
});

//Stats of a player

app.get("/players/:playerId/playerScores/", async (request, response) => {
  const { playerId } = request.params;

  const statsOfAPlayerQuery = `
    SELECT 
        player_details.player_id as playerId,
        player_details.player_name as playerName,
        SUM(player_match_score.score) as totalScore,
        SUM(player_match_score.fours) as totalFours,
        SUM(player_match_Score.sixes) as totalSixes
    FROM
        player_details JOIN player_match_score
        ON player_details.player_id = player_match_score.player_id
    WHERE
        player_details.player_id = ${playerId};`;

  const statsOfAPlayer = await db.get(statsOfAPlayerQuery);
  response.send(statsOfAPlayer);
});

module.exports = app;
