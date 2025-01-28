// ROUTER FAVORITE.JS

const express = require("express");
const router = express.Router();
const { addFavorite, removeFavorite, getFavorites } = require("../controller/favorite");
const verifyToken = require("../middleware/auth");

router.post("/:recipeId", verifyToken, addFavorite);
router.delete("/:recipeId", verifyToken, removeFavorite);
router.get("/", verifyToken, getFavorites);

module.exports = router;