'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: false,
        notEmpty:true
      }
    }
  }, {});
  Message.associate = function(models) {
    this.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Message;
};