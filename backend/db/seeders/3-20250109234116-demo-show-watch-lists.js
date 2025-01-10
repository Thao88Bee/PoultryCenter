"use strict";

const { ShowWatchList } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const showWatchLists = [
  {
    ownerId: 1,
    showId: 1,
    name: "Must Go",
  },
  {
    ownerId: 1,
    showId: 4,
    name: "Maybe",
  },
  {
    ownerId: 2,
    showId: 2,
    name: "Must Go",
  },
  {
    ownerId: 2,
    showId: 5,
    name: "Maybe",
  },
  {
    ownerId: 3,
    showId: 3,
    name: "Must Go",
  },
  {
    ownerId: 3,
    showId: 6,
    name: "Maybe",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ShowWatchList.bulkCreate(showWatchLists);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ShowWatchLists";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: showWatchLists });
  },
};
