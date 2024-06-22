import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const config = {
  development: {
    database: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: 'mysql',
    },
    server: {
      port: process.env.DEV_PORT || 5000,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: 'mysql',
    },
    server: {
      port: process.env.PORT || 80,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
  test: {
    database: {
      host: process.env.DB_HOST,
      name: process.env.TEST_DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: 'mysql',
    },
    server: {
      port: process.env.TEST_PORT || 5001,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
};

export default config[process.env.NODE_ENV || 'development'];
