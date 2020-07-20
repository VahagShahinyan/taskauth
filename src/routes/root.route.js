const express = require('express')
const FileRouter = require('./file.route')
const AuthMiddleware = require('../middleware/auth.middleware')
const AuthController = require('../controller/auth.controller')
const authController = new AuthController()

const UserController = require('../controller/user.controller')
const userController = new UserController()

const router = express.Router()

router.use('/file', AuthMiddleware.isAuth, FileRouter)
router.post('/signin', authController.signIn)
router.post('/signup', authController.signUp)
router.post('/signin/new_token', AuthMiddleware.accessTokenUserInfo, authController.getRefreshToken)
router.get('/info', userController.getUserInfo)
router.get('/logout', authController.logout)

module.exports = router