//colocar todos os middlewares aqui
var Campground = require("../models/campground"),
       Comment = require("../models/comment");
       
var middlewareObj = {};

middlewareObj.isTheCampOwner = function(req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log("ERRO AO TENTAR ENCONTRAR O CAMPGROUND NA VERIFICAÇÃO DO OWNER - isTheOwner(): " + err);
                req.flash("error", "Ocorreu um eror ao tentar buscar o Acampamento no BD. Notifique o administrador com a mensagem de erro que segue: <<<< " + err + " >>>>"); //FLASH MESSAGE
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {//se for o criador do campground
                    next();
                } else {  //senão, redireciona e não deixa editar
                    console.log("O USUÁRIO TENTOU EXECUTAR UMA AÇÃO SOBRE ALGUM OBJETO QUE NÃO LHE PERTENCE! - isTheOwner()");
                    req.flash("error", "O usuário logado não possui permissão para executar essa ação!"); //FLASH MESSAGE
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("É NECESSÁRIO ESTAR LOGADO PRA EXECUTAR ESSA AÇÃO - isTheOwner()");
        req.flash("error", "Você deve estar logado para executar essa ação!"); //FLASH MESSAGE
        res.redirect("back");
    }
}



middlewareObj.isTheCommentOwner = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.idComment, function(err, foundComment){
            if(err){
                console.log("ERRO AO TENTAR ENCONTRAR O COMMENT NA VERIFICAÇÃO DO OWNER - comment->isTheOwner(): " + err);
                req.flash("error", "Ocorreu um eror ao tentar buscar o Comentário no BD. Notifique o administrador com a mensagem de erro que segue: <<<< " + err + " >>>>"); //FLASH MESSAGE
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {//se for o criador do campground
                    next();
                } else {  //senão, redireciona e não deixa editar
                    console.log("O USUÁRIO TENTOU EXECUTAR UMA AÇÃO SOBRE ALGUM OBJETO QUE NÃO LHE PERTENCE! - comment->isTheOwner()");
                    req.flash("error", "Não é possível alterar um registro que não lhe perntence!"); //FLASH MESSAGE
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("É NECESSÁRIO ESTAR LOGADO PRA EXECUTAR ESSA AÇÃO - comment->isTheOwner()");
        req.flash("error", "Você deve estar logado para executar essa ação!"); //FLASH MESSAGE
        res.redirect("back");
    }

}

middlewareObj.isLoggedIn = function (req,res,next){ //MIDDLEWARE - verifica se o usuário está logado nas rotas que devem ser acesadas apenas por usuários do app.
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Você deve estar logado para executar essa ação!"); //FLASH MESSAGE
    res.redirect("/login");
}


module.exports = middlewareObj;