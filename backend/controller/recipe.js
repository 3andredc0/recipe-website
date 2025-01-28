// CONTROLLER RECIPE.JS

const Recipes = require("../models/recipe");
const multer = require('multer');

// Set up multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.getAll();
    return res.json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching recipes" });
  }
};

// Get a specific recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.getById(req.params.id);  
    res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching recipe" });
  }
};

// Add a new recipe
const addRecipe = async (req, res) => {
  console.log(req.user);
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.json({ message: "Required fields can't be empty" });
  }

  try {
    const newRecipe = await Recipes.create(
      title, 
      ingredients, 
      instructions, 
      time, 
      req.file.filename, 
      req.user.id
    );  

    return res.json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Error adding recipe" });
  }
};

// Edit an existing recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  
  try {
    // 1. Check if recipe exists
    const recipe = await Recipes.getById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // 2. Authorization check
    if (recipe.createdBy !== req.user.id && !req.user.admin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 3. Proceed with update
    let coverImage = req.file?.filename ? req.file.filename : recipe.coverImage;
    await Recipes.update(
      req.params.id, 
      title, 
      ingredients, 
      instructions, 
      time, 
      coverImage
    );

    res.json({ title, ingredients, instructions, time });
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe" });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    await Recipes.delete(req.params.id);  
    // Authorization check
    if (recipe.createdBy !== req.user.id && !req.user.admin) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    res.json({ status: "ok" });
  } catch (err) {
    return res.status(400).json({ message: "Error deleting recipe" });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };