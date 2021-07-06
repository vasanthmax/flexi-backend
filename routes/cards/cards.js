const FlipCard = require('../../models/FlipCard');
const STATUS_CODES = require('../../constants/statusCodes');
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

module.exports = { FlipCardCheck, FlipCardFind };
