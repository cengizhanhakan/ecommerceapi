// Module dependencies.
const express = require("express"),
  http = require("http"),
  path = require("path")
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("express-flash");
var session = require("express-session");
var methodOverride = require("method-override");
var crypto = require("crypto");
var cookieparser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require('cors');
require('dotenv').config();
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology:true,  
});



// All environments
app.set("port", 4000);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));
app.use(cookieparser('' + crypto.randomBytes(64) + ''));
app.use(express.urlencoded({
  extended: false
}))
app.use(cors());
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


require('./src/config/passport')(passport);
app.use(require('./src/controllers/cartController'));
app.use(require('./src/controllers/categoryController'));
app.use(require('./src/controllers/productsController'));
app.use(require('./src/controllers/userController'));
app.use(require('./src/controllers/wishlistController'));



// Run server
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});