var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); //AUTH

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); //AUTH

module.exports = mongoose.model("User", UserSchema);