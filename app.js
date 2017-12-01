var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Parking       = require("./models/parking"),
    User          = require("./models/user")

//requring routes
var parkingRoutes = require("./routes/parkings"),
    indexRoutes   = require("./routes/index")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/views'));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hi passport",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(parkingRoutes);

mongoose.connect("mongodb://localhost/parkingCU", { useMongoClient: true });
mongoose.Promise = global.Promise;

//SCHEMA SETUP

// Parking.create({
//     name: "อาคารวิทยพัฒนา",
//     land: "ฝั่งจุฬาเล็ก",
//     image: "http://www.prm.chula.ac.th/image/pic_cen17_01.jpg",
//     description: "",
//     nameb: "อาคารวิทยพัฒนา",
//     high: "8ชั้น",
//     area: "7,776.12",
//     contact: "จุฬาลงกรณ์มหาวิทยาลัย 254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กทม. 10330",
//     Phone: "0-2218-3914 แฟ็ก 0-2218-3916",
//     map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6102284380927!2d100.52473655017089!3d13.74203205117541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992cf4eadff3:0x7c45b454d76bf497!2z4Lit4Liy4LiE4Liy4Lij4Lin4Li04LiX4Lii4Lie4Lix4LiS4LiZ4LiyIOC5geC4guC4p-C4hyDguKfguLHguIfguYPguKvguKHguYgg4LmA4LiC4LiVIOC4m-C4l-C4uOC4oeC4p-C4seC4mSDguIHguKPguLjguIfguYDguJfguJ7guKHguKvguLLguJnguITguKMgMTAzMzA!5e0!3m2!1sth!2sth!4v1511481580388",
//     direct: "https://maps.google.com/maps?ll=13.742027,100.526931&z=16&t=m&hl=th-TH&gl=TH&mapclient=embed&daddr=%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%20%E0%B8%A7%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%20%E0%B9%80%E0%B8%82%E0%B8%95%20%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B1%E0%B8%99%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3%2010330@13.742039,100.5268513"
//     },function(err, parking) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log("New Created Parking: " + parking);
//     }
// });


app.listen(8000, function() {
    console.log("The ParkingCU Server Has Started!");
});