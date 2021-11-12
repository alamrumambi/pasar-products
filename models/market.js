'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Market.belongsToMany(models.Item, { through: models.ItemMarket });
      // define association here
    }
  };
  Market.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama pasar tidak boleh kosong!' },
        notEmpty: { msg: 'Nama pasar tidak boleh kosong!' }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Alamat pasar tidak boleh kosong!' },
        notEmpty: { msg: 'Alamat pasar tidak boleh kosong!' }
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Kordinat tidak boleh kosong!' },
        notEmpty: { msg: 'Kordinat tidak boleh kosong!' }
      }
    },
    long: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Kordinat tidak boleh kosong!' },
        notEmpty: { msg: 'Kordinat tidak boleh kosong!' }
      }
    }
  }, {
    sequelize,
    modelName: 'Market',
  });
  return Market;
};