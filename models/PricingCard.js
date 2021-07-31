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
  },
  planpricekey: {
    type: String,
  },
  planlinkkey: {
    type: String,
  },
  planfeature1key: {
    type: String,
  },
  planfeature2key: {
    type: String,
  },
  planfeature3key: {
    type: String,
  },
  planfeature4key: {
    type: String,
  },
  planfeature5key: {
    type: String,
  },
  plannamevalue: {
    type: String,
  },
  planpricevalue: {
    type: String,
  },
  planlinkvalue: {
    type: String,
  },
  planfeature1value: {
    type: String,
  },
  planfeature2value: {
    type: String,
  },
  planfeature3value: {
    type: String,
  },
  planfeature4value: {
    type: String,
  },
  planfeature5value: {
    type: String,
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
  scrolltype: {
    type: String,
    required: true,
  },
});

const PricingCard = mongo.model('Pricing', PricingCardSchema);

module.exports = PricingCard;
