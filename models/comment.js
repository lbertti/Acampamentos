var mongoose = require("mongoose");

var commentScheema = mongoose.Schema({
    text: String,
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" // collection que será relacionada a esse registro
            },
        username: String
    }
});


module.exports = mongoose.model("Comment", commentScheema);