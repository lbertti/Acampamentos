var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middleware = require("../middleware/index.js");
// =============================================
// COMMENTS ROUTES               COMMENTS ROUTES
// =============================================

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    console.log("entrei no NEW (formulário de criação) COMMENT");
    //encontrar o campground para preencher dados no formulário de criação de comntário
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
/*            console.log("====================================");
            console.log("MOSTRANDO O CAMPGROUND RECUPERADO : ");
            console.log(campground);
            console.log("===================================="); */
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    console.log("entrei no CREATE COMMENT ---- ID do campground = " + req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log("ENCONTREI O CAMPGROUND NO FINDBYID()");
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    console.log("VOU ADICIONAR O COMENTÁRIO AO CAMPGROUND, ID = " + req.user._id + ", USERNAME: " + req.user.username);
                    //adiciona username e ID ao comentário
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //grava comment
                    comment.save();
                    //coloca o comentário no Campground da sessão
                    campground.comments.push(comment);
                    //grava o campground
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
//                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT
router.get("/:idComment/edit", middleware.isTheCommentOwner, function(req, res){
    console.log("Entrei no GET do COMMENT EDIT - Vou apresentar o form de edição");
    
    var campgroundId = req.params.id;
    console.log("8=====D campgroundId = " + campgroundId);
    
    Comment.findById(req.params.idComment, function(err, foundComment){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {comment: foundComment, campgroundId: campgroundId});
        }
    });
});

//UPDATE
router.put("/:idComment", middleware.isTheCommentOwner, function(req, res){
    console.log("Entrei no PUT do COMMENT // UPDATE - Vou gravar a alteração");
    Comment.findByIdAndUpdate(req.params.idComment, req.body.comment, function(err, updatedComment){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id );
        }
    });
});

//DESTROY / DELETE
router.delete("/:idComment", middleware.isTheCommentOwner, function(req, res){
    console.log("Entrei no DELETE do COMMENT");
    Comment.findByIdAndRemove(req.params.idComment, function(err, updatedComment){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id );
        }
    });
});


// =========================================================
// FIM - COMMENTS ROUTES               COMMENTS ROUTES - FIM
// =========================================================
module.exports = router;