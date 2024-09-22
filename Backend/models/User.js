import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../src/database.js'; 

class User extends Model {
  static associate(models) {
    User.hasMany(models.Event, { foreignKey: 'userId', as: 'events' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
