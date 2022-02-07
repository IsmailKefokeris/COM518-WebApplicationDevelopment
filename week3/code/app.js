const express = require("express");
const app = express();
const mysql = require('mysql2');

app.use(express.static("public"))
app.set("view engine", "ejs");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ismailk',
	password: 'ismailk',
    database: 'waddb'
});


WEB_PORT = 3000;

app.get("/", (req, res) => {
	res.render("home");
});


app.get("/songs", (req, res) => {
	db.query(`SELECT * FROM wadsongs`, (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else {
            res.json(results);
        }
	})
});

// Search by artist
app.get("/songs/artist/:artist", (req, res) => {
	db.query(`SELECT * FROM wadsongs WHERE artist LIKE ?`,
			[req.params.artist], (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else {
            res.json(results);
        }
	})
});

// Search by title
app.get("/songs/title/:title", (req, res) => {
	db.query(`SELECT * FROM wadsongs WHERE title LIKE ?`,
			[req.params.title], (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else {
            res.json(results);
        }
	})
});

// Search by artist and title
app.get("/songs/artist/:artist/title/:title", (req, res) => {
	db.query(`SELECT * FROM wadsongs WHERE title LIKE ? AND artist LIKE ?`,
			[req.params.title, req.params.artist], (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else {
            res.json(results);
        }
	})
});

// Search for song with ID
app.get("/songs/:ID", (req, res) => {
	db.query(`SELECT * FROM wadsongs WHERE ID=?`,
			[req.params.ID], (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else {
            res.json(results);
        }
	})
});


// Buy a copy of a song
app.post("/songs/buy/:ID", (req, res) => {
	db.query(`UPDATE wadsongs SET quantity = quantity -1 WHERE ID=?`, 
			 [req.params.ID], (error, results, fields) => {
		if(error){
			res.status(500).json({ error: error });
		} else if(results.affectedRows==1) {
            res.json({'message': 'Successfully bought.'});
        } else {
            res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
        }
	})
})

app.delete("/songs/delete/:ID", (req, res) => {
	db.query(`DELETE FROM wadsongs WHERE ID=?`,
			[req.params.ID], (error, results, fields) => {
		if(error){
			res.status(500).json({error:error})
		} else if(results.affectedRows=1){
			res.json("Successfully Deleted Item")
		} else {
			res.status(404).json({error:"No Rows were updated...."})
		}
	})
})


app.listen(WEB_PORT, () => {
    console.log(`Example app listening at https://classcontainer-mpmyd.run-eu-central1.goorm.io on port ${WEB_PORT}`);
	console.log(`You can access PHPMYADMIN @ https://inclasscontainer.run-eu-central1.goorm.io/phpmyadmin`);

});
