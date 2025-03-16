"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "kakaoId", {
            type: Sequelize.STRING(100), // 🔥 기존 int → STRING(100) 변경
            allowNull: true,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "kakaoId", {
            type: Sequelize.INTEGER, // 🔥 롤백 시 기존 상태로 되돌림
            allowNull: true,
            unique: true,
        });
    },
};
