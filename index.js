const taskRoute = require('./routes/tasks.route');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tasks', taskRoute);

// Use client app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Render client for any path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    console.log(path.join(__dirname, 'client/dist'));

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error(err);
    console.log('Please connect to an internet that allows accessing MongoDB.');
  });
