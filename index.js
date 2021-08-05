require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoDB = require('./db');
const ROUTES = require('./constants/routes');
mongoDB();
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('connected');
});
app.use('/cards', ROUTES.CARD);
app.use('/auth', ROUTES.AUTH);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on PORT ${PORT}`));
