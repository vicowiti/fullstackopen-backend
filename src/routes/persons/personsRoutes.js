const express = require("express");
const Phonebook = require("../../models/phonebook");

const router = express.Router();

//Create a contact
router.post("/", async (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    res.status(400).json({ error: "Name and number are required" });
  }

  const created = await Phonebook.create(person);

  res.status(201).json(created);
});

//Get all contacts
router.get("/", async (req, res) => {
  const allContacts = await Phonebook.find({});

  console.log("All Contacts", allContacts);

  if (!allContacts) return res.status(400).json({ message: "No Contacts" });

  res.status(200).json(allContacts);
});

//Get a contact
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Phonebook.findById(id);

  if (!person) return res.status(400).json({ message: "User not found" });

  res.status(200).json(person);
});

//Delete a contact
router.delete("/:id", async (req, res) => {
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
