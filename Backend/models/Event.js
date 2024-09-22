import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../src/database.js'; 
class Event extends Model {
  static associate(models) {
    Event.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

Event.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Event',
  }
);

export default Event; 
