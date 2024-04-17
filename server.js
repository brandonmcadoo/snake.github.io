"use strict"
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");



async function getDBConnection() {
    const db = await sqlite.open({
        filename: "./results.sqlite", //This datbase file should exist
        driver: sqlite3.Database,
    });

    return db;
}


//This function should be async.
async function updateLeaderboard() {
    // Need to await here.!!
    let db = await getDBConnection();
    const sqlString = "SELECT * FROM results limit 5";
    let rows = db.all(sqlString);
    console.log(rows); //removed typo here


    rows.forEach((item) => {
        let table = document.getElementById(scoretable);
        let tableRow = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");

        let name = document.createTextNode(item.name);
        let score = document.createTextNode(item.score);

        cell1.appendChild(name);
        cell2.appendChild(score);
        tableRow.appendChild(cell1)
        tableRow.appendChild(cell2)
        table.appendChild(tableRow);
    });
}


// setInterval(() => {
//     updateLeaderboard();
// }, 5000);

updateLeaderboard().catch(console.error);
// This is how you catch a async function
