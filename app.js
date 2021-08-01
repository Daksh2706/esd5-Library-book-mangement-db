
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/libraryDB", { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render("index");
});

let msg = "";

app.get("/login", function (req, res) {
    res.render("login", { msg: msg });
});

app.post("/login", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            users.forEach(function (user) {
                if (user.email == email && user.password == password) {
                    res.render("home");
                } else {
                    msg = "Incorrect email or password";
                    res.redirect("/login");
                }
            })
        }

    })

});

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {
    console.log(req.body);
    let user_name = req.body.name;
    let user_email = req.body.email;
    let user_address = req.body.address;
    let user_password = req.body.password;

    const user = new User({
        name: user_name,
        email: user_email,
        address: user_address,
        password: user_password,
    });

    user.save();
    res.redirect("/");
});

app.listen("3000", function () {
    console.log("server is running on port 3000");
});