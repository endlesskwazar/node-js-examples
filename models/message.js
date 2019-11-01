'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: false,
        notEmpty:true
      }
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};