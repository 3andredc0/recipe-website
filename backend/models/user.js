// MODEL USER.JS

const mysql = require("mysql2/promise");
const settings = require("../config/settings.json").database;

const pool = mysql.createPool(settings);

const User = {
    // Get a specific user by email
    getByEmail: async (email) => {
        const [rows] = await pool.execute("SELECT id, email, password, admin FROM users WHERE email = ?", [email]);
        return rows[0];
    },

    getById: async (id) => {
        const [rows] = await pool.execute("SELECT id, email, admin FROM users WHERE id = ?", [id]);
        return rows[0];
    },

    // Create a new user
    create: async (email, password) => {
        const [result] = await pool.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, password]
        );
        return result.insertId; // Return the ID of the newly created user
    },

    // Update a user's password
    updatePassword: async (id, password) => {
        await pool.execute(
            "UPDATE users SET password = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
            [password, id]
        );
    },

    // Delete a user
    delete: async (id) => {
        await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    }
};

module.exports = User;