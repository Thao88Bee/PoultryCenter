'use strict';

const { Post } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const posts = [
  {
    ownerId: 1,
    name: "Any idea what type of chickens these are?",
    image: "/images/post1.jpg",
    description: "They were given to us and we need more info on the breed. The roo has killed two of his hens.",
    avgRating: 3.0,
  },
  {
    ownerId: 1,
    name: "Just coming out of an ice storm and wanted to share something that worked.",
    image: "/images/post2.jpg",
    description: "I bought an open heated bowl and just knew that it would be a mess because it was open and then I looked at my metal water that I already had and said wait…..This might just sit on top of the bowl. Well it did and it kept the metal waterer warm enough not to freeze.",
    avgRating: 5,
  },
  {
    ownerId: 1,
    name: "7 frozen dead chickens",
    image: "URL IMAGE HERE",
    description: "Between last night and this morning- 7 frozen dead chickens. No sign of mites or lice. Most of their combs are PINK the older hens were pale. Normal poop.",
    avgRating: 4.5,
  },
  {
    ownerId: 2,
    name: "40 MPH wind gusts…any advice?",
    image: "/images/post4.jpg",
    description: " Every dang year I see people say they wrap their runs. I’ve asked advice before I did this and I swear I don’t know what else to do.  YES we’ve tried gorilla tape.",
    avgRating: 3.0,
  },
  {
    ownerId: 2,
    name: "Financially is it worth it?",
    image: "/images/post5.jpg",
    description: "Those with chickens who mainly use them as a source for eggs, financially is it worth it? Started wondering this today when grocery shopping and a dozen great value eggs is now $4.53/ dozen not to long ago it was a little over $2/ dozen.",
    avgRating: 4.0,
  },
  {
    ownerId: 2,
    name: "Are they okay to incubate?",
    image: "/images/post6.jpg",
    description: "I found a stash of eggs and some maybe frozen are they okay to incubate?? They’re Light Brahmas we thought they wasn’t laying and we found the stash.",
    avgRating: 3.2,
  },
  {
    ownerId: 3,
    name: "3 chicken breeds for beginners",
    image: "URL IMAGE HERE",
    description: "Rhode Island Red, hardy and easy to care for. Buff Orpington, known for their friendly and docile nature. Australorp, this breed is famous for its egg-laying ability.",
    avgRating: 5,
  },
  {
    ownerId: 3,
    name: "RIR?",
    image: "/images/post8.jpg",
    description: "I was told RIR but thinking not or maybe mixed? Just curious if y'all have an idea. Thanks!",
    avgRating: 2.0,
  },
  {
    ownerId: 3,
    name: " Ninja boy may be deceased",
    image: "/images/post9.jpg",
    description: "A neighbors dog was mauling Matilda hen and corralling my flock! I haven’t seen Ninja since. I know my boy would give his life for his ladies and I think he may have.",
    avgRating: 4.0,
  },
  {
    ownerId: 1,
    name: "Cute Chicks House",
    image: "/images/post10.jpg",
    description: "I'm seriously thinking about doing this. Cause y'all know I need more chickens.",
    avgRating: 5.0,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Post.bulkCreate(posts);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Posts";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: posts });
  }
};
