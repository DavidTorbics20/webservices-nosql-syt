const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const Person = require("../models/person");

const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
});

router.get("/:id", getPerson, (req, res) => {
  res.json(res.person);
});

router.post("/", jsonParser, async (req, res) => {
  const person = new Person({
    firstName: req.body.firstName,
    sureName: req.body.sureName,
    age: req.body.age,
  });
  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ data: err.message });
  }
});

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

router.delete("/:id", [getPerson, jsonParser], async (req, res) => {
  try {
    await Person.findByIdAndDelete(res.person._id);
    res.json({ message: "Deleted Person" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
