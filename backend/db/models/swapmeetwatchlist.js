"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SwapMeetWatchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SwapMeetWatchList.belongsTo(models.User, {
        as: "owner",
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      SwapMeetWatchList.hasMany(models.SwapMeet, {
        foreignKey: "swapMeetId",
        onDelete: "CASCADE",
      });
    }
  }
  SwapMeetWatchList.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      swapMeetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SwapMeetWatchList",
    }
  );
  return SwapMeetWatchList;
};
