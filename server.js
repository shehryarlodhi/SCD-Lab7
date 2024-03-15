const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const mongoURI = 'mongodb+srv://lodhishehryarkhan:<1234>@clusterscd.xnytihk.mongodb.net/'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
