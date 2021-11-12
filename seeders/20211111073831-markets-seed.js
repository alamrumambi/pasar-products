'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Markets',
      [
        {
          name: 'Pasar Bersehati',
          address: 'Jl. Veteran, Calaca, Wenang, Manado, Sulawesi Utara',
          lat: 1.4975893190701457,
          long: 124.84208949381883
        },
        {
          name: 'Pasar Karombasan',
          address: 'Karombasan Utara, Wanea, Manado, Sulawesi Utara',
          lat: 1.4563777090279113,
          long: 124.83942301422293
        }
      ], {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Markets', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
