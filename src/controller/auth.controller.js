const AuthService = require('../service/auth.service')
const UserService = require('../service/user.service')

module.exports = class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    signIn = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        return this.userService.getForLogin(email, password)
            .then(user => this.authService.getNewTokens(user))
            .then(tokens => res.json(tokens))
            .catch(next)
    }

    signUp = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        return this.userService.create(email, password)
            .then(user => this.authService.getNewTokens(user))
            .then(tokens => res.json(tokens))
            .catch(next)
    }

    getRefreshToken = (req, res, next) => {
        const refreshToken = req.body.refreshToken
        const tokenUserInfo = this.authService.parseRefreshToken(refreshToken).user;
        if (!tokenUserInfo || tokenUserInfo.sessionId !== req.user.sessionId) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        return this.authService.getNewTokens(tokenUserInfo, req.user.sessionId)
            .then(tokens => res.json(tokens))
            .catch(next)
    }

    logout = (req, res, next) => {
        return this.authService.logout(req.user.sessionId)
            .then(result => res.json(result))
            .catch(next)
    }
}