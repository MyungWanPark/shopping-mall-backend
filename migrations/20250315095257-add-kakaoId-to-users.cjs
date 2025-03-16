"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn("users", "kakaoId", {
            type: Sequelize.INTEGER,
            allowNull: true,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn("users", "kakaoId");
    },
};
