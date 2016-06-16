var express = require('express');
var app = express();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

var Coffee = require('./models/coffee');

var jason = new Coffee({
	customer_name: 'Jason',
	coffee_type: 'Latte',
	number_of_coffees: 1,
	sugar: 3,
	size: 2
})

mongoose.connect('mongodb://localhost/coffee_orders');

// Coffee.create(jason);*

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index', {
			title: 'Home',
			page_description: 'This is a template page made using .ejs files instead of .pug files.',
			colour: 'cyan'
	});
});

app.post('/create', function(req, res) {
    res.render('index', {
        title: 'Home',
        page_description: 'This is a template page made using .ejs files instead of .pug files.',
        colour: 'cyan'
    });
});

app.listen(3000, function() {
    console.log('Example app listening to post 3000!');
});
