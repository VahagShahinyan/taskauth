module.exports = class UserController {
    constructor() {

    }

    getUserInfo = (req, res) => {
        res.json({
            id: req.user.id,
            email: req.user.email,
        })
    }
}