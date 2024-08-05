const express = require("express");
const morgan = require("morgan");
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(morgan("tiny"));

let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = 10000;
  const randomId = Math.floor(Math.random() * maxId) + 1;
  return String(randomId);
};

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const entry = phoneBook.find((entry) => entry.id === id);

  if (entry) {
    response.json(entry);
  } else {
    response.status(404).send({ error: "Note not found" });
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const nameExists = phoneBook.find((entry) => entry.name === body.name);
  if (nameExists) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  const newEntry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  phoneBook = phoneBook.concat(newEntry);

  response.json(newEntry);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phoneBook = phoneBook.filter((entry) => entry.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const entryCount = phoneBook.length;
  const currentTime = new Date();

  response.send(
    `<p>Phonebook has info for ${entryCount} people</p><p>${currentTime}</p>`
  );
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
