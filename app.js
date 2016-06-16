var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coffee_orders');
var db = mongoose.connection;

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


// Coffee.create(jason);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	mongoose.model('Coffee').find({}, function(err, coffee){
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
					// }
				// })
		}
	})

});


app.get('/createorder', function(req, res) {
    res.render('pages/createorder', {
        title: 'Home',
        page_description: 'This is a template page made using .ejs files instead of .pug files.',
        colour: 'cyan'
    });
});

// app.post('/submitorder', function(req, res){
// })



app.listen(3000, function() {
    console.log('Example app listening to post 3000!');
});
