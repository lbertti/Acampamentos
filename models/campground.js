var mongoose = require("mongoose");

//SCHEMA SETUP - criando o SCHEMA pro BD "yelp_camp"
var campgoundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment" // collection que será relacionada a esse registro
        }
    ],
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" // collection que será relacionada a esse registro
            },
            username: String
    }

});

//var Campground = mongoose.model("Campground", campgoundSchema);
module.exports = mongoose.model("Campground", campgoundSchema);
