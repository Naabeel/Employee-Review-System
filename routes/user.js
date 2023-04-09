const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/usercontroller');


router.post('/createuser', userController.createUser);
// router.post('/signinuser', userController.createSession);
router.post('/createreviewbyuser', userController.createreviewbyuser);




router.post('/signinuser',
passport.authenticate('local', { failureRedirect: '/signin' }),userController.createSession);


module.exports = router;