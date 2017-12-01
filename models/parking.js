var mongoose = require("mongoose");

var parkingSchema = new mongoose.Schema({
    name: String,
    land: String,
    image: String,
    description: String,
    nameb: String,
    high: String,
    area: String,
    contact: String,
    phone: String,
    map: String,
    direct: String,
    maxPark: String,
    nowPark: String
});

module.exports = mongoose.model("Parking", parkingSchema);