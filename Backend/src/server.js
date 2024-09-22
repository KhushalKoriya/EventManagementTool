import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { typeDefs } from '../schema/typeDefs.js';
import eventResolvers from '../resolvers/eventResolvers.js';
import { sequelize } from './database.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

const app = express();
// app.use(graphqlUploadExpress());

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: eventResolvers, // Fixed here
  csrfPrevention: true,
  // context: ({ req }) => {
  //   const token = req.headers.authorization || ''; // Get the token from headers
  //   console.log("token",token);
    
  //   const userId = token ? token.split(' ')[1] : null; // Extract user ID from token
  //   console.log("userId",userId);
    
  //   console.log("userId", userId);
  //   return { userId }; 
  // },
});

const models = { User, Event };

// Call the associate method on each model
User.associate(models);
Event.associate(models);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await server.start(); // Await the server start
    
    // Apply graphql-upload middleware before Apollo middleware
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
