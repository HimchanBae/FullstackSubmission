const express = require("express");
const app = express();

const PORT = 3001;
app.use(express.json());

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

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/info", (request, response) => {
  const entryCount = phoneBook.length;
  const currentTime = new Date();

  response.send(
    `<p>Phonebook has info for ${entryCount} people</p><p>${currentTime}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
