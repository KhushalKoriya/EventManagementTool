import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Upload

  type User {
    id: ID!
    username: String!
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    images: [String!]!
    startDate: String!
    endDate: String!
    totalGuests: Int!
    userId: Int!
  }

  type EventList {
    events: [Event!]!
    totalCount: Int!
  }

  type GuestLoginResponse {
    message: String!
    user: User! # Return the guest user
  }

  type Query {
    getEvent(id: ID!): Event
    listEvents(
      page: Int, 
      limit: Int, 
      sort: String, 
      order: String, 
      search: String, 
      filters: FilterInput, 
      userId: Int
    ): EventList!
  }

  type Mutation {
    createEvent(
      name: String!, 
      description: String!, 
      images: [String!]!, 
      startDate: String!, 
      endDate: String!, 
      totalGuests: Int!,
      userId: Int! # Include userId here for createEvent
    ): Event!

    updateEvent(
      id: ID!, 
      name: String, 
      description: String, 
      images: [String!]!, 
      startDate: String, 
      endDate: String, 
      totalGuests: Int,
      userId: Int! # Include userId here for updateEvent
    ): Event!

    deleteEvent(id: ID!): Boolean!

    loginAsGuest: GuestLoginResponse!
  }

  input FilterInput {
    startDate: String
    endDate: String
    name: String # Optional name filter
  }
`;

export { typeDefs };
