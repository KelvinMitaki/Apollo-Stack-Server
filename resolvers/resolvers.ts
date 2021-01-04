import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { User } from "../models/User";
import { UserQueries } from "./users/Query";
import { UserMutations } from "./users/Mutation";

export interface Context {
  req: Request;
  User: typeof User;
}

export const resolvers = {
  Query: {
    ...UserQueries
  },
  Mutation: {
    ...UserMutations
  }
};
