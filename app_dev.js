var express = require('express');
var app = express();
// var Materialize = require('node-materialize');
// Materialize.inject();

app.set('view engine', 'ejs');

// Give access to the public directory for CSS and JS files
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.render('pages/index', {
		title: 'Home',
		page_description: 'This is a template page made using .ejs files instead of .pug files.',
    colour: 'cyan'
	});
});

app.get('/createorder', function(request, response) {
	response.render('pages/createorder', {
		title: 'Create',
		page_description: 'This is a template page made using .ejs files instead of .pug files.',
    colour: 'cyan'
	});
});


app.listen(3000, function() {
	console.log('Example app listening to post 3000!');
});
