var mongoose = require('mongoose');

// create a schema
var coffee_schema = new mongoose.Schema({
  customer_name: { type: String, required: true},
  coffee_type: { type: String, required: true},
  number_of_coffees: { type: Number, required: true},
  sugar: { type: Number, required: true},
  size: { type: Number, require: true}

});

var Coffee = mongoose.model('Coffee', coffee_schema);

module.exports = Coffee;
