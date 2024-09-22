import { Op } from 'sequelize';
import Event from '../models/Event.js';
import User from '../models/User.js';

const eventResolvers = {
  Query: {
    getEvent: async (_, { id }) => {
      return await Event.findByPk(id, { include: [{ model: User, as: 'user' }] });
    },

    listEvents: async (_, { page = 1, limit = 10, sort = 'name', order = 'ASC', search = '', filters = {}, userId }) => {
      const offset = (page - 1) * limit;
      const where = {};
  
      // Apply search by event name
      if (search) {
          where.name = {
              [Op.like]: `%${search}%`,
          };
      }
  
      // Apply filters for start and end date
      if (filters.startDate) {
          where.startDate = {
              [Op.gte]: filters.startDate,
          };
      }
  
      if (filters.endDate) {
          where.endDate = {
              [Op.lte]: filters.endDate,
          };
      }
  
      // Apply filter for user ID
      if (userId) {
          where.userId = userId; 
      }
  
      try {
          const events = await Event.findAndCountAll({
              where,
              limit,
              offset,
              order: [[sort, order]],
              include: [{ model: User, as: 'user' }],
          });
  
          return {
              events: events.rows || [], 
              totalCount: events.count,
          };
      } catch (error) {
          console.error("Error fetching events:", error);
          throw new Error("Failed to fetch events.");
      }
  },
  
    
    
  },

  Mutation: {
    createEvent: async (_, { name, description, images, startDate, endDate, totalGuests, userId}) => {
      
      if (!userId) {
        throw new Error("Authentication required: User must be logged in to create an event.");
      }

      return await Event.create({ name, description, images, startDate, endDate, totalGuests, userId });
    },

    updateEvent: async (_, { id, name, description, images, startDate, endDate, totalGuests,userId }) => {
      
      const event = await Event.findByPk(id);
      if (!event || event.userId !== userId) {
        throw new Error('Unauthorized or event not found');
      }

      return await event.update({ name, description, images, startDate, endDate, totalGuests });
    },

    deleteEvent: async (_, { id }) => {
      const event = await Event.findByPk(id);
      await event.destroy();
      return true;
    },

    loginAsGuest: async () => {
      try {
        const guestUser = await User.create({
          username: `guest_${Date.now()}`, 
        });

        return {
          message: 'Guest user created successfully',
          user: guestUser, 
        };
      } catch (error) {
        console.error("Error creating guest user:", error);
        throw new Error('Failed to create guest user.');
      }
    },
  },
};

export default eventResolvers;
