var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var morgan = require('morgan')
var multipart = require('connect-multiparty')
var port = process.env.PORT||2222;
var app = express();
var dbUrl = 'mongodb://localhost/photo'

//connect to mongoDB
mongoose.connect(dbUrl)

app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'/public')));
app.use(cookieParser())
app.use(multipart())

app.use(session({
 	secret: 'photo',
 	resave: false,
 	saveUninitialized: false,
 	store: new MongoStore({
	 	url: dbUrl,
	 	collection: 'sessions'
 	})
}))
if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
	//格式化源代码
	app.locals.pretty =true 
	mongoose.set('debug', true)
}

 require('./config/routes')(app)
app.locals.moment = require('moment')
app.listen(port);
console.log('photosite start');

