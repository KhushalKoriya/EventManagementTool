import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../schema/typeDefs.js';
import eventResolvers from '../resolvers/eventResolvers.js';
import { sequelize } from './database.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

const app = express();


const server = new ApolloServer({ 
  typeDefs, 
  resolvers: eventResolvers, 
  csrfPrevention: true,
});

const models = { User, Event };

User.associate(models);
Event.associate(models);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await server.start(); 
    
    server.applyMiddleware({ app });
    
    console.log('Starting server...');
    console.log('Syncing database...');
    await sequelize.sync();
    console.log(`Database synced successfully.`);
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    console.error('Error details:', error);
  }
};

startServer();
