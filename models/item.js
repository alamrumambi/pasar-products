'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsToMany(models.Market, { through: models.ItemMarket });
      Item.hasMany(models.ItemMarket);
      // define association here
    }
  };
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama item tidak boleh kosong!' },
        notEmpty: { msg: 'Nama item tidak boleh kosong!' }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image item tidak boleh kosong!' },
        notEmpty: { msg: 'Image item tidak boleh kosong!' }
      }
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Nama satuan item tidak boleh kosong!' },
        notEmpty: { msg: 'Nama satuan item tidak boleh kosong!' }
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};