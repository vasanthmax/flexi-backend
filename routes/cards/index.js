const express = require('express');
const cardRoute = express.Router();
const {
  FlipCardCheck,
  FlipCardFind,
  PricingCardCheck,
  PricingCardFind,
  NormalCardCheck,
  NormalCardFind,
  FlipCardAll,
  NormalCardAll,
  PricingCardAll,
  FlipCardDelete,
  PricingCardDelete,
  NormalCardDelete,
} = require('./cards');

cardRoute.post('/flipcard', FlipCardCheck);
cardRoute.get('/flip', FlipCardFind);
cardRoute.post('/pricingcard', PricingCardCheck);
cardRoute.get('/pricing', PricingCardFind);
cardRoute.post('/normalcard', NormalCardCheck);
cardRoute.get('/normal', NormalCardFind);
cardRoute.get('/flipcardall', FlipCardAll);
cardRoute.get('/pricingcardall', PricingCardAll);
cardRoute.get('/normalcardall', NormalCardAll);
cardRoute.delete('/flipdelete', FlipCardDelete);
cardRoute.delete('/pricingdelete', PricingCardDelete);
cardRoute.delete('/normaldelete', NormalCardDelete);

module.exports = cardRoute;
