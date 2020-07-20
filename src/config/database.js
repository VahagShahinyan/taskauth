const config = require('./config')
const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
    host: config.database.host,
    database: config.database.db,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
    logging:false,
    dialect: 'mysql'
});