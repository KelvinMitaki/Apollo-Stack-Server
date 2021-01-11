import { Request, Response } from "express";
import { User } from "../models/User";
import { UserQueries } from "./users/Query";
import { UserMutations } from "./users/Mutation";
import { Agent } from "../models/Agent";
import { AgentMutations } from "./agents/Mutation";
import { PropertyMutations } from "./properties/Mutation";
import { Property, PropertyDoc } from "../models/Property";
import { PropertyQueries } from "./properties/Query";
import { format } from "date-fns";

export interface Context {
  req: Request;
  res: Response;
  User: typeof User;
  Agent: typeof Agent;
  Property: typeof Property;
}
export const resolvers = {
  Query: {
    ...UserQueries,
    ...PropertyQueries
  },
  Mutation: {
    ...UserMutations,
    ...AgentMutations,
    ...PropertyMutations
  },
  Property: {
    updatedAt(prt: PropertyDoc) {
      return prt.updatedAt.toString();
    },
    createdAt(prt: PropertyDoc) {
      return prt.createdAt.toString();
    },
    auctionDate(prt: PropertyDoc) {
      return prt.auctionDate
        ? format(prt.auctionDate, "eeee Do MMMM, yyyy")
        : null;
    },
    expiryDate(prt: PropertyDoc) {
      return format(prt.expiryDate, "eeee Do MMMM, yyyy");
    }
  }
};
