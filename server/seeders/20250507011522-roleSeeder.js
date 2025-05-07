'use strict';
const { v4: uuid4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('roles', [
       {
        id: uuid4(),
         role_name: 'Super Admin',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        id: uuid4(),
         role_name: 'Staff',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        id: uuid4(),
         role_name: 'student',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        id: uuid4(),
         role_name: 'Teacher',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        id: uuid4(),
         role_name: 'Industry',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
     

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('roles', null, {});
  }
};
