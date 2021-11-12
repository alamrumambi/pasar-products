'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemMarket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemMarket.belongsTo(models.Item);
      // ItemMarket.belongsTo(models.Market);
      // define association here
    }
  };
  ItemMarket.init({
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Item tidak boleh kosong!' },
        notEmpty: { msg: 'Item tidak boleh kosong!' }
      }
    },
    MarketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Pasar tidak boleh kosong!' },
        notEmpty: { msg: 'Pasar tidak boleh kosong!' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Harga item tidak boleh kosong!' },
        notEmpty: { msg: 'Harga item tidak boleh kosong!' },
        min: {
          args: 1,
          msg: 'Harga tidak boleh 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ItemMarket',
  });
  return ItemMarket;
};