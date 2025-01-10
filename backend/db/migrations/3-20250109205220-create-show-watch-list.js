"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "ShowWatchLists",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
        showId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: "Shows", key: "id" },
          onDelete: "CASCADE",
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "ShowWatchLists";
    await queryInterface.dropTable(options);
  },
};
