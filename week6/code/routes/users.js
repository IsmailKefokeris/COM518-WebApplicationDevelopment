const express = require('express');
const usersRouter = express.Router();
const db = require('../sqlcon');



usersRouter.get("/allUsers", (req, res) => {
    // returns details of all users as JSON
    db.query(`SELECT * FROM ht_users`, (error, results, fields) => {
        if(error) {
            res.status(500).json({ error: error });
        } else {
            // console.log(`got results: ${results}`)
            res.json(results);
        }
    });
});

usersRouter.get("/user/:username", (req, res) => {
    // returns details of a specific user, identified by username
    db.query(`SELECT * FROM ht_users WHERE username LIKE ?`, 
    [req.params.username], (error, results, fields) => {
        if(error) {
            res.status(500).json({ error: error });
        } else {
            // console.log(`got results: ${results}`)
            res.json(results);
        }
    });
});



module.exports = usersRouter;