const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator')
const bodyParser = require ('body-parser')
const expressSession = require('express-session')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }}))
app.use(express.static(path.join(__dirname, 'static')))

var username = 'foo'
var password = 'bar'

//verify logged in:
function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    console.log("you are in if logged in")
    return next();
  }
  //if not logged in rediret to login page:
  else {
    console.log ("you are in not logged in redirect")
    res.redirect('/login');
  }
}
//After a successfull login:
app.get("/", isLoggedIn, function(req, res, next){
  res.render('index', req.session)
});

//Why doesn't this validation work?

//validate the user name and password
//  app.post("/user/add", function(req, res, next){
//    req.checkbody(name).isIn(username,'foo');
//      if (true){
//    req.checkbody(password).isIn(password, 'bar');
//    if (true){
//      then res.redirect('index');
//    }else{
//     errorMessage: "Invalid Username/password";
//   }}
// }

var users = []

app.post("/user/add", function(req, res, next){
    //res.render("index")
    //Validate here before the push
    req.checkBody("name", "Please enter your Username.").notEmpty()
    req.checkBody("password", "Please enter your password").notEmpty()

    var errors = req.validationErrors()

    if (errors) {
      console.log(users)
      res.render("/login", {erros: errors})
      //return;
      //on the login page that there is an error
    } else {
      users.push({
        name: req.body.name,
        password: req.body.password
      })
      console.log(users)
        res.redirect("/?thankyou=true")
    }
  })

app.listen(3000, function(){
  console.log("App running on port 3000")
})
