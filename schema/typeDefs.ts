import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    currentUser: User
    users: [User!]!
  }

  type Mutation {
    registerUser(values: RegisterInput!): User!
    loginUser(email: String!, password: String!): Token!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
`;
