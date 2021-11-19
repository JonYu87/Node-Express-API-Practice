const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

app.get("/recipes", function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    //get recipe names from data.json and give status code 200
    res.send({
      recipeNames: JSON.parse(data).recipes.map((recipe) => recipe.name),
    });
  });
  res.status(200);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
