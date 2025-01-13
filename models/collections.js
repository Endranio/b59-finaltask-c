"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi ke User
      Collection.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Relasi ke Task
      Collection.hasMany(models.Task, {
        foreignKey: "collections_id",
        as: "tasks", // Alias untuk relasi
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Collection.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Collection",
    }
  ); 
  return Collection;
};
