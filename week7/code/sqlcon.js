const mysql = require('mysql2');
require('dotenv').config();



const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
	password: process.env.DB_PSSWRD,
    database: process.env.DB_DBASE
});


db.connect( err=> {
    if(err) {
        console.log(err);
        process.exit(1); // exit the server
    } else { 
        console.log('connected to mysql ok');
    }
});

module.exports = db;