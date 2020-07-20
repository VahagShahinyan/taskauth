const jwt = require('jsonwebtoken');
const AuthRepository = require('../database/repository/auth.repository')
const UserService = require('./user.service');
const tokenConfig = require('../config/config').token;
module.exports = class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
        this.userService = new UserService();
    }

    async getNewTokens(user, sessionId = 0) {
        let userinfo = this.userService.getUserShortInfoForToken(user)
        if (!sessionId) {
            let session = await this.authRepository.createSession(user.id, tokenConfig.tokenExpireTime)
            sessionId = session.id
        } else
            await this.authRepository.updateSession(sessionId, {expire: tokenConfig.tokenExpireTime})
        userinfo.sessionId = sessionId

        const token = jwt.sign({user: userinfo}, tokenConfig.tokenSecret, {expiresIn: tokenConfig.tokenExpireTime})
        const refreshToken = jwt.sign({user: userinfo}, tokenConfig.refreshTokenSecret, {expiresIn: tokenConfig.refreshTokenExpireTime});
        return {
            token: token,
            refreshToken: refreshToken,
            tokenType: "bearer"
        }
    }

    verifyToken(token, secret) {
        if (!token) {
            const error = new Error('Token not found');
            error.statusCode = 401;
            throw error;
        }
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
    }

    decodeToken(token, secret) {
        if (!token) {
            const error = new Error('Token not found');
            error.statusCode = 401;
            throw error;
        }
        try {
            return jwt.decode(token, secret);
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
    }

    parseRefreshToken(token) {
        return this.verifyToken(token, tokenConfig.refreshTokenSecret);
    }

    getSession(sessionId) {
        return this.authRepository.getSession(sessionId)
    }

    async logout(sessionId) {
        return await this.authRepository.removeSession(sessionId)
    }
}