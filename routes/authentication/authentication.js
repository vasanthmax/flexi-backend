const User = require('../../models/user');
const _ = require('lodash');
const {
  generateAccessToken,
  verifyGoogleIdToken,
  verifyFacebookAccessToken,
  findProfileOrCreate,
  generateProfile,
  loginHandler,
} = require('./controller');

const STATUS_CODES = require('../../constants/statusCodes');
const JWT = require('jsonwebtoken');
const { AUTHORIZATION_SECRET_KEY } = require('../../config');
const mailgun = require('mailgun-js');
const domain = 'sandbox0b34e69784b34eecbdc8dc9bb7f4dc36.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAIL_GUN_API, domain: domain });
const bcrypt = require('bcryptjs');
async function emailSignup(req, res) {
  var { email, name, password } = req.body;

  try {
    var profile = await generateProfile(email, name, password);
    var userBody = { ...profile, type: 'email' };
    response = await findProfileOrCreate(userBody);
    res.status(STATUS_CODES.CREATED).json(response);
  } catch (err) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
}

async function emailLogin(req, res) {
  var { email, password } = req.body;

  try {
    var user = await loginHandler(email, password);
    res.json({
      status: 'success',
      ...user,
    });
  } catch (err) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: 'error',
      error: {
        name: 'WrongCredentialsError',
        message: err.message,
      },
    });
  }
}

async function googleSignIn(req, res) {
  var googleIdToken = req.body.idToken;

  try {
    var profile = await verifyGoogleIdToken(googleIdToken);
    var userBody = {
      email: profile.email,
      name: profile.name,
      type: 'google',
    };
    response = await findProfileOrCreate(userBody);
    res.json(response);
  } catch (err) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
}

async function facebookSignin(req, res) {
  var { accessToken } = req.body;

  try {
    var profile = await verifyFacebookAccessToken(accessToken);
    var userBody = {
      email: profile.email,
      name: profile.name,
      type: 'facebook',
    };
    response = await findProfileOrCreate(userBody);
    res.json(response);
  } catch (err) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
}

async function refresh(req, res) {
  let bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.sendStatus(STATUS_CODES.FORBIDDEN);
  }

  let refreshToken = bearerToken.split(' ')[1];
  JWT.verify(refreshToken, AUTHORIZATION_SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(STATUS_CODES.FORBIDDEN).json(err);
    }

    if (payload.type != 'REFRESH_TOKEN') {
      res.status(STATUS_CODES.FORBIDDEN).json({
        status: 'error',
        error: {
          name: 'InvalidTokenError',
          message: 'Not a refresh token.',
        },
      });
    } else {
      User.findById(payload.id, (err, user) => {
        if (user && user.refreshToken == refreshToken) {
          var newAccessToken = generateAccessToken(payload.id);
          res.json({
            status: 'success',
            accessToken: newAccessToken,
          });
        } else {
          res.status(STATUS_CODES.FORBIDDEN).json({
            status: 'error',
            error: {
              name: 'InvalidTokenError',
              message: 'Wrong token.',
            },
          });
        }
      });
    }
  });
}

function forgotPassword(req, res) {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: "User with Email doesn't exists" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: '20m',
    });
    const data = {
      from: 'noreply@hello.com',
      to: email,
      subject: 'Password reset Link',
      html: `<h2>Please click on given Link to reset your Password</h2>
				<p>http://localhost:3000/resetpassword/${token}</p>
		`,
    };

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'reset password link error' });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({
              error: error.message,
            });
          }
          return res.json({ message: 'Email has been sent succesfully' });
        });
      }
    });
  });
}

function resetPassword(req, res) {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    JWT.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      function (error, decodedData) {
        if (error) {
          return res.status(STATUS_CODES.UNAUTHORIZED).json({
            error: 'Incorrect token or it is expired',
          });
        }
        User.findOne({ resetLink }, (err, user) => {
          if (err || !user) {
            return res
              .status(STATUS_CODES.BAD_REQUEST)
              .json({ error: 'User with this token does not exist' });
          }
          const SALT_ROUNDS = 10;
          const passwordHash = bcrypt.hashSync(newPass, SALT_ROUNDS);
          const obj = {
            passwordHash: passwordHash,
            resetLink: '',
          };
          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({ error: 'Reset Password Error' });
            } else {
              return res
                .status(STATUS_CODES.OK)
                .json({ message: 'Your Password has been Changed' });
            }
          });
        });
      }
    );
  } else {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ error: 'Authentication error' });
  }
}

module.exports = {
  emailSignup,
  emailLogin,
  googleSignIn,
  facebookSignin,
  refresh,
  forgotPassword,
  resetPassword,
};
