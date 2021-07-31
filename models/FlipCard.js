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
  },
  titlekey: {
    type: String,
  },
  pricekey: {
    type: String,
  },
  descriptionkey: {
    type: String,
  },
  photokey: {
    type: String,
  },
  gotokey: {
    type: String,
  },
  namevalue: {
    type: String,
  },
  titlevalue: {
    type: String,
  },
  pricevalue: {
    type: String,
  },
  descriptionvalue: {
    type: String,
  },
  photovalue: {
    type: String,
  },
  gotovalue: {
    type: String,
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
  scrolltype: {
    type: String,
    required: true,
  },
});

const FlipCard = mongo.model('FlipCard', FlipCardSchema);

module.exports = FlipCard;
