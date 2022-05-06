require('dotenv').config();

function sessionChecker(req, res, next) {
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if(req.session.username) { 
            next();
        } else {
            res.status(401).json({error: "You're not logged in. Go away!"});
        }
    }
}

module.exports = sessionChecker;
