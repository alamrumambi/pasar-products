'use strict';
const { hashing } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@email.com',
      password: hashing('admin12#')
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
