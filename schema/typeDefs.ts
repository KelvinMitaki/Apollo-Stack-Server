import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    currentUser: User
    users: [User!]!
    logoutUser: User
  }
  type Mutation {
    registerUser(values: RegisterInput!): User!
    registerAgent(values: RegisterAgentInput!): Agent!
    loginUser(email: String!, password: String!): Token!
    editUserProfile(values: EditUserProfile!): User!
    editAgentProfile(values: EditAgentProfile!): Agent!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }
  input RegisterAgentInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int!
    address: String!
  }
  input EditUserProfile {
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int
  }
  input EditAgentProfile {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int!
    address: String!
  }
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    isAgent: Boolean
  }
  type Agent {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: Int!
    address: String!
    profilePhoto: String
    isAgent: Boolean!
  }
  type Property {
    _id: ID!
    reference: Int!
    location: String!
    streetAddress: String!
    category: String!
    price: Int!
    bedrooms: Int!
    bathrooms: Int!
    type: String!
    status: String!
    agent: Agent!
    heading: String!
    description: String!
    expiryDate: String!
    images: [String!]!
    parkingLots: Int
    homeArea: Int
    lotArea: Int
    furnished: Boolean!
    petFriendly: Boolean!
    garden: Boolean!
    serviceCharge: Int
    repossessed: Boolean!
    onAuction: Boolean!
    auctionDate: String
    auctionVenue: String
  }
`;
