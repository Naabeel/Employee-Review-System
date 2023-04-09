const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    empid:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: String,
        require: true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]

}, {
    timestamps: true
})

const ReviewappUser = mongoose.model("ReviewappUser", userSchema);

module.exports = ReviewappUser;