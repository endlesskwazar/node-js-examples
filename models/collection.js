'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
    },
  }, {});
  Collection.associate = function(models) {
    // associations can be defined here
  };
  return Collection;
};