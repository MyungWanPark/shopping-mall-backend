"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "email", {
            type: Sequelize.STRING,
            allowNull: true, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "password", {
            type: Sequelize.STRING,
            allowNull: true, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "gender", {
            type: Sequelize.STRING,
            allowNull: true, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "age", {
            type: Sequelize.TEXT,
            allowNull: true, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "inflowRoute", {
            type: Sequelize.STRING,
            allowNull: true, // ✅ NULL 허용 변경
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "email", {
            type: Sequelize.STRING,
            allowNull: false, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "password", {
            type: Sequelize.STRING,
            allowNull: false, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "gender", {
            type: Sequelize.STRING,
            allowNull: false, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "age", {
            type: Sequelize.TEXT,
            allowNull: false, // ✅ NULL 허용 변경
        });

        await queryInterface.changeColumn("users", "inflowRoute", {
            type: Sequelize.STRING,
            allowNull: false, // ✅ NULL 허용 변경
        });
    },
};
