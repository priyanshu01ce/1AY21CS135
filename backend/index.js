require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const requestTimeout = require('./middlewares/requestTimeout');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestTimeout);

// API routes
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
  console.log("Server is running on http//:localhost:${port}");
});