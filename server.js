const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");



async function getDBConnection() {
    const db = await sqlite.open({
        filename: "./Chinook_Sqlite.sqlite",
        driver: sqlite3.Database,
    });

    return db;
}



function updateLeaderboard() {
    let db = getDBConnection();
    const sqlString = "SELECT * FROM results limit 5";
    let rows = db.all(sqlString);
    console.log(rows); snake.js


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

updateLeaderboard();