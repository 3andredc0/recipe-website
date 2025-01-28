// MODEL RECIPE.JS

const mysql = require("mysql2/promise");
const settings = require("../config/settings.json").database;

const pool = mysql.createPool(settings);

const Recipe = {
    // Get all recipes
    getAll: async () => {
        const [rows] = await pool.execute("SELECT * FROM recipes");
        return rows;
    },

    // Get a specific recipe by ID
    getById: async (id) => {
        const [rows] = await pool.execute("SELECT * FROM recipes WHERE id = ?", [id]);
        return rows[0]; // Return the first row (recipe)
    },

    // Create a new recipe
    create: async (title, ingredients, instructions, time, coverImage, createdBy) => {
        const [result] = await pool.execute(
            "INSERT INTO recipes (title, ingredients, instructions, time, coverImage, createdBy) VALUES (?, ?, ?, ?, ?, ?)",
            [title, JSON.stringify(ingredients), instructions, time, coverImage, createdBy]
        );
        return result.insertId; // Return the ID of the newly created recipe
    },

    // Update a recipe
    update: async (id, title, ingredients, instructions, time, coverImage) => {
        await pool.execute(
            "UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, time = ?, coverImage = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
            [title, JSON.stringify(ingredients), instructions, time, coverImage, id]
        );
    },

    // Delete a recipe
    delete: async (id) => {
        await pool.execute("DELETE FROM recipes WHERE id = ?", [id]);
    }
};

module.exports = Recipe;