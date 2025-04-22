'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            // mendefinisikan asosiasi di sini
            // user.hasMany(models.student, {
            //     foreignKey: 'user_id',
            //     as: 'students'
            // });
            // user.hasMany(models.teacher, {
            //     foreignKey: 'user_id',
            //     as: 'teachers'
            // });
        }
    }
    user.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};