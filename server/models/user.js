"use strict";
const { Model } = require("sequelize");
const { v4: uuid4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.roles, {
        through: "roles_users",
        foreignKey: "user_id",
        otherKey: "role_id",
      });
      User.belongsToMany(models.student, {
        through: "student_users", // pakai "s"
        foreignKey: "user_id",
        otherKey: "student_id",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuid4,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
