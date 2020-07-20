const Session = require("../model/session.model")

module.exports = class AuthRepository {
    constructor() {
    }

    getSession(sessionId) {
        return Session.findByPk(sessionId);
    }

    createSession(userId, expire) {
        const session = new Session({
            user_id: userId,
            expire: expire
        })
        return session.save();
    }

    removeSession(sessionId) {
        return Session.destroy({
            where: {
                id: sessionId
            }
        })
    }

    updateSession(sessionId, data) {
        return Session.update(data, {
            where: {
                id: sessionId
            }
        })
    }
}
