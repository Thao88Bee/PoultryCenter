"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        as: "Owner",
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      Review.belongsTo(models.Post, {
        foreignKey: "postId",
        onDelete: "CASCADE",
      });
    }
  }
  Review.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id",
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      starRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
