'use strict';
const baseUrl = 'http://localhost:3000';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items',
      [
        {
          name: 'Daging Ayam',
          imageUrl: baseUrl + '/assets/item-images/1.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Beras',
          imageUrl: baseUrl + '/assets/item-images/2.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Minyak Goreng',
          imageUrl: baseUrl + '/assets/item-images/3.jpg',
          unitName: 'Litter'
        },
        {
          name: 'Daging Sapi',
          imageUrl: baseUrl + '/assets/item-images/4.jpg',
          unitName: 'ons'
        },
        {
          name: 'Bawang Merah',
          imageUrl: baseUrl + '/assets/item-images/5.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Bawang Putih',
          imageUrl: baseUrl + '/assets/item-images/6.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Cabai Rawit',
          imageUrl: baseUrl + '/assets/item-images/7.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Cabai Merah',
          imageUrl: baseUrl + '/assets/item-images/8.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Gula Pasir',
          imageUrl: baseUrl + '/assets/item-images/9.jpg',
          unitName: 'Kg'
        },
        {
          name: 'Cabai Hijai',
          imageUrl: baseUrl + '/assets/item-images/10.jpg',
          unitName: 'Kg'
        }
      ], {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
