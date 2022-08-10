const { Router } = require("express");
const router = Router();
const { Diet } = require("../db"); //importo los modelos

/*router.get("/", async (req, res, next) => {

  try {
     const diets = [
       "gluten free",
       "dairy free",
       "lacto ovo vegetarian",
       "vegan",
      "paleolithic",
       "primal",
      "whole 30",
      "pescatarian",
      "fodmap friendly",
      "ketogenic",
       "vegetarian"
     ];

     // Creating a new diet if it doesn't exist.
    diets.forEach((el) => {
      Diet.findOrCreate({
         where: { name: el }, //por cada tipo de dieta
      });
     });

     // A way to make sure that all the diets are created before sending the response. 
     let allTypes = await Diet.findAll();
     // It's a way to make sure that all the diets are created before sending the response.
      while (allTypes.length !== diets.length) allTypes = await Diet.findAll();
     res.status(200).send(allTypes);

     } catch (error) {
    next(error);
   }
 });*/

const dietTypes = async () => {
  const diets = await Diet.findAll();
  if (diets.length) {
    return diets;
  }
  const types = [
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegan",
    "paleolithic",
    "primal",
    "whole 30",
    "pescatarian",
    "fodmap friendly",
    "ketogenic",
    "vegetarian",
  ];

  types.map(async (d) => {
    await Diet.findOrCreate({
      where: { name: d },
    });
  });
  return await Diet.findAll();
}

router.get("/", async (req, res) => {
  try {
    const diets = await dietTypes();
    res.send(diets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
