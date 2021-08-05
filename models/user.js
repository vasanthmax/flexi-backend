const mongoose = require('mongoose')

const User = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	type: { type: String, required: true, default: 'email' },		// Valid values:  ['email', 'facebook', 'google']
	refreshToken: { type: String, required: false },
	passwordHash: { type: String, required: false },
}, { timestamps: true })


module.exports = mongoose.model('User', User)