"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const reviews = [
  {
    ownerId: 1,
    postId: 7,
    review: "This is every helpful, Thank You.",
    starRating: 5,
  },
  {
    ownerId: 1,
    postId: 8,
    review:
      " It has a small crest,feathered blue legs and feet,5 toes, turquoise earlobes. Definitely a crossbreed with some Silkie genetics.",
    starRating: 2,
  },
  {
    ownerId: 2,
    postId: 1,
    review: "Eat him. There's no point in keeping a rooster that kills hens.",
    starRating: 3,
  },
  {
    ownerId: 2,
    postId: 2,
    review: "What!!",
    starRating: 1,
  },
  {
    ownerId: 2,
    postId: 9,
    review: "I dislike irresponsible dog owners!",
    starRating: 4,
  },
  {
    ownerId: 2,
    postId: 10,
    review: "Cool, But glass are crazy.",
    starRating: 2,
  },
  {
    ownerId: 3,
    postId: 2,
    review: "Where did you get the heated bowl?",
    starRating: 2,
  },
  {
    ownerId: 3,
    postId: 4,
    review:
      "We use lath/ or any scrap wood and screw down plastic were we can. That way the wind doesn’t catch the plastic and cause it to billow.",
    starRating: 3,
  },
  {
    ownerId: 3,
    postId: 10,
    review: "Creative greenhouse concept for hatching chicks",
    starRating: 5,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviews);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: reviews });
  },
};
