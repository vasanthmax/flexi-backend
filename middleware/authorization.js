const JWT = require('jsonwebtoken')
const STATUS_CODES = require('../routes/status_codes')
const { AUTHORIZATION_SECRET_KEY } = require('../../config')


async function verifyAuthorization(req, res, next){
    if (req.path.startsWith('/auth'))    return next()  // This route handles authentication and is unprotected.
    if (req.path == '/user' && req.method == 'GET')  return next()   // Allows checking if email exists.
    
    let authHeader = req.headers.authorization
    
    if (authHeader){
        let bearerToken = authHeader.split(' ')[1]
        JWT.verify(bearerToken, AUTHORIZATION_SECRET_KEY, (err, success) => {
            if (err){
                res.sendStatus(STATUS_CODES.FORBIDDEN)
            }
            else{
                next()
            }
        })
    }
    else{
        res.sendStatus(STATUS_CODES.FORBIDDEN)
    }
}


module.exports = verifyAuthorization