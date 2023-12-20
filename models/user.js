"use strict";
const { Model, BOOLEAN } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pls introduce the name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please introduce email",
          },
          isEmail: {
            msg: "Pleasde introduce valid email",
          },
        },
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      confirmed: BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

// const User = sequelize.define('User', {
//   user: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   hooks: {
//     beforeValidate: (user, options) => {
//       if (!user.username || !user.email || !user.password) {
//         throw new Error('Todos los campos son obligatorios.');
//       }
//     },
//   },
// });
