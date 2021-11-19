const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json())

app.get("/recipes", function (req, res) {
    fs.readFile("./data.json","utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(JSON.parse(data));
        console.log(JSON.parse(data));
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
