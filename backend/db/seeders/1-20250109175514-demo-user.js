"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          username: "DemoTesting",
          firstName: "Demo",
          lastName: "Testing",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("testing"),
        },
        {
          username: "Testing",
          firstName: "Testing",
          lastName: "Testing",
          email: "testing@user.io",
          hashedPassword: bcrypt.hashSync("testing"),
        },
        {
          username: "BeeTesting",
          firstName: "Bee",
          lastName: "Testing",
          email: "bee@user.io",
          hashedPassword: bcrypt.hashSync("testing"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
