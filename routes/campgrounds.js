var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//EXIBE OS ACAMPAMENTOS - INDEX
router.get("/", function(req, res){
    console.log(req.user);
    //Ler todos os acampamentos do MongoDB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/index", {campgrounds:allCampgrounds});
       }
    });
});

//POST
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampground = {name: name, price: price, image: image, description: description, author};

    Campground.create(                              //MongoDB
        newCampground,
        function(err, campground){
            if(err){
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        });
});



//NOVO ACAMPAMENTO
router.get("/new", middleware.isLoggedIn, function(req, res){
    console.log("Entrei no get do NEW CAMPGROUND");
    res.render("campgrounds/new.ejs");
});

//MOSTRA OS DETALHES DO ACAMPAMENTO - SHOW ROUTE
router.get("/:id", function(req, res){
    console.log("Entrei no get do SHOW CAMPGROUND");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
           console.log(err);
        } else {
           //console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
        }
    }) ;
});


//EDITAR CAMPGROUND - FORM de EDIÇÃO
router.get("/:id/edit", middleware.isTheCampOwner, function(req, res){
    console.log("Entrei no GET do CAMPGROUND EDIT - FORM DE EDIÇÃO");
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log("ERRO AO TENTAR ENCONTRAR O CAMPGROUND PARA O FORM DE EDIÇÃO: " + err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//ALTERAR CAMPGOUND - UPDATE
router.put("/:id", middleware.isTheCampOwner, function(req, res){
    console.log("Entrei no PUT do CAMPGROUND - UPDATE, PÓS FORM DE EDIÇÃO");
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log("ERRO AO EFETUAR O UPDATE DO CAMPGROUND COM Campground.findByIdAndUpdate(): " + err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE / REMOVE / DESTROY ROUTE
router.delete("/:id", middleware.isTheCampOwner, function(req, res){
    console.log("Entrei no DELETE do CAMPGROUND");
    Campground.findByIdAndRemove(req.params.id, function(err, campground){
        if(err){
            console.log("ERRO AO APAGAR O CAMPGROUND COM Campground.findByIdAndRemove(): " + err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;