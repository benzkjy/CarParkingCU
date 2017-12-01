var express = require("express");
var router  = express.Router({mergeParams: true});
var Parking = require("../models/parking");

//SHOW - shows more info about one parking
router.get("/parkings/:id", isLoggedIn, function (req, res) {
    //find the parking with provided ID
    Parking.findById(req.params.id, function (err, foundParking) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that parking
            // res.send("show template with that parking soon!");
            res.render("show", { parking: foundParking });
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;