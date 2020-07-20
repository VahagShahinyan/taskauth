const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Session extends Model { }

Session.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER(15)
    },
    expire: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Session' // We need to choose the model name
});

module.exports = Session