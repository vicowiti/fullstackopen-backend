const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const morgan = require("morgan");
const notFound = require("./middleware/notFound");

const app = express();
app.use(cors());

app.use(express.static("dist"));

// Express middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Define a custom token to capture the request body
morgan.token("body", (req, res) => {
  // Check if the request has a body (to avoid errors)
  if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
    return JSON.stringify(req.body);
  }
  return "";
});

// Use the custom token in the format string
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const persons = [
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

app.get("/info", (req, res) => {
  res
    .status(200)
    .send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date()}</p>`
    );
});

app.use("/api/persons", require("./routes/persons/personsRoutes"));

app.use(notFound);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started on port 3000"));
