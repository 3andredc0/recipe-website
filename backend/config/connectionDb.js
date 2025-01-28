const mysql = require("mysql2/promise");
const settings = require("./settings.json");

const connectDb = async () => {
    try {
        const dbSettings = settings.database;
        const connection = await mysql.createPool({
            host: dbSettings.host,
            user: dbSettings.user,
            password: dbSettings.password,
            database: dbSettings.database,
            port: dbSettings.port,
            connectionLimit: dbSettings.connectionLimit
        });
        console.log("Connected to MySQL...");
        return connection;
    } catch (err) {
        console.error("Failed to connect to MySQL:", err.message);
        process.exit(1);
    }
};

module.exports = connectDb;