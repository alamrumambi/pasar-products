'use strict';
const { hashing } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama tidak boleh kosong!' },
        notEmpty: { msg: 'Nama tidak boleh kosong!' }
      }
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email tidak boleh kosong!' },
        notEmpty: { msg: 'Email tidak boleh kosong!' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password tidak boleh kosong!' },
        notEmpty: { msg: 'Password tidak boleh kosong!' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashing(user.password);
      }
    }
  });
  return User;
};