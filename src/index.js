const express = require("express"); // Import Express
const path = require("path"); // Import path module
const bcrypt = require("bcrypt"); // Import bcrypt
const collection = require("./config.js"); // Import collection from config.js

const app = express(); // Initialize Express

const port = 8080; // Port number
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.set("view engine", "ejs"); // Set view engine to EJS

app.use(express.static("public")); // Set static folder

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});