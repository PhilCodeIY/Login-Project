const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require ('body-parser')
const expressSession = require('express-session')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }}))
app.use(express.static(path.join(__dirname, 'static')))

var username = 'foo'
var password = 'bar'

//verify logged in:
function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    console.log("you are in, you are already logged in")
    return next();
  }
  //if not logged in rediret to login page:
  else {
    console.log ("you are not logged in redirect")
    res.redirect('/login');
  }
}

app.get("/login", function(req, res, next){
  res.render('login')
});
//After a successfull login:
app.get("/", isLoggedIn, function(req, res, next){
  res.render('index', req.session)
});


//validate that foo and bar where entered.
//having problem with local host hanging...
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
app.post("/login", function(req, res, next){
  if (username === req.body.username && password === req.body.password) {
    req.session.isLoggedIn = true
    res.redirect("/")
  } else {
    res.redirect("/login")
  }
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
