'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Chat.associate = function(models) {
    // associations can be defined here
    Chat.belongsToMany(models.User, {
      through: 'user_chats'
    });
  };
  return Chat;
};
