const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");
const cors = require("cors");

const app = express();
app.use(cors());

console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("PORT:", process.env.PORT);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    console.error("Error: MONGO_URL environment variable is not set.");
    process.exit(1);  
}

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((e) => {
        console.error("Error connecting to DB", e);
    });

app.use(express.json());
app.use('/user', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
