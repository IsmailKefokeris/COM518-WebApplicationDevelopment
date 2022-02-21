const express = require("express");
const app = express();
const mysql = require('mysql2');
const bodyParser = require("body-parser");


app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
	password: 'toor',
    database: 'artist_location'
});


WEB_PORT = 3000;


app.get("/", (req, res) => {
	res.render("home");
});


app.get("/hometown/:artist", (req, res) => {
    db.query(`SELECT * FROM artists WHERE name LIKE ?`,
    [req.params.artist], (error, results, fields) => {
        if(error){
            res.status(500).json({ error: error });
        } else if(results.length > 0){
            console.log(`got results: ${results}`)
            res.json(results);
        } else {
            res.status(404).json({error: `Unable to Find the Artists ${req.params.artist}`});
        }
    })
});






app.listen(WEB_PORT, () => {
    console.log(`Example app listening at https://classcontainer-mpmyd.run-eu-central1.goorm.io on port ${WEB_PORT}`);
    console.log(`or at localhost:${WEB_PORT}`);
	console.log(`You can access PHPMYADMIN @ https://inclasscontainer.run-eu-central1.goorm.io/phpmyadmin`);
});

