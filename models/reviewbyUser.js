const mongoose = require('mongoose');

const reviewByUser = new mongoose.Schema({
    content:{
        type:String,
        require: true
    },
    review:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewappUser"
    }
}, {
    timestamps: true
});


const ReviewByUser = mongoose.model("ReviewByUser", reviewByUser);

module.exports = ReviewByUser;