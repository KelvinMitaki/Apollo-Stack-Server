import { Request, Response } from "express";
import { User } from "../models/User";
import { UserQueries } from "./users/Query";
import { UserMutations } from "./users/Mutation";
import { Agent } from "../models/Agent";
import { AgentMutations } from "./agents/Mutation";
import { PropertyMutations } from "./properties/Mutation";

export interface Context {
  req: Request;
  res: Response;
  User: typeof User;
  Agent: typeof Agent;
}

export const resolvers = {
  Query: {
    ...UserQueries
  },
  Mutation: {
    ...UserMutations,
    ...AgentMutations,
    ...PropertyMutations
  }
};
