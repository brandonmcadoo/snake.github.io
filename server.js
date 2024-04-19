"use strict"
const express = require("express");

const app = express();
const port = 3000;
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
app.use('/public', express.static('public'));



async function getDBConnection() {
    const db = await sqlite.open({
        filename: "./results.db", //This datbase file should exist
        driver: sqlite3.Database,
    });

    return db;
}


app.get("/lb", async (req, res) => {
    let db = await getDBConnection();
    const sqlString = "SELECT * FROM results limit 5";
    let rows = await db.all(sqlString);
    res.json(rows);
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


// setInterval(() => {
//     updateLeaderboard();
// }, 5000);
//updateLeaderboard().catch(console.error);
// This is how you catch a async function
