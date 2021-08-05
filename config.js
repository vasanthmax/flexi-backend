// config.js -- configuration file for marble_backend
// Stores global constants

module.exports = {
	SERVER_PORT: process.env.PORT || 3000,
	ENABLE_NOTE_AUTOPOPULATE: true,		// Enables auto-populate in Notes' children references

	AUTHORIZATION_SECRET_KEY: 'CHANGING_TO_CHECK_CI',	// Make it stronger in production
	AUTHENTICATION: {
		GOOGLE: {
			CLIENT_ID: 'XXXXXXXXX.apps.googleusercontent.com'
		},
		FACEBOOK: {
			APP_ID: 'XXXXXXXXX',
			APP_SECRET: 'XXXXXXXXX'
		}
	},

	DATABASE_SETTINGS: {
		host: 'XXXXXXXXX.ap-south-1.compute.amazonaws.com',
		port: 27017,
		dbName: 'XXXXXXXXX',
		username: 'XXXXXXXXX',
		password: 'XXXXXXXXX'
	}
}
