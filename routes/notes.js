const note = require("express").Router();
const { readFromFile, readAndAppend, deleteNote } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// Get route for retrieving all notes
note.get("/", (req, res) => {
  console.info(`${req.method} request received for ${req.url}`);

  readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

// Post route for saving a new note
note.post("/", (req, res) => {
  console.info(`${req.method} request received to save a new note`);

  // Destructure the request body
  const { title, text } = req.body;

  // If all the required fields are present, save the note
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error posting note");
  }
});

// Route to delete a user with a given ID
note.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  const { id } = req.params;
  console.info(`Deleting note with id: ${id}`);

  deleteNote(id);
});

module.exports = note;
