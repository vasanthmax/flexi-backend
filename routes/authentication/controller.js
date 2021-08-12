const https = require('https');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const AUTH = require('../../config').AUTHENTICATION;
const { AUTHORIZATION_SECRET_KEY } = require('../../config');

class TokenError extends Error {
  constructor(args) {
    super(args);
    this.name = 'TokenError';
  }
}

function generateToken(_id, tokenType = 'A') {
  TOKEN_TYPE = tokenType == 'R' ? 'REFRESH_TOKEN' : 'ACCESS_TOKEN';

  ACCESS_TOKEN_EXPIRY = '1h';

  payload = {
    id: _id,
    type: TOKEN_TYPE,
  };

  if (tokenType == 'R') {
    signedJWT = jwt.sign(payload, AUTHORIZATION_SECRET_KEY);
    return signedJWT;
  } else {
    signedJWT = jwt.sign(payload, AUTHORIZATION_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  }
  return signedJWT;
}

function generateAccessToken(object_id) {
  return generateToken(object_id, (tokenType = 'A'));
}

function generateRefreshToken(object_id) {
  return generateToken(object_id, (tokenType = 'R'));
}

async function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (d) => {
        data += d;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
  });
}

async function findProfileOrCreate(profile) {
  try {
    user = await User.findOne({ email: profile.email });

    if (!user) {
      const newUser = new User(profile);
      let user = await newUser.save();

      let accessToken = generateAccessToken(user._id);
      let refreshToken = generateRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      return {
        type: 'NEW_USER',
        _id: user._id,
        tokens: {
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      };
    } else {
      if (profile.type == 'email') {
        throw new Error('SignupError: Email already in use.');
      }

      let accessToken = generateAccessToken(user._id);

      user.type = profile.type;
      await user.save();

      return {
        type: 'EXISTING_USER',
        _id: user._id,
        tokens: {
          refreshToken: user.refreshToken,
          accessToken: accessToken,
        },
      };
    }
  } catch (err) {
    throw err;
  }
}

async function verifyFacebookAccessToken(token) {
  const profileURL = `https://graph.facebook.com/v9.0/me?fields=name,email&access_token=${token}`;
  const verifyURL = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${AUTH.FACEBOOK.APP_ID}|${AUTH.FACEBOOK.APP_SECRET}`;

  var verifyBody = await fetch(verifyURL);
  if (verifyBody.data.is_valid) {
    var profileData = fetch(profileURL);
    return profileData;
  } else {
    throw new TokenError('Invalid access_token');
  }
}

async function verifyGoogleIdToken(token) {
  const client = new OAuth2Client(AUTH.GOOGLE.CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: AUTH.GOOGLE.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload.email_verified) {
      throw new TokenError('Invalid idToken: Email not verified');
    }
    return payload;
  } catch (err) {
    throw new TokenError(err.message);
  }
}

async function generateProfile(email, name, password) {
  const SALT_ROUNDS = 10;

  var passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

  return {
    email: email,
    name: name,
    passwordHash: passwordHash,
  };
}

async function loginHandler(email, password) {
  let user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Wrong credentials.');
  } else {
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      throw new Error('Wrong credentials.');
    } else {
      var tokens = {
        refreshToken: user.refreshToken,
        accessToken: generateAccessToken(user._id),
      };
      user.save();
      return {
        _id: user._id,
        tokens,
      };
    }
  }
}

module.exports = {
  verifyGoogleIdToken,
  verifyFacebookAccessToken,
  generateProfile,
  generateAccessToken,
  generateRefreshToken,
  findProfileOrCreate,
  loginHandler,
};
