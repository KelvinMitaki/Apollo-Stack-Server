import { Request } from "express";
import { User } from "../models/User";
import { UserQueries } from "./users/Query";
import { UserMutations } from "./users/Mutation";
import { Agent } from "../models/Agent";

export interface Context {
  req: Request;
  User: typeof User;
  Agent: typeof Agent;
}

export const resolvers = {
  Query: {
    ...UserQueries
  },
  Mutation: {
    ...UserMutations
  }
};
