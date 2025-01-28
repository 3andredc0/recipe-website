// CONTROLLER FAVORITE.JS

const Favorite = require("../models/favorite");

const addFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.params.recipeId;
        await Favorite.add(userId, recipeId);
        return res.json({ status: "added" });
    } catch (err) {
        return res.status(500).json({ message: "Error adding favorite" });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.params.recipeId;
        await Favorite.remove(userId, recipeId);
        return res.json({ status: "removed" });
    } catch (err) {
        return res.status(500).json({ message: "Error removing favorite" });
    }
};

const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await Favorite.getByUser(userId);
        return res.json(favorites);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching favorites" });
    }
};

module.exports = { addFavorite, removeFavorite, getFavorites };