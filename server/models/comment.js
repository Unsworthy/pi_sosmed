'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuid4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init({
      id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: uuid4
    },
    post_id: DataTypes.UUID,
    content_text_comment: DataTypes.STRING,
    content_image_comment: DataTypes.STRING,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};