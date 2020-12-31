import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    currentUser: User
  }

  type Mutation {
    registerUser(values: RegisterInput!): User!
    loginUser(email: String!, password: String!): Token!
  }

  input RegisterInput {
    email: String!
    password: String!
    fullName: String!
  }
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    fullName: String!
    email: String!
  }
`;
