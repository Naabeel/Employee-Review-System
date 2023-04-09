let express = require('express');
const passport = require('passport');
let router = express.Router();
let homecontroller = require('../controllers/home');


router.get('/', passport.checkAuthentication,homecontroller.home);
router.get('/signup', homecontroller.signup);
router.get('/signin', homecontroller.signin);
router.get('/adminhome', homecontroller.adminhome);
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.get('/signout', homecontroller.signout);






module.exports = router;