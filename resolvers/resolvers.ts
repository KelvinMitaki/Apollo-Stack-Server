import { Request, Response } from "express";
import { User } from "../models/User";
import { UserQueries } from "./users/Query";
import { UserMutations } from "./users/Mutation";
import { Agent } from "../models/Agent";
import { AgentMutations } from "./agents/Mutation";
import { PropertyMutations } from "./properties/Mutation";
import { Property, PropertyDoc } from "../models/Property";
import { PropertyQueries } from "./properties/Query";
import { LeadMutations } from "./leads/Mutation";
import { LeadQueries } from "./leads/Query";
// import { format } from "date-fns";

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
    ...PropertyQueries,
    ...LeadQueries
  },
  Mutation: {
    ...UserMutations,
    ...AgentMutations,
    ...PropertyMutations,
    ...LeadMutations
  },
  Property: {
    updatedAt(prt: PropertyDoc) {
      return prt.updatedAt.toString();
    },
    createdAt(prt: PropertyDoc) {
      return prt.createdAt.toString();
    },
    auctionDate(prt: PropertyDoc) {
      return prt.auctionDate ? prt.auctionDate.toString() : null;
    },
    expiryDate(prt: PropertyDoc) {
      return prt.expiryDate.toString();
    }
  }
};
