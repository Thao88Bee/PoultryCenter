"use strict";

const { Show } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const shows = [
  {
    ownerId: 1,
    name: "Coulee Region Poultry Club",
    date: "2025-06-07",
    description:
      "Online entries can be made for our show. (5/25/24 Entry Deadline)",
    address: "19780 Park Drive",
    city: "Galesville",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "West Central Wis. Pigeon & Poultry Club Show",
    date: "2025-10-04",
    description: "9-24-24 Entry Deadline. Always 1st Saturday in October.",
    address: "620 17th St SE.",
    city: "Menomonie",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Wisconsin State Fair",
    date: "2025-07-31",
    description: "Judging starts at 9am on the first day.",
    address: "640 S 84th St",
    city: "West Allis",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Watertown Pigeon Club Annual Winter Show",
    date: "2025-11-29",
    description:
      "Also hosting the Jefferson County Poultry Project Swap in the West Wing",
    address: "503 N Jackson Ave",
    city: "Jefferson",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Wisconsin Bird & Game Breeder Fall Show",
    date: "2025-10-25",
    description:
      "Show is always the last Saturday in October. Show Setup on Friday 2pm-9pm",
    address: "510 Fond du lac Ave",
    city: "Fond du lac",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Northwoods Poultry Fanciers Club Show",
    date: "2025-09-13",
    description: "1 Day Double Show. Entry Deadline 9/3/24",
    address: "209 Mueller Street",
    city: "Athens",
    state: "Wisconsin",
    image: null,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Show.bulkCreate(shows);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Shows";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: shows });
  },
};
