var http            = require('http'),
	path 			= require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', require('./routes/index'));
app.use('/api/users/', require('./routes/users'));
app.use('/api/todo/', require('./routes/todo'));
app.use('/api/protected/', require('./routes/protected-routes'));

var port = process.env.PORT || 3001;
http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

