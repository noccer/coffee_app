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
	customer_name: 'Niall',
	coffee_type: 'Latte',
	sugar: 3,
	size: 2
})

mongoose.connect('mongodb://localhost/test_coffee_app');

// Coffee.create(niall);*

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

	// res.send(niall);

	Coffee.find({}, function(err, coffee) {
	if (err) return res.send(err);
	res.send(coffee);
});
    // response.render('index', {
    //     title: 'Home',
    //     page_description: 'This is a template page made using .ejs files instead of .pug files.',
    //     colour: 'cyan'
    // });
});

app.post('/create', function(request, response) {
    response.render('index', {
        title: 'Home',
        page_description: 'This is a template page made using .ejs files instead of .pug files.',
        colour: 'cyan'
    });
});

app.listen(3000, function() {
    console.log('Example app listening to post 3000!');
});
