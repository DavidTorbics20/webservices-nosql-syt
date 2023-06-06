const express = require("express");
const bodyParser = require("body-parser");

// define router that will handle requests to person
const router = express.Router();

// import person Model
const Person = require("../models/person");

// middleware that parses the reqeust body to json
const jsonParser = bodyParser.json();

// get all players
router.get("/", async (req, res) => {
  try {
    // get persons from db
    const persons = await Person.find();
    // put person objects in response body
    res.json(persons);
  } catch (err) {
    // on error put error messagae into response body
    res.status(500).json({ data: err.message });
  }
});

// get one person by id
// request url would look like: http://localhost:3000/persons/6419750b0ee16639b0625e6a
router.get("/:id", getPerson, (req, res) => {
  res.json(res.person);
});

router.post("/", jsonParser, async (req, res) => {
  // create new person with values that the client sent by the request body
  const person = new Person({
    firstName: req.body.firstName,
    sureName: req.body.sureName,
    age: req.body.age,
  });
  try {
    // save person in db
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ data: err.message });
  }
});

// patch is to update existing persons in db
router.patch("/:id", [getPerson, jsonParser], async (req, res) => {
  if (req.body.firstName != null) {
    res.person.firstName = req.body.firstName;
  }
  if (req.body.sureName != null) {
    res.person.sureName = req.body.sureName;
  }
  if (req.body.age != null) {
    res.person.age = req.body.age;
  }
  try {
    const updatedPerson = await res.person.save();
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete person by id
router.delete("/:id", [getPerson, jsonParser], async (req, res) => {
  try {
    await Person.findByIdAndDelete(res.person._id);
    res.json({ message: "Deleted Person" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function that is used by get, patch, delete that returnes person by id
async function getPerson(req, res, next) {
  let person;
  try {
    person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: "Cannot find person" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.person = person;
  next();
}

module.exports = router;
