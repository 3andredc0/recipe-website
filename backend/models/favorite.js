// MODEL FAVORITE.JS

const mysql = require("mysql2/promise");
const pool = mysql.createPool(require("../config/settings.json").database);

const Favorite = {
    // Add a favorite
    add: async (userId, recipeId) => {
        await pool.execute(
            "INSERT INTO favorites (userId, recipeId) VALUES (?, ?)",
            [userId, recipeId]
        );
    },

    // Remove a favorite
    remove: async (userId, recipeId) => {
        await pool.execute(
            "DELETE FROM favorites WHERE userId = ? AND recipeId = ?",
            [userId, recipeId]
        );
    },

    // Get all favorites for a user
    getByUser: async (userId) => {
        const [rows] = await pool.execute(`
            SELECT recipes.* 
            FROM favorites 
            JOIN recipes ON favorites.recipeId = recipes.id 
            WHERE favorites.userId = ?
        `, [userId]);
        return rows;
    }
};

module.exports = Favorite;