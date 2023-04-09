const User = require('../models/user');
const Review = require('../models/review');

// module.exports.adminlogin = function(req,res){
//     return res.render('adminlogin');
// }

// module.exports.admincreatesession = function(req,res){
//     console.log("hii")
//     console.log(req.body);
    
//         return res.redirect('/adminhome')

// }



module.exports.employees = function(req,res){
    User.find({}, function(err, user){
        // console.log(user);
        if(err){
            console.log("error while finding the employees");
            return;
        }

        return res.render("adminemployee",{
            title: "Employees",
            users: user
        })
    })
}


// to see the employee profile
module.exports.employeeProfile = function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log("error while findig the user for profile");
            return;
        }

        if(!user){
            return res.redirect('back');
        }

        return res.render('employeeprofile', {
            title: "User Profile",
            user: user
        })
    })
}


// to create the reviews
module.exports.createReview = function(req,res){
    // console.log(req.body);
    User.findById(req.body.user, function(err, user){

        if(err){
            console.log("error");
            return;
        }

        if(user){
            // console.log(user);
            Review.create(req.body, function(err, review){
                if(err){
                    console.log("error while creating review");
                    return;
                }

                user.reviews.push(review);
                user.save();
        
                return res.redirect('back');
            })
        }
    })
}

// to see all the reviews on Review page
module.exports.allreviews = function(req,res){
    Review.find({}, function(err, review){
        if(err){
            console.log("error while finding all the reviews");
            return;
        }

        return res.render("allreviews", {
            title: "Reviews",
            reviews: review
        })
    })
}



// making employee an Admin
module.exports.makeadmin = function(req,res){
    // console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id,{isAdmin: "true"} ,function(err, user){
        if(err){
            console.log("error");
            return;
        }
        // console.log(user);
        return res.redirect('back')
    })
}


// rendering the review updating page
module.exports.reviewUpdatepage = function(req,res){
    Review.findById(req.params.id)
    .populate({
        path:"reviews",
        populate:({
            path: 'user'
        })
    })
    .exec(function(err, review){
        if(err){
            console.log("error while finding the review for updatepage");
            return;
        }

        return res.render( "reviewupdate",{
            title: "Review Update",
            review: review
        })
    })
}



// updating the reviews
module.exports.updateReview = function(req,res){
    // console.log(req.body);
    Review.findByIdAndUpdate(req.params.id, req.body, function(err, review){
        if(err){
            console.log("error in finding the review");
            return;
        }

        return res.redirect('/admin/allreviews');
    })
}

// deleteing the review

module.exports.deleteReview = function(req,res){
    // console.log(req.params);
    Review.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log("error while deleting the review");
            return;
        }

        return res.redirect('/admin/allreviews');
    })
}


