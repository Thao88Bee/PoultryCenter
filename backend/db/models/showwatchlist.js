"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowWatchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShowWatchList.belongsTo(models.User, {
        as: "Owner",
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      ShowWatchList.hasMany(models.Show, {
        foreignKey: "showId",
        onDelete: "CASCADE",
      });
    }
  }
  ShowWatchList.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      showId: {
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
      modelName: "ShowWatchList",
    }
  );
  return ShowWatchList;
};
