var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index.js");

//ROUTES     //ROUTES     //ROUTES     //ROUTES     //ROUTES     

//RAIZ ou  LANDING PAGE
router.get("/", function(req, res){
   //res.render("landing");
   res.render("landing");
});



// =========================================================
// AUTHENTICATION ROUTES                AUTHENTICATION ROUTES      
// =========================================================
router.get("/register", function(req, res){
    console.log("entrei no GET do REGISTER");
    res.render("register");
});

router.post("/register", function(req, res){
    console.log("entrei no POST do REGISTER");
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            req.flash("error", "O usuário " + req.body.username + " já existe! Tente outro nome!"); //FLASH MESSAGE
            return res.redirect("/register");
        }
        //passport.authenticate("tweeter")(req, res, function(){
        //passport.authenticate("facebook")(req, res, function(){
        console.log("vou chamar o res.redirect(/campgrounds);");
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Bem-vindo " + req.body.username + "!"); //FLASH MESSAGE
            res.redirect("/campgrounds"); 
        });

    });
});

//apresenta o form de login
router.get("/login", function(req, res){
    console.log("entrei no GET do LOGIN");
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        
    }), function(req, res){
    console.log("entrei no POST do LOGIN");
});

router.get("/logout", function(req, res){
    console.log("entrei no LOGOUT");
    req.logout();
    req.flash("success", "Você não está mais logado no sistema!") //FLASH
    res.redirect("/login");
});

// ============================================================
// FIM do AUTHENTICATION ROUTES  // AUTHENTICATION ROUTES - FIM
// ============================================================

module.exports = router;