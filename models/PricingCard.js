const mongo = require('mongoose');

const PricingCardSchema = mongo.Schema({
  sheetid: {
    type: String,
    required: true,
  },
  cardtype: {
    type: String,
    required: true,
  },
  plannamekey: {
    type: String,
    required: true,
  },
  planpricekey: {
    type: String,
    required: true,
  },
  planlinkkey: {
    type: String,
    required: true,
  },
  planfeature1key: {
    type: String,
    required: true,
  },
  planfeature2key: {
    type: String,
    required: true,
  },
  planfeature3key: {
    type: String,
    required: true,
  },
  planfeature4key: {
    type: String,
    required: true,
  },
  planfeature5key: {
    type: String,
    required: true,
  },
  plannamevalue: {
    type: String,
    required: true,
  },
  planpricevalue: {
    type: String,
    required: true,
  },
  planlinkvalue: {
    type: String,
    required: true,
  },
  planfeature1value: {
    type: String,
    required: true,
  },
  planfeature2value: {
    type: String,
    required: true,
  },
  planfeature3value: {
    type: String,
    required: true,
  },
  planfeature4value: {
    type: String,
    required: true,
  },
  planfeature5value: {
    type: String,
    required: true,
  },
  pricingcardcolor: {
    type: String,
    required: true,
  },
  pricingplansize: {
    type: String,
    required: true,
  },
  princingplancolor: {
    type: String,
    required: true,
  },
  pricingpricesize: {
    type: String,
    required: true,
  },
  pricingpricecolor: {
    type: String,
    required: true,
  },
  pricingbuttoncolor: {
    type: String,
    required: true,
  },
  pricingbuttontextcolor: {
    type: String,
    required: true,
  },
  pricingfeaturecolor: {
    type: String,
    required: true,
  },
  princingfeaturesize: {
    type: String,
    required: true,
  },
  pricingfont: {
    type: String,
    required: true,
  },
});

const PricingCard = mongo.model('Pricing', PricingCardSchema);

module.exports = PricingCard;
