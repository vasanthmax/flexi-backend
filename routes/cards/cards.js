const FlipCard = require('../../models/FlipCard');
const STATUS_CODES = require('../../constants/statusCodes');
const PricingCard = require('../../models/PricingCard');
const NormalCard = require('../../models/NormalCard');
const FlipCardCheck = async (req, res) => {
  const registeredCard = await FlipCard.findOne({ sheetid: req.body.sheetid });
  if (registeredCard)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: 'Sheetid Already exists',
    });
  let Card = new FlipCard({
    sheetid: req.body.sheetid,
    cardtype: req.body.cardtype,
    namekey: req.body.namekey,
    titlekey: req.body.titlekey,
    pricekey: req.body.pricekey,
    descriptionkey: req.body.descriptionkey,
    photokey: req.body.photokey,
    gotokey: req.body.gotokey,
    titlesize: req.body.titlesize,
    titlecolor: req.body.titlecolor,
    namesize: req.body.namesize,
    namecolor: req.body.namecolor,
    cardcolor: req.body.cardcolor,
    pricesize: req.body.pricesize,
    pricecolor: req.body.pricecolor,
    descriptionsize: req.body.descriptionsize,
    descriptioncolor: req.body.descriptioncolor,
    buttoncolor: req.body.buttoncolor,
    buttontextcolor: req.body.buttontextcolor,
    textfont: req.body.textfont,
  });

  try {
    await Card.save();
    console.log('registered');
    return res.status(STATUS_CODES.CREATED).json({
      _id: Card._id,
    });
  } catch (e) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
    });
  }
};

const FlipCardFind = async (req, res) => {
  const registeredCard = await FlipCard.findOne({ _id: req.query.id });

  return res.status(STATUS_CODES.OK).json({
    data: registeredCard,
  });
};

const PricingCardCheck = async (req, res) => {
  const registeredCard = await PricingCard.findOne({
    sheetid: req.body.sheetid,
  });
  if (registeredCard)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: 'Sheetid Already exists',
    });
  let Card = new PricingCard({
    sheetid: req.body.sheetid,
    cardtype: req.body.cardtype,
    plannamekey: req.body.plannamekey,
    planpricekey: req.body.planpricekey,
    planlink: req.body.planlink,
    planfeature1key: req.body.planfeature1key,
    planfeature2key: req.body.planfeature2key,
    planfeature3key: req.body.planfeature3key,
    planfeature4key: req.body.planfeature4key,
    planfeature5key: req.body.planfeature5key,
    pricingcardcolor: req.body.pricingcardcolor,
    pricingplansize: req.body.pricingplansize,
    princingplancolor: req.body.princingplancolor,
    pricingpricesize: req.body.pricingpricesize,
    pricingpricecolor: req.body.pricingpricecolor,
    pricingbuttoncolor: req.body.pricingbuttoncolor,
    pricingbuttontextcolor: req.body.pricingbuttontextcolor,
    pricingfeaturecolor: req.body.pricingfeaturecolor,
    princingfeaturesize: req.body.princingfeaturesize,
    pricingfont: req.body.pricingfont,
  });

  try {
    await Card.save();
    console.log('registered');
    return res.status(STATUS_CODES.CREATED).json({
      _id: Card._id,
    });
  } catch (e) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
    });
  }
};

const PricingCardFind = async (req, res) => {
  const registeredCard = await PricingCard.findOne({ _id: req.query.id });

  return res.status(STATUS_CODES.OK).json({
    data: registeredCard,
  });
};

const NormalCardCheck = async (req, res) => {
  const registeredCard = await NormalCard.findOne({
    sheetid: req.body.sheetid,
  });
  if (registeredCard)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: 'Sheetid Already exists',
    });
  let Card = new NormalCard({
    sheetid: req.body.sheetid,
    cardtype: req.body.cardtype,
    namekey: req.body.namekey,
    photokey: req.body.photokey,
    reviewkey: req.body.reviewkey,
    titlekey: req.body.titlekey,
    ratingskey: req.body.ratingskey,
    logokey: req.body.logokey,
    servicekey: req.body.servicekey,
    positionkey: req.body.positionkey,
    cardcolor: req.body.cardcolor,
    avatarshape: req.body.avatarshape,
    namecolor: req.body.namecolor,
    namesize: req.body.namesize,
    positioncolor: req.body.positioncolor,
    positionsize: req.body.positionsize,
    titlecolor: req.body.titlecolor,
    titlesize: req.body.titlesize,
    reviewcolor: req.body.reviewcolor,
    reviewsize: req.body.reviewsize,
    servicecolor: req.body.servicecolor,
    servicesize: req.body.servicesize,
    fontname: req.body.fontname,
  });

  try {
    await Card.save();
    console.log('registered');
    return res.status(STATUS_CODES.CREATED).json({
      _id: Card._id,
    });
  } catch (e) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
    });
  }
};

const NormalCardFind = async (req, res) => {
  const registeredCard = await NormalCard.findOne({ _id: req.query.id });

  return res.status(STATUS_CODES.OK).json({
    data: registeredCard,
  });
};

const FlipCardAll = async (req, res) => {
  const registeredCard = await FlipCard.find();
  return res.status(STATUS_CODES.OK).json({
    data: registeredCard,
  });
};

const PricingCardAll = async (req, res) => {
  const registeredCard = await PricingCard.find();
  return res.status(STATUS_CODES.OK).json({
    data: registeredCard,
  });
};
const NormalCardAll = async (req, res) => {
  const registeredCard = await NormalCard.find();
  return res.status(STATUS_CODES.OK).json({
    data: registeredCard,
  });
};

module.exports = {
  FlipCardCheck,
  FlipCardFind,
  PricingCardCheck,
  PricingCardFind,
  NormalCardCheck,
  NormalCardFind,
  FlipCardAll,
  PricingCardAll,
  NormalCardAll,
};
