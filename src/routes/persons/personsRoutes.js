const express = require("express");
const Phonebook = require("../../models/phonebook");

const router = express.Router();

//Create a contact
router.post("/", async (req, res, next) => {
  try {
    const person = req.body;

    if (!person.name || !person.number) {
      res.status(400).json({ error: "Name and number are required" });
    }

    const created = await Phonebook.create(person);

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

//Get all contacts
router.get("/", async (req, res) => {
  const allContacts = await Phonebook.find({});

  if (!allContacts) return res.status(400).json({ message: "No Contacts" });

  res.status(200).json(allContacts);
});

//Get a contact
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const person = await Phonebook.findById(id);

    if (!person) return res.status(404).json({ message: "User not found" });

    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
});
//Delete a contact
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Phonebook.findByIdAndDelete(id);
    res.status(204).json(person);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const person = await Phonebook.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        number: req.body.number,
      },
      { new: true, runValidators: true, context: "query" }
    );

    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
