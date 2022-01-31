const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/learning-app');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(require('./routes/api-routes'));
// app.get('/hello', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));