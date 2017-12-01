var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var Parking = require("../models/parking");
var User = require("../models/user");


//root route
//INDEX - show all parking
router.get("/", function (req, res) {
    // res.send("this will be the home page sooon!!");
    //Get all parkings from DB
    console.log(req.user);
    Parking.find({}, function (err, allParkings) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { parking: allParkings });
        }
    })
    // res.render("index");
});

//show aboutus form
router.get("/about", function (req, res) {
    res.render("about");
});

//show contactus form
router.get("/contact", function (req, res) {
    res.render("contact");
});

//============
//AUTH ROUTES
//============

//show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    // res.send("Signing you up...");
    var newUser = new User({ username: req.body.username, email: req.body.email });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) { //if username has been in DB คือมีชื่อซ้ำ
            console.log(err);
            return res.render("cantregis");
        }
        //Can register
        passport.authenticate("local")(req, res, function () {
            res.render("canregister");
        })
    });
});

// show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res) {
        // res.send("LOGIN LOGIC HAPPEN HERE");
    });

//logout route
router.get("/logout", function (req, res) {
    req.logout();
    // console.log("Logout");
    res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;