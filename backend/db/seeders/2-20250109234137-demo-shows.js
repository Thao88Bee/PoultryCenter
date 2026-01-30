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
    date: "2026-6-6",
    description: `Online entries can be made for our show at: http://www.showcommander.app during the month of May. 
      (5/31/25 Entry Deadline)
      Always 1st Saturday in June
      For more information, contact: 
      Jim Laatsch 
      Jimsparky2000@yahoo.com 
      253-241-9981`,
    address: "19780 Park Drive",
    city: "Galesville",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "West Central Wis. Pigeon & Poultry Club Show",
    date: "2026-10-03",
    description: `9-24-25 Entry Deadline.
      Always 1st Saturday in October.
      For more information, contact:
      Deb Barquist
      deb.barquist@gmail.com`,
    address: "620 17th St SE.",
    city: "Menomonie",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Watertown Pigeon Club Annual Winter Show",
    date: "2026-11-28",
    description: `Pet Swap held in Feb or March - 6:30am-10:30am
      Annual Show & Swap (pigeons only) - November
      Always the Saturday after Thanksgiving
      For more information on the spring swap & show, contact:
      Pete Dempsey
      dempseypete@yahoo.com
      920-728-0027`,
    address: "503 N Jackson Ave",
    city: "Jefferson",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Wisconsin State Fair",
    date: "2026-08-06",
    description: `For information, contact:
    Robin Hensersky
    entryoffice@wisconsin.gov
    414-266-7051`,
    address: "640 S 84th St",
    city: "West Allis",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Wisconsin Bird & Game Breeder Fall Show",
    date: "2026-10-31",
    description: `Spring swap is always the second Saturday in March.
      Fall swap & show is always the last Saturday in October.
      6:30am-1:30pm - Swap
      Swap Setup on Friday - 2pm-9pm
      $5 Admission
      For more information, contact:
      Jim Bleuer
      920-379-6188`,
    address: "510 Fond du lac Ave",
    city: "Fond du lac",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Wisconsin International Poultry Show",
    date: "2026-09-26",
    description: `(9/3/24 Entry Deadline)
      For more information, contact:
      Terry Lund
      terry@prismglassworks.com
      (Co-Show Secretary)
      3764 Union Dale Rd.
      Brooklyn, WI 53521
      info@wisconsininternational.com
      (608) 455-2318`,
    address: "300 Superior St",
    city: "Portage",
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
