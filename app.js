// Problems:
// CSS fails in editorder.ejs
// can't display all coffees from mongodb to layout
// can't make the select tag work in editorder

var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var path = require('path'); // new stuff

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coffee_orders');
var db = mongoose.connection;

app.use(bodyParser.urlencoded({
    extended: false
}));

// To make a layout page that will display on every single route
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

var Coffee = require('./models/coffee');

var jason = new Coffee({
	customer_name: 'Jason',
	coffee_type: 'Latte',
	number_of_coffees: 1,
	sugar: 3,
	size: 2
});


// Coffee.create(jason);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// app.locals.toffee =  Coffee.find({username: 'Jason'}, function(err, coffee){
//   if(err){
//     return console.error(err);
//   } else {
//     return coffee;
//
//   }
// });


app.get('/', function(req, res) {
	Coffee.find({}, function(err, coffee){
		if(err){
			return console.error(err);
		} else {
			  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
				// res.format({
				// 	//HTML response will render the index.ejs file in the views/pages folder. We are also setting "coffees" to be an accessible variable in our ejs view
				// 	html: function(){
						res.render('pages/index', {
							title: 'Home',
							"coffee" : coffee
						});
					// };
				// })
		}
	});

});


app.get('/createorder', function(req, res) {
    res.render('pages/createorder', {
        title: 'Home',
        page_description: 'This is a template page made using .ejs files instead of .pug files.',
        colour: 'cyan'
    });
});

app.post('/create', function(req, res){

	Coffee.create({
		customer_name: req.body.customer_name,
		coffee_type: req.body.coffee_type,
		number_of_coffees: 1,
		sugar: req.body.sugar,
		size: req.body.size
	}, function(err, coffee){
		if(err){
			return console.error(err);
		} else {

		}
	});
	res.redirect('/');
});


app.get('/delete/:id', function(req, res){
  Coffee.findById(req.params.id, function(err, coffee){ // Find the specific coffee order id and delete it
    coffee.remove(function(err, coffee){
      res.redirect('/');
    });
  });
});

app.get('/edit/:id', function(req, res){ // To render the edit page
  Coffee.findById(req.params.id, function(err, coffee){ // Find the specific coffee order id and map the data as variable coffee
    res.render('pages/editorder', {
      title: "Edit order",
      page_description: 'This is a template page made using .ejs files instead of .pug files.',
      colour: 'cyan',
      coffee: coffee});
  });
});

app.post('/update/:id', function(req, res){
  Coffee.findById(req.params.id, function(err, coffee){ //Look for the specific id
    if (req.body){ //If found?
      Coffee.update({_id: req.params.id}, { // Query the specific ID to update
        customer_name: req.body.customer_name,
        coffee_type: req.body.coffee_type,
        sugar: req.body.sugar,
        size: req.body.size
      }, function(err, coffee){
        res.redirect('/');
      });
    }
  });
});





app.listen(3000, function() {
    console.log('Example app listening to post 3000!');
});
