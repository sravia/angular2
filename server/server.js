var http            = require('http'),
	path 			= require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
	app 			= express();

app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'ejs');
app.use(express.static("../client"));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes/index'));
app.use('/api/account/', require('./routes/account'));
app.use('/api/protected/', require('./routes/protected-routes'));

var port = process.env.PORT || 3002;
http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

