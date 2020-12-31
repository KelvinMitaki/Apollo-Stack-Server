import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    registerUser(value: RegisterInput!): User!
  }

  input RegisterInput {
    email: String!
    password: String!
    fullName: String!
  }
  type User {
    _id: ID!
    fullName: String!
    email: String!
    password: String!
  }
`;
