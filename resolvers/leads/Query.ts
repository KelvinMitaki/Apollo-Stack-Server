import { isAuthorized } from "../../middlewares/authorization";
import { AgentDoc } from "../../models/Agent";
import { Context } from "../resolvers";

export const LeadQueries = {
  async fetchLeads(
    prt: any,
    args: { offset: number; limit: number },
    { req, Lead }: Context
  ) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    return Lead.find({ agent: agent._id }, null, {
      skip: args.offset,
      limit: args.limit
    }).populate("property", "_id streetAddress");
  },
  async fetchLeadsCount(prt: any, args: any, { req, Lead }: Context) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    return {
      count: Lead.countDocuments({ agent: agent._id })
    };
  }
};
