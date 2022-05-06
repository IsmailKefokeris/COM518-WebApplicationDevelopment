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

usersRouter.get("/login", (req, res) => {
    // Login GET Route 
    // retrieves currently logged in user
    res.json({username: req.session.username || null} );
});

usersRouter.get("/login_page", (req, res) => {
    res.render("login");
});

usersRouter.post("/login", (req, res) => {
    // Login POST Route
    console.log("FORM SUBMITTED");
});

usersRouter.post("/logout", (req, res) => {
    // logout POST Route 
    req.session = null;
    res.json({'success': 1 });
});


module.exports = usersRouter;