const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

// app.use(express.json());

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

app.get("/recipes/details/:recipeName", function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    }
    //get recipe ingredients details from data.json and give status code 200
    res.send({
      details: {
        ingredients: JSON.parse(data).recipes.find(
          (recipe) => recipe.name === req.params.recipeName
        ).ingredients,
      },
      //number of steps it takes to make the recipe
      numSteps: JSON.parse(data).recipes.find(
        (recipe) => recipe.name === req.params.recipeName
      ).instructions.length,
    });
  });
  res.status(200);
});

app.listen(port, () => {
  console.log(`Live on localhost ${port}!`);
});
