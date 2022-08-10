const { Router } = require("express");
const router = Router();
const { Recipe, Diet } = require("../db"); //importo los modelos

router.post("/", async (req, res, next) => {
  try {
    let { title, summary, healthScore, steps, diets } = req.body;

    let recipeCreate = await Recipe.create({
      title,
      summary,
      cookingMinutes,
      healthScore,
      steps,
    });

    for (let i = 0; i < diets.length; i++) {
      //devuelvo un array con la variable dietas (contiene los datos encontrados o recien creados) y la variable created (es un booleano que indica si es creado o no)
      let [diet, created] = await Diet.findOrCreate({
        where: {
          name: diets[i],
        },
      });

     recipeCreate.addDiet(diet);
    }

    res.status(200).send("recipe created successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
