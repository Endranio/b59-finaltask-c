'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.User, { foreignKey: 'user_id' });
      // Collection memiliki banyak Task
      Collection.hasMany(models.Task, { foreignKey: 'collections_id' });
    }
  }
  Collection.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};