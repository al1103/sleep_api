import { Sequelize } from 'sequelize';
import envVars from './envConfig.js';

const sequelize = new Sequelize({
  host: envVars.DATABASE_HOST,
  port: envVars.DATABASE_PORT,
  database: envVars.DATABASE_NAME,
  username: envVars.DATABASE_USER,
  password: envVars.DATABASE_PASSWORD,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
