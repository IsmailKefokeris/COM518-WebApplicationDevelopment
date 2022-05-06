const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./sqlcon');
const fakeAuthentication = require('./middleware/fake_log');
const sessionChecker = require('./middleware/session_checker');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession); // We pass expressSession as an argument for the mysql.
const sessionStore = new MySQLStore( { }, db.promise()); // Create a new MySQLStore and we use our database object in promise mode
// to use it with express mysql session. This setups our mysql store

// Next we need to use expressSession as an item of Middlewear.
app.use(expressSession({
    // Specify the session store used.
    store: sessionStore,

    // A Secret used to digitally sign session cookie (use something unguessable such as random hexbytes)
    secret: '001GinieClyede',

    // Resave is regarding the internals of how the session saves work,we set it to false if we use a mysql store.
    resave: false,

    // Do setup the session before modifying session variables, false = we dont want to do that
    saveUninitialized: false,

    // This is important, rolling asks if we want to reset the cookie for every HTTP response, generally with sessions they have
    // a timeout (10min innactivity) from page refresh which would cause what ever the user was doing to timeout. this is annoying.
    // True is the sensible setting.
    rolling: true,

    // Destroy session (removes it from data store) once it is set to null or deleted.
    unset: 'destroy',

    // useful if using a proxy when accessing server, this allows the session variable to be passed through a proxy.
    proxy: true,

    // Properties of the session cookie
    cookie: {
        maxAge: 600000, // 600000ms = 10 mins expiry time
        httpOnly: false // allows client-side code to access the cookie (otherwise it would be kept to the HTTP messages)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const usersRouter = require('./routes/users');
require('dotenv').config();


app.use('/users', usersRouter);
app.use(express.static("public"));
// app.use(sessionChecker);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");


WEB_PORT = process.env.WEB_PORT;

const usersDAO = require('./usersDAO');


passport.use(new LocalStrategy(async(username, password, done)=> {
    const userDao = new usersDAO(db, "acc_users");
    try {
        const userDetails = await userDao.login(username, password);

        if(userDetails === null) {
            return done(null, false);
        } else {
            return done(null, userDetails);
        }
    } catch(e) {
        return done(e);
    }
}));


app.post('/login',

    passport.authenticate('local'),

    (req, res) => {
        res.json(req.user); 
    }
);




app.get("/", (req, res) => {
	res.render("login");
});







app.listen(WEB_PORT, () => {
    console.log(`Example app listening at https://classcontainer-mpmyd.run-eu-central1.goorm.io on port ${WEB_PORT}`);
    console.log(`or at localhost:${WEB_PORT}`);
	console.log(`You can access PHPMYADMIN @ https://inclasscontainer.run-eu-central1.goorm.io/phpmyadmin`);
});

