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
  },
  photokey: {
    type: String,
  },
  reviewkey: {
    type: String,
  },
  titlekey: {
    type: String,
  },
  ratingskey: {
    type: String,
  },
  logokey: {
    type: String,
  },
  servicekey: {
    type: String,
  },
  positionkey: {
    type: String,
  },
  namevalue: {
    type: String,
  },
  photovalue: {
    type: String,
  },
  reviewvalue: {
    type: String,
  },
  titlevalue: {
    type: String,
  },
  ratingsvalue: {
    type: String,
  },
  logovalue: {
    type: String,
  },
  servicevalue: {
    type: String,
  },
  positionvalue: {
    type: String,
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
  scrolltype: {
    type: String,
    required: true,
  },
});

const NormalCard = mongo.model('Normal', NormalCardSchema);

module.exports = NormalCard;
