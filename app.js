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
app.use(expressSession({secret: "abcdefg"}))
app.use(express.static(path.join(__dirname, 'static')))
//app.use(expressSession({secret:'somesecrettokenhere'}));
var username = 'foo'
var password = 'bar'

//app.get("/", function(req, res, next){
  //res.redirect('/login');
 //res.render("index", {thankyou:req.query.thankyou})
//check if loggedin, if true, send to root, if not send to log in page
function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    return next();
  }
  else {
    res.redirect('/login');
  }
}

//Do this line after a successfull login:
app.get("/", isLoggedIn, function(req, res, next){
  res.render('index', req.session)
});

// app.get('/login', function(req, res, next) {
//   res.render('login');
// });

//check to see if user is loged in
// function isLoggedIn(req, res, next) {
//   if (req.session.isAuthenticated){
    //if logged in then move on
    //     return next();
    // } else {
    // if not logged in then redirect to the /login
  //    res.redirect('/login');
//     }
// }

//validate user name and password
//    req.checkbody(username).isIn('username','foo')
//      if (true){
//    req.checkbody(password).isIn(username)
//    if (true){
//      then res.redirect('/index')
//    }else{
// //     errorMessage: "Invalid Username/password";
//   }
// }
//return error messages and stay on login page
//after successfull login show logged in with username
//The valid usernames and passwords should be kept as a data structure in your application.
//does this mean use an existing data file?
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
      //res.send(errors)
      //change the .send to put a message
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
