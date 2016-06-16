var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	// console.log(request);
	// console.log(response);
	// response.send('Hello World!');
	response.render('index', {
		title: 'Home',
		page_description: 'This is a template page made using .ejs files instead of .pug files.',
    colour: 'cyan'
	});
});

app.listen(3000, function() {
	console.log('Example app listening to post 3000!');
});
