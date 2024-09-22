import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('eventManagement_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export { sequelize };
