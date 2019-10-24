'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
    }
  }, {});
  Book.associate = function(models) {
    this.belongsTo(models.Collection, {foreignKey: 'collectionId'});
  };
  return Book;
};