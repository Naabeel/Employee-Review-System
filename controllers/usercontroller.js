const User = require('../models/user');

const Review = require('../models/review');
const Reviewbyuser = require('../models/reviewbyUser');



// creating user on Signing-in ------------------------------------
module.exports.createUser = function(req,res){
    console.log(req.body);
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error while finding the user");
            return;
        }

        if(!user){
            User.create(req.body, function(err){
                if(err){
                    console.log("error while creating the user while signing-up");
                    return;
                }

                console.log("User Created");
                return res.redirect('/signin');
            })
            
        }else{
            console.log("user already exist");
            return res.redirect('back');
        }
    })
}
// -------------------------------------------create session

module.exports.createSession = function(req,res){
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error while finding the user while signing-in");
            return;
        }

        if(user){
            if(req.body.password != user.password){
                console.log("password do not match");
                return res.redirect('back');
            }
            if(user.isAdmin == "true"){
                return res.redirect('/adminhome');

            }else{
                return res.redirect('/');
            }
        }
        return res.redirect('back');
        
})
}



// -------------------------creating review by user----------------------
module.exports.createreviewbyuser= function(req,res){
    console.log(req.body);
    Review.findById(req.body.review, function(err, review){
        if(err){
            console.log("error while finding the review");
            return;
        }

        if(review){
            // console.log(review);
            Reviewbyuser.create({
                content: req.body.content,
                user: req.user.id,
                review: req.body.review
            }, function(err, reviewbyuser){
                if(err){
                    console.log("error");
                }
                review.userwhohavewrittenreviews.push(req.user.id);
                review.reviews.push(reviewbyuser);
                review.save();

                return res.redirect('back');
            })
        }
    })
}