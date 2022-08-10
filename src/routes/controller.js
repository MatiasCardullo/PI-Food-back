require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");

const getDataFromApi = async () => {
  const apiAllData = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiMapResult = await apiAllData.data.results.map((api) => {
    return {
      vegetarian: api.vegetarian,
      id: api.id, 
      title: api.title,
      summary: api.summary, 
      cookingMinutes:api.cookingMinutes,
      healthScore: api.healthScore,
      steps: api.analyzedInstructions,
      image: api.image, 
      // dishTypes: api.dishTypes.map((dishtypes) => { 
      // return { name: dishtypes };
      //  }),
      dishTypes: api.dishTypes,
      diets: api.diets  //me retona un array de un objetos con la propiedad name y los valores mapeados
      // diets: api.diets.map((diet) => {
      //   return { name: diet }; 
      // }), //me retona un array de objetos con la propiedad name y los valores mapeados
    };
  });

  return apiMapResult;
};

const getDataFromDB = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"], //incluye el modelo Diet para generar la relacion
      through: {
        attributes: [], //trae todos en caso de que fueran mas sin la comprobacion through
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiMerge = await getDataFromApi();
  const dbMerge = await getDataFromDB();
  const dataMerge = [...apiMerge, ...dbMerge];
  return dataMerge;
};

module.exports = {
  getDataFromApi,
  getDataFromDB,
  getAllRecipes,
};
