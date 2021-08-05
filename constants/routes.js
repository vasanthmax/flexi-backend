const cardRoute = require('../routes/cards/index');
const authRoute = require('../routes/authentication')

const ROUTES = {
  CARD: cardRoute,
  AUTH: authRoute,
};

module.exports = ROUTES;
