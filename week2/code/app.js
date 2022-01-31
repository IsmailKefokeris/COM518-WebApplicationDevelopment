const express = require("express");
const app = express();

WEB_PORT = 5050;

app.get("/", (req, res) => {
	res.send("HELLO WORLD")
});


app.listen(WEB_PORT, () => {
    console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
