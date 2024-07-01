import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Add unique constraint for efficient username lookups
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Maintain the existing unique constraint on email
  },
}, {
  // Optionally, create the index explicitly if you need more control:
  indexes: [
    {
      unique: true, // Ensure usernames are unique
      fields: ['username'],
    },
  ],
});


export default User;
