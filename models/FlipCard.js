const mongo = require('mongoose');

const FlipCardSchema = mongo.Schema({
  sheetid: {
    type: String,
    required: true,
  },
  cardtype: {
    type: String,
    required: true,
  },
  namekey: {
    type: String,
    required: true,
  },
  titlekey: {
    type: String,
    required: true,
  },
  pricekey: {
    type: String,
    required: true,
  },
  descriptionkey: {
    type: String,
    required: true,
  },
  photokey: {
    type: String,
    required: true,
  },
  gotokey: {
    type: String,
    required: true,
  },
  namevalue: {
    type: String,
    required: true,
  },
  titlevalue: {
    type: String,
    required: true,
  },
  pricevalue: {
    type: String,
    required: true,
  },
  descriptionvalue: {
    type: String,
    required: true,
  },
  photovalue: {
    type: String,
    required: true,
  },
  gotovalue: {
    type: String,
    required: true,
  },
  titlesize: {
    type: String,
    required: true,
  },
  titlecolor: {
    type: String,
    required: true,
  },
  namesize: {
    type: String,
    required: true,
  },
  namecolor: {
    type: String,
    required: true,
  },
  cardcolor: {
    type: String,
    required: true,
  },
  pricesize: {
    type: String,
    required: true,
  },
  pricecolor: {
    type: String,
    required: true,
  },
  descriptionsize: {
    type: String,
    required: true,
  },
  descriptioncolor: {
    type: String,
    required: true,
  },
  buttoncolor: {
    type: String,
    required: true,
  },
  buttontextcolor: {
    type: String,
    required: true,
  },
  textfont: {
    type: String,
    required: true,
  },
});

const FlipCard = mongo.model('FlipCard', FlipCardSchema);

module.exports = FlipCard;
