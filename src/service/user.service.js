const UserRepository = require('../database/repository/user.repository')
const bcrypt = require('bcrypt');
module.exports = class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    get(id = 0) {
        return this.userRepository.get(id);
    }

    getByEmail(email) {
        return this.userRepository.getByEmail(email);
    }

    getUserShortInfoForToken(user) {
        return {
            id: user.id,
            email: user.email
        };
    }

    getList(page, limit) {
        page = parseInt(page) || 1;
        page = page > 0 ? page : 1;
        limit = parseInt(limit) || 10;
        limit = limit > 0 ? limit : 10;
        let offset = ((page - 1) * limit)
        return this.userRepository.getList(offset, limit);
    }

    async getForLogin(email, password) {
        const user = await this.getByEmail(email)

        if (!user) {
            const error = new Error(`user with email ${email} does not exist!`)
            error.statusCode = 401
            throw  error;
        }

        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        return user;
    }

    async create(email, password) {
        const user = await this.getByEmail(email);

        if (user) {
            const error = new Error(`user with email ${email} already exists!`)
            error.statusCode = 401
            throw error

        }

        const passwordHash = await bcrypt.hash(password, 12);
        return this.userRepository.create({ email: email, password: passwordHash });
    }

    update(id, data) {
        id = parseInt(id);
        return this.userRepository.update(id, data);
    }

    delete(id) {
        id = parseInt(id);
        return this.userRepository.delete(id);
    }

}