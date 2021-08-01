
const express = require("express");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/libraryDB", { useUnifiedTopology: true, useNewUrlParser: true });


const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));





app.get("/", function (req, res) {
    res.render("index");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.listen("3000", function () {
    console.log("server is running on port 3000");
});