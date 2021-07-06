const express = require('express');
const cardRoute = express.Router();
const { FlipCardCheck, FlipCardFind } = require('./cards');

cardRoute.post('/flipcard', FlipCardCheck);
cardRoute.get('/flip', FlipCardFind);

module.exports = cardRoute;
