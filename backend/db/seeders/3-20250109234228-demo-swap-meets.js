"use strict";

const { SwapMeet } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const swapMeets = [
  {
    ownerId: 1,
    name: "Watertown Pigeon Club Annual Pet Swap",
    date: "2025-02-22",
    description: "Pet Swap - 6am-10am. Seller fee is paid onsite at the swap.",
    address: "03 N Jackson Ave",
    city: "Jefferson",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2025-05-10",
    description:
      "8am-12pm.Poultry, small animals, baked goods, crafts, etc are allowed!",
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Wisconsin Bird & Game Breeder Spring Swap",
    date: "2025-03-08",
    description: "6:30am-1:30pm for Swap. $5 Admission.",
    address: "510 Fond du lac Ave",
    city: "Fond du lac",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Taylor County Swap",
    date: "2025-03-22",
    description:
      "Sellers may set up at 7:30 am no pre signup required just show up. Buyers will not be allowed entry until 8am.",
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "Walworth County Fur and Feather Swap",
    date: "2025-04-19",
    description:
      "Admission is $2, children under twelve free. $5 to sell outside, $10 inside.",
    address: "Hwy. 11 East",
    city: "Elkhorn",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2025-06-07",
    description:
      "$10.00 vendor fee at gate. Buyers are free to enter. Sellers encouraged to set up at least half hour early.",
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SwapMeet.bulkCreate(swapMeets);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SwapMeets";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: swapMeets });
  },
};
