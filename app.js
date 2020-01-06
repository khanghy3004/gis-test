var express = require('express');
var path = require('path');
var session = require('express-session');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

var {getHomePage} = require('./routes/index');
var user = require('./routes/user');
var port = 8080;

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'gis'
});
con.connect();

global.db = con;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'chicken',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))



// routes for the app
app.get('/', getHomePage);
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', getHomePage);//call for login page
app.post('/login', user.login);//call for login post
app.post('/changepass', user.changepass);//call for changepass post
app.get('/home', user.dashboard);
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
app.get('/home/map', user.map);
app.get('/home/download', user.download);
app.get('/upgrade', (req, res) => {
    res.render('upgrade.ejs');
});

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});