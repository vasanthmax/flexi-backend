const User = require('../../models/user')
const { generateAccessToken, verifyGoogleIdToken,
	verifyFacebookAccessToken, findProfileOrCreate,
	generateProfile, loginHandler } = require('./controller')

const STATUS_CODES = require('../../constants/statusCodes')
const JWT = require('jsonwebtoken')
const { AUTHORIZATION_SECRET_KEY } = require('../../config')



async function emailSignup(req, res) {
	var { email, name, password } = req.body

	try {
		var profile = await generateProfile(email, name, password)
		var userBody = { ...profile, type: 'email' }
		response = await findProfileOrCreate(userBody)
		res.status(STATUS_CODES.CREATED).json(response)
	} catch (err) {
		res.status(STATUS_CODES.BAD_REQUEST).json({
			error: {
				name: err.name,
				message: err.message
			}
		})
	}
}



async function emailLogin(req, res) {
	var { email, password } = req.body

	try {
		var user = await loginHandler(email, password)
		res.json({
			status: "success",
			...user
		})
	}
	catch (err) {
		res.status(STATUS_CODES.UNAUTHORIZED).json({
			status: "error",
			error: {
				name: "WrongCredentialsError",
				message: err.message
			}
		})
	}
}



async function googleSignIn(req, res) {
	var googleIdToken = req.body.idToken

	try {
		var profile = await verifyGoogleIdToken(googleIdToken)
		var userBody = {
			email: profile.email,
			name: profile.name,
			type: 'google'
		}
		response = await findProfileOrCreate(userBody)
		res.json(response)
	} catch (err) {
		res.status(STATUS_CODES.UNAUTHORIZED).json({
			error: {
				name: err.name,
				message: err.message
			}
		})
	}
}



async function facebookSignin(req, res) {
	var { accessToken } = req.body

	try {
		var profile = await verifyFacebookAccessToken(accessToken)
		var userBody = {
			email: profile.email,
			name: profile.name,
			type: 'facebook'
		}
		response = await findProfileOrCreate(userBody)
		res.json(response)
	} catch (err) {
		res.status(STATUS_CODES.UNAUTHORIZED).json({
			error: {
				name: err.name,
				message: err.message
			}
		})
	}
}


async function refresh(req, res) {
	let bearerToken = req.headers.authorization
	if (!bearerToken) {
		res.sendStatus(STATUS_CODES.FORBIDDEN)
	}

	let refreshToken = bearerToken.split(' ')[1]
	JWT.verify(refreshToken, AUTHORIZATION_SECRET_KEY, (err, payload) => {
		if (err) {
			res.status(STATUS_CODES.FORBIDDEN).json(err)
		}

		if (payload.type != 'REFRESH_TOKEN') {
			res.status(STATUS_CODES.FORBIDDEN).json(
				{
					status: "error",
					error: {
						name: 'InvalidTokenError',
						message: 'Not a refresh token.'
					}
				}
			)
		}
		else {
			User.findById(payload.id, (err, user) => {
				if (user && user.refreshToken == refreshToken) {
					var newAccessToken = generateAccessToken(payload.id)
					res.json({
						status: "success",
						accessToken: newAccessToken
					})
				}
				else {
					res.status(STATUS_CODES.FORBIDDEN).json(
						{
							status: "error",
							error: {
								name: 'InvalidTokenError',
								message: 'Wrong token.'
							}
						}
					)
				}
			})
		}
	})
}



module.exports = {
	emailSignup,
	emailLogin,
	googleSignIn,
	facebookSignin,
	refresh
}