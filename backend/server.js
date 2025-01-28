const express = require("express");
const app = express();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const settings = require("./config/settings.json"); 
const dotenv=require("dotenv").config();

const PORT = settings.server.port || 3000; 
connectDb(); 

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));
app.use("/favorite", require("./routes/favorite"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting the server:", err);
    } else {
        console.log(`App is listening on port ${PORT}`);
    }
});