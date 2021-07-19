const mongo = require('mongoose');

const NormalCardSchema = mongo.Schema({
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
  photokey: {
    type: String,
    required: true,
  },
  reviewkey: {
    type: String,
    required: true,
  },
  titlekey: {
    type: String,
    required: true,
  },
  ratingskey: {
    type: String,
    required: true,
  },
  logokey: {
    type: String,
    required: true,
  },
  servicekey: {
    type: String,
    required: true,
  },
  positionkey: {
    type: String,
    required: true,
  },
  namevalue: {
    type: String,
    required: true,
  },
  photovalue: {
    type: String,
    required: true,
  },
  reviewvalue: {
    type: String,
    required: true,
  },
  titlevalue: {
    type: String,
    required: true,
  },
  ratingsvalue: {
    type: String,
    required: true,
  },
  logovalue: {
    type: String,
    required: true,
  },
  servicevalue: {
    type: String,
    required: true,
  },
  positionvalue: {
    type: String,
    required: true,
  },
  cardcolor: {
    type: String,
    required: true,
  },
  avatarshape: {
    type: String,
    required: true,
  },
  namecolor: {
    type: String,
    required: true,
  },
  namesize: {
    type: String,
    required: true,
  },
  positioncolor: {
    type: String,
    required: true,
  },
  positionsize: {
    type: String,
    required: true,
  },
  titlecolor: {
    type: String,
    required: true,
  },
  titlesize: {
    type: String,
    required: true,
  },
  reviewcolor: {
    type: String,
    required: true,
  },
  reviewsize: {
    type: String,
    required: true,
  },
  servicecolor: {
    type: String,
    required: true,
  },
  servicesize: {
    type: String,
    required: true,
  },
  fontname: {
    type: String,
    required: true,
  },
});

const NormalCard = mongo.model('Normal', NormalCardSchema);

module.exports = NormalCard;
