const express = require("express");
const app = express();

WEB_PORT = 5050;

const allSongs = [
    {
        single: "Youre the One That I Want",
        artist: "John Travolta",
        recordL: "RSO",
        released: 1978,
    },
    {
        single: "YMCA",
        artist: "Avicii",
        recordL: "Mercury",
        released: 1978,
    },
    {
        single: "Wonderwall",
        artist: "Avicii",
        recordL: "Creation",
        released: 1995,
    },
    {
        single: "Wake me up",
        artist: "Avicii",
        recordL: "Positiva",
        released: 2013,
    },
    {
        single: "Uptown funk",
        artist: "Bruno mars",
        recordL: "RCA",
        released: 2014,
    },
    {
        single: "Tears",
        artist: "Ken Dodd",
        recordL: "Columbia",
        released: 1965,
    },
];

app.get("/", (req, res) => {
    res.send("Root Page: Hello World!");
});

app.get("/artist/:name", (req, res) => {
    const matchingSongs = allSongs.filter(
        (song) => song.artist.toLowerCase() == req.params.name.toLowerCase()
    );

    res.json(matchingSongs);
});

app.get("/artist/:name/song/:song", (req, res) => {
    const matchingSongs = allSongs.filter(
        (song) =>
            song.single.toLowerCase() == `${req.params.song}`.toLowerCase() &&
            song.artist.toLowerCase() == `${req.params.name}`.toLowerCase()
    );

    res.json(matchingSongs);
});

app.get("/topSongs", (req, res) => {
    res.send(allSongs);
});

app.get("/jsonExample2/:name/:age", (req, res) => {
    const obama = {
        name: `${req.params.name}`,
        age: req.params.age,
        nationality: "US",
        job: "US President 2008-16",
    };
    res.json(obama);
});

app.listen(WEB_PORT, () => {
    console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
