//Para levantar o serviço do mongoDB:
//$ mongod --bind_ip=$IP --nojournal

//MONGODB - Reparar o BD de um shutdown inesperado
//$ mongod --repair

/*pra subir pra produção, não esquecer de adicionar o comando de inicialização do serviço no package.json:
tag "scripts": {
    criar a propriedade start com o comando de inicialização do APP:
    "start": "node app.js"  //  <-- ESSA LINHA AQUI
*/

//CAMPYELP EXERCISE
var            express    = require("express"),
               app        = express(),
               bodyParser = require("body-parser"),
               mongoose   = require("mongoose"),
               Campground = require("./models/campground"),
               Comment    = require("./models/comment"),
                     User = require("./models/user"),
               seedDB     = require("./seeds"),
                 passport = require("passport"), //AUTH
            localStrategy = require("passport-local"), //AUTH
                    flash = require("connect-flash"); 
    //Comment = require("./models/comment");

//ROUTES
var campgroundRoutes = require("./routes/campgrounds"),
       commentRoutes = require("./routes/comments"),
         indexRoutes = require("./routes/index");

var methodOverride = require("method-override");

//mongoose.connect("mongodb://localhost/yelp_camp"); //conecta ao BD (caso o BD não exista, ele cria um instância no MongoDB)
//mongoose.connect("mongodb://admin:campusParty@ds127899.mlab.com:27899/yelp_camp");
mongoose.connect(process.env.DATABASEURL);

/* 
Para criar uma variável de ambiente (environment variable) execute o comando:
$ export DATABASEURL=mongodb://localhost/yelp_camp  // Em desenvolvimento
$ export DATABASEURL=mongodb://admin:campusParty@ds127899.mlab.com:27899/yelp_camp  // Em produção

Para usar essa variável no código, uso:
process.env.DATABASEURL
*/

//var request = require("request");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //pra usar o main.css, digo pro "express" servir o diretório "public" (__dirname coloca o endereço do diretório onde estou)
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //programa que popula o BD a cada inicianilização do Server

//comandos mais comuns:  mongod / mongo / help / show dbs / use / create / find / update / remove


//PASSPORT CONFIGURATION --//AUTH
app.use(require("express-session")({   //AUTH
    secret: "YELPCAMP EXERCISE PASSPORT PHRASE: Entre barro e tijolo sempre chove dobrado",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); //AUTH
app.use(passport.session()); //AUTH

passport.use(new localStrategy(User.authenticate())); //AUTH
passport.serializeUser(User.serializeUser()); //AUTH
passport.deserializeUser(User.deserializeUser()); //AUTH

//AUTH - O código abaixo é acessado a cada request, portanto, se houver alguém logado, poderá ter os dados acessados com <%= currentUser.username %>
app.use(function(req, res, next){
    res.locals.currentUser = req.user; //AUTH
    res.locals.error = req.flash("error"); //FLASH
    res.locals.success = req.flash("success"); //FLASH
    next();
});

//para retirar o nome "raiz" dos arquivos de Rotas, coloco o nome nessa chamada e retiro-o dos gets e posts nos arquivos de Rotas
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); //ATENÇÃO: para usar a passagem de parâmetros(../:id/..) é necessário setar o parâmetro mergeParams: true na criação da variável router do arquivo de rotas <nesse caso: em "..routes/comments.js" criar o router como "var router = express.Router({mergeParams: true}) >
app.use("/campgrounds", campgroundRoutes);

//LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("THE YELP CAMP SERVER IS ONNNNNNN!!!!!");
});
