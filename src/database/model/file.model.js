const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class File extends Model { }

File.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    originalname: {
        type: DataTypes.STRING,
    },
    mimetype: {
        type: DataTypes.STRING,
    },
    path: {
        type: DataTypes.STRING,
    },
    filename: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'File' // We need to choose the model name
});

module.exports = File
