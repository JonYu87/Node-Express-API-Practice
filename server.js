const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json())

app.get("/getRecipes", function (req, res) {
    fs.readFile("./data.json","utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(JSON.parse(data));
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
