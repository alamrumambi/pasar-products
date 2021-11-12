'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ItemMarkets',
      [
        {
          price: 40000,
          MarketId: 1,
          ItemId: 1
        },
        {
          price: 38000,
          MarketId: 2,
          ItemId: 1
        },
        {
          price: 12000,
          MarketId: 1,
          ItemId: 2
        },
        {
          price: 12500,
          MarketId: 2,
          ItemId: 2
        },
        {
          price: 13000,
          MarketId: 1,
          ItemId: 3
        },
        {
          price: 15000,
          MarketId: 2,
          ItemId: 3
        },
        {
          price: 15000,
          MarketId: 1,
          ItemId: 4
        },
        {
          price: 14000,
          MarketId: 2,
          ItemId: 4
        },
        {
          price: 67000,
          MarketId: 1,
          ItemId: 5
        },
        {
          price: 80000,
          MarketId: 2,
          ItemId: 5
        },
        {
          price: 42000,
          MarketId: 1,
          ItemId: 6
        },
        {
          price: 39000,
          MarketId: 2,
          ItemId: 6
        },
        {
          price: 92000,
          MarketId: 1,
          ItemId: 7
        },
        {
          price: 95000,
          MarketId: 2,
          ItemId: 7
        },
        {
          price: 62000,
          MarketId: 1,
          ItemId: 8
        },
        {
          price: 60000,
          MarketId: 2,
          ItemId: 8
        },
        {
          price: 12000,
          MarketId: 1,
          ItemId: 9
        },
        {
          price: 13000,
          MarketId: 2,
          ItemId: 9
        },
        {
          price: 77000,
          MarketId: 1,
          ItemId: 10
        },
        {
          price: 79000,
          MarketId: 2,
          ItemId: 10
        }
      ], {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
