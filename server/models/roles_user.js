'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuid4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class roles_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles_user.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: uuid4
    },
    user_id: DataTypes.UUID,
    role_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'roles_user',
  });
  return roles_user;
};