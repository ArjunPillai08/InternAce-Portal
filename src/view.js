var express = require("express"),
    router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.get('/index', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.get('/job-search', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/job-search.html'));
});
router.get('/job-preview', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/job-preview.html'));
});
router.get('/sign-in', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/sign-in.html'));
});
router.get('/sign-up', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/sign-up.html'));
});
router.get('/client-profile', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/client-profile.html'));
});

router.get('/contact-us', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/contact-us.html'));
});

router.get('/homepage', function(req, res) {
    console.log("Root page hit!")
    res.sendFile(path.join(__dirname + '/../views/homepage.html'));
});

// router.get('*',function (req, res) {
//     res.redirect('/index');
// });



module.exports = router;