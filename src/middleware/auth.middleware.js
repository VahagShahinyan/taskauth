const tokenConfig = require('../config/config').token
const AuthService = require('../service/auth.service');
const authService = new AuthService();

function processdecodedToken(decodedToken, req, next) {
    if (!decodedToken || !decodedToken.user) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    authService.getSession(decodedToken.user.sessionId).then((session) => {
        if (!session) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        req.user = decodedToken.user
        next();
    })
}

module.exports.isAuth = (req, res, next) => {
    const token = req.headers.authorization && (req.headers.authorization.split(' ').length > 1) && req.headers.authorization.split(' ')[1];
    let decodedToken = authService.verifyToken(token, tokenConfig.tokenSecret)
    processdecodedToken(decodedToken, req, next)
}

module.exports.accessTokenUserInfo = (req, res, next) => {
    const token = req.headers.authorization && (req.headers.authorization.split(' ').length > 1) && req.headers.authorization.split(' ')[1];
    let decodedToken = authService.decodeToken(token, tokenConfig.tokenSecret)
    processdecodedToken(decodedToken, req, next)
}
