const express = require("express");
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ismailk',
	password: 'ismailk',
    database: 'waddb'
});


WEB_PORT = 3000;

app.get("/", (req, res) => {
	res.send("HELLO");
});

app.get("/songs/:artist", (req, res) => {
	db.query(`SELECT * FROM wadsongs WHERE artist=?`,
			[req.params.artist], (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else {
            res.json(results);
        }
	})
});



app.listen(WEB_PORT, () => {
    console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
