const mongoose = require("mongoose");

// Define Person Model, like the schema for a table
const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  sureName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// register the model with the name "Person"
module.exports = mongoose.model("Person", personSchema);
