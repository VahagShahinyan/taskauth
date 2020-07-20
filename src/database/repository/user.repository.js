const User = require('../model/user.model')
module.exports = class UserRepository {
    constructor() {

    }

    getByEmail(email) {
        return User.findOne({
            where: {
                email: email
            }
        })
    }

    get(id = 0) {
        return User.findOne({
            where: {
                id: id
            }
        })
    }

    getList(offset = 0, limit = 10) {
        return User.findAll({
            limit: limit,
            offset: offset
        })
    }

    create(data) {
        let user = new User(data);
        return user.save()
    }

    update(id, data) {
        return User.update(data, {
            where: {
                id: id
            }
        })
    }

    delete(id) {
        return User.destroy({
            where: {
                id: id
            }
        })
    }
}
