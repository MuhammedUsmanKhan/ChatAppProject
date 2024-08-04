import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; // Import the User model

const Message = sequelize.define('Message', {
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  toUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Maintain the existing unique constraint on email
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Optionally, create the index explicitly if you need more control:
  indexes: [
    {
      unique: true, // Ensure text is unique
      fields: ['text'],
    },
  ],
});

User.hasMany(Message, { foreignKey: 'fromUserId' });
User.hasMany(Message, { foreignKey: 'toUserId' });
Message.belongsTo(User, { foreignKey: 'fromUserId', as: 'fromUser' });
Message.belongsTo(User, { foreignKey: 'toUserId', as: 'toUser' });

export default Message;
