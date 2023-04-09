const express = require('express');
const passport = require('passport');

const router = express.Router();
const AdminController = require('../controllers/admincontroller');

// router.get('/adminlogin', AdminController.adminlogin);

router.get('/useremployees', AdminController.employees);
router.get('/employeeProfile/:id', AdminController.employeeProfile);

router.post('/createReview', AdminController.createReview);

router.get('/allreviews', AdminController.allreviews);

router.get('/makeAdmin/:id', AdminController.makeadmin);

router.get('/updatePage/:id', AdminController.reviewUpdatepage);

router.post('/updatereview/:id', AdminController.updateReview);

router.get('/deleteReview/:id', AdminController.deleteReview);

// router.post('/admincreatesession',
// passport.authenticate('local', { failureRedirect: '/admin/adminlogin' }), AdminController.admincreatesession);


module.exports = router;