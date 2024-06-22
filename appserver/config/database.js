import { Sequelize } from 'sequelize';
import  config from './config.js';

const { database } = config;

const sequelize = new Sequelize(database.name, database.user, database.password, {
  host: database.host,
  dialect: database.dialect,
  operatorsAliases: false
});

export default sequelize;


