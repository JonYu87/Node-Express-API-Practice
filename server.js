const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

// app.use(express.json());

app.get("/recipes", function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    let allRecipes = JSON.parse(data).recipes.map((recipe) => recipe.name);
    if (err) {
      console.log(err);
    }
    //get recipe names from data.json and give status code 200
    res.send({
      recipeNames: allRecipes,
    });
  });
  res.status(200);
});

app.get("/recipes/details/:recipeName", function (req, res) {
  fs.readFile("./data.json", "utf8", function (err, data) {
    let currentRecipe = JSON.parse(data).recipes.find(
      (recipe) => recipe.name === req.params.recipeName
    );
    if (currentRecipe) {
      //get recipe ingredients details from data.json and give status code 200
      res.send({
        details: {
          ingredients: currentRecipe.ingredients,
        },
        //number of steps it takes to make the recipe
        numSteps: currentRecipe.instructions.length,
      });
      res.status(200);
    } else {
      //give status code 404
      res.status(404);
      res.send({ error: "Recipe does not exist" });
    }
  });
});

app.listen(port, () => {
  console.log(`Live on localhost ${port}!`);
});
