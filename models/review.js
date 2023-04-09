const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    empid:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewappUser"
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewByUser"
    }],
    userwhohavewrittenreviews:[{
        type: String
    }]
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;