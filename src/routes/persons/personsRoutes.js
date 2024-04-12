const express = require("express");

const router = express.Router();

const people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//Create a contact
router.post("/", (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    res.status(400).json({ error: "Name and number are required" });
  }

  const nameExists = people.find((item) => item.name === person.name);

  if (nameExists) {
    res.status(400).json({ error: "Name already exists" });
    return;
  }

  people.push({ ...person, id: Math.floor(Math.random() * 476) });

  console.log(people);

  res.status(201).json(person);
});

//Get all contacts
router.get("/", (req, res) => {
  res.status(200).json(people);
});

//Get a contact
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const person = people.find((person) => person.id === Number(id));

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

//Delete a contact
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const person = people.find((person) => person.id === Number(id));

  if (person) {
    people.filter((person) => person.id !== Number(id));

    res.status(200).json({ message: "User was deleted successfully" });
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

module.exports = router;
