const express = require('express');

// Import our modular routers /notes.js
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

// export the app so that it can be imported in server.js
module.exports = app;