require('dotenv').config();


function fakeLog(req, res, next) {

    if(process.env.APP_USER === undefined) {
        // process.env.APP_USER does not exist (it's undefined)
        // Return a 401 (Unauthorized) HTTP code, with a JSON error message
        res.status(401).json({error: "You're not logged in. Go away!"});
    } else {
        // username exists, carry on...
    }
    next();
}



module.exports = fakeLog;