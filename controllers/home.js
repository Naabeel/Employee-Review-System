const Review = require('../models/review');
const passport = require('passport');


module.exports.home = function(req,res){
    // console.log(req.user.id);
    Review.find({})
    .populate({
        path: "reviews",
        populate:{
            path:"user"
        }
    })
    .exec( function(err, review){
        if(err){
            console.log("error while finding the reviews");
            return;
        }
        
        return res.render("home", {
            title: "Home",
            review: review
        });
    })
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signup');
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signin');
}

module.exports.adminhome = function(req,res){
    return res.render('adminhome');
}


// ----------------signout
module.exports.signout = function(req,res){
    req.logout(function(err){
        if(err){
            console.log('error', 'error while logout');
        }
    });
    // console.log(req.session);
    return res.redirect('/signin');
}